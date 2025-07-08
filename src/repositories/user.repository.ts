import { userModel } from '../entities/user.entity';
import { UserType } from '../types/user.types';

export async function store(userData: UserType) {
  try {
    return userModel.create(userData);
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user: ' + error);
  }
}

export async function updatePassword(userId: number, newPassword: string) {
  try {
    const updatedUser = await userModel.findOneAndUpdate(
      { id: userId },
      { password: newPassword },
      { new: true }
    );
    if (!updatedUser) {
      throw new Error('User not found');
    }
    return updatedUser;
  } catch (error) {
    console.error('Error updating password:', error);
    throw new Error('Failed to update password: ' + error);
  }
}

export async function getUserByUsername(requestedUsername: string) {
  try {
    const foundUser = await userModel.findOne({ username: requestedUsername });
    if (!foundUser) {
      throw new Error('User not found');
    }
    return foundUser;
  } catch (error) {   
    throw new Error('Failed to fetch user: ' + error);
  }
}

export async function getUserById(userId: number) {
    const foundUser = await userModel.findOne({id: userId});
    if (!foundUser) {
        throw new Error('User not found');
    }
    return foundUser;
}

export async function updateUser(userId: number, userUpdateData: Object) {
    const updatedUser = await userModel.findOneAndUpdate({id: userId}, userUpdateData, { new: true }); 
    if (!updatedUser) {
        throw new Error('User not found');
    }
    return updatedUser;
}