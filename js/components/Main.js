import React from 'react';
import API from '../API';
import LinkStore from "../stores/LinkStore";
import PropTypes from 'prop-types'; 

let _getAppState = () => {
  return { links: LinkStore.getAll() };
}

class Main extends React.Component { 
  static propTypes = {
    limit: PropTypes.number
  }

  static defaultProps = {
    limit: 5
  }
  // component will mount
  // componentWillMount() {
  //   console.log('component will mount');
  //   debugger;
  // }

  state = _getAppState();
  
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
  onChange = () => {
    this.setState(_getAppState());
  }

  render() {
    console.log(this.state)
    let content = this.state.links.slice(0, this.props.limit).map(link => {
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