import './App.css';
import { Component } from 'react';
import { Subject } from './Subject';
import { TOC } from './TOC';
import ReadContent from './ReadContent';
import Control from './Control';
import CreateContent from './CreateContent';
import UpdateContent from './UpdateContent';

//클래스 방식으로 사용(App)
class App extends Component {

  //props : 부모컴포넌트 -> 자식 컴포넌트
  constructor(props) {
    super(props);
    this.state = {
      Subject: { title: 'WEB', sub: 'World wide Web' },
      contents: [ //id는 고유값
        { id: 1, title: 'HTML', desc: 'HTML is for information.' },
        { id: 2, title: 'CSS', desc: 'CSS is for design.' },
        { id: 3, title: 'JavaScript', desc: 'JavaScript is for interactive.' }
      ], //welcome모드 완성
      mode: 'Welcome',
      welcome: { title: 'Welcome', desc: 'Hello, React' }
    }
  }

  //함수로 생성
  //조회와 수정 컴포넌트가 공통으로 사용하기 위해 사용(여러번 호출되어서)
  findContentById() {
    // 선택된 요소(html,css,js)의 id에 해당하는 객체(contents) 찾기
    let content;
    for (let i = 0; i < this.state.contents.length; i++) {
      if (this.state.id === this.state.contents[i].id) {
        content = this.state.contents[i];
        break;
      }
    }
    return content;
  }

  render() { //JSX
    let title, desc
    let article;
    if (this.state.mode == 'Welcome') {
      title = this.state.welcome.title;
      desc = this.state.welcome.desc; //마지막에 출력

    //-------Udapte---------
    } else if(this.state.mode === 'update') {
      const content =
      this.findContentById();
      title = content.title;
      desc = content.desc;
      article = <UpdateContent title={title} desc={desc}
        onSubmit={function (title, desc) {
          content.title = title;
          content.desc = desc;
          this.setState({ mode: 'read' });
        }.bind(this)}></UpdateContent>

    //-------Read---------
    }else if(this.state.mode == 'read'){
      const content = this.findContentById();
      title = content.title;
      desc = content.desc;

    //-------Create---------
    } else if(this.state.mode == 'create'){ //create선택시 form요소 출력
      //입력값을 contents에 추가함
      article = <CreateContent
        onSubmit={function (title, desc) {
          console.log(title, desc);
          this.state.contents.push({
            id: this.state.contents.length + 1,
            title: title,
            desc: desc
          });
          //핵심코드
          this.setState({
            contents: this.state.contents
          })
        }.bind(this)}
      ></CreateContent>
    }

    return (
      <div className="App">
        <Subject
          title={this.state.Subject.title}
          sub={this.state.Subject.sub}> </Subject>
        <Subject
          title={this.state.Subject.title}
          sub={this.state.Subject.sub}> </Subject>

        {/* 하위 컴포넌트에서 state의 값 변경 */}
        <TOC onChangePage={
          (vaule) => 
            { this.setState({ id: vaule , mode : 'read'}
              ); 
          }
        } contents={this.state.contents}>
        </TOC>

        {/* 컨트롤이 선택한 값에 따라 화면이 변경될 수 있게 변경 */}
        <Control onChangeMode={function (mode) {
          if (mode === 'delete') {
            const contents = this.state.contents;
            //delete 눌렀을때 뜨는 창
            if (window.confirm('really?')) {
              for (let i = 0; i < contents.length; i++) {
                if (contents[i].id === this.state.id) {
                  contents.splice(i, 1);
                }
              }
            }
            this.setState({
              mode: 'welcome', contents: contents
            });
          } else {
            this.setState({ mode: mode });
          }
        }.bind(this)}></Control>
        
        {/*value를 풀어 쓴 코드
            (html) => {this.setState({mode : html}) }
            }contents={this.state.contents}
            onChangePage = {
            (css) => {this.setState({mode : css}) }
            }contents={this.state.contents}
            onChangePage = {
            (js) => {this.setState({mode : js}) }
            }contents={this.state.contents}>  */}

        {/* 조회와 수정 컴포넌트에서 title desc를 공통으로 사용 */}
        <ReadContent title={title} desc={desc}> </ReadContent>

        {article}
      </div>
        
    );
  }
}

// 함수를 이용한 작성방법
// function App() {
//   return (
//     //얘는 HTML이 아니고 JSX임
//     <div className="App">
//       {/*classname이라는것은 html엔 없다*/}
//       <table border = '1'>
//           <tr>
//             <td>1</td><td>2</td>
//           </tr>
//       </table>
//     </div>
//   );
// }


//defalut가 있으니 중괄호 안써도 됨
export default App;
