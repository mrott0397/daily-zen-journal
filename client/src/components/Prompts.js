import React, { useState, useEffect } from 'react';

// prompts for journaling

const  SeededPrompts = () => {
  const prompts = [
    'Write about a happy memory.',
    'What are you grateful for today?',
    'Describe your favorite place in nature.',
    'Write about a person who inspires you.',
    'What are your goals for the future?',
    "Reflect on a recent challenge or setback you have experienced. Describe how it affected you emotionally and what steps you took to overcome it.",
    "Write about a person or experience that has had a significant impact on your life. Explore the lessons you have learned and the growth you have experienced as a result.",
    "Describe a moment of great joy or accomplishment in your life. What led up to this moment and how did it make you feel?",
    "Discuss a decision you made recently that you are proud of. Explain why you made that choice and the positive outcomes that resulted from it.",
    "Write about a goal or dream you have been working towards. Reflect on the progress you have made and any challenges you have faced along the way. Discuss your motivation and determination to keep pursuing it.",
    "Explore a place or setting that holds special meaning for you. Describe its significance in your life and the memories or emotions it evokes.",
    "Write about a book, movie, or piece of art that has deeply impacted you. Discuss why it resonated with you and how it has influenced your perspective.",
    "Reflect on a difficult conversation you had recently. Explore your thoughts and feelings before, during, and after the conversation. Consider what you learned from it and how it may have affected your relationships.",
    "Describe a moment when you felt inspired or motivated by someone else. What qualities or actions did they possess that inspired you? Reflect on how their influence has shaped your own aspirations.",
    "Discuss a personal value or belief that is important to you. Explain why it holds significance in your life and how it guides your decisions and actions."
  ];

  // generate random prompt
  

  const [randomPrompt, setRandomPrompt] = useState('');

  useEffect(() => {
    generatePrompt();
    }, []);

  const generatePrompt = () => {
    const randomPrompt = [Math.floor(Math.random() * prompts.length)];
    const selectedPrompt = prompts[randomPrompt];
    setRandomPrompt(selectedPrompt);
  };

  // return random prompt

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