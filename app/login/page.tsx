'use client'; 
import { useState } from 'react';
import { members } from '../mock/members'; // 삭제 예정
import styles from './Login.module.scss'; // CSS 모듈 사용
import { useRouter } from 'next/navigation';

function Login() { 
  const router = useRouter();
  
  const [email, setEmail] = useState('test');
  const [password, setPassword] = useState('1234');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // const response = await login(id,password);
    try {
      console.log('로그인 시도:', { email, pw: password });
      
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': 'http://localhost:3000'
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({ 
          "email": email,
          "pw": password
        }),
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('서버 설정을 확인해주세요');
        } else if (response.status === 401) {
          throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.');
        } else {
          throw new Error('로그인 처리 중 오류가 발생했습니다.');
        }
      }

      // 응답 본문을 텍스트로 먼저 받아서 확인
      const responseText = await response.text();
      console.log('응답 본문:', responseText);

      if (!responseText && response.status !== 200) {
        throw new Error('서버 응답이 비어있습니다.');
      }

      let data;
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch (parseError) {
        console.error('JSON 파싱 에러:', parseError);
        throw new Error('서버 응답을 처리할 수 없습니다.');
      }

      console.log('로그인 성공:', data);
      
      // 토큰 저장 및 페이지 이동
      if (data.accessToken && data.refreshToken) {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        router.push('/main');
      } else {
        // 헤더에서 토큰 확인
        const accessToken = response.headers.get('Authorization');
        const refreshToken = response.headers.get('Refresh-Token');
        
        if (accessToken && refreshToken) {
          const token = accessToken.replace('Bearer ', '');
          localStorage.setItem('accessToken', token);
          localStorage.setItem('refreshToken', refreshToken);
          router.push('/main');
        } else {
          throw new Error('토큰 정보를 찾을 수 없습니다.');
        }
      }
    } catch (err: any) {
      console.error('로그인 에러:', err);
      setError(err.message || '서버 오류가 발생했습니다.');
    }
  }; 

  return (
    <>
      <form className={styles.container} onSubmit={handleSubmit}>
        <h2>로그인</h2>
        <input
          type="text"
          placeholder="이메일"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={e => setPassword(e.target.value)}
        /> 
        <div className={styles.links}>
          <a href="/find-id">아이디 찾기</a>
          <a href="/find-password">비밀번호 찾기</a>
          <a href="/join">회원가입</a>
        </div>

        <button type="submit">로그인</button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </>
  );
}

export default Login;