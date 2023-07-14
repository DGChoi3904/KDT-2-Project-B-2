import React from 'react';
import SearchPageNumberButton from './SearchPageNumberButton';

type PageListProps = {
  totalList: number;
  numberList: (pageNumber: number) => void;
};

class PageList extends React.Component<PageListProps> {
  constructor(props: PageListProps) {
    super(props);
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '10px',
        }}
      >
        {Array.from(
          { length: this.props.totalList },
          (_, index) => index + 1,
        ).map((pageNumber) => (
          <SearchPageNumberButton
            pageNumber={pageNumber}
            numberList={this.props.numberList}
          />
        ))}
      </div>
    );
  }
}

export default PageList;
