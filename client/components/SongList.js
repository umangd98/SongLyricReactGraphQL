import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchSongs from '../queries/fetchSongs';

class SongList extends Component {
  onDelete(id) {
    this.props
      .mutate({
        variables: { id },
      })
      .then(() => this.props.data.refetch());
  }
  renderSongs() {
    return this.props.data.songs.map((song) => {
      return (
        <li className="collection-item" key={song.id}>
          <Link to={`/songs/${song.id}`}>{song.title}</Link>
          <i className="material-icons" onClick={() => this.onDelete(song.id)}>
            delete
          </i>
        </li>
      );
    });
  }
  render() {
    console.log(this.props);
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <ul className="collection">{this.renderSongs()}</ul>
          <Link className="btn-floating btn-large red right" to="/create">
            <i className="material-icons">add</i>
          </Link>
        </div>
      );
    }
  }
}
const query = fetchSongs;

const mutation = gql`
  mutation deleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;
export default graphql(mutation)(graphql(query)(SongList));
