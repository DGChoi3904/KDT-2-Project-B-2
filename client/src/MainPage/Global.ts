interface global {
  isSearchingStart: boolean;
  isSearchingEnd: boolean;
  startPoint: [number, number];
  endPoint: [number, number];
  wayPoint: number[];
}

const globalVar: global = {
  isSearchingStart: false,
  isSearchingEnd: false,
  startPoint: [0, 0],
  endPoint: [0, 0],
  wayPoint: [],
};

export default globalVar;
