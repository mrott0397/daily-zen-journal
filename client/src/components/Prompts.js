import React, { useState, useEffect } from 'react';

const  SeededPrompts = () => {
  const prompts = [
    'Write about a happy memory.',
    'What are you grateful for today?',
    'Describe your favorite place in nature.',
    'Write about a person who inspires you.',
    'What are your goals for the future?'
  ];

  

  const [randomPrompt, setRandomPrompt] = useState('');

  useEffect(() => {
    generatePrompt();
    }, []);

  const generatePrompt = () => {
    const randomPrompt = [Math.floor(Math.random() * prompts.length)];
    const selectedPrompt = prompts[randomPrompt];
    setRandomPrompt(selectedPrompt);
  };

  return (
    <div className='textcenter'>
      <CuteTextBox randomPrompt={randomPrompt} />
      <button className='center-button' onClick={generatePrompt}>Generate New Prompt</button>
    </div>
  );
  function CuteTextBox({ randomPrompt }) {
    return (
      <div className="cute-textbox">
        <h2>{ randomPrompt }</h2>
      </div>
    );
}

};

export default SeededPrompts;