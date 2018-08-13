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
  removeSelectionRequest(){ 
    var host = 'http://localhost:8888';
    var selection = this.props.params.selection; 
    var vaultEndpoint = '/selekta/api/RunAPI.php/remove-selection'; 
    var body = {'selection-name': selection};  
    var error = '';

    if(typeof(selection) == "undefined" || selection == ""){
      alert('No selection selected');
      error = true;
    }
    
    if(!error){
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
      xhr.send(JSON.stringify(body));
    } 
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
  indexPrevaultRequest(){ 
    var host = 'http://localhost:8888';
    var vaultEndpoint = '/selekta/api/RunAPI.php/index-prevault';
 
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
  createRsyncFile(configs){ 
    console.log(this.props);
    var selection = this.props.params.selection; 
    var host = 'http://localhost:8888';
    var vaultEndpoint = '/selekta/api/RunAPI.php/create-rsync-list/' + selection + '/' + configs;
 
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
              <li><div href="" onClick={() => this.indexPrevaultRequest()}>Index tracks in prevault</div></li>
              <li><div href="" onClick={() => this.removeSelectionRequest()}>Remove the current selection</div></li>
              <li><div href="" onClick={() => this.createRsyncFile()}>Create RSYNC file</div></li>
              <li><div href="" onClick={() => this.createRsyncFile('bpm-folders')}>Create RSYNC file (Bpm folders)</div></li>
            </ul>
          </div>  
        </div>
      )  
  }  
});

export default Configuration; 