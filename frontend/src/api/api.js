const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

function authHeaders(){
  const token = localStorage.getItem('sbms_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

async function request(path, { method = 'GET', body, headers = {}, skipAuth = false } = {}) {
  const url = `${BASE}${path}`;
  const opts = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
      ...(skipAuth ? {} : authHeaders())
    }
  };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(url, opts);
  const text = await res.text();
  let json;
  try { json = text ? JSON.parse(text) : null } catch(e){ json = text }
  if (!res.ok) {
    const err = new Error(json?.message || 'API error');
    err.status = res.status;
    err.body = json;
    throw err;
  }
  return json;
}

export const Api = {
  login: (payload) => request('/auth/login', { method: 'POST', body: payload, skipAuth: true }),
  register: (payload) => request('/auth/register', { method: 'POST', body: payload, skipAuth: true }),
  getBoardings: (query) => request(`/boardings${query ? `?${query}` : ''}`),
  getBoarding: (id) => request(`/boardings/${id}`),
  createBooking: (payload) => request('/bookings', { method: 'POST', body: payload }),
  createAd: (payload) => request('/owners/ads', { method: 'POST', body: payload }),
  getOwnerAds: () => request('/owners/ads'),
  getAdminPendingAds: () => request('/admin/ads/pending'),
  approveAd: (id) => request(`/admin/ads/${id}/approve`, { method: 'POST' }),
  // more endpoints per SRS...
};
