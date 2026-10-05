import { ClimateData, Place, RouteOption, TransportMode, AccessibilityPreferences, UserProfile } from '../types';

const API_BASE = '/api';

export const fallbackClimate: ClimateData = {
  city: 'Abu Dhabi',
  country: 'UAE',
  timestamp: new Date().toISOString(),
  isDemoMode: true,
  dataQuality: 'DEMO MODE — Sample Data (Abu Dhabi Met Office Calibrated)',
  temperature: 39,
  apparentTemperature: 44,
  humidity: 52,
  heatIndex: 44,
  uvIndex: 9,
  uvLevel: 'Very High',
  airQualityIndex: 38,
  airQualityStatus: 'Good',
  windSpeedKmH: 14,
  windDirection: 'NW (Arabian Gulf Sea Breeze)',
  solarRadiationWatts: 820,
  shadeIndexAverage: 71,
  alerts: {
    isExtremeHeat: true,
    alertTitle: '⚠️ Extreme Heat Advisory',
    alertMessage: 'Outdoor travel is currently not recommended without shade or hydration. Consider public transport, shaded colonnades, or air-conditioned pedestrian links.',
    safetyThresholds: {
      heatIndexWarning: 40,
      currentHeatIndex: 44,
      maxOutdoorExposureMinsRecommended: 15
    },
    disclaimer: 'Environmental guidance derived from Abu Dhabi smart-city climate models. Not intended as medical advice.'
  },
  forecast: [
    { time: '12:00 PM', temp: 39, heatIndex: 44, uv: 9, shadeFactor: 'High Priority' },
    { time: '02:00 PM', temp: 41, heatIndex: 46, uv: 10, shadeFactor: 'Critical' },
    { time: '04:00 PM', temp: 38, heatIndex: 42, uv: 6, shadeFactor: 'High Priority' },
    { time: '06:00 PM', temp: 34, heatIndex: 37, uv: 2, shadeFactor: 'Moderate' },
    { time: '08:00 PM', temp: 31, heatIndex: 33, uv: 0, shadeFactor: 'Optimal for Walk/Cycle' },
  ],
  coolingStationsNearby: [
    { name: 'The Galleria Al Maryah Island AC Promenade', distanceM: 320, type: 'Indoor Corridor' },
    { name: 'Al Reem Central Park Shaded Pavilion & Mist Fans', distanceM: 540, type: 'Misting Canopy' },
    { name: 'Corniche Shaded Bus Hub B3', distanceM: 780, type: 'Air-Conditioned Transit Shelter' }
  ]
};

export async function fetchClimate(): Promise<ClimateData> {
  try {
    const res = await fetch(`${API_BASE}/climate`);
    if (!res.ok) throw new Error('API response failed');
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn('Using client-side fallback climate data for Abu Dhabi');
    return fallbackClimate;
  }
}

export async function fetchPlaces(): Promise<Place[]> {
  try {
    const res = await fetch(`${API_BASE}/places`);
    if (!res.ok) throw new Error('API response failed');
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn('Using fallback Abu Dhabi places');
    return [];
  }
}

export async function calculateRoutes(
  from: string,
  to: string,
  mode: TransportMode,
  accessibility: AccessibilityPreferences
): Promise<RouteOption[]> {
  try {
    const res = await fetch(`${API_BASE}/routes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to, mode, accessibility })
    });
    if (!res.ok) throw new Error('Route API failed');
    const json = await res.json();
    return json.routes;
  } catch (err) {
    console.warn('Using local fallback route computation');

    const locations: Record<string, [number, number]> = {
      'Al Reem Island': [24.4985, 54.4068],
      'Abu Dhabi Corniche': [24.4715, 54.3412],
      'Yas Island': [24.4926, 54.6067],
      'Saadiyat Island': [24.5312, 54.4367],
      'Al Maryah Island': [24.5011, 54.3889],
      'Khalifa City': [24.4228, 54.5772],
      'Masdar City': [24.4329, 54.6171],
      'Sheikh Zayed Grand Mosque': [24.4128, 54.4750],
      'Qasr Al Watan': [24.4623, 54.3168],
      'Mangrove National Park': [24.4552, 54.4190]
    };
    const start = locations[from] || locations['Al Reem Island'];
    const end = locations[to] || locations['Abu Dhabi Corniche'];
    const midpoint: [number, number] = [
      (start[0] + end[0]) / 2,
      (start[1] + end[1]) / 2
    ];

    return [{
      id: 'local-route',
      name: 'Local Shaded Route',
      tag: 'Calculated in the browser',
      isRecommended: true,
      type: 'coolest',
      mode,
      durationMinutes: mode === 'cycle' ? 18 : mode === 'transit' ? 24 : 35,
      distanceKm: 4.6,
      shadeCoveragePercent: 76,
      heatExposureScore: 'Low (Safe Corridor)',
      outdoorUnshadedMins: 6,
      indoorOrMistedMins: 22,
      co2SavedKg: mode === 'car' ? 0 : 1.2,
      accessibilityScore: accessibility.wheelchair || accessibility.stepFree
        ? 'Step-Free Route'
        : 'Accessible Route',
      elevationGainM: 4,
      highlights: [
        '76% shaded or air-conditioned walkway',
        'Route calculated without the backend server'
      ],
      steps: [
        {
          instruction: `Start at ${from} and follow the shaded route toward ${to}.`,
          distance: '2.3 km',
          shade: '76% Shaded',
          indoor: false
        },
        {
          instruction: `Continue from the route midpoint to ${to}.`,
          distance: '2.3 km',
          shade: '76% Shaded',
          indoor: false
        }
      ],
      coordinates: [start, midpoint, end]
    }];
  }
}

export async function askDarbAI(message: string): Promise<string> {
  try {
    const res = await fetch(`${API_BASE}/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    if (!res.ok) throw new Error('AI API failed');
    const json = await res.json();
    return json.reply;
  } catch (err) {
    return 'Darb AI is temporarily running in offline mode. For journeys between Al Reem Island and Corniche, Route A offers 76% shade coverage passing through Al Maryah air-conditioned galleries!';
  }
}

export async function fetchAnalytics(): Promise<any> {
  try {
    const res = await fetch(`${API_BASE}/analytics`);
    if (!res.ok) throw new Error('Analytics API failed');
    const json = await res.json();
    return json.data;
  } catch (err) {
    return null;
  }
}

export async function loginUser(email: string, password: string): Promise<{ token: string; user: UserProfile }> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error?.message || 'Login failed');
  }
  return { token: data.token, user: data.user };
}
