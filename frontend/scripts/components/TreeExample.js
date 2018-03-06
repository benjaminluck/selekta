/*
  TreeExample

*/
import React from 'react';  
import { Classes, Icon, ITreeNode, Tooltip, Tree } from "@blueprintjs/core";

var TreeExample = React.createClass({
  componentWillMount(){
    //
    const tooltipLabel = (
        <Tooltip content="An eye!">
            <Icon iconName="eye-open" /> 
        </Tooltip>
    );

    this.state = ({
        nodes: [
            {
                hasCaret: true,
                iconName: "folder-close",
                label: "Folder 0",
            },
            {
                iconName: "folder-close",
                isExpanded: true,
                label: <Tooltip content="I'm a folder <3">Folder 1</Tooltip>,
                childNodes: [
                    { iconName: "document", label: "Item 0", secondaryLabel: tooltipLabel },
                    {
                        hasCaret: true,
                        iconName: "pt-icon-folder-close",
                        label: <Tooltip content="foo">Folder 2</Tooltip>,
                        childNodes: [
                            { label: "No-Icon Item" },
                            { iconName: "pt-icon-tag", label: "Item 1" },
                            {
                                hasCaret: true,
                                iconName: "pt-icon-folder-close",
                                label: "Folder 3",
                                childNodes: [
                                    { iconName: "document", label: "Item 0" },
                                    { iconName: "pt-icon-tag", label: "Item 1" },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    }); 
  }, 
  handleNodeCollapse(){
   //   console.log(this);
   //   console.log(arguments);
  },
  handleNodeExpand(){
   // console.log(this);
   // console.log(arguments);
  },
  handleNodeClick(elem, nodeKey){
    elem.isExpanded = !elem.isExpanded;
    console.log(elem);
    this.setState(this.state);
  },
  render : function(){
    return ( 
      <div className="list">
        <Tree contents={this.state.nodes} onNodeClick={this.handleNodeClick} onNodeCollapse={this.handleNodeCollapse}
        onNodeExpand={this.handleNodeExpand} />
      </div>)  
  } 
});

export default TreeExample;