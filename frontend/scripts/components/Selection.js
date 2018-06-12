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
          switch(structure){
            case 'unstructured':
              list = list;
            break;
            case 'structured':
              list = list[selection];
            break;
          }
          console.log(list); 
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
      <div className="container">
          <header>  
            <TopNavigation/>   
            <h1>{this.props.params.selection}</h1> 
          </header> 
            <div className="row">
              <TrackCollection audioservice={this.audioservice} list={this.state.list}/>
              <TrackInformation audioservice={this.audioservice}/>
            </div>
            <AudioPlayer audioservice={this.audioservice}/> 
      </div>
    )
  } 
});

export default Selection;