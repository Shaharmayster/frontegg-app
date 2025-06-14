import { useEffect, useState } from 'react';
import { useAuth, useLoginWithRedirect, useAuthActions, ContextHolder, AdminPortal } from "@frontegg/react";

function App() {
  const { user, isAuthenticated } = useAuth();
  const { switchTenant } = useAuthActions();
  const loginWithRedirect = useLoginWithRedirect();
  const [selectedTenant, setSelectedTenant] = useState('');

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

  const handleSwitchTenant = (e) => {
    const newTenantId = e.target.value;
    setSelectedTenant(newTenantId);
    switchTenant({ tenantId: newTenantId, silentReload: true });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      {isAuthenticated ? (
        <>
          <img src={user?.profilePictureUrl} alt={user?.name} width="100" style={{ borderRadius: '50%' }} />
          <h2>Welcome, {user?.name}</h2>
          <p>{user?.email}</p>

          {/* Dropdown להחלפת טננט */}
          {user?.tenantIds?.length > 1 && (
            <div>
              <label>Switch Tenant: </label>
              <select onChange={handleSwitchTenant} value={selectedTenant || user?.tenantId}>
                {user.tenantIds.map(id => (
                  <option key={id} value={id}>{id}</option>
                ))}
              </select>
            </div>
          )}

          <br />
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
