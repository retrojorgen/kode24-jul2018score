import React, { Component } from 'react';
import styled from 'styled-components';
import { getUserScore, getFolderScore } from '../api/FileSystem';

const PageWrapper = styled.div`
  td,
  th {
    padding: 10px;
    text-align: left;
  }
  th {
    border-bottom: 2px solid green;
  }
  .limit {
    tr:nth-child(1n+10) {
      display: none;
    }
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
  }
  
`;

class Master extends Component {

  state = {
    users: [],
    folders: []
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

  render () {
    let users = this.state.users; 
    let folders = this.state.folders;
    console.log(folders);
    return (
      <PageWrapper>
        <div class="header"></div>
        <div class="scores">
          <div class="col">
            <h2>antall brukere: {users.length}</h2>
            <table class="highscore">
              <thead>
                <tr>
                <th>#</th><th>Score</th><th>Username</th><th>email</th>
                </tr>
              </thead>
              <tbody>
              {users.map((user, key) => (
                <tr>
                  <td>{key+1}</td><td>{user.aggregatedAnswerCount}</td><td>{user.username}</td><td>{user.email}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>

          <div class="col">
          {folders.map((folder) => (
            <table class="limit">
              <thead>
              <tr>
                <th colspan="3">
                  <h2>Mappe {folder.fullpath} svar: {folder.answers.length}</h2> 
                </th>
              </tr>
              <tr>
                <th>#</th>
                <th>username</th>
                <th>email</th>
              </tr>
              </thead>
              <tbody>
              
                {folder.answers && folder.answers.map((answer, key) => (
                  <tr>
                    <td>{key}</td>
                    <td>{answer.username}</td>
                    <td>{answer.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
          )}
          </div>
        </div>
      </PageWrapper>
      
    )
  }

}

export default Master;