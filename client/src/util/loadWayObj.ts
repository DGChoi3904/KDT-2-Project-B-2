export async function loadWayPoint(data: any) {
  const response: any = await fetch(`my-way-points/${data}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const jsonResponse: object[] = await response.json();
  console.log('GET 응답: ', jsonResponse);
  return jsonResponse;
}