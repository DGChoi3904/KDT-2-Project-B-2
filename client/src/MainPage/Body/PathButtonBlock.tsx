import React, { MouseEventHandler } from 'react';
import PathSaveButton from './PathSaveButton';
import PathSearchButton from './PathSearchButton';

type PathButtonBlockProps = {
  waySaveBtn: boolean;
  openModal: () => void;
  handleDefaultSearch: MouseEventHandler;
};

class PathButtonBlock extends React.Component<PathButtonBlockProps> {
  constructor(props: PathButtonBlockProps) {
    super(props);
  }

  render() {
    return (
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          bottom: '10px',
          right: '10px',
          zIndex: '2',
        }}
      >
        {this.props.waySaveBtn ? (
          <PathSaveButton openModal={this.props.openModal} />
        ) : (
          <div></div>
        )}
        <PathSearchButton
          handleDefaultSearch={this.props.handleDefaultSearch}
        />
      </div>
    );
  }
}

export default PathButtonBlock;
