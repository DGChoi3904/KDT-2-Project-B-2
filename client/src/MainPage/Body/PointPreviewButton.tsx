import React from 'react';

type Place = {
  id: string;
  name: string;
  x: number;
  y: number;
};
type PointPreviewButtonProps = {
  handleSelectPlacePre: (place: Place) => void;
  place: Place;
  color: string;
  children: React.ReactNode | string | undefined | null;
};

class PointSetButton extends React.Component<PointPreviewButtonProps> {
  constructor(props: PointPreviewButtonProps) {
    super(props);
  }

  render() {
    return (
      <button
        onClick={() => {
          this.props.handleSelectPlacePre(this.props.place);
        }}
        style={{ color: this.props.color }}
      >
        {this.props.children}
      </button>
    );
  }
}

export default PointSetButton;
