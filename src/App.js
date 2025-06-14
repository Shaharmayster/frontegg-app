import { useEffect } from 'react';
import { useAuth, useLoginWithRedirect, ContextHolder } from "@frontegg/react";

function App() {
  const { user, isAuthenticated } = useAuth();
  const loginWithRedirect = useLoginWithRedirect();

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect]);

  const logout = () => {
    const baseUrl = ContextHolder.for().getContext().baseUrl;
    window.location.href = \`\${baseUrl}/oauth/logout?post_logout_redirect_uri=\${window.location.href}\`;
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      {isAuthenticated ? (
        <>
          <img src={user?.profilePictureUrl} alt={user?.name} width="100" style={{ borderRadius: '50%' }} />
          <h2>Welcome, {user?.name}</h2>
          <p>{user?.email}</p>
          <a href="https://app-2s55dwpeeoii.frontegg.com/oauth/admin" target="_blank" rel="noreferrer">
            <button>Settings (Admin Portal)</button>
          </a>
          <br /><br />
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>Redirecting to login...</p>
      )}
    </div>
  );
}

export default App;
