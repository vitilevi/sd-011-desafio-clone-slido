import React, { Component } from 'react';
import Form from './Form';

export default class Perguntas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: {},
      receivedQuestions: [],
      numberOfQuestions: 0,
      checked: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.updateVote = this.updateVote.bind(this);
    this.handleArchive = this.handleArchive.bind(this);
    this.checked = this.checked.bind(this);
    this.sortList = this.sortList.bind(this);
  }

  handleChange(info) {
    const { receivedQuestions } = this.state;
    const id = (receivedQuestions.length === 0) ? 1 : (receivedQuestions.length) + 1;
    const completeInfo = { ...info, id }
    this.setState((state) => {
      return ({
        questions: completeInfo,
        numberOfQuestions: state.numberOfQuestions + 1,
        receivedQuestions: [...state.receivedQuestions, completeInfo],
      })
    });
  }

  checked(value) {
    this.setState({
      checked: value,
    })
    this.sortList(value)
  }

  sortList(value) {
    const { receivedQuestions } = this.state;
    if (value) {
      const sorted = receivedQuestions.sort((a, b) => b.votes - a.votes);
      this.setState({
        receivedQuestions: sorted,
      })
    } else {
      const sorted = receivedQuestions.sort((a, b) => a.votes - b.votes);
      this.setState({
        receivedQuestions: sorted,
      })
    }
  }

  updateVote({ target }) {
    const id = Number(target.parentNode.parentNode.firstChild.innerText);
    const { receivedQuestions, checked } = this.state;
    const arrClone = [...receivedQuestions];
    const filterEle = arrClone.filter(quest => quest.id === id);
    const objFiltered = arrClone.filter(quest => quest.id !== id);
    filterEle[0].votes += 1;
    if (checked) {
      const obj = [...objFiltered, ...filterEle].sort((a, b) => b.votes - a.votes);
      this.setState({
        receivedQuestions: obj,
      });
    } else {
      const obj = [...objFiltered, ...filterEle].sort((a, b) => a.id - b.id);
      this.setState({
        receivedQuestions: obj,
      });
    }
  }

  handleArchive({ target }) {
    const { receivedQuestions } = this.state;
    const { archive } = this.props;
    const id = Number(target.parentNode.parentNode.firstChild.innerText);
    const arrClone = [...receivedQuestions];
    const filterEle = arrClone.filter(quest => quest.id === id);
    const objFiltered = arrClone.filter(quest => quest.id !== id);
    archive(filterEle);
    const result = objFiltered.sort((a, b) => a.id - b.id);
    this.setState({
      receivedQuestions: result
    });
  }

  render() {
    const { receivedQuestions } = this.state;
    return (
      <div className="body">
        <div className="form">
          <Form popular={this.checked} onChange={this.handleChange} />
        </div>
        <div>
          {receivedQuestions.map(({ name, question, votes, id }, i) => (
            <div className="question" key={i}>
              <div className="id">
                {id}
              </div>
              <div className="question-content">
                <div>
                  <p className="fw-light">Nome: {name}</p>
                </div>
                <div>
                  <p className="">{question}</p>
                </div>
              </div>
              <div className="question-btn">
                <span>Votes: {votes}</span>
                <button className="button-ques btn btn-secondary" onClick={this.updateVote}>Up</button>
                <button className="button-ques btn btn-secondary" onClick={this.handleArchive}>Arquivar</button>
              </div>
            </div>)
          )}
        </div>
      </div>
    );
  }
}
