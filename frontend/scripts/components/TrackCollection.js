/*
  TrackCollection

*/
import React from 'react';  
import Track from './Track'; 

var TrackCollection = React.createClass({
  componentWillMount(){
    //
  }, 
  renderTrack : function(val, key){
    var list = this.props.list;  
    return <Track audioservice={this.props.audioservice} item={list[key]}/>
  },
  render : function(){
    var list = this.props.list;
    return ( 
        <table className="tracklist col-xs-12">  
          <th>
            <tr>
              <td>SELECT</td>
              <td>TRACK</td>
              <td>BPM</td>
              <td>TAGS</td>
              <td>KEY</td>
              <td>ACTIONS</td>
            </tr>
          </th>
          <tbody>
          {Object.keys(list).map(this.renderTrack)} 
          </tbody> 
        </table>
      )  
  } 
});

export default TrackCollection;
 // {this.props.list.map(this.renderTrack())}  