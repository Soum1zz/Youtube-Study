import buddy_right from './components/buddy_right'
import buddy_left from './components/buddy_left'
import './App.css'
import { useState } from 'react'

function App() {
 const[videos, setVideos]= useState([])
 const[topics, setTopics]= useState([])
 const[notes, setNotes]= useState([])
 const[topicId, setTopicId]= useState("")
  return (
    <>
      <div>
        <h1>Study Buddy</h1>
      </div>
      <div className='content-div'>
        <buddy_left 
        topics={topics}
        setTopics={setTopics}
        videos={videos}
        SetVideos={setVideos}
        SetTopicId={setTopicId}
        />
        <buddy_right
        notes={notes}
        setNotes={setNotes}
        topicId={topicId}/>
      </div>
    </>
  )
}

export default App
