export default function handler(req: any, res: any) {
  res.status(200).json({
    message: 'Simple API test working!',
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url
  });
} 