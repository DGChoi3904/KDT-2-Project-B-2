import React from 'react';

type PointNameBlockProps = {
  name: string;
};

class PointNameBlock extends React.Component<PointNameBlockProps> {
  constructor(props: PointNameBlockProps) {
    super(props);
  }

  render() {
    return (
      <div style={{ flex: '1' }}>
        <div style={{ textAlign: 'left' }}>{this.props.name}</div>
      </div>
    );
  }
}

export default PointNameBlock;
