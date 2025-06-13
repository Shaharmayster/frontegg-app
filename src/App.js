import './App.css';
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
    const baseUrl = ContextHolder.getContext().baseUrl;
    window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location.href}`;
  };

  const openSettings = () => {
    AdminPortal.show();
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        <div>
          <img src={user?.profilePictureUrl} alt={user?.name} width="100" />
          <h2>Logged in as: {user?.name}</h2>

          <button onClick={() => alert(user.accessToken)}>
            Show Access Token
          </button>

          <button onClick={logout}>Logout</button>

          <button onClick={openSettings}>Settings</button>
        </div>
      ) : (
        <div>
          <button onClick={() => loginWithRedirect()}>Login</button>
        </div>
      )}
    </div>
  );
}

export default App;
