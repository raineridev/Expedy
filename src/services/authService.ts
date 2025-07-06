import jwt from 'jsonwebtoken';
import {v4 as uuidv4} from 'uuid';
import { AuthUserType } from '../types/authType';
import { getUserUsername } from './userService';
import { RefreshBodyType } from '../types/refreshBodyType';

export async function authenticateUser(data : AuthUserType) {
    const { username, password } = data;
    const user = await getUserUsername(username) ;

    if (!user || user.password !== password) {
        throw new Error('Invalid username or password');
    }
    user.password = ''
    console.log(user);
    const refreshBody : RefreshBodyType = {userId: user.id, type: 'refresh'};
    const accessToken =  jwt.sign(user, process.env.JWT_SECRET as string, {
        expiresIn: '1h',
    });
    const refreshToken = jwt.sign( refreshBody, process.env.JWT_SECRET as string, {
        expiresIn: '7d',
    });
    return { accessToken, refreshToken };
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

