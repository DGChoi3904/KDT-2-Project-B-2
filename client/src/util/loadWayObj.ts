interface MyWayData {
  end: string;
  start: string;
  userId: string;
  wayName: string;
  wayPoints: string[];
  __v: number;
  _id: string;
}

export async function loadWayPoint(data: any) {
  const response: any = await fetch(`my-way-points/${data}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const jsonResponse: MyWayData[] = await response.json();
  console.log('GET 응답: ', jsonResponse);
  return jsonResponse;
}