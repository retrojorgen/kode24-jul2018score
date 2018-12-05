import React, { Component } from 'react';
import styled from 'styled-components';
import { getUserScore, getFolderScore } from '../api/FileSystem';

const PageWrapper = styled.div`
  td,
  th {
    padding: 10px;
    text-align: left;
    font-size: 20px;
  }
  th {
    border-bottom: 2px solid green;
  }
  .limit {
  
  }

  button {
    display: block;
    background-color: #0dff00;
    color: black;
    border: 0;
    border-radius: 2px;
    width: 100%;
    padding: 10px 20px;
  }

  .col {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
  }

  .scores {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    margin: 0 auto;
    text-align: center;
    .votes {
      margin: 0 40px 0 40px;
    }
  }

  .winnerpopup {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: hidden;
    font-size: 40px;
    .winner {
      background-color: black;
      border-radius: 4px;
      padding: 20px;
    }
    &.active {
      visibility: visible;
    }
  }
  
`;

class Master extends Component {

  state = {
    users: [],
    folders: [],
    winner: {
      username: "",
      email: "",
      show: false
    }
  };
  
  componentDidMount () {
    getUserScore((users) => {
      this.setState({
        users: users
      })
    })
    getFolderScore((folders) => {
      this.setState({
        folders: folders
      })
    })
  }

  pickWinner(folder) {
    var winner = folder.answers[Math.floor((Math.random() * folder.answers.length-1) + 0)];
    this.setState({
      winner: {
        username: winner.username,
        email: winner.email,
        show: true
      }
    })
  }

  render () {
    let users = this.state.users; 
    let folders = this.state.folders;
    console.log(folders);
    return (
      <PageWrapper>

        <div className={`winnerpopup ${this.state.winner.show ? "active": ""}`}>

          <div className="winner">
            <p>Vinneren er: {this.state.winner.username}</p>
            <p>Contact at: {this.state.winner.email}</p>
            <button onClick={() => this.setState({winner: {username: "", email:"", show: false}})}>Lukk</button>
          </div>
        </div>
        <div className="header"></div>
        <div className="scores">
          {folders.map((folder, key) => (
            <div className="votes" key={key}>
              <table className="limit">
                <thead>
                <tr>
                  <th colSpan="3">
                    <h2>Mappe {folder.fullpath} svar: {folder.answers.length}</h2> 
                    <button onClick={() => this.pickWinner(folder)}>Trekk vinner!</button>
                  </th>
                </tr>
                <tr>
                  <th>#</th>
                  <th>username</th>
                </tr>
                </thead>
                <tbody>
                
                  {folder.answers && folder.answers.map((answer, key) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{answer.username}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
          )}
          </div>
      </PageWrapper>
      
    )
  }

}

export default Master;