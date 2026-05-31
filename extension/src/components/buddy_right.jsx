import { useEffect, useState } from 'react'

export default function BuddyRight({ topicId, notes, setNotes }) {
    const [topicNotes, setTopicNotes] = useState([])
    const [notebody, setNoteBody] = useState('')
    const storage = typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local ? chrome.storage.local : null

    useEffect(() => {
        if (!storage) return

        storage.get(['notes'], (res) => {
            if (res.notes) {
                setNotes(res.notes)
            }
        })
    }, [setNotes, storage])

    useEffect(() => {
        if (!storage) return

        storage.set({ notes })
    }, [notes, storage])

    useEffect(() => {
        const filteredNotes = notes.filter((note) => note.topicId === topicId)
        setTopicNotes(filteredNotes)
    }, [notes, topicId])

    function addNote() {
        if (notebody.length === 0) return

        const newNote = {
            id: crypto.randomUUID(),
            topicId,
            body: notebody,
        }

        setNotes([...notes, newNote])
        setNoteBody('')
    }

    function deleteNote(id) {
        const tempNotes = notes.filter((note) => note.id !== id)
        setNotes(tempNotes)
    }

    return (
        <div className='right-div'>
            <div className="right-header">
                <h2>NOTES</h2>
            </div>
            <div className="all-notes">
                {topicNotes.map((note) => (
                    <div key={note.id}>
                        {note.body}
                        <button onClick={() => deleteNote(note.id)}>Delete</button>
                    </div>
                ))}
            </div>
            <div className="add-note">
                <input
                    type="text"
                    value={notebody}
                    onChange={(e) => setNoteBody(e.target.value)}
                />
                <button type="button" onClick={addNote}>Add Note</button>
            </div>
        </div>
    )
}