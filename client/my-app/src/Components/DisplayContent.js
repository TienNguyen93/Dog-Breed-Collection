function DisplayContent(Pros){
    return(
        <div id = 'DisplayContent'>
            <ul id = 'ulcontainer'>
                {Pros.breedinfo.map(
                    (Item)=><li key = {Item.breed} className = 'ListContainer'>
                            <div className = 'ListItem'>
                            <div><h2>{Item.breed}</h2><h2 className = 'seconditem'>{Item.cla}</h2></div>
                            <div className = 'InnerItem'><h4 >AKC Group: {Item.bgroup}</h4><h4 className = 'seconditem'>Obedience: {Item.obedience}</h4></div>
                            <h4 className = 'InnerItem'>Average height, weight, lifespan: {Item.avgheight}, {Item.avgweight}, {Item.avglifespan}</h4>
                            </div>
                        </li>
                        
                )}
                
            </ul>
        </div>
    );
};
/*
<li><span></span></li>
                {Pros.breedinfo.map(
                    (Item)=>
                        <h1>{Item.movieReview}</h1>
                
                )}
*/
export default DisplayContent