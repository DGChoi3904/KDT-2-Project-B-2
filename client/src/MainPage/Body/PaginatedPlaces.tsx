import React from 'react';
import PaginatedPlace from './PaginatedPlace';
import PageList from './PageList';
type Place = {
  id: string;
  name: string;
  x: number;
  y: number;
};
type PaginatedPlacesProps = {
  PaginatedPlacesArr: Place[];
  handleSelectPlace: (place: Place) => void;
  handleSelectPlaceEnd: (place: Place) => void;
  handleSelectPlacePre: (place: Place) => void;
  handleSelectPlaceWay: (place: Place) => void;
  setKeyword: (keyword: string) => void;
  totalList: number;
  numberList: (pageNumber: number) => void;
};

class PaginatedPlaces extends React.Component<PaginatedPlacesProps> {
  constructor(props: PaginatedPlacesProps) {
    super(props);
  }

  render() {
    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
        }}
      >
        {this.props.PaginatedPlacesArr.map((place, index) => (
          <PaginatedPlace
            place={place}
            handleSelectPlace={this.props.handleSelectPlace}
            handleSelectPlaceEnd={this.props.handleSelectPlaceEnd}
            handleSelectPlacePre={this.props.handleSelectPlacePre}
            handleSelectPlaceWay={this.props.handleSelectPlaceWay}
            setKeyword={this.props.setKeyword}
          />
        ))}
        <PageList
          totalList={this.props.totalList}
          numberList={this.props.numberList}
        />
      </div>
    );
  }
}

export default PaginatedPlaces;
