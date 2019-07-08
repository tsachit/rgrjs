import React from 'react';
import API from '../API';
import LinkStore from "../stores/LinkStore";

let _getAppState = () => {
  return { links: LinkStore.getAll() };
}

class Main extends React.Component { 
  // component will mount
  // componentWillMount() {
  //   console.log('component will mount');
  //   debugger;
  // }
  constructor(props) {
    super(props);
    this.state = _getAppState();
    this.onChange = this.onChange.bind(this);
  }
  
  // component did mount
  componentDidMount() {
    API.fetchLinks();
    LinkStore.on("change", this.onChange);
  }
  
  // component will unmount
  componentWillUnmount() {
    LinkStore.removeListener("change", this.onChange);
  }
  
  // component did mount
  onChange() {
    console.log('4. In the view');
    this.setState(_getAppState());
  }

  render() {
    let content = this.state.links.map(link => {
      return <li key={link._id}>
        <a href={link.url}>{link.title}</a>
      </li>;
    });
    return (
      <div>
        <h3>Links</h3>
        <ul>
            {content}
        </ul>
      </div>
    );
  }
}

export default Main;