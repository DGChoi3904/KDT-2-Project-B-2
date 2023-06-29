import React, { useState, useEffect, FormEvent } from 'react';

export default function MongoCat() {
  const [catname, setCatname] = useState('');
  const [catage, setCatage] = useState('');
  const [catbreed, setCatbreed] = useState('');
  const [catList, setCatList] = useState([]);

  const loadCats = async () => {
    try {
      const response = await fetch('/cats', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const catData = await response.json();
        console.log(catData + '/cats Get요청');
        setCatList(catData);
      } else {
        console.error('데이터 조회 실패');
      }
    } catch (error) {
      console.error('조회 중 에러 발생.', error);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/cats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: catname, age: catage, breed: catbreed }),
      });
      if (response.ok) {
        console.log('전송 성공');
        loadCats(); // 데이터 전송 후 새로운 데이터로 업데이트
      } else {
        console.error('데이터 전송 실패');
      }
    } catch (error) {
      console.error('전송 중 에러 발생.', error);
    }
  };

  const handleFindOne = async (id: string) => {
    try {
      const response = await fetch(`/cats/${id}`);
      if (response.ok) {
        const catData = await response.json();
        console.log('조회 결과:', catData);
      } else {
        console.error('데이터 조회 실패');
      }
    } catch (error) {
      console.error('조회 중 에러 발생.', error);
    }
  };

  useEffect(() => {
    loadCats(); // 컴포넌트가 마운트될 때 초기 데이터 조회
  }, []);

  return (
    <>
      <h1>고양이 생성</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="이름을 입력해주세요"
          value={catname}
          onChange={(e) => setCatname(e.target.value)}
        />
        <input
          placeholder="나이를 입력해주세요"
          value={catage}
          onChange={(e) => setCatage(e.target.value)}
        />
        <input
          placeholder="품종을 입력해주세요"
          value={catbreed}
          onChange={(e) => setCatbreed(e.target.value)}
        />
        <button type="submit">전송</button>
      </form>
      <h1>고양이 목록</h1>
      <button onClick={loadCats}>조회</button>
      <p>
        {catList.map((cat: any) => (
          <span key={cat._id}>{cat.name}</span>
        ))}
      </p>
    </>
  );
}
