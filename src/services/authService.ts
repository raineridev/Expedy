import jwt from 'jsonwebtoken';
import {v4 as uuidv4} from 'uuid';
import { AuthUserType } from '../types/authType';
import { getUserUsername } from './userService';
import { RefreshBodyType } from '../types/refreshBodyType';

export async function authenticateUser(authenticationData: AuthUserType) {
    const { username, password } = authenticationData;
    const userRecord = await getUserUsername(username);

    if (!userRecord || userRecord.password !== password) {
        throw new Error('Invalid username or password');
    }
    
    userRecord.password = '';
    console.log(userRecord);
    
    const refreshTokenPayload: RefreshBodyType = { userId: userRecord.id, type: 'refresh' };
    const accessToken = jwt.sign(userRecord, process.env.JWT_SECRET as string, {
        expiresIn: '1h',
    });
    const refreshToken = jwt.sign(refreshTokenPayload, process.env.JWT_SECRET as string, {
        expiresIn: '7d',
    });
    
    return { accessToken, refreshToken };
}

export function verifyToken(authToken: string) {
    try {
        return jwt.verify(authToken, process.env.JWT_SECRET as string);
    } catch (error) {
        throw new Error('Invalid token');
    }
}

export function refreshToken(existingToken: string) {
    try {
        const decodedTokenData = jwt.verify(existingToken, process.env.JWT_SECRET as string);
        const newAccessToken = jwt.sign({ data: decodedTokenData }, process.env.JWT_SECRET as string, {
            expiresIn: '1h',
        });
        return newAccessToken;
    } catch (error) {
        throw new Error('Invalid token');
    }
}

