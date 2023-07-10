export async function createWayPoint(data: any) {
  const response = await fetch('/my-way-points', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}
