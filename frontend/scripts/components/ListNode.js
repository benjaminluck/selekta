/*
  ListNode

*/
import React from 'react';  
import Track from './Track'; 

var ListNode = React.createClass({
  componentWillMount(){
    //
  }, 
  renderTrack : function(item){ 
    return <Track audioservice={this.props.audioservice} item={item}/>
  },
  isTrackNode : function(item){
    if(typeof(item) != 'undefined'){
      if(typeof(item) && typeof(item['ext']) != 'undefined'){
        return true;
      }
    } 

    return false;
  },
  isFolderNode : function(item){
    return true;
  }, 
  handleClickNode : function(e){
    console.log(arguments);
    console.log(e);  
    e.target.parentNode.classList.toggle("-open"); 
  },
  renderNode : function(key, item){ 
    if(this.isTrackNode(item)){
      return this.renderTrack(item); 
    }

    if(this.isFolderNode(key, item)){
      console.log(key);
      console.log(item); 
      return(<div className='folder-node' onClick={this.handleClickNode}>
          <div className='name'>{key}</div>
          <div className='content'>
          {this.renderNodeList(item)}
          </div>
        </div>)
    }
  },
  iterateOver(list){

  },
  renderNodeList : function(list){
    let keysList = Object.keys(list); 
    var arr = [];
    for(let i = 0; i < keysList.length; i++){
      let key = keysList[i];
      arr.push(this.renderNode(key, list[key])); 
    } 
 
    return arr;
  },
  render : function(){
    var list = this.props.list;
   
    return(<td>{this.renderNodeList(list)}</td>); 
  }
});

export default ListNode;
 // {this.props.list.map(this.renderTrack())}  