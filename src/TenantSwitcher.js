import { ContextHolder } from '@frontegg/react';

const tenants = ContextHolder.getContext()?.tenants || [];
const currentTenantId = ContextHolder.getContext()?.tenant?.id;

function handleTenantChange(tenantId) {
  ContextHolder.getContext()?.setTenant?.(tenantId);
  window.location.reload();
}

export default function TenantSwitcher() {
  if (tenants.length <= 1) return null;

  return (
    <div>
      <label>Switch Tenant: </label>
      <select value={currentTenantId} onChange={(e) => handleTenantChange(e.target.value)}>
        {tenants.map((tenant) => (
          <option key={tenant.id} value={tenant.id}>
            {tenant.name}
          </option>
        ))}
      </select>
    </div>
  );
}
