
import React, { Component } from 'react';
import YouTube from 'react-youtube';
import Sidebar from './CustomNavbar';

class Iframee extends Component {
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
      },
    };

    return (
      <>
      
      <YouTube videoId="fC7wSl2jrlw" opts={opts} onReady={this._onReady} />
      </>
    );
  }
}

export default Iframee;
