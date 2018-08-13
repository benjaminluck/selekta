module.exports = function(context){
  var self = context;

  self.setState({
    AudioService_Src: 'test.mp3',
    SelectedItems: [],
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
    self.setState({
      Track: item
    });
  }

  this.uncheckSelection = function(){
    console.log('uncheck');
    var elems = document.querySelectorAll('.selector-checkbox');

    for(var elem of elems){ 
      elem.removeAttribute('checked');
      elem.checked = false;
      console.log(elem); 
    }

    var SelectedItems = [];
    self.setState({
      SelectedItems: SelectedItems
    });


  }

  this.getState = function(){
    return self.state;
  }

  this.selectItem = function(item){
    var SelectedItems = [];
    var SelectedItems = self.state.SelectedItems; 
    SelectedItems.push(item);

    self.setState({
      SelectedItems: SelectedItems
    });

    console.log(self.state);
  }
};