import { useEffect } from 'react';
import { useAuth, useLoginWithRedirect, ContextHolder, AdminPortal } from "@frontegg/react";

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
    window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location.href}`;
  };

  const openSettings = () => {
    AdminPortal.show();
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      {isAuthenticated ? (
        <>
          <img src={user?.profilePictureUrl} alt={user?.name} width="100" style={{ borderRadius: '50%' }} />
          <h2>Welcome, {user?.name}</h2>
          <p>{user?.email}</p>
          <button onClick={openSettings}>Settings</button>
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
