import React, { MouseEventHandler } from 'react';
type PathSearchButtonProps = {
  handleDefaultSearch: MouseEventHandler;
};
function PathSearchButton({ handleDefaultSearch }: PathSearchButtonProps) {
  return (
    <button
      onClick={handleDefaultSearch}
      style={{ padding: '5px', marginLeft: '5px' }}
    >
      경로 안내
    </button>
  );
}

export default PathSearchButton;
