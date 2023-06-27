import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class NaverMapsService {
  async getMapData(location: string): Promise<any> {
    // Call the Naver Map API and fetch data
    const response = await axios.get('https://api.example.com/maps', {
      params: {
        location,
      },
    });

    return response.data;
  }
}
