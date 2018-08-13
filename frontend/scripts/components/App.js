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
          <div className="splash-screen">   
            <a href="/vault">
              <img alt="selekta" src="../logo-01.svg" height="150"/>
            </a>
          </div> 
        </div>
      </div>
    )
  } 
});

export default App;