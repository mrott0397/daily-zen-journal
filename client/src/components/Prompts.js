// import React from "react";
 
// function Prompts() {
//   return (
//     <div className="prompts">
//       <h1>Prompts Page</h1>
//     </div>
//   );
// }

// export default Prompts;

import React from 'react';

function Prompts() {
  const prompts = [
    'Write about a happy memory.',
    // 'What are you grateful for today?',
    // 'Describe your favorite place in nature.',
    // 'Write about a person who inspires you.',
    // 'What are your goals for the future?'
  ];

  return (
    <div>
      {prompts.map((prompt, index) => (
        <CuteTextBox key={index} prompt={prompt} />
      ))}
    </div>
  );
}

function CuteTextBox({ prompt }) {
  return (
    <div className="cute-textbox">
      <h2>{prompt}</h2>
    </div>
  );
}

export default Prompts;

