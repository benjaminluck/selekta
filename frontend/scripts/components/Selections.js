/*
  App

*/
import React from 'react'; 
import ReactHowler from 'react-howler'; 
import TopNavigation from './TopNavigation';

var App = React.createClass({
  componentWillMount(){ 
    var host = 'http://localhost:8888';
    var vaultEndpoint = '/selekta/api/RunAPI.php/list-selections';

    this.setState({ 
      selections: []
    });   

    var xhr = new XMLHttpRequest();
    xhr.open("GET", host + vaultEndpoint, true);
    xhr.onload = function(e){
      if (xhr.readyState === 4){
        if (xhr.status === 200){
          var selections = JSON.parse(xhr.response); 
          this.setState({ 
            selections: selections,
          });  

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
  renderSelection : function(val, key){
    console.log(arguments);
    var selectionPath = '/selection/' + val + '/unstructured/';
    return <div><a href={selectionPath}>{val}</a></div>
  },
  render : function(){
    //
    return (
      <div>
        <div className="container">
          <header>  
            <TopNavigation/>   
            <h1>Selections</h1>  
          </header> 
          <div class="tracklist col-xs-12">  
            {this.state.selections.map(this.renderSelection)}  
          </div>
        </div>
      </div>
    )
  } 
});

export default App;