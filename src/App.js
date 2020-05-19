import React, { Component } from 'react';
import Navigation from "./components/navigation/Navigation.js";
import Clarifai from 'clarifai';
import Logo from "./components/logo/logo.js";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition.js";
import ImageLinkForm from "./components/imageLinkForm/ImageLinkForm.js";
import Signin from "./components/Signin/Signin.js";
import Register from "./components/Register/Register.js";
import Rank from "./components/Rank/Rank.js";
import './App.css';

const app = new Clarifai.App({apiKey: '83219e0d4c1f469d97e1930a0abcd87a'});


class App extends Component {
  constructor () {
    super();
    this.state ={
    input: '',
    imageURL:'',
    box:{},
    route: 'signin',
    isSignedIn: true,
    }
  }

calculateFaceLocation = (data) => {
  const face = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputimage');
  const width = Number(image.width);
  const height = Number(image.height);
    return {
    leftCol: face.left_col * width,
    topRow: face.top_row * height,
    rightCol: width - (face.right_col * width),
    bottomRow: height - (face.bottom_row * height)
  }
}

displayFaceBox = (box) => {
  this.setState({box: box})
}

onInputChange = (event) => {
  this.setState({input: event.target.value});
}

onSubmit = () => {
  this.setState({imageURL: this.state.input});
  app.models
  .predict(
    Clarifai.FACE_DETECT_MODEL, 
    this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch (err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout'){
      this.setState({isSignedIn: false})
      console.log('route is signout')
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
      console.log('route is home') 
    }
    this.setState({route: route});
  }


render() {
  return (
  <div className="App">
      <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
      <Logo />
      {this.state.route==='home'
      ?<div> 
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
        <FaceRecognition box={this.state.box} imageURL={this.state.imageURL}/>
        </div> 
      : ( this.state.route==='signin' 
      ? <Signin onRouteChange={this.onRouteChange} />
      : <Register onRouteChange={this.onRouteChange} />)
        
      }
    </div>
  );
  }
}
export default App;
