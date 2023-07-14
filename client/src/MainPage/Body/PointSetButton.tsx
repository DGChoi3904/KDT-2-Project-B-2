import React from 'react';

type Place = {
  id: string;
  name: string;
  x: number;
  y: number;
};
type PointSetButtonProps = {
  handleSelectPlace: (place: Place) => void;
  setKeyword: (keyword: string) => void;
  place: Place;
  color: string;
  children: React.ReactNode | string | undefined | null;
};

class PointSetButton extends React.Component<PointSetButtonProps> {
  constructor(props: PointSetButtonProps) {
    super(props);
  }

  render() {
    return (
      <button
        onClick={() => {
          this.props.handleSelectPlace(this.props.place);
          this.props.setKeyword(this.props.place.name);
        }}
        style={{ color: this.props.color }}
      >
        {this.props.children}
      </button>
    );
  }
}

export default PointSetButton;
