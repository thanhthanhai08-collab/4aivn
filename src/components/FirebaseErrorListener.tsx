// src/components/FirebaseErrorListener.tsx
'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';

// This component is a client-side component that listens for Firestore permission errors
// and throws them to be caught by the Next.js development error overlay.
// It should be included in your main layout.
export const FirebaseErrorListener = () => {
  useEffect(() => {
    const handleError = (error: any) => {
      // In a production environment, you might want to log this to a service like Sentry.
      // For development, we throw the error to make it visible in the Next.js overlay.
      if (process.env.NODE_ENV === 'development') {
        // We throw the error in a timeout to break out of the current call stack,
        // which ensures Next.js's overlay can catch and display it properly.
        setTimeout(() => {
          throw error;
        }, 0);
      } else {
        console.error('Firestore Permission Error:', error);
      }
    };

    errorEmitter.on('permission-error', handleError);

    return () => {
      errorEmitter.off('permission-error', handleError);
    };
  }, []);

  return null; // This component does not render anything.
};
