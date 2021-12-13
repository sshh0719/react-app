import { Component } from 'react';

//클래스 방식
class TOC extends Component {
  render() {
  
    //반복문
    let list = [];
    for(let i=0; i<this.props.contents.length; i++) {
      list.push( <li><a href={ this.props.contents[i].id + '.html'}
                    onClick={(e) => {
                      this.props.onChangePage(this.props.contents[i].id);
                      e.preventDefault(); 
                    }}>
                    {this.props.contents[i].title}   
                  </a></li>);//JSX
    }

    return (
      <nav>
        <ul> {list} </ul>
      </nav>
    );
  }
}

export {TOC};