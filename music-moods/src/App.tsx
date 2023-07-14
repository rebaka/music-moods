import React, {useState, useEffect} from 'react';
import tsconfig from './tsconfig.json';

import './App.css';
import MoodInputTextBox from "./Components/Moods";
import { redirectToAuthCodeFlow, getAccessToken } from "./Authorization";
import {dark} from "@mui/material/styles/createPalette";

function App() {
    const CLIENT_ID = tsconfig.spotify.CLIENT_ID;
    const CLIENT_SECRET = tsconfig.spotify.CLIENT_SECRET;

    const [inputValue, setMoodValue] = useState('');
    const [accessToken, setAccessToken] = useState('')

    const SPOTIFY_AUTH = "https://accounts.spotify.com/authorize"

    const handleInputChange = (value: string) => {
        setMoodValue(value);
        // console.log('Typed value:', value);
    };

    const handleSave = () => {
        console.log('Input value:', inputValue);
        getUserData();
    };

    //User Authorization
    //Redirects to spotify user authorization page
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        const handleAuthorization = async () => {
            if (code) {
                try {
                    const token: string = await getAccessToken(CLIENT_ID, code);
                    setAccessToken(token);
                    console.log("TOKEN GET: ", token);
                    // Store the access token in your preferred storage mechanism or state management
                } catch (error) {
                    console.error('Error getting access token:', error);
                    // Handle the error and display an appropriate message to the user
                }
            } else {
                console.error('Authorization code missing');
                // Handle the case when the authorization code is missing or invalid
            }
        };

        handleAuthorization();
    }, []);

    const requestAuth = () => {
        redirectToAuthCodeFlow(CLIENT_ID);
    };

    //Get user ID
    async function getUserData() {
        try {
            const response = await fetch('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.ok) {
                const id = await response.json()
                    .then(data => {
                        return data.id
                    });

                console.log('User id:', id);
                await createPlaylist(id);
            } else {
                console.error('Error retrieving user data:', response.status);
                // Handle the error and display an appropriate message to the user
            }
        } catch (error) {
            console.error('Error retrieving user data:', error);
            // Handle the error and display an appropriate message to the user
        }
    }

    //Create Playlist
    async function createPlaylist(id: string) {
        // console.log("AAA", id);

        const playlistData = {
            name: inputValue,
            public: false,
        }

        try {
            const createPlaylistResponse = await fetch('https://api.spotify.com/v1/users/' + id + '/playlists', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(playlistData),
            });

            if (createPlaylistResponse.ok) {
                console.log('Playlist created');

            } else {
                console.error('Error creating playlist:', createPlaylistResponse.status);
                // Handle the error and display an appropriate message to the user
            }
        } catch (error) {
            console.error('Error creating playlist:', error);
            // Handle the error and display an appropriate message to the user
        }

    }

    //Get Playlist ID

    //Edit Playlist

    return (
        <div className="App">
            <header className="App-header">
                <h1 className="App-Title">
                    WELCOME TO MUSIC MOODS
                </h1>
            </header>

            <div className="Instructions">
                <p className='Instructions-text'>
                    Please input your mood into the box below. Then a playlist will be generated based off of your mood.
                    {'\n'}
                    Afterwards you can modify the playlist to ensure the playlist fits your taste in music.
                    {'\n'}
                    If you haven't used Music Moods before, please authorize your spotify account by clicking the button
                    below.
                </p>

                <div className="AuthButton">
                    <button className='Auth-Button' onClick={requestAuth}>Authorize Spotify Account</button>
                    {/*<button className='Auth-Button' onClick={handleAuthorizationRedirect}>Authorize Spotify Account</button>*/}
                    {/*<button className='Auth-Button' >Authorize Spotify Account</button>*/}
                </div>
            </div>

            <div className="Input">
                {/*<MoodInputTextBox value={inputValue} onChange={handleInputChange} onSave={handleSave}/>*/}
                {/*<MoodInputTextBox value={inputValue} onChange={handleInputChange} onSave={search}/>*/}
                <MoodInputTextBox value={inputValue} onChange={handleInputChange} onSave={handleSave}/>
            </div>

            <div className="Playlist">

            </div>
        </div>
    );
}

export default App;
