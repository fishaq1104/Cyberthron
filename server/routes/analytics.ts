import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  try {
    const analytics = {
      isDemoMode: true,
      label: 'DEMO MODE — Sample Data (Aggregated & Anonymized)',
      lastUpdated: new Date().toISOString(),
      city: 'Abu Dhabi',
      authorityTarget: 'Department of Municipalities and Transport (DMT) & Environment Agency Abu Dhabi (EAD)',
      
      // Aggregated Mobility Overview
      mobilityOverview: {
        totalSustainableTrips: 148290,
        walkingTrips: 62110,
        cyclingTrips: 28450,
        publicTransportTrips: 57730,
        carTripsAvoided: 84200,
        period: 'Last 30 Days (Abu Dhabi Emirate)'
      },

      // Environmental & Climate Impact
      environmentalImpact: {
        co2ReductionKg: 142600,
        co2ReductionTons: 142.6,
        averageHeatExposureReductionPercent: 34.2,
        averageRouteShadeCoveragePercent: 68.4,
        heatStressIncidentsAvoidedEstimate: 412
      },

      // Infrastructure Planning Insights for Urban Planners
      infrastructureInsights: [
        {
          id: 'gap-1',
          zone: 'Hamdan St / Al Zahiyah Corridor',
          type: 'Shade Infrastructure',
          priority: 'High',
          status: 'Requires Canopy',
          walkingDemandScore: 92,
          currentShadeCoverage: 28,
          recommendation: 'Install integrated photovoltaic solar shade arbors & native Ghaf tree planting.'
        },
        {
          id: 'gap-2',
          zone: 'Al Reem to Maryah Pedestrian Connection',
          type: 'Active Mobility Bottleneck',
          priority: 'Medium',
          status: 'Under Evaluation',
          walkingDemandScore: 88,
          currentShadeCoverage: 76,
          recommendation: 'Extend air-conditioned skybridge connection during peak 11am-3pm heat hours.'
        },
        {
          id: 'gap-3',
          zone: 'Mussafah Eco-Link to Central Bus Terminal',
          type: 'Cycling Track Gap',
          priority: 'High',
          status: 'Missing Track',
          walkingDemandScore: 64,
          currentShadeCoverage: 18,
          recommendation: 'Add 3.2 km protected segregated cycleway with solar lighting and shade shelters.'
        },
        {
          id: 'gap-4',
          zone: 'Tourist Club Area (Al Zahiyah) Sector 2',
          type: 'Accessibility Retrofit',
          priority: 'High',
          status: 'POD Gap Identified',
          walkingDemandScore: 78,
          currentShadeCoverage: 52,
          recommendation: 'Retrofit 14 curb cuts with ADA tactile indicators for wheelchair & stroller access.'
        }
      ],

      // Zone Heat Map & Mobility Density
      zoneDemand: [
        { name: 'Abu Dhabi Corniche', sustainableTrips: 34200, shadeScore: 78, comfortIndex: 'Optimal' },
        { name: 'Al Reem Island', sustainableTrips: 29800, shadeScore: 72, comfortIndex: 'Good' },
        { name: 'Saadiyat Cultural District', sustainableTrips: 21500, shadeScore: 91, comfortIndex: 'Very High' },
        { name: 'Al Maryah Island', sustainableTrips: 24300, shadeScore: 88, comfortIndex: 'Very High' },
        { name: 'Masdar City', sustainableTrips: 18900, shadeScore: 95, comfortIndex: 'Exemplary' },
        { name: 'Yas Island Promenade', sustainableTrips: 19590, shadeScore: 65, comfortIndex: 'Moderate' }
      ],

      // Corporate Wellness B2B Demonstration
      corporateWellnessDemo: {
        partnerCompany: 'Demo UAE Enterprise (Abu Dhabi Global Market)',
        totalRegisteredEmployees: 126,
        activeParticipantsThisMonth: 104,
        totalSustainableTrips: 2481,
        co2AvoidedKg: 312.4,
        caloriesBurnedKcal: 489200,
        walkingChallengePercentCompleted: 78,
        teamRanking: 'Top 5% Abu Dhabi Corporate Sustainability Index'
      }
    };

    res.json({
      success: true,
      data: analytics
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: { message: 'Analytics data unavailable', code: 'ANALYTICS_ERROR' }
    });
  }
});

export default router;
