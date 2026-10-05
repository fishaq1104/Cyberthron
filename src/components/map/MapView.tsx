import React, { useEffect, useRef, useState } from 'react';
import * as maplibregl from 'maplibre-gl';
import type { Map, MapLayerMouseEvent } from 'maplibre-gl';
import type { Feature, FeatureCollection, GeoJSON } from 'geojson';
import { RouteOption } from '../../types';
import { MapLayersLegend, MapLayerState } from './MapLayersLegend';
import { useLanguage } from '../../context/LanguageContext';

interface MapViewProps {
  selectedRoute?: RouteOption | null;
  interactive?: boolean;
  heightClass?: string;
  onSelectWaypoint?: (name: string) => void;
}

const emptyFeatureCollection = (): FeatureCollection => ({
  type: 'FeatureCollection',
  features: []
});

const lineFeature = (coordinates: [number, number][], properties: Record<string, string | number> = {}): Feature => ({
  type: 'Feature',
  properties,
  geometry: { type: 'LineString', coordinates: coordinates.map(([lat, lng]) => [lng, lat]) }
});

const pointFeature = (lat: number, lng: number, properties: Record<string, string | number> = {}): Feature => ({
  type: 'Feature',
  properties,
  geometry: { type: 'Point', coordinates: [lng, lat] }
});

export const MapView: React.FC<MapViewProps> = ({
  selectedRoute,
  heightClass = 'h-[520px]'
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const [layers, setLayers] = useState<MapLayerState>({
    walking: true,
    cycling: true,
    transit: true,
    shadeZones: true,
    acPaths: true,
    heatRisk: true,
    accessible: true
  });

  const toggleLayer = (layer: keyof MapLayerState) => {
    setLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      center: [54.375, 24.485],
      zoom: 12.8,
      style: {
        version: 8,
        sources: {
          carto: {
            type: 'raster',
            tiles: ['https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'],
            tileSize: 256,
            attribution: '&copy; OpenStreetMap contributors &copy; CARTO | Darb Al Istidama Abu Dhabi'
          }
        },
        layers: [{ id: 'carto-tiles', type: 'raster', source: 'carto' }]
      }
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right');
    mapInstanceRef.current = map;

    map.on('load', () => {
      map.addSource('route', { type: 'geojson', data: emptyFeatureCollection() });
      map.addSource('cycling', { type: 'geojson', data: emptyFeatureCollection() });
      map.addSource('ac-paths', { type: 'geojson', data: emptyFeatureCollection() });
      map.addSource('shade-zones', { type: 'geojson', data: emptyFeatureCollection() });
      map.addSource('heat-risk', { type: 'geojson', data: emptyFeatureCollection() });
      map.addSource('transit', { type: 'geojson', data: emptyFeatureCollection() });
      map.addSource('accessible', { type: 'geojson', data: emptyFeatureCollection() });

      map.addLayer({ id: 'cycling-line', type: 'line', source: 'cycling', paint: { 'line-color': '#2563EB', 'line-width': 4, 'line-opacity': 0.8, 'line-dasharray': [2, 2] } });
      map.addLayer({ id: 'ac-line', type: 'line', source: 'ac-paths', paint: { 'line-color': '#06B6D4', 'line-width': 6, 'line-opacity': 0.95 } });
      map.addLayer({ id: 'shade-fill', type: 'fill', source: 'shade-zones', paint: { 'fill-color': '#10B981', 'fill-opacity': 0.25 } });
      map.addLayer({ id: 'shade-outline', type: 'line', source: 'shade-zones', paint: { 'line-color': '#059669', 'line-width': 1.5 } });
      map.addLayer({ id: 'heat-fill', type: 'fill', source: 'heat-risk', paint: { 'fill-color': '#F43F5E', 'fill-opacity': 0.22 } });
      map.addLayer({ id: 'heat-outline', type: 'line', source: 'heat-risk', paint: { 'line-color': '#E11D48', 'line-width': 1.5 } });
      map.addLayer({ id: 'route-line', type: 'line', source: 'route', paint: { 'line-color': '#059669', 'line-width': 6, 'line-opacity': 0.9 } });
      map.addLayer({ id: 'transit-points', type: 'circle', source: 'transit', paint: { 'circle-radius': 8, 'circle-color': '#D97706', 'circle-stroke-color': '#FFFFFF', 'circle-stroke-width': 2 } });
      map.addLayer({ id: 'accessible-points', type: 'circle', source: 'accessible', paint: { 'circle-radius': 9, 'circle-color': '#4F46E5', 'circle-stroke-color': '#C5A059', 'circle-stroke-width': 2 } });

      map.on('click', ['cycling-line', 'ac-line', 'shade-fill', 'heat-fill', 'transit-points', 'accessible-points'], (event: MapLayerMouseEvent) => {
        const feature = event.features?.[0];
        if (!feature) return;
        new maplibregl.Popup()
          .setLngLat(event.lngLat)
          .setHTML(`<strong>${feature.properties?.title || feature.properties?.name || 'Abu Dhabi climate mobility layer'}</strong>`)
          .addTo(map);
      });
      updateMapData(map, layers, selectedRoute);
    });

    return () => {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (map?.isStyleLoaded()) updateMapData(map, layers, selectedRoute);
  }, [layers, selectedRoute]);

  const updateMapData = (map: Map, activeLayers: MapLayerState, route?: RouteOption | null) => {
    const setData = (id: string, data: GeoJSON) => {
      const source = map.getSource(id) as maplibregl.GeoJSONSource | undefined;
      source?.setData(data);
    };

    const setVisibility = (id: string, visible: boolean) => {
      if (map.getLayer(id)) map.setLayoutProperty(id, 'visibility', visible ? 'visible' : 'none');
    };

    const cycling: [number, number][] = [[24.492, 54.368], [24.485, 54.354], [24.475, 54.341], [24.467, 54.331], [24.46, 54.321]];
    const acPaths: [number, number][] = [[24.502, 54.389], [24.4995, 54.3915], [24.4975, 54.393]];
    setData('cycling', { type: 'FeatureCollection', features: [lineFeature(cycling, { title: 'Abu Dhabi Corniche Dedicated Cycle Highway' })] });
    setData('ac-paths', { type: 'FeatureCollection', features: [lineFeature(acPaths, { title: 'Climate-Controlled Pedestrian Promenade' })] });
    setVisibility('cycling-line', activeLayers.cycling);
    setVisibility('ac-line', activeLayers.acPaths);

    const shadeZones: Feature[] = [
      { lat: 24.486, lng: 54.362, title: 'Capital Garden Date Palm Canopy', shade: '88% Shade' },
      { lat: 24.497, lng: 54.405, title: 'Al Reem Central Shaded Park', shade: '82% Shade' },
      { lat: 24.478, lng: 54.345, title: 'Corniche Date Palm Pergolas', shade: '78% Shade' }
    ].map(zone => ({
      type: 'Feature',
      properties: { title: zone.title, shade: zone.shade },
      geometry: { type: 'Polygon', coordinates: [circleCoordinates(zone.lat, zone.lng, 0.0025)] }
    }));
    setData('shade-zones', { type: 'FeatureCollection', features: shadeZones });
    setVisibility('shade-fill', activeLayers.shadeZones);
    setVisibility('shade-outline', activeLayers.shadeZones);

    const heat = pointFeature(24.491, 54.382, { title: 'High Heat-Risk Exposure Zone' });
    setData('heat-risk', { type: 'FeatureCollection', features: [{ ...heat, geometry: { type: 'Polygon', coordinates: [circleCoordinates(24.491, 54.382, 0.003)] } }] });
    setVisibility('heat-fill', activeLayers.heatRisk);
    setVisibility('heat-outline', activeLayers.heatRisk);

    setData('transit', {
      type: 'FeatureCollection',
      features: [
        pointFeature(24.497, 54.402, { title: 'Al Reem Bus 063 Air-Conditioned Shelter' }),
        pointFeature(24.473, 54.345, { title: 'Corniche East Electric Transit Hub' })
      ]
    });
    setData('accessible', {
      type: 'FeatureCollection',
      features: [
        pointFeature(24.4985, 54.4068, { title: 'Al Reem POD Elevator & Ramp' }),
        pointFeature(24.4715, 54.3412, { title: 'Corniche Step-Free Beach Access' }),
        pointFeature(24.5005, 54.391, { title: 'Maryah Accessible Skywalk Elevators' })
      ]
    });
    setVisibility('transit-points', activeLayers.transit);
    setVisibility('accessible-points', activeLayers.accessible);

    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    if (route?.coordinates?.length) {
      setData('route', { type: 'FeatureCollection', features: [lineFeature(route.coordinates)] });
      const bounds = new maplibregl.LngLatBounds();
      route.coordinates.forEach(([lat, lng]) => bounds.extend([lng, lat]));
      map.fitBounds(bounds, { padding: 60, duration: 500 });
      addMarker(map, route.coordinates[0], '📍 Start', '#064E3B');
      addMarker(map, route.coordinates[route.coordinates.length - 1], '🏁 Destination', '#022C22');
    } else {
      setData('route', emptyFeatureCollection());
    }
  };

  const addMarker = (map: Map, coordinate: [number, number], label: string, background: string) => {
    const element = document.createElement('div');
    element.textContent = label;
    element.style.cssText = `background:${background};color:#FDE68A;padding:4px 8px;border-radius:12px;font-weight:bold;font-size:11px;border:2px solid #C5A059;white-space:nowrap;`;
    markersRef.current.push(new maplibregl.Marker({ element, anchor: 'bottom' }).setLngLat([coordinate[1], coordinate[0]]).addTo(map));
  };

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-[#C5A059]/30 shadow-2xl bg-[#064E3B]">
      <div ref={mapContainerRef} className={`w-full ${heightClass}`} />
      <div className="absolute top-4 left-4 z-[400] flex flex-col gap-2 max-w-[280px] sm:max-w-none">
        <div className="bg-[#022C22]/95 backdrop-blur-md border border-[#C5A059]/40 text-white px-3.5 py-2 rounded-xl shadow-lg">
          <span className="text-xs font-bold text-[#FDE68A]">{selectedRoute?.name || 'Abu Dhabi Smart Mobility Grid'}</span>
          <p className="text-[11px] text-slate-300">{isAr ? 'خريطة تفاعلية تراعي التظليل والتكييف' : 'Live Shade & AC Corridor Map'}</p>
        </div>
      </div>
      <div className="absolute bottom-4 left-4 right-4 z-[400]">
        <MapLayersLegend layers={layers} onToggleLayer={toggleLayer} />
      </div>
    </div>
  );
};

const circleCoordinates = (lat: number, lng: number, radius: number): [number, number][] => {
  const points: [number, number][] = [];
  for (let index = 0; index <= 32; index += 1) {
    const angle = (index / 32) * Math.PI * 2;
    points.push([lng + Math.cos(angle) * radius, lat + Math.sin(angle) * radius]);
  }
  return points;
};
