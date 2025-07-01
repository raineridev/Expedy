import { userModel } from '../entities/user';
import { UserType } from '../types/userType';

export async function store (data: UserType) {
  try {
    return userModel.create(data);
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user: ' + error);
  }
}

export async function updatePassword (id: number, password: string) {
  try {
    const user = await userModel.findOneAndUpdate(
      { id },
      { password },
      { new: true }
    );
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    console.error('Error updating password:', error);
    throw new Error('Failed to update password: ' + error);
  }
} 