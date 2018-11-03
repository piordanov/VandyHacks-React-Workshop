import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PostItem from './PostItem';
function asyncDelay(ret, delay, fail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(fail) {
        reject();
      } else {
      resolve(ret);
      }
    }, delay)
  });
}
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      error: false,
      loaded: false
    };
  }

  componentDidMount = async () => {
    this.setState({loading: true});
    try {
        let resp = await asyncDelay([{
          id: 0,
          title: '10,000 year clock gets lowered into Texan mountain',
          link: 'https://www.theengineer.co.uk/10000-year-clock-texan-mountain/',
      }, {
        id: 1,
        title: '10,000 year clock gets lowered into Texan mountain',
        link: 'https://www.theengineer.co.uk/10000-year-clock-texan-mountain/',
    }],5000,false);
      this.setState({posts: resp, loading: false});


    } 
    catch(err){
      alert("IT FAILED")
      this.setState({loading: false, error: true});
    }
    // let response = await fetch('http://localhost:3030/posts');
    // let body = await response.json();
  }
  
  render() {
    let { posts, loading, error } = this.state;
    let items = posts.map((post, idx) => 
    <PostItem key={idx} title={post.title} link={post.link} />  
    );
    console.log(items);
    return (
      <div className="App">
        {error && "AN ERROR OCCURED :("}
        {loading ? <h1>Loading</h1> : <h1>Done Loading</h1>}
        {items}
        {/* <PostItem title="Hello Post" link="http://google.com" /> */}
      </div>
    );
  }
}

export default App;
