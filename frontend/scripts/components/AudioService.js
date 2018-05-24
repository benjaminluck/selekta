module.exports = function(context){
  var self = context;
  self.setState({
    AudioService_Src: 'test.mp3',
    Track: {
      artist: '',
      title: ''
    }
  });

  this.setSrc = function(path){
    self.setState({
      AudioService_Src: path
    });
  }  

  this.setTrack = function(item){
    console.log(item);
    self.setState({
      Track: item
    });
  }

  this.getState = function(){
    console.log(self.state);
    return self.state;
  }
};