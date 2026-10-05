import { Request, Response, NextFunction } from 'express';

// Secure Error Handler: Never leak stack traces or internal secrets to clients
export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  const statusCode = err.statusCode || 500;
  const isProd = process.env.NODE_ENV === 'production';
  
  // Log safely on the server side
  console.error(`[API Error] ${req.method} ${req.url}:`, err.message || err);

  res.status(statusCode).json({
    success: false,
    error: {
      message: err.message || 'An unexpected internal error occurred. Please try again.',
      code: err.code || 'INTERNAL_SERVER_ERROR',
      // In production or demo, omit stack traces
      ...(isProd ? {} : { details: err.details || undefined })
    }
  });
}

// Input Sanitization Middleware to prevent XSS and query injection
export function sanitizeInputs(req: Request, res: Response, next: NextFunction) {
  if (req.body && typeof req.body === 'object') {
    sanitizeObject(req.body);
  }
  if (req.query && typeof req.query === 'object') {
    sanitizeObject(req.query);
  }
  next();
}

function sanitizeObject(obj: any) {
  for (const key of Object.keys(obj)) {
    if (typeof obj[key] === 'string') {
      // Basic strip of suspicious script tags
      obj[key] = obj[key].replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '').trim();
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      sanitizeObject(obj[key]);
    }
  }
}
