import { useEffect } from 'react';
import { useLoginWithRedirect } from '@frontegg/react';

export default function OAuthCallback() {
  const loginWithRedirect = useLoginWithRedirect();

  useEffect(() => {
    loginWithRedirect();
  }, [loginWithRedirect]);

  return <div>Redirecting...</div>;
}
