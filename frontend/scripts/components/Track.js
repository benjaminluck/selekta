/*
  Track

*/
import React from 'react'; 
import ReactHowler from 'react-howler'; 

var Track = React.createClass({
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
  componentWillMount(){
  //
  this.state = {
    newSelectionName: '',
    newTags: []
  };

  },
  componentDidMount(){ 
  //
    if(this.props.item.tags){
      this.setState({ newTags: this.props.item.tags});
    }
  },
  handleClick(event) { 
    event.target.parentNode.classList.toggle("-collapsed"); 
  },
  handleClickDetails(item){
    var filepath = 'http://localhost:8888/selekta/music-vault/' + item.fileName;
    this.props.audioservice.setSrc(filepath); 
    this.props.audioservice.setTrack(item);
    console.log(this.props.audioservice.getState());
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
  timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes(); 
    var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;

    return time;
  },
  render : function(){ 
    return (
      <tr className="track-item">
        <td>
          <input type="checkbox"/> 
        </td>
        <td>
          <div className="track-block -collapsed" key={this.props.item.hash}>
            <div className="title" onClick={() => this.handleClickDetails(this.props.item)}>
              { this.props.item.artist } - { this.props.item.title }
            </div>
            <div className="details" onClick={() => this.handleClickDetails(this.props.item)}> 
              <ul> 
                <li>{ this.props.item.artist }</li>
                <li>BPM: { this.props.item.bpm }</li>
                <li>KEY: { this.props.item.key }</li>
                <li>Date Added: { this.timeConverter(this.props.item.date_added) }</li>
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
                <li>
                  <ul>
                  { this.props.item.tags ? Object.keys(this.props.item.tags).map(i => {
                    return (<ul>
                        <li>{this.props.item.tags[i]}</li>
                      </ul>); 
                  }) : ''} 
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </td>
        <td>
                  { this.props.item.bpm }
        </td>
        <td>
                  { this.props.item.key }
        </td>
      </tr>)
  } 
});

export default Track; 
//{this.props.item.structure[name].map(key =>{ return(<li>{key}</li>)})}