import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config();

import climateRouter from './routes/climate';
import routingRouter from './routes/routing';
import placesRouter from './routes/places';
import aiRouter from './routes/ai';
import analyticsRouter from './routes/analytics';
import authRouter from './routes/auth';

import { globalLimiter, strictLimiter } from './middleware/rateLimiter';
import { sanitizeInputs, errorHandler } from './middleware/security';

const app = express();
const PORT = process.env.PORT || 5000;

// Security Headers with Helmet
app.use(helmet({
  contentSecurityPolicy: false, // Allow local leaflet maps and fonts
  crossOriginEmbedderPolicy: false,
}));

// CORS Configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Body Parsing & Sanitization
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(sanitizeInputs);

// Global Rate Limiting
app.use('/api', globalLimiter);

// Stricter Rate Limiting on AI & Auth routes
app.use('/api/ai', strictLimiter);
app.use('/api/auth', strictLimiter);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'Darb Al Istidama (درب الاستدامة)',
    version: '1.0.0',
    city: 'Abu Dhabi, UAE',
    timestamp: new Date().toISOString(),
    demoMode: process.env.DEMO_MODE !== 'false',
    features: {
      climateAdaptiveRouting: true,
      abuDhabiPlaces: true,
      darbAI: true,
      smartCityAnalytics: true,
      roleBasedAuth: true,
      accessibilityEngine: true
    }
  });
});

// API Routes
app.use('/api/climate', climateRouter);
app.use('/api/routes', routingRouter);
app.use('/api/places', placesRouter);
app.use('/api/ai', aiRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/auth', authRouter);

// Centralized Secure Error Handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🌿 Darb Al Istidama (درب الاستدامة) Backend API Server`);
  console.log(`📍 Serving Abu Dhabi Net-Zero Mobility Platform`);
  console.log(`🚀 Running securely on http://localhost:${PORT}`);
  console.log(`🛡️  Rate Limiter & Helmet Security Active`);
  console.log(`=======================================================`);
});

export default app;
