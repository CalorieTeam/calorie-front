import { refreshAccessToken } from './auth';

// 토큰 자동 첨부, 만료 시 토큰 갱신, 재요청까지 처리하는 함수
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  let accessToken = localStorage.getItem('accessToken');

  // 요청 헤더에 토큰 추가
  const headers = new Headers(options.headers || {});
  headers.set('Authorization', `Bearer ${accessToken}`); 

  try {
    const response = await fetch(url, { ...options, headers });

    // 만약 토큰이 만료되었다면
    if (response.status === 401) {
      const newAccessToken = await refreshAccessToken(); 
      headers.set('Authorization', `Bearer ${newAccessToken}`);
      // 만료된 토큰으로 요청을 다시 시도
      return fetch(url, {...options, headers});
    }

    return response;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}