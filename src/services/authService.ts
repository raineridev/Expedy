import jwt from 'jsonwebtoken';
import { AuthUserType } from '../types/authType';
import { getUserUsername } from './userService';

export async function authenticateUser(data : AuthUserType) {
    const { username, password } = data;
    const user = await getUserUsername(username);
    if (!user || user.password !== password) {
        throw new Error('Invalid username or password');
    }

    const acessToken =  jwt.sign({ data }, process.env.JWT_SECRET as string, {
        expiresIn: '1h',
    });

    const refreshToken = jwt.sign({ data }, process.env.JWT_SECRET as string, {
        expiresIn: '7d',
    });
    return { acessToken, refreshToken };
}

export function verifyToken(token: string) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (error) {
        throw new Error('Invalid token');
    }
}

export function refreshToken(token: string) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        const newToken = jwt.sign({ data: decoded }, process.env.JWT_SECRET as string, {
            expiresIn: '1h',
        });
        return newToken;
    } catch (error) {
        throw new Error('Invalid token');
    }
}