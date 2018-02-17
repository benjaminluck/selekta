/*
  App

*/
import React from 'react'; 
import ReactHowler from 'react-howler'; 
import TrackCollection from './TrackCollection'; 
import AudioPlayer from './AudioPlayer'; 
import AudioService from './AudioService';
import TopNavigation from './TopNavigation';

var Vault = React.createClass({
  componentWillMount(){
    var host = 'http://localhost:8888';
    var vaultEndpoint = '/selekta/api/RunAPI.php/vault';
    this.audioservice = new AudioService(this);

    this.setState({ 
      list: {},
      audioPlayer: {
        src: 'http://localhost:8888/selekta/music-vault/108%20The%20Orb%20(ft.%20Lee%20Scratch%20Perry)%20-%20Hold%20Me%20Upsetter.mp3'
      }
    });    

    var xhr = new XMLHttpRequest();
    xhr.open("GET", host + vaultEndpoint, true);
    xhr.onload = function(e){
      if (xhr.readyState === 4){
        if (xhr.status === 200){
          var list = JSON.parse(xhr.response); 
          this.setState({ 
            list: list,
            numItems: list.length
          })
        } else {
          console.error(xhr.statusText); 
        }
      }
    }.bind(this);
    xhr.onerror = function(e){
      console.error(xhr.statusText); 
    }    
    xhr.send(null);
  }, 
  componentDidMount(){
  // 
  },
  render : function(){
    return (
      <div>
        <div className="container">
          <header>  
            <TopNavigation/>   
            <h1>Vault</h1> 
          </header> 
            <AudioPlayer audioservice={this.audioservice}/> 
            <TrackCollection audioservice={this.audioservice} list={this.state.list}/>
        </div>
      </div>
    )
  } 
});

export default Vault;