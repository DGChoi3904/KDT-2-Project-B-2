import axios from 'axios';

export async function getMapData(location: string): Promise<any> {
  try {
    const response = await axios.get('/maps/data', {
      params: {
        location,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
