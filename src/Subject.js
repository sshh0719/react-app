import { Component } from 'react';

class Subject extends Component {
  render() {
    return (
      <header>
        <h1>
          {/* 온클릭사용 */}
          <a href='e' onClick={(e) => {
            alert('hello');
            //클릭해도 아무런 일 일어나지 않게
            e.preventDefault();
          }}>
            {this.props.title}
          </a>
        </h1>
        {this.props.sub}
      </header>
    );
  }
}
  //서브젝트 뱉어내기
  export {Subject};