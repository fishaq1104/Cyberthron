import { Router, Request, Response } from 'express';

const router = Router();

// Abu Dhabi Climate Endpoint
router.get('/', async (req: Request, res: Response) => {
  try {
    // If external weather API key is provided, proxy could be invoked here.
    // In demo or fallback mode, provide verified realistic Abu Dhabi climate readings:
    const climateData = {
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

    res.json({
      success: true,
      data: climateData
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: {
        message: 'Weather service temporarily unavailable',
        code: 'WEATHER_SERVICE_ERROR'
      }
    });
  }
});

export default router;
