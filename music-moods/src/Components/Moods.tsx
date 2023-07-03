import React, { ChangeEvent, FC } from 'react'
// import './Components/Moods.css';
import './Moods.css';

export type MoodInputTextBoxProps = {
    value: string;
    onChange: (value: string) => void;
    onSave: () => void;
};

const MoodInputTextBox: React.FC<MoodInputTextBoxProps> = ({ value, onChange, onSave }) => {
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return(
        <div>
            <input
                className="Mood-Input"
                type="text"
                placeholder="Input mood here :)"

                onChange={handleInputChange} />

            <button onClick={onSave}> Generate playlist</button>
        </div>
    );
};

export default MoodInputTextBox;