import React, { useState, useEffect, FormEvent } from 'react';
interface Cat {
  name: string;
  age: number;
  breed: string;
}

export default function MongoCat() {
  const [catname, setCatname] = useState('');
  const [catage, setCatage] = useState('');
  const [catbreed, setCatbreed] = useState('');
  const [catList, setCatList] = useState([]);
  const [catSearchName, setCatSearchName] = useState('');
  const [catSearchData, setCatSearchData] = useState<Cat>({
    name: '',
    age: 0,
    breed: '',
  });

  const loadCats = async () => {
    // 전체 고양이 목록을 조회하는 메서드
    try {
      fetch('/cats', {
        headers: {
          Accept: 'application / json',
        },
        method: 'GET',
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('응답이 비정상적입니다.');
          }
        })
        .then((data) => {
          console.log(data + '전체data부분');
          setCatList(data);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error('조회 중 에러 발생.', error);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    //고양이를 DB에 등록하는 메서드.
    e.preventDefault();

    try {
      const response = await fetch('/cats', {
        // Post방식으로 /cats 경로에 요청을 보냄
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

  const handleFindOne = async () => {
    // 한마리만 조회하는 메소드.현재 에러
    try {
      fetch(`/cats/${catSearchName}`, {
        headers: {
          Accept: 'application / json',
        },
        method: 'GET',
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('응답이 비정상적입니다.');
          }
        })
        .then((data) => {
          const a = JSON.stringify(data);
          // setCatSearchData((prevData) => [...catSearchData, a]);
          setCatSearchData(data);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error('조회 중 에러 발생.', error);
    }
  };

  useEffect(() => {
    // loadCats(); // 컴포넌트가 마운트될 때 초기 데이터 조회
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
          <span key={cat._id}>
            {cat.name}, {cat.age}살, 품종 : {cat.breed}
            <br />
          </span>
        ))}
      </p>
      <h1>고양이 이름 조회</h1>
      <input
        type="text"
        value={catSearchName}
        onChange={(e) => setCatSearchName(e.target.value)}
      />
      <button onClick={handleFindOne}>조회</button>
      <p>
        <span>
          {catSearchData.name}
          {catSearchData.age}
          {catSearchData.breed}
          <br />
        </span>
      </p>
    </>
  );
}
