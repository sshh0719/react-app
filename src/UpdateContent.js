import React, { Component } from 'react';
class UpdateContent extends Component {

    //form 요소의 값을 변경 할 때 규칙, 공식 외워야되는 내용
    constructor(props) {
        super(props);

        //한꺼번에 여러개를 담을 수 있는 형태
        //객체, 배열
        this.state = {
            title: this.props.title, //colon
            desc: this.props.desc
        };
    }

    render() {
        return (
            <article>
                <h2>Update Content</h2>
                <form action='/update_process' method='post'
                    onSubmit={function (e) {
                        e.preventDefault();
                        const title = e.target.title.value;
                        const desc = e.target.desc.value;
                        this.props.onSubmit(title, desc);
                    }.bind(this)}>
                        
                    <p><input type='text' name='title'
                        value={this.state.title}
                        //onChange
                        onChange={function (e) {
                            //입력되고 있는 글자(e.target.value)
                            this.setState({ title: e.target.value });
                        }.bind(this)}></input></p>

                    <p><textarea name='desc'
                        value={this.state.desc} onChange={function (e) {
                            this.setState({ desc: e.target.value });
                        }.bind(this)}></textarea></p>
                    <p><input type='submit'></input></p>
                </form>
            </article>
        )
    }
}
export default UpdateContent;