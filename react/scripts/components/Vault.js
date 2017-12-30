/*
  Vault

*/
import React from 'react'; 

var Vault = React.createClass({
  componentDidMount(){
    var host = 'http://localhost:8888';
    var vaultEndpoint = '/selekta/api/RunAPI.php/vault';

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
  renderList: function(){ 
    var self = this;

    function handleClick(event) { 
      console.log(event.target);
      console.log(event.target.parentNode.classList.toggle("-collapsed"));
      console.log(event.target.props);
      console.log(arguments);
      console.log(self.state.list);
      console.log('The link was clicked.');
    }; 

    var template = '';
    if(this.state){
      if(this.state.list){
        return this.state.list.map(item => {
          return (
            <div className="track-block -collapsed" key={item.hash} onClick={handleClick}>
              <div className="title">
                { item.title }
              </div>
              <div className="details"> 
                <ul> 
                  <li>{ item.artist }</li>
                  <li>BPM: { item.bpm }</li>
                  <li>KEY: { item.key }</li>
                  <li>
                    <ul>
                    { item.structure ? Object.keys(item.structure).map(name => {
                      return (<ul>
                          {name}
                          {item.structure[name].map(key =>{ return(<li>{key}</li>)})}
                        </ul>);
                    }) : ''} 
                    </ul>
                  </li>
                </ul>
              </div>
            </div>);
        });
      }
    } 
  },
  render : function(){
    return (
      <header>  
        <h1>Vault</h1>
        { this.renderList() }
      </header>
    )
  } 
});

export default Vault;