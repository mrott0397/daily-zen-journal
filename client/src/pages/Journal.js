import React, { useState, useEffect } from 'react';
import Prompts from '../components/Prompts';
import { SAVE_ENTRY } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import { saveEntryIds, getSavedEntryIds } from '../utils/localStorage';

function JournalEntryForm() {
    const [title, setTitle] = useState('');
    const [thoughts, setContent] = useState('');
    const [entry, setEntry] = useState([]);
    const [savedEntryIds, setSavedEntryIds] = useState(getSavedEntryIds());
    const [saveEntry, { error }] = useMutation(SAVE_ENTRY);

    useEffect(() => {
        return () => saveEntryIds(savedEntryIds);
    });
    
    const handleJournalSubmit = async (entryId) => {
        // event.preventDefault();
        const journalToSave = entry.find((journal) => journal.entryId === entryId);
        //    const token = Auth.loggedIn() ? Auth.getToken() : null;
        //    if (!token) {
        //        return false;
        //    }
           try {
            const { data } = await saveEntry({
                variables: { userData: { ...journalToSave } },
            });

            const { items } = await data.json();

            const entryData = items.map((journal) => ({
                entryId: journal.entryId,
                title: journal.title,
                thoughts: journal.thoughts,
            }));

            setEntry(entryData);
            setSavedEntryIds([...savedEntryIds, journalToSave.entryId]);
            console.log(savedEntryIds);
              } catch (err) {
                console.error(err);
              }
    };

    
// still not working 

    return (
        
        <div className='journal-entry-form container-fluid'>
            <div className='row'>
                <div className='col-lg-6 flex-column justify-content-center align-items-center'>

                    <div className="journal-prompts textcenter">
                        <Prompts />
            
                    </div>
                </div>
                <form onSubmit={handleJournalSubmit} className="journal-entry-form" >
                    <div/>
                    <h1 style={{textAlign: "center"}}>Let's Reflect</h1>
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
                        Entry:
                        <textarea
                            value={thoughts}
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