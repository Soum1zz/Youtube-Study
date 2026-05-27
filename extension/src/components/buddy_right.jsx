import { useState } from "react";

export default function buddy_right(topicId,notes,setNotes){
        // const[notes, setNotes]= useState([])
        const[topicNotes, setTopicNotes]= useState([])
        const[notebody, setNoteBody]= useState("")
        useEffect(()=>{
            chrome.storage.local.get(["notes"],(res)=>{
                if(res.topics){
                    setNotes(res.notes);
                }
            })
        },[]);
        useEffect(()=>{
            chrome.storage.local.set({notes});
        },[notes])
        function loadNotes(topicId){
            const tempTopicNotes= notes.filter(
                (note)=> note.topicId === topicId
            )
            setTopicNotes(tempTopicNotes)

        }
        function addNote(vidId){
            if(notebody.length===0)return;
            const newNote= {
                id: crypto.randomUUID(),
                vidId: vidId,
                body: text
            }
            setNotes([...notes, newNote])
            setNoteBody("")
        }
        function deleteNote(id){
            const tempNotes= notes.filter(
                (note)=>note.id!==id
            )
            setNotes(tempNotes);
        }
        return(
            <>
                <div className="right-header">
                    <h2>NOTES</h2>
                </div>
                <div className="all-notes">
                    {
                        topicNotes.map((note)=>{
                            <div key={note.id}>
                                {note.body}
                            </div>
                        })
                    }

                </div>
                <div className="add-note">
                    <input type="text"
                    onChange={(e)=>{
                        setNoteBody(e.target.value);
                        
                    }}
                    ></input>
                    <button type="button"
                    onClick={()=>{

                        addNote(vidId)
                    }}>Add Note</button>
                </div>
                    
            </>
        )
}