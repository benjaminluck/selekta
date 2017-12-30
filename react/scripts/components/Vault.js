/*
  Vault

*/
import React from 'react'; 
import ReactHowler from 'react-howler';

var Vault = React.createClass({
  componentWillMount(){
    this.setState({
      playerSrc: 'http://localhost:8888/selekta/music-vault/108%20The%20Orb%20(ft.%20Lee%20Scratch%20Perry)%20-%20Hold%20Me%20Upsetter.mp3'
    })
  },
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
      console.log(self);
      console.log('The link was clicked.');
    }; 

    function handleClickDetails(item){
      console.log(item);
      self.setState({
        playerSrc: 'http://localhost:8888/selekta/music-vault/' + item.fileName
      });
    }

    var template = '';
    if(this.state){
      if(this.state.list){
        return this.state.list.map(item => {
          return (
            <div className="track-block -collapsed" key={item.hash}>
              <div className="title" onClick={handleClick}>
                { item.title }
              </div>
              <div className="details" onClick={() => handleClickDetails(item)}> 
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
    var self = this;
    console.log(self);

    function handlePlay(){
      console.log(arguments);
      console.log(self);
      self.player.play();
      
    }
    return (
      <header>  
        <h1>Vault</h1>
        <div className="howl" onClick={handlePlay}>
          <ReactHowler
            src={this.state.playerSrc}
            format={['mp3','aiff']}
            playing={true}
            html5={true}
            ref={(ref) => (this.player = ref)}
          />
        </div>
        { this.renderList() }
      </header>
    )
  } 
});

export default Vault;