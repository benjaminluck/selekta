/*
  TrackCollection

*/
import React from 'react';  
import Track from './Track'; 
import ListNode from './ListNode'; 

var TrackCollection = React.createClass({
  render : function(){
    return (    
        <div className='col-xs-8'> 
          <table className="tracklist">  
            <th>
              <tr>
                <td>SELECT</td>
                <td>TRACK</td>
                <td>BPM</td>
                <td>KEY</td>
              </tr>
            </th> 
            <tbody> 
              <ListNode list={this.props.list} audioservice={this.props.audioservice}/> 
            </tbody> 
          </table>
        </div>
      )    
  } 
});

export default TrackCollection;
 // {this.props.list.map(this.renderTrack())}  