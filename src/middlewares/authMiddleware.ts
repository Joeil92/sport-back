import { NextFunction, Request, Response } from "express";
import AuthService from "../services/authService";

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authService = new AuthService();
    const token = req.header('Authorization');

    if(!token) throw new Error('Token not found. Please try to connect.');

    if(token.split(' ')[0] !== 'Bearer') throw new Error('Invalid token format');

    try {
        const decoded = authService.verifyToken(token.split(' ')[1]);
        next();
    } catch (error) {
        throw new Error('Token is not valid, try to reconnect');
    }
}