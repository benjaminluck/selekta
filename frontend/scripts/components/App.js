/*
  App

*/
import React from 'react'; 
import ReactHowler from 'react-howler'; 
import TopNavigation from './TopNavigation';

var App = React.createClass({
  componentWillMount(){ 
  //
  },
  componentDidMount(){
  //
  },
  render : function(){
    //
    return (
      <div>
        <div className="container">
          <header>  
            <TopNavigation/>   
            <h1>Selekta</h1> 
          </header> 
        </div>
      </div>
    )
  } 
});

export default App;