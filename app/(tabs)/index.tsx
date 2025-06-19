// 0. Create file: app/index.tsx
"use client";
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/login');
  }, []);

  return null;
}
