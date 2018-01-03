/*
  TrackCollection

*/
import React from 'react';  
import Track from './Track'; 

var TrackCollection = React.createClass({
  componentWillMount(){
    this.props.updateAudioPlayerSrc('test.mp3');
  }, 
  renderTrack : function(val, key){
    var list = this.props.list;  
    return <Track updateAudioPlayerSrc={this.props.updateAudioPlayerSrc} item={list[key]}/>
  },
  render : function(){
    var list = this.props.list;
    return ( 
      <div class="list">  
      {Object.keys(list).map(this.renderTrack)}  
      </div>)  
  } 
});

export default TrackCollection;
 // {this.props.list.map(this.renderTrack())}  