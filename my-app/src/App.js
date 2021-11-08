import logo from './logo.svg';
import './App.css';
import React from 'react'
import Navigation from './Components/Navigation.js'
import FrameWork from './Components/FrameWork.js'

//APP framework as a class component 
class App extends React.Component{
  constructor(Props){
    super(Props);
    this.state = {}
  }
  render(){
    return (
      <div>
        <Navigation/>
        <FrameWork/>
      </div>
    )
  }

}

export default App;
