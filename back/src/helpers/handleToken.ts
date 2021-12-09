import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const handleToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  if (!token)
    return res.status(401).json({ success: false, error: 'Access denied' });
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET || '');
    req.user = verified;
    next();
  } catch (error) {
    res
      .status(400)
      .json({ success: false, error: 'Invalid token, access denied' });
  }
};

export { handleToken };
