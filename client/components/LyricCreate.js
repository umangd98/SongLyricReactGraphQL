import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
import query from '../queries/fetchSongs';
class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { content: '' };
  }
  onSubmit(e) {
    e.preventDefault();
    this.props
      .mutate({
        variables: {
          content: this.state.content,
          id: this.props.id,
        },
      })
      .then(() => {
        this.setState({ content: '' });
      });
  }
  render() {
    return (
      <div>
        <form action="" onSubmit={this.onSubmit.bind(this)}>
          <label htmlFor="">Add a Lyric</label>
          <input
            type="text"
            onChange={(event) => this.setState({ content: event.target.value })}
            value={this.state.content}
          />
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation addLyricToSong($id: ID, $content: String) {
    addLyricToSong(content: $content, songId: $id) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;
export default graphql(mutation)(LyricCreate);
