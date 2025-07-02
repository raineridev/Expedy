import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";

export function auth(req : Request, res : Response, next: NextFunction) {
    const accessToken   = req.headers['authorization'];
    if(!accessToken) {
        res.status(401).json({ error: 'Unauthorized' });
        throw new Error('Unauthorized');
    } 
    try {
        const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET as string);
        console.log('[Middleware]Decoded Token:', decodedToken);
        // (req.headers as any)['x-user-id'] = decodedToken.user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}