// @ts-nocheck
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/utils';

const LOCALSTORAGE_SESSION_KEY = 'supabase_session';
const LOCALSTORAGE_PROFILE_KEY = 'supabase_user_profile';

export const useUser = () => {
  // Helpers to safely retrieve stored data from localStorage.
  const getStoredSession = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(LOCALSTORAGE_SESSION_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (error) {
          console.error('Error parsing stored session:', error);
          return null;
        }
      }
    }
    return null;
  };

  const getStoredUserProfile = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(LOCALSTORAGE_PROFILE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (error) {
          console.error('Error parsing stored user profile:', error);
          return null;
        }
      }
    }
    return null;
  };

  // Initialize state with cached data.
  const initialSession = getStoredSession();
  const initialProfile = getStoredUserProfile();
  const [session, setSession] = useState(initialSession);
  const [user, setUser] = useState(initialSession?.user || null);
  const [userProfile, setUserProfile] = useState(initialProfile);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);

  // Helper to update localStorage.
  const updateLocalStorage = (key, value) => {
    if (typeof window !== 'undefined') {
      if (value) {
        localStorage.setItem(key, JSON.stringify(value));
      } else {
        localStorage.removeItem(key);
      }
    }
  };

  // Session synchronization.
  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      setSession(currentSession);
      setUser(currentSession?.user || null);
      updateLocalStorage(LOCALSTORAGE_SESSION_KEY, currentSession);
      setLoading(false);
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user || null);
        updateLocalStorage(LOCALSTORAGE_SESSION_KEY, currentSession);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Fetch user profile data from the "users" table using the user's email.
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user?.email) {
        setProfileLoading(true);
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('email', user.email)
          .single();

        if (error) {
          console.error('Error fetching user profile:', error);
          setUserProfile(null);
          updateLocalStorage(LOCALSTORAGE_PROFILE_KEY, null);
        } else {
          setUserProfile(data);
          updateLocalStorage(LOCALSTORAGE_PROFILE_KEY, data);
        }
        setProfileLoading(false);
      } else {
        setUserProfile(null);
        updateLocalStorage(LOCALSTORAGE_PROFILE_KEY, null);
        setProfileLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  return { user, session, userProfile, loading, profileLoading };
};