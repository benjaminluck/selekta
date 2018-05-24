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
            {Object.keys(list).map(this.renderTrack)} 
            </tbody> 
          </table>
        </div>
      )  
  } 
});

export default TrackCollection;
 // {this.props.list.map(this.renderTrack())}  