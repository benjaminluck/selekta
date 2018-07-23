/*
  TrackCollection

*/
import React from 'react';  
import Track from './Track'; 

var TrackInformation = React.createClass({
  componentWillMount(){
    this.state = {
      newSelectionName: '',
      newTags: []
    };
  }, 
  componentDidMount(){ 
    //
    let track = this.props.audioservice.getState().Track;
      if(track.tags){
        this.setState({ newTags: track.tags});
      }
    },
  updateDocument(type, item){
    var host = 'http://localhost:8888';
    var vaultEndpoint = '/selekta/api/RunAPI.php/update-doc/';

    var newTags = [];
    var newSelection = [];
    var newSelectionName = '';

    switch(type){
      case 'selection':
        newSelection = this.state.newSelectionName.split('/');
        newSelectionName = newSelection[0];
        newSelection.shift(); 
    
        if(typeof(newSelection[0]) === undefined){
          newSelection = [];
        }
        
         
      break;
      case 'tags':
        newTags = this.state.newTags.split(',');
        newTags = newTags.map(function(s) { return s.trim() });

        if(typeof(newTags[0]) === undefined){
          newTags = [];
        }

      break;
    }

    var reqBody = {'document': item, 'new-selection-name': newSelectionName, 'new-structure': newSelection, 'new-tags': newTags}; 
    var xhr = new XMLHttpRequest();
    xhr.open("POST", host + vaultEndpoint, true);
    xhr.onload = function(e){
      if (xhr.readyState === 4){
        if (xhr.status === 200){
          var res = JSON.parse(xhr.response);  
          console.log(res);
        } else {
          console.error(xhr.statusText); 
        }
      } 
    }.bind(this);
    xhr.onerror = function(e){
      console.error(xhr.statusText); 
    }    
    xhr.send(JSON.stringify(reqBody));
  },
  handleChange(e) {
    console.log(e);
    switch(e.target.name){
      case 'new-selection':
        this.setState({ newSelectionName: e.target.value });
      break;
      case 'add-tag': 
        this.setState({ newTags: e.target.value });
      break; 
    }
    
  },
  componentDidUpdate(){
    var track = this.props.audioservice.getState().Track;
    console.log( track.tags);  

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
            <div className="tags-list">
              { track.tags ? Object.keys(track.tags).map(i => {
                return (<span className="ti">
                    {track.tags[i]} 
                  </span>); 
              }) : ''} 
            </div>
            <div>
                { track.structure ? Object.keys(track.structure).map(name => {
                  return (<ul>
                      {name} 
                      {track.structure[name].map(key =>{ return(<li>{key}</li>)})}
                    </ul>); 
                }) : ''} 
            </div>
          </div>
          <div className="track-action-block">
            <div> 
                <input type="text" name="new-selection" onChange={ this.handleChange } value={this.state.newSelectionName}></input>
                <button type="submit" name="new-selection-btn" onClick={() => this.updateDocument('selection',track)}>add to selection</button>
            </div>
            <div> 
                <input type="text" name="add-tag" onChange={ this.handleChange } value={this.state.newTags}></input>
                <button type="submit" name="add-tag-btn" onClick={() => this.updateDocument('tags', track)}>add tag</button>
            </div>
          </div>
        </div>
      )  
  } 
});

export default TrackInformation;
 // {this.props.list.map(this.renderTrack())}  