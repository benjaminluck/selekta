module.exports = function(context){
  var self = context;
  self.setState({
    AudioService_Src: 'test.mp3'
  });

  this.setSrc = function(path){
    self.setState({
      AudioService_Src: path
    });
  }

  this.getState = function(){
    console.log(self.state);
    return self.state;
  }
};