'use client'; // 이건 브라우저에서 동작하는 컴포넌트라는 의미야

import { useState } from 'react';
import { initialMemos } from '../mock/memos'; // 경로 주의
import '@/app/styles/common.scss';   // 추가된 공통 SCSS 파일
import Header from "@/components/Header"; 
import Footer from "@/components/Footer"; 
import styles from './Diet.module.css'; // CSS 모듈 사용

type Memo = {
  id: number;
  text: string;
};

export default function Home() {
  const [memo, setMemo] = useState(''); // 메모 입력값
  const [memoList, setMemoList] = useState<Memo[]>(initialMemos);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 새로고침 막기
    if (memo.trim() === '') return; // 빈 내용은 무시
    setMemoList([...memoList, { id: Date.now(), text: memo }]); // 메모 저장
    setMemo(''); // 입력창 비우기
  };

  const handleDelete = (index: number) => { 
    const newMemoList = memoList.filter((_, i) => i !== index);  
    setMemoList(newMemoList);  
  }

  return ( 
    <>
    <Header title="식단" />
    <main className={styles.container}>
      <h1>✍️ 메모 앱</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="메모를 입력하세요"
          style={{ padding: 8, width: '100%', marginBottom: 10 }}
        />
        <button type="submit" style={{ padding: 8 }}>저장</button>
      </form>

      <hr style={{ margin: '20px 0' }} />

      <h2>📝 저장된 메모</h2>
      <ul>
        {memoList.map((item, index) => (
          <li key={index} style={{ marginBottom: 6 }}>
            {item.text}
            {item.id}
            <button
              onClick={() => handleDelete(index)}
              style={{ marginLeft: 10, color: 'red' }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </main> 
    <Footer />
    </>
  );
}
