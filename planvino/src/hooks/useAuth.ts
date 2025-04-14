import { useState, useEffect } from 'react';
import { UserProfile } from '../types/user';

export function useAuth() {
  const [user, setUser] = useState<UserProfile | null>(null);

  const updateProfile = (updatedProfile: UserProfile) => {
    setUser(updatedProfile);
    // TODO: Implement API call to update profile on the backend
  };

  return {
    user,
    updateProfile,
  };
} 