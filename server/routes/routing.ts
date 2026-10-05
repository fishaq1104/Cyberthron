import { Router, Request, Response } from 'express';

const router = Router();

// Abu Dhabi Landmark Coordinates
const ABU_DHABI_NODES: Record<string, [number, number]> = {
  'Al Reem Island': [24.4985, 54.4068],
  'Abu Dhabi Corniche': [24.4715, 54.3412],
  'Yas Island': [24.4926, 54.6067],
  'Saadiyat Island': [24.5312, 54.4367],
  'Al Maryah Island': [24.5011, 54.3889],
  'Khalifa City': [24.4228, 54.5772],
  'Masdar City': [24.4329, 54.6171],
  'Sheikh Zayed Grand Mosque': [24.4128, 54.4750],
  'Qasr Al Watan': [24.4623, 54.3168],
  'Mangrove National Park': [24.4552, 54.4190],
};

router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      from = 'Al Reem Island',
      to = 'Abu Dhabi Corniche',
      mode = 'walk',
      accessibility = {}
    } = req.body;

    const fromCoords = ABU_DHABI_NODES[from] || [24.4985, 54.4068];
    const toCoords = ABU_DHABI_NODES[to] || [24.4715, 54.3412];

    const isWheelchair = accessibility.wheelchair || accessibility.stepFree;
    const isElder = accessibility.elderFriendly;

    // Generate realistic multi-path coordinates between from and to
    // Route A: Coolest (Via Al Maryah Galleria AC Promenade, Hamdan Shaded Artery, and Corniche Coastal Date Palm Canopy)
    const routeACoordinates: [number, number][] = [
      fromCoords,
      [fromCoords[0] + 0.003, fromCoords[1] - 0.012], // Reem Central shaded bridge
      [24.5005, 54.3910], // Al Maryah Galleria air-conditioned pedestrian link
      [24.4920, 54.3750], // Tourist Club Area tree-lined canopy
      [24.4840, 54.3600], // Capital Garden shaded park corridor
      [24.4770, 54.3490], // Electra / Corniche misting arbor
      toCoords
    ];

    // Route B: Fastest (Direct highway/artery sidewalk, higher sun exposure)
    const routeBCoordinates: [number, number][] = [
      fromCoords,
      [24.4910, 54.3950],
      [24.4810, 54.3720],
      [24.4740, 54.3510],
      toCoords
    ];

    // Route C: Sustainable Multimodal (Walk to Shaded Bus Stop + Abu Dhabi Electric Bus + Shaded Promenade)
    const routeCCoordinates: [number, number][] = [
      fromCoords,
      [24.4970, 54.4020], // Walk 300m to Bus 063 Air-Conditioned Shelter
      [24.4900, 54.3800], // Transit segment
      [24.4790, 54.3550], // Transit segment
      [24.4730, 54.3450], // Dropoff at Corniche East
      toCoords
    ];

    const routes = [
      {
        id: 'route-coolest',
        name: 'Route A — Coolest Route',
        tag: 'Recommended for Current Weather',
        isRecommended: true,
        type: 'coolest',
        mode: mode,
        durationMinutes: mode === 'cycle' ? 11 : 28,
        distanceKm: 4.6,
        shadeCoveragePercent: 76,
        heatExposureScore: 'Low (Safe Corridor)',
        outdoorUnshadedMins: 6,
        indoorOrMistedMins: 22,
        co2SavedKg: 1.2,
        accessibilityScore: isWheelchair ? '100% Step-Free & Ramp Certified' : 'Step-Free & Elevator Verified',
        elevationGainM: 4,
        highlights: [
          '76% Shaded or Air-Conditioned Walkway',
          'Passes through Maryah Galleria AC Skybridge',
          'Capital Gardens Palm Tree Canopy & Misting Fans',
          '100% Step-Free with Ramps'
        ],
        steps: [
          {
            instruction: 'Start at Al Reem Island Plaza, take covered canopy walkway towards Shams Boutik.',
            distance: '350m',
            shade: '90% Covered',
            indoor: true
          },
          {
            instruction: 'Cross through Maryah Island climate-controlled pedestrian skybridge.',
            distance: '600m',
            shade: '100% Air-Conditioned',
            indoor: true
          },
          {
            instruction: 'Follow shaded colonnade along Hamdan St towards Capital Garden.',
            distance: '1.2 km',
            shade: '70% Date Palm Shade',
            indoor: false
          },
          {
            instruction: 'Enter Abu Dhabi Corniche dedicated bicycle & pedestrian shaded pathway.',
            distance: '850m',
            shade: '85% Canopy Shade',
            indoor: false
          }
        ],
        coordinates: routeACoordinates
      },
      {
        id: 'route-fastest',
        name: 'Route B — Fastest Route',
        tag: 'Direct Path (Higher Heat Exposure)',
        isRecommended: false,
        type: 'fastest',
        mode: mode,
        durationMinutes: mode === 'cycle' ? 8 : 20,
        distanceKm: 3.9,
        shadeCoveragePercent: 32,
        heatExposureScore: 'High (Direct Asphalt Sun)',
        outdoorUnshadedMins: 16,
        indoorOrMistedMins: 4,
        co2SavedKg: 1.0,
        accessibilityScore: 'Standard Sidewalk (2 Curb Steps)',
        elevationGainM: 6,
        highlights: [
          'Direct route via Zayed The First Street',
          'Saves 8 minutes travel time',
          '⚠️ 68% exposed to direct midday sun',
          'Hydration & sun umbrella strongly advised'
        ],
        steps: [
          {
            instruction: 'Head west on Reem bridge walkway towards main road.',
            distance: '700m',
            shade: '20% Shade',
            indoor: false
          },
          {
            instruction: 'Walk along direct perimeter of Electra corridor.',
            distance: '1.8 km',
            shade: '35% Shade',
            indoor: false
          },
          {
            instruction: 'Arrive at Corniche via direct pedestrian crossing.',
            distance: '400m',
            shade: '30% Shade',
            indoor: false
          }
        ],
        coordinates: routeBCoordinates
      },
      {
        id: 'route-sustainable',
        name: 'Route C — Sustainable Transit Route',
        tag: 'Lowest Carbon + High Comfort',
        isRecommended: false,
        type: 'sustainable',
        mode: 'transit',
        durationMinutes: 22,
        distanceKm: 5.1,
        shadeCoveragePercent: 88,
        heatExposureScore: 'Very Low (Air-Conditioned Bus & Shelters)',
        outdoorUnshadedMins: 3,
        indoorOrMistedMins: 19,
        co2SavedKg: 1.45,
        accessibilityScore: '100% Low-Floor Bus with Wheelchair Ramp',
        elevationGainM: 2,
        highlights: [
          'Abu Dhabi Electric Bus Route 063',
          'Air-conditioned transit shelters at every stop',
          'Only 3 minutes total outdoor walking',
          'Highest net-zero emissions offset'
        ],
        steps: [
          {
            instruction: 'Walk 220m to Al Reem Air-Conditioned Bus Shelter 4.',
            distance: '220m',
            shade: '80% Covered',
            indoor: false
          },
          {
            instruction: 'Board Abu Dhabi Electric Bus 063 (every 8 mins) towards Corniche.',
            distance: '4.2 km',
            shade: '100% Air-Conditioned',
            indoor: true
          },
          {
            instruction: 'Alight at Corniche Public Beach Shelter and follow shaded boardwalk.',
            distance: '180m',
            shade: '90% Shaded',
            indoor: false
          }
        ],
        coordinates: routeCCoordinates
      }
    ];

    res.json({
      success: true,
      query: { from, to, mode, accessibility },
      climateContext: {
        temp: 39,
        heatIndex: 44,
        safetyRecommendation: 'Extreme Heat: Route A or Route C strongly recommended over Route B.'
      },
      routes
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: {
        message: 'Map and routing service temporarily unavailable',
        code: 'ROUTING_SERVICE_ERROR'
      }
    });
  }
});

export default router;
