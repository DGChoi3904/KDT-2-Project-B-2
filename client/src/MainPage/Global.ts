type global = {
  isSearchingStart: boolean;
  isSearchingEnd: boolean;
  isSearchingSavedWay: boolean;
  startPoint: [number, number];
  endPoint: [number, number];
  wayPoint: number[];
};

const globalVar: global = {
  isSearchingStart: false,
  isSearchingEnd: false,
  isSearchingSavedWay: false,
  startPoint: [0, 0],
  endPoint: [0, 0],
  wayPoint: [],
};

export default globalVar;
