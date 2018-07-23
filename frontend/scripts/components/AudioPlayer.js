/*
  AudioPlayer

*/
import React from 'react'; 
import ReactHowler from 'react-howler'; 

var AudioPlayer = React.createClass({
  componentWillMount(){
    this.setState({
      position :0
    })
  }, 
  componentDidMount(){
    this.trackPosInterval = setInterval(
      () => this.setTrackPosition(),
      50
    );

  },
  setTrackPosition(){
    if(this.player){
      var duration = this.player.duration();
      var seek = this.player.seek();
      if(typeof(seek) === 'number'){
        var pos = (seek / duration * 100);
        this.setState({
          position : pos
        });
      }
    }
  },
  skipTo(){
    var duration = this.player.duration();
    var seek = this.player.seek();
    if(typeof(seek) === 'number'){
      var skipTo = seek + 15;
      this.player.seek(skipTo);
    }
  },
  render : function(){
    //
    return (
     <div className="audioplayer-block"> 
      <div className="player">
        <div className="information">
          <span className="title">{this.props.audioservice.getState().Track.artist}</span>
          <br/>
          <span>{this.props.audioservice.getState().Track.title}</span>
        </div>
        <div className="information">
          <span>{this.state.position}</span>
        </div>
        <div className="actions">
          <div className="item" onClick={this.skipTo}> SKIP </div>
        </div>
      </div> 
      <ReactHowler
        src={this.props.audioservice.getState().AudioService_Src}
        format={['mp3','aiff']}
        playing={true}
        html5={true}
        ref={(ref) => (this.player = ref)}
      /> 
     </div> 
    )
  } 
});

export default AudioPlayer;