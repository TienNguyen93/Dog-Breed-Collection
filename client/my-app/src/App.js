
import './App.css';
import React, {useState,useEffect} from 'react'
import Navigation from './Components/Navigation.js'
import FrameWork from './Components/FrameWork.js'
import Axios from 'axios'
//Axios to allow us to make API call

//APP framework as a class component 
class App extends React.Component{
  constructor(Props){
    super(Props);
    this.state = {searchName: "",breedinfo:[]}
  }

  handleSearch = (e)=>{
    this.setState({searchName: e.target.value})
    //console.log(this.state.searchName)
  };

  /*useEffect(()=>{
    Axios.get('http://localhost:3001/api/search').then((response)=>{
      console.log(response);
    });
  });*/

  somename = (e) =>{
    Axios.get("http://localhost:3001/api/search").then((response)=>{
      this.setState({breedinfo:response.data});
      console.log(response.data);
    });
  };

  submitName = (e) =>{
    Axios.post("http://localhost:3001/api/submitQuery", {searchName: this.state.searchName});
    //console.log(this.state.searchName);
    Axios.get("http://localhost:3001/api/QueryResult").then((response)=>{
      this.setState({breedinfo:response.data});
      console.log(response.data);
    });
  };


  render(){
    return (
      <div>
        <Navigation/>
        <FrameWork 
        searchName = {this.state.searchName}
        handleSearch = {this.handleSearch}
        submitName = {this.submitName}
        breedinfo = {this.state.breedinfo}/>
      </div>
    )
  }

}

export default App;
