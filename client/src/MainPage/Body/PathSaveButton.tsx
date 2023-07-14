import React from 'react';

type PathSaveButtonProps = {
  openModal: () => void;
};

class PathSaveButton extends React.Component<PathSaveButtonProps> {
  constructor(props: PathSaveButtonProps) {
    super(props);
  }

  render() {
    return (
      <button
        onClick={this.props.openModal}
        style={{ padding: '5px', marginLeft: '5px' }}
      >
        경로 저장
      </button>
    );
  }
}

export default PathSaveButton;
