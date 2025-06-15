"use client";

import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

function TestContent() {
  const { user, loading } = useAuth();
  
  return (
    <div className="p-8">
      <h1>Test Auth - Med AuthProvider</h1>
      <p>Loading: {loading ? 'true' : 'false'}</p>
      <p>User: {user ? user.email : 'null'}</p>
    </div>
  );
}

export default function TestAuth() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <AuthProvider>
      <TestContent />
    </AuthProvider>
  );
} 