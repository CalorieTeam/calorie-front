// 토큰 재발급
export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) throw new Error('No refresh token. Please login again.');

  const res = await fetch('http://localhost:8080/api/refresh-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
    throw new Error('Refresh token expired, please login again');
  }

  const data = await res.json();
  localStorage.setItem('accessToken', data.accessToken);
  return data.accessToken;
}