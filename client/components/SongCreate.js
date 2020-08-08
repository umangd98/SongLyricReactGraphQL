import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
import query from '../queries/fetchSongs';
class SongCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '' };
  }
  onSubmit(e) {
    e.preventDefault();
    // console.log(this.props);
    this.props
      .mutate({
        variables: {
          title: this.state.title,
        },
        refetchQueries: [{ query }],
      })
      .then(() => hashHistory.push('/'));
  }
  render() {
    return (
      <div className="container">
        <Link to="/" className="btn">
          Back
        </Link>
        <h2>Create Song!</h2>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label htmlFor="">Song Title</label>
          <input
            onChange={(e) => this.setState({ title: e.target.value })}
            value={this.state.title}
          />
        </form>
      </div>
    );
  }
}
const mutation = gql`
  mutation addSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
