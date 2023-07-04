import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import MoodInputTextBox from "./Components/Moods";


function App() {

    const[inputValue, setInputValue] = useState('');

    const handleInputChange = (value: string) => {
        setInputValue(value);
        console.log('Typed value:', value);
    };

    const handleSave = () => {
        console.log('Input value:', inputValue);
    };

  return (
    //   <>
    //   <div className="App-title">
    //     <h1> WELCOME TO MUSIC MOODS </h1>
    //     {/* <Mood/> */}
    //   </div>
    //
    // <p className='Instructions'>
    //     Inputting something in the text box and pressing enter generates a custom playlist for the user depending on their mood. {"\n"}
    //     Afterwards the user can modify their playlist to curate the music they want.
    // </p>
    //
    //   </>


    <div className="App">
      <header className="App-header">
          <h1 className="App-Title">
              WELCOME TO MUSIC MOODS
          </h1>
          {/*<input className="Mood-Input"*/}
          {/*    type="text" id="mood" placeholder="Input mood here :)"*/}
          {/*/>*/}


          {/*<button>Generate Playlist</button>*/}

          {/*<button onClick="generatePlaylist()">Generate Playlist</button>*/}

        {/*<p>*/}
        {/*  Edit <code>src/App.tsx</code> and save to reload.*/}
        {/*</p>*/}
        {/*<a*/}
        {/*  className="App-link"*/}
        {/*  href="https://reactjs.org"*/}
        {/*  target="_blank"*/}
        {/*  rel="noopener noreferrer"*/}
        {/*>*/}
        {/*  Learn React*/}
        {/*</a>*/}
      </header>

        <div className="Instructions">
            <p className='Instructions-text'>
                Please input your mood into the box below. Then a playlist will be generated based off of your mood.
                {'\n'}
                Afterwards you can modify the playlist to listen to the music you want to listen to.
            </p>
        </div>

        <div className="Input">
            <MoodInputTextBox value={inputValue} onChange={handleInputChange} onSave={handleSave}/>
        </div>
    </div>
  );
}

export default App;
