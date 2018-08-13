/*
  TopNavigation

*/
import React from 'react';  
import { Router, Route, Link } from 'react-router';

var TopNavigation = React.createClass({
  componentWillMount(){
    //
  }, 
  render : function(){ 
    return ( 
        <div class="topnav col-xs-12">  
          <img alt="selekta" src="/logo-01.svg" height="50"/>
          <Link to="/vault">vault </Link> | <Link to="/selections/unstructured/">selections (uns)</Link> | <Link to="/selections/structured/">selections (struct)</Link> |  <Link to="/config/">config </Link> 
        </div>
      )  
  } 
});

export default TopNavigation; 