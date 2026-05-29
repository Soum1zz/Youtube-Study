import BuddyRight from './components/buddy_right'
import BuddyLeft from './components/buddy_left'
import './App.css'
import { useState } from 'react'

function App() {
  const [videos, setVideos] = useState([])
  const [topics, setTopics] = useState([])
  const [notes, setNotes] = useState([])
  const [topicId, setTopicId] = useState('')

  return (
    <>
      <div>
        <h1>Study Buddy</h1>
      </div>
      <div className='content-div'>
        <BuddyLeft
          topics={topics}
          setTopics={setTopics}
          videos={videos}
          setVideos={setVideos}
          setTopicId={setTopicId}
        />
        <BuddyRight
          notes={notes}
          setNotes={setNotes}
          topicId={topicId}
        />
      </div>
    </>
  )
}

export default App
