import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
class LyricList extends Component {
  onLike(id, likes) {
    console.log(id);
    this.props.mutate({
      variables: {
        id: id,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id: id,
          __typename: 'LyricType',
          likes: likes + 1,
        },
      },
    });
  }
  renderLyrics() {
    return this.props.lyrics.map((lyric) => {
      return (
        <li className="collection-item" key={lyric.id}>
          {lyric.content}
          <div className="vote-box">
            <i
              onClick={() => this.onLike(lyric.id, lyric.likes)}
              className="material-icons"
            >
              thumb_up
            </i>
            {lyric.likes}
          </div>
        </li>
      );
    });
  }
  render() {
    return (
      <div>
        <ul className="collection">{this.renderLyrics()}</ul>
      </div>
    );
  }
}

const mutation = gql`
  mutation likeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;
export default graphql(mutation)(LyricList);
