import React from 'react';
type SearchPageNumberButtonProps = {
  pageNumber: number;
  numberList: (pageNumber: number) => void;
};
class SearchPageNumberButton extends React.Component<SearchPageNumberButtonProps> {
  constructor(props: SearchPageNumberButtonProps) {
    super(props);
  }
  render() {
    return (
      <button
        key={this.props.pageNumber}
        onClick={() => this.props.numberList(this.props.pageNumber)}
        style={{
          marginRight: '5px',
          backgroundColor: '#FFA41B',
          borderStyle: 'thin',
          borderRadius: '5px',
          margin: '0 2px',
          width: '20px',
        }}
      >
        {this.props.pageNumber}
      </button>
    );
  }
}

export default SearchPageNumberButton;
