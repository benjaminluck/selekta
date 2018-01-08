/*
  App

*/
import React from 'react'; 
import ReactHowler from 'react-howler'; 
import TrackCollection from './TrackCollection'; 
import AudioPlayer from './AudioPlayer'; 
import AudioService from './AudioService';

var Selection = React.createClass({
  componentWillMount(){
    var selection = this.props.params.selection;
    var structure = this.props.params.structure;
    console.log(selection);
    console.log(structure); 
    var host = 'http://localhost:8888';
    var listEndpoint = '/selekta/api/RunAPI.php/list/'+ selection  +'/' + structure + '/';
    this.audioservice = new AudioService(this);

    this.setState({ 
      list: {},
      audioPlayer: {
        src: ''
      }
    });    

    var xhr = new XMLHttpRequest();
    xhr.open("GET", host + listEndpoint, true);
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
    console.log(this.testSv);
    return (
      <header>   
        <h1>List</h1>
          <AudioPlayer audioservice={this.audioservice}/> 
          <TrackCollection audioservice={this.audioservice} list={this.state.list}/>
      </header>
    )
  } 
});

export default Selection;