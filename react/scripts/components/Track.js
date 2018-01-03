/*
  Track

*/
import React from 'react'; 
import ReactHowler from 'react-howler'; 

var Track = React.createClass({
  componentWillMount(){
  //
  },
  componentDidMount(){ 
  //
  },
  handleClick(event) { 
    event.target.parentNode.classList.toggle("-collapsed"); 
  },
  handleClickDetails(item){
    var src = 'http://localhost:8888/selekta/music-vault/' + item.fileName;
    this.props.updateAudioPlayerSrc(src);
  },
  render : function(){ 
    return (
      <div className="track-block -collapsed" key={this.props.item.hash}>
        <div className="title" onClick={this.handleClick}>
          { this.props.item.title }
        </div>
        <div className="details" onClick={() => this.handleClickDetails(this.props.item)}> 
          <ul> 
            <li>{ this.props.item.artist }</li>
            <li>BPM: { this.props.item.bpm }</li>
            <li>KEY: { this.props.item.key }</li>
            <li>
              <ul>
              { this.props.item.structure ? Object.keys(this.props.item.structure).map(name => {
                return (<ul>
                    {name}
                    {this.props.item.structure[name].map(key =>{ return(<li>{key}</li>)})}
                  </ul>);
              }) : ''} 
              </ul>
            </li>
          </ul>
        </div>
      </div>)
  } 
});

export default Track; 
