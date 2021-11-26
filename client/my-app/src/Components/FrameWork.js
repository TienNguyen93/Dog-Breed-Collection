import Side_Bar from './Side_Bar.js'
import '../App.css'
import DisplayContent from './DisplayContent'
//import DisplayContent from './DisplayContent.js'

//<Side_Bar/>
  //          <DisplayContent/>
function FrameWork(Pros){
    return(
        <div id = 'Content_Container'>
           <Side_Bar 
           searchName = {Pros.searchName}
           handleSearch = {Pros.handleSearch}
           submitName = {Pros.submitName}/>
           <DisplayContent breedinfo = {Pros.breedinfo}/>
        </div>
    );
};

export default FrameWork