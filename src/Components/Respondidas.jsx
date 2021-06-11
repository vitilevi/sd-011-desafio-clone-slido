import React, { Component } from 'react';

export default class Respondidas extends Component {
  render() {
    const { receivedQuestions } = this.props;
    return (
      <div>
        Perguntas arquivadas
        {receivedQuestions.map(({ name, question, votes, id }, i) => (
          <div className="question" key={i}>
            <div className="id">
              {id}
            </div>
            <div className="question-content">
              <div>
                <p>Nome: {name}</p>
              </div>
              <div>
                <p>Pergunta: {question}</p>
              </div>
            </div>
            <div className="question-btn">
              <span>Votes: {votes}</span>
            </div>
          </div>)
        )}
      </div>
    );
  }
}
