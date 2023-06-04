import React, { useState } from 'react';
import Prompts from '../components/Prompts';

function JournalEntryForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        // Here, you can perform any additional logic you need,
        // such as saving the journal entry to a database.

        // Reset the form
        setTitle('');
        setContent('');
    };

    return (
        
        <div className='journal-entry-form container-fluid'>
            <div className='row'>
                <div className='col-lg-6 flex-column justify-content-center align-items-center'>

                    <div className="journal-prompts textcenter">
                        <Prompts />
            
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="journal-entry-form">
                    <div  />
                    <h1>Journal Entry of the Day</h1>
                    <label className='form-label'>
                        Title:
                        <input
                            type="text"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            required
                            className='form-input'
                        />
                    </label>
                    <label className='form-label'>
                        Content:
                        <textarea
                            value={content}
                            onChange={(event) => setContent(event.target.value)}
                            required
                            className='form-textarea larger-textarea'
                        />
                    </label>
                    <button type="submit" className='form-submit'>Submit</button>
                </form>
                <div />
            </div>
        </div>
    );
}

export default JournalEntryForm;




// import React, { useReducer, useState } from "react";

// const formReducer = (state, event) => {
//  return {
//    ...state,
//    [event.name]: event.value
//  }
// }

// function Journal() {
//   const [formData, setFormData] = useReducer(formReducer, {});
//   const [submitting, setSubmitting] = useState(false);

//   const handleSubmit = event => {
//     event.preventDefault();
//     setSubmitting(true);

//     setTimeout(() => {
//       setSubmitting(false);
//     }, 3000);
//   }

//   const handleChange = event => {
//     setFormData({
//       name: event.target.name,
//       value: event.target.value,
//     });
//   }

//             return (
//                     <div className="journal">
//                       <h1>Get your Zen On</h1>
//                       <form>
//                       <fieldset>
//                          <label>
//                            <p>Name</p>
//                            <input name="name" onChange={handleChange} />
//                          </label>
//                        </fieldset>
//                        <button type="submit">Submit</button>
//                       </form>
//                     </div>
//                   )
//                 }


// export default Journal;