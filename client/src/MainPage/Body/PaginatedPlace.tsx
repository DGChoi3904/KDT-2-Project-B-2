import React from 'react';
import PointNameBlock from './PointNameBlock';
import PointPreviewButton from './PointPreviewButton';
import PointSetButton from './PointSetButton';

type Place = {
  id: string;
  name: string;
  x: number;
  y: number;
};
type PaginatedPlaceProps = {
  place: Place;
  handleSelectPlacePre: (place: Place) => void;
  handleSelectPlace: (place: Place) => void;
  handleSelectPlaceEnd: (place: Place) => void;
  handleSelectPlaceWay: (place: Place) => void;
  setKeyword: (keyword: string) => void;
};

class PaginatedPlace extends React.Component<PaginatedPlaceProps> {
  constructor(props: PaginatedPlaceProps) {
    super(props);
  }

  render() {
    return (
      <div
        key={this.props.place.id}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <PointNameBlock name={this.props.place.name} />
        <div style={{ display: 'flex' }}>
          <PointPreviewButton
            handleSelectPlacePre={this.props.handleSelectPlacePre}
            place={this.props.place}
            color={'black'}
            children={'미리보기'}
          />
          <PointSetButton
            handleSelectPlace={this.props.handleSelectPlace}
            setKeyword={this.props.setKeyword}
            place={this.props.place}
            color={'blue'}
            children={'출발지'}
          />
          <PointSetButton
            handleSelectPlace={this.props.handleSelectPlaceEnd}
            setKeyword={this.props.setKeyword}
            place={this.props.place}
            color={'red'}
            children={'목적지'}
          />
          <PointSetButton
            handleSelectPlace={this.props.handleSelectPlaceWay}
            setKeyword={this.props.setKeyword}
            place={this.props.place}
            color={'rgb(255, 164, 27)'}
            children={'경유지'}
          />
        </div>
      </div>
    );
  }
}

export default PaginatedPlace;
