/*
  AudioPlayer

*/
import React from 'react'; 
import ReactHowler from 'react-howler'; 

var AudioPlayer = React.createClass({
  componentWillMount(){
  }, 
  componentDidMount(){
  //
  },
  render : function(){
    //
    return (
     <div> 
      <div className="audioplayer-block"></div> 
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