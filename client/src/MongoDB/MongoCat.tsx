import { ok } from 'assert';
import { error } from 'console';
import { response } from 'express';
import React, { useState, useEffect, FormEvent } from 'react';
import Modal from 'react-modal';
interface Cat {
  _id: string;
  name: string;
  age: number;
  breed: string;
}
let displayNone = {
  display: 'none',
};
export default function MongoCat() {
  const [catname, setCatname] = useState('');
  const [catage, setCatage] = useState('');
  const [catbreed, setCatbreed] = useState('');
  const [catList, setCatList] = useState([]);
  const [catSearchName, setCatSearchName] = useState('');
  const [catSearchData, setCatSearchData] = useState<Cat>({
    _id: '',
    name: '',
    age: 0,
    breed: '',
  });
  const [updateCatId, setUpdateCatId] = useState('');
  const [updateCatName, setUpdateCatName] = useState('');
  const [updateCatAge, setUpdateCatAge] = useState(0);
  const [updateCatBreed, setUpdateCatBreed] = useState('');

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
    //고양이 정보 입력
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

  const handleChangeCatAge = (e: React.ChangeEvent<HTMLInputElement>) => {
    //고양이 age가 숫자가 아니면 입력 불가능
    const value = e.target.value;
    if (!isNaN(Number(value))) {
      setCatage(value);
    }
  };

  const handleFindOne = async () => {
    // 한마리만 조회하는 메소드.
    //이름 기준으로 검색이 가능하나 중복된 값은 맨 처음 하나만 출력됨.
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
          console.log(data);
          setCatSearchData(data);
          setUpdateCatId(data._id);
          setUpdateCatName(data.name);
          setUpdateCatAge(data.age);
          setUpdateCatBreed(data.breed);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error('조회 중 에러 발생.', error);
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 초기 데이터 조회
    loadCats();
  }, []);

  const handleUpdateCat = async () => {
    try {
      const response = await fetch(`/cats/${updateCatId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: updateCatId,
          name: updateCatName,
          age: updateCatAge,
          breed: updateCatBreed,
        }),
      });
      if (response.ok) {
        console.log('수정 성공');
        setCatSearchName(updateCatName);
        loadCats(); // 수정 후 고양이 정보 다시 조회
      } else {
        console.error('수정 실패');
      }
    } catch (error) {
      console.error('수정 중 에러 발생.', error);
    }
  };
  const handleDeleteCat = async () => {
    try {
      fetch(`/cats/${updateCatId}`, {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
      }).then((response) => {
        if (response.ok) {
          console.log('삭제성공');
          loadCats();
        } else {
          console.error(
            '삭제 실패',
            response.status + '+' + response.statusText,
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
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
          type="number"
          placeholder="나이를 입력해주세요"
          value={catage}
          onChange={handleChangeCatAge}
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
        <span style={displayNone}>{catSearchData._id}</span>
        <span>
          {catSearchData.name},{catSearchData.age},{catSearchData.breed}
          <br />
        </span>
      </p>
      <h1>고양이 정보 수정</h1>
      <input
        type="text"
        value={updateCatId}
        onChange={(e) => setUpdateCatId(e.target.value)}
        style={displayNone}
      />
      <input
        type="text"
        value={updateCatName}
        onChange={(e) => setUpdateCatName(e.target.value)}
      />
      <input
        type="number"
        value={updateCatAge}
        onChange={(e) => setUpdateCatAge(Number(e.target.value))}
      />
      <input
        type="text"
        value={updateCatBreed}
        onChange={(e) => setUpdateCatBreed(e.target.value)}
      />
      <button onClick={handleUpdateCat}>수정</button>
      <button onClick={handleDeleteCat}>삭제</button>
    </>
  );
}
