/*
  Configuration

*/
import React from 'react';  
import TopNavigation from './TopNavigation';

var Configuration = React.createClass({
  componentWillMount(){ 
    var selection = this.props.params.selection; 
    console.log(selection);
    console.log('test');
  },
  deleteVaultRequest(){ 
    var host = 'http://localhost:8888';
    var vaultEndpoint = '/selekta/api/RunAPI.php/delete-vault'; 
 
    var xhr = new XMLHttpRequest();  
    xhr.open("POST", host + vaultEndpoint, true);
    xhr.onload = function(e){
      if (xhr.readyState === 4){
        if (xhr.status === 200){
          var resp = JSON.parse(xhr.response); 
          console.log(resp);
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
  createVaultRequest(){ 
    var host = 'http://localhost:8888';
    var vaultEndpoint = '/selekta/api/RunAPI.php/create-vault';
 
    var xhr = new XMLHttpRequest();
    xhr.open("POST", host + vaultEndpoint, true);
    xhr.onload = function(e){
      if (xhr.readyState === 4){
        if (xhr.status === 200){
          var resp = JSON.parse(xhr.response); 
          console.log(resp);
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
  createRsyncFile(){ 
    console.log(this.props);
    var selection = this.props.params.selection; 
    var host = 'http://localhost:8888';
    var vaultEndpoint = '/selekta/api/RunAPI.php/create-rsync-list/' + selection;
 
    var xhr = new XMLHttpRequest();
    xhr.open("POST", host + vaultEndpoint, true);
    xhr.onload = function(e){
      if (xhr.readyState === 4){
        if (xhr.status === 200){
          var resp = JSON.parse(xhr.response); 
          console.log(resp);
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
  componentWillMount(){
    //
  },  
  render : function(){ 
    return (  
        <div className="container"> 
          <header>  
            <TopNavigation/>    
            <h1>Configuration</h1> 
          </header> 
          <div class="tracklist col-xs-12">  
            <ul>
              <li><div href="" onClick={() => this.deleteVaultRequest()}>Delete Vault</div></li>
              <li><div href="" onClick={() => this.createVaultRequest()}>Create/Update Vault</div></li>
              <li><div href="" onClick={() => this.createRsyncFile()}>Create RSYNC file</div></li>
            </ul>
          </div>  
        </div>
      )  
  }  
});

export default Configuration; 