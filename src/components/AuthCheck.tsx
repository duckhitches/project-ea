'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Loading } from '@/components/ui/Loading';

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Try to get the current session
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error || !user) {
          router.push('/auth/login');
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        // If there's no session, redirect to login
        router.push('/auth/login');
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return <Loading message="VERIFYING_CREDENTIALS" />;
  }

  return <>{children}</>;
} 