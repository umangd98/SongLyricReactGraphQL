import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import fetchSong from '../queries/fetchSong';
import { Link } from 'react-router';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';
class SongDetail extends Component {
  render() {
    const { song } = this.props.data;
    // console.log(this.props.data.song.lyrics);
    if (!song) {
      return <div className="container">Loading...</div>;
    } else {
      return (
        <div className="container">
          <Link to="/" className="btn">
            Back
          </Link>
          <h3>{song.title}</h3>
          <LyricList lyrics={song.lyrics} />
          <LyricCreate id={this.props.params.id} />
        </div>
      );
    }
  }
}

export default graphql(fetchSong, {
  options: (props) => {
    return { variables: { id: props.params.id } };
  },
})(SongDetail);

// fetchSong
