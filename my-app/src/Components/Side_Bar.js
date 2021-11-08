function Side_Bar(Pros){
    return(
        <div id = 'Side_Bar'>
            <img src = 'https://i.pinimg.com/originals/3a/87/19/3a8719c38c30119814d07ea389e61fac.png' alt = 'error' id = 'DogSticker'/>
            <input type = "text" id = 'NameTextBox' placeholder = 'Enter a dog breed'/>
            <button className = 'SearchButton' ><h3>Search</h3></button>
        </div>
    );
};

export default Side_Bar