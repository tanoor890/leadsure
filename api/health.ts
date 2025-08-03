export default function handler(req: any, res: any) {
  res.status(200).json({
    message: 'Backend API is working!',
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    environment: process.env.NODE_ENV || 'development'
  });
} 