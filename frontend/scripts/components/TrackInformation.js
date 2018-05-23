/*
  TrackCollection

*/
import React from 'react';  
import Track from './Track'; 

var TrackInformation = React.createClass({
  componentWillMount(){
    //
  }, 
  render : function(){
    var list = this.props.list;
    var track = this.props.audioservice.getState().Track;
    return ( 
        <div className='col-xs-4'>
          <div className='track-information-block'>
            <div className="title">{track.title}</div>
            <div className="item">{track.artist}</div>
            <div className="item">{track.bpm}</div>
            <div className="item">{track.key}</div>
            <div className="item">{track.ext}</div>
            <div className="item">{track.date_added}</div>
            <div className="item">{track.hash}</div>
            <div><br/></div>
            <div>
              { track.tags ? Object.keys(track.tags).map(i => {
                return (<span>
                    {track.tags[i]}, 
                  </span>); 
              }) : ''} 
            </div>
          </div>
        </div>
      )  
  } 
});

export default TrackInformation;
 // {this.props.list.map(this.renderTrack())}  