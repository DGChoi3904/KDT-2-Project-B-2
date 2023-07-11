export async function loadWayPoint(data: any) {
  const response = await fetch(`my-way-points/${data}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log('GET 응답: ', response);
  return response;
}