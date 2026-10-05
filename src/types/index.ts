export type TransportMode = 'walk' | 'cycle' | 'transit' | 'car';

export interface Place {
  id: string;
  name: string;
  nameAr: string;
  category: string;
  categoryAr: string;
  lat: number;
  lng: number;
  distanceKm: number;
  walkingTimeMins: number;
  cyclingTimeMins: number;
  shadeCoveragePercent: number;
  heatSafetyLevel: string;
  accessibility: string;
  sustainableTransit: string;
  description: string;
  heritageNote: string;
  imageUrl: string;
  tags: string[];
}

export interface ClimateAlerts {
  isExtremeHeat: boolean;
  alertTitle: string;
  alertMessage: string;
  safetyThresholds: {
    heatIndexWarning: number;
    currentHeatIndex: number;
    maxOutdoorExposureMinsRecommended: number;
  };
  disclaimer: string;
}

export interface ClimateForecast {
  time: string;
  temp: number;
  heatIndex: number;
  uv: number;
  shadeFactor: string;
}

export interface CoolingStation {
  name: string;
  distanceM: number;
  type: string;
}

export interface ClimateData {
  city: string;
  country: string;
  timestamp: string;
  isDemoMode: boolean;
  dataQuality: string;
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  heatIndex: number;
  uvIndex: number;
  uvLevel: string;
  airQualityIndex: number;
  airQualityStatus: string;
  windSpeedKmH: number;
  windDirection: string;
  solarRadiationWatts: number;
  shadeIndexAverage: number;
  alerts: ClimateAlerts;
  forecast: ClimateForecast[];
  coolingStationsNearby: CoolingStation[];
}

export interface RouteStep {
  instruction: string;
  distance: string;
  shade: string;
  indoor: boolean;
}

export interface RouteOption {
  id: string;
  name: string;
  tag: string;
  isRecommended: boolean;
  type: 'coolest' | 'fastest' | 'sustainable';
  mode: TransportMode;
  durationMinutes: number;
  distanceKm: number;
  shadeCoveragePercent: number;
  heatExposureScore: string;
  outdoorUnshadedMins: number;
  indoorOrMistedMins: number;
  co2SavedKg: number;
  accessibilityScore: string;
  elevationGainM: number;
  highlights: string[];
  steps: RouteStep[];
  coordinates: [number, number][];
}

export interface AccessibilityPreferences {
  wheelchair: boolean;
  avoidStairs: boolean;
  stepFree: boolean;
  strollerFriendly: boolean;
  elderFriendly: boolean;
  reducedWalking: boolean;
  visualAssist: boolean;
  hearingAssist: boolean;
}

export interface Badge {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  icon: string;
  earned: boolean;
  dateEarned?: string;
}

export interface Challenge {
  id: string;
  title: string;
  titleAr: string;
  category: 'walking' | 'cycling' | 'transit' | 'shade';
  rewardPoints: number;
  progressPercent: number;
  currentValue: string;
  targetValue: string;
  deadline: string;
  isCompleted: boolean;
}

export interface UserStats {
  greenPoints: number;
  currentStreak: number;
  co2SavedKg: number;
  walkingDistanceKm: number;
  cyclingDistanceKm: number;
  steps: number;
  tripsCount: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN' | 'GOVERNMENT' | 'CORPORATE';
  organization?: string;
  greenPoints: number;
  streakDays: number;
}
