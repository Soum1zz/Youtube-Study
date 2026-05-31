import { useEffect, useState } from 'react'

export default function BuddyLeft({ videos, setVideos, topics, setTopics, setTopicId }) {
    const [topName, setTopName] = useState('')
    const [topicVid, setTopicVid] = useState([])
    const storage = typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local ? chrome.storage.local : null

    useEffect(() => {
        if (!storage) return

        storage.get(['topics'], (res) => {
            if (res.topics) {
                setTopics(res.topics)
            }
        })
    }, [setTopics, storage])

    useEffect(() => {
        if (!storage) return

        storage.set({ topics })
    }, [topics, storage])

    useEffect(() => {
        if (!storage) return

        storage.get(['videos'], (result) => {
            if (result.videos) {
                setVideos(result.videos)
            }
        })
    }, [setVideos, storage])

    useEffect(() => {
        if (!storage) return

        storage.set({ videos })
    }, [videos, storage])

    function addTopic(topicName) {
        if (!topicName.trim()) return

        const newTopic = {
            id: crypto.randomUUID(),
            name: topicName,
        }

        setTopics([...topics, newTopic])
        setTopName('')
    }

    function deleteTopic(id) {
        const filteredTopics = topics.filter((topic) => topic.id !== id)
        setTopics(filteredTopics)
    }

    function loadVideo(topicId) {
        const tempvids = videos.filter((vid) => vid.topicId === topicId)
        setTopicVid(tempvids)
        setTopicId(topicId)
    }

    function deleteVideo(id) {
        const filteredVideos = videos.filter((video) => video.id !== id)
        setVideos(filteredVideos)
    }

    return (
        <div className='left-div'>
            <h2 className="lefttop-header">TOPICS</h2>
            <div className="all-topic">
                {topics.map((topic) => (
                    <div key={topic.id}>
                        <span>{topic.name}</span>
                        <button onClick={() => deleteTopic(topic.id)}>Delete</button>
                        <button onClick={() => loadVideo(topic.id)}>Load</button>
                    </div>
                ))}
            </div>
            <div>
                <input
                    type="text"
                    value={topName}
                    onChange={(e) => setTopName(e.target.value)}
                />
                <button className="topic-btn" onClick={() => addTopic(topName)}>
                    + Add Topic
                </button>
            </div>

            <div className="leftbot-header">VIDEOS</div>
            <div className="topic-vid">
                {topicVid.map((vid) => (
                    <div key={vid.id}>
                        <span>{vid.title}</span>
                        <button onClick={() => deleteVideo(vid.id)}>remove</button>
                    </div>
                ))}
            </div>
        </div>
    )
}