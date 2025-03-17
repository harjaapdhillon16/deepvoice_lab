import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/utils';

/**
 * useAuthenticatedLayout
 * - Subscribes to auth state changes.
 * - On mount, checks the current session.
 * - If no session is found, redirects to '/login'.
 * - If a session exists, sets loading to false.
 * - Listens for subsequent auth changes and redirects if the session is lost.
 */
export const useAuthenticatedLayout = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Initial session check.
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
      } else {
        setLoading(false);
      }
    };

    checkSession();

    // Set up the auth state change listener.
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      // If the user signs out after the initial check, redirect them.
      if (!session) {
        router.push('/login');
      }
    });

    return () => {
      // Clean up the subscription when the component unmounts.
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  return loading;
};

/**
 * useUnauthenticatedLayout
 * - Subscribes to auth state changes.
 * - On mount, checks the current session.
 * - If a session exists, redirects to '/dashboard'.
 * - If no session is found, sets loading to false.
 * - Listens for subsequent auth changes and redirects if a session is established.
 */
export const useUnauthenticatedLayout = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Initial session check.
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/dashboard');
      } else {
        setLoading(false);
      }
    };

    checkSession();

    // Set up the auth state change listener.
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      // If the user signs in after the initial check, redirect them.
      if (session) {
        router.push('/dashboard');
      }
    });

    return () => {
      // Clean up the subscription when the component unmounts.
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  return loading;
};