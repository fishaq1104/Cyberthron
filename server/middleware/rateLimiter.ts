import rateLimit from 'express-rate-limit';

// Global API Rate Limiter: 150 requests per 15 minutes per IP
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      message: 'Too many requests from this IP. Please try again after 15 minutes.',
      code: 'RATE_LIMIT_EXCEEDED'
    }
  }
});

// Stricter rate limiter for AI Chat & Auth endpoints: 30 requests per minute
export const strictLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      message: 'Request limit reached for AI / Auth. Please wait a moment.',
      code: 'AI_RATE_LIMIT_EXCEEDED'
    }
  }
});
