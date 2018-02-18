/*
  Track

*/
import React from 'react'; 
import ReactHowler from 'react-howler'; 

var Track = React.createClass({
  updateDocument(item){
    var host = 'http://localhost:8888';
    var vaultEndpoint = '/selekta/api/RunAPI.php/update-doc/';

    var reqBody = {'document': item, 'new-selection-name': 'selection-v11', 'new-structure': ['new','tracks']};  
    console.log(item); 

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
  },
  componentDidMount(){ 
  //
  },
  handleClick(event) { 
    event.target.parentNode.classList.toggle("-collapsed"); 
  },
  handleClickDetails(item){
    var filepath = 'http://localhost:8888/selekta/music-vault/' + item.fileName;
    this.props.audioservice.setSrc(filepath); 
    console.log(this.props.audioservice.getState());
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
            <li>
              <input name="new-selection-name"></input>
              <button type="submit" name="new-selection" onClick={() => this.updateDocument(this.props.item)}>add to selection</button>
            </li>
          </ul>
        </div>
      </div>)
  } 
});

export default Track; 
//{this.props.item.structure[name].map(key =>{ return(<li>{key}</li>)})}