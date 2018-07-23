/*
  App

*/
import React from 'react'; 
import ReactHowler from 'react-howler'; 
import TrackCollection from './TrackCollection'; 
import AudioPlayer from './AudioPlayer'; 
import AudioService from './AudioService';
import TopNavigation from './TopNavigation';
import TrackInformation from './TrackInformation';

var Vault = React.createClass({
  componentWillReceiveProps(){
    console.log("UPDATE!!");
    var host = 'http://localhost:8888';
    var vaultEndpoint = '/selekta/api/RunAPI.php/vault';
    var tags = this.props.params.tags; 
    var xhr = new XMLHttpRequest();
    var url = host + vaultEndpoint;
    if(tags && tags.length){
      url = url + '/' + tags; 
    }
    xhr.open("GET", url, true);
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
  componentWillMount(){
    var host = 'http://localhost:8888';
    var vaultEndpoint = '/selekta/api/RunAPI.php/vault';
    var tags = this.props.params.tags; 
    console.log(tags);

    this.audioservice = new AudioService(this);

    this.setState({ 
      list: {},
      audioPlayer: {
        src: 'http://localhost:8888/selekta/music-vault/108%20The%20Orb%20(ft.%20Lee%20Scratch%20Perry)%20-%20Hold%20Me%20Upsetter.mp3'
      }
    });    

    var xhr = new XMLHttpRequest();
    var url = host + vaultEndpoint;
    if(tags && tags.length){
      url = url + '/' + tags; 
    }
    xhr.open("GET", url, true);
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
          <div className="row">
            <TrackCollection audioservice={this.audioservice} list={this.state.list}/>
            <TrackInformation audioservice={this.audioservice}/>
          </div>
          <AudioPlayer audioservice={this.audioservice}/> 
        </div>
      </div>
    )
  } 
});

export default Vault;