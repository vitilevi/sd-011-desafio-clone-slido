import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Perguntas from './Components/Perguntas';
import Respondidas from './Components/Respondidas';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receivedQuestions: [],
    }
    this.handleArchive = this.handleArchive.bind(this);
  }

  handleArchive(resp) {
    this.setState((state) => ({
      receivedQuestions: [...state.receivedQuestions, ...resp],
    }));
  }

  render() {
    const { receivedQuestions } = this.state;
    return (
      <BrowserRouter>
        <div className="App">
          <header>
            <h1>Desli.go</h1>
          </header>
          <div className="main-button">
            <Link className="button btn btn-dark" to="/">Home</Link>
            <Link className="button btn btn-dark" to="/respondidas">Respondidas</Link>
          </div>
          <div>
            <Switch>
              <Route path="/respondidas">
                <Respondidas receivedQuestions={receivedQuestions} />
              </Route>
              <Route exact path="/">
                <Perguntas archive={this.handleArchive} />
              </Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
