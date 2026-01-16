import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'Token no proporcionado' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    (req as any).userId = decoded.id;

    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ message: 'Token inválido o expirado' });
    }
  }
};
