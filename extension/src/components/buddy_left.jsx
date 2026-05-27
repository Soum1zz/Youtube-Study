import { useEffect, useState } from "react"

export default function buddy_left(videos,setVideos,topics,setTopics, SetTopicId){

    // const [topics, setTopics]= useState([])
    const [topName, setTopName]= useState("")
    // const [videos, setVideos]= useState([])
    const [topicVid, setTopicVid]= useState([])
    //topics
    useEffect(()=>{
        chrome.storage.local.get(["topics"],(res)=>{
            if(res.topics){
                setTopics(res.topics);
            }
        })
    },[]);
    useEffect(()=>{
        chrome.storage.local.set({topics});
    },[topics])
    //videos
    useEffect(() => {
    chrome.storage.local.get(["videos"], (result) => {
      if (result.topics) {
        setVideos(result.videos);
      }
    });
    }, []);
    useEffect(() => {
        chrome.storage.local.set({ videos });
    }, [videos]);


    function addTopic(topicName){
        if(!topicName.trim())return;

        const newTopic = {
            id: crypto.randomUUID(),
            name: topicName
        };

        setTopics([...topics, newTopic]);
    }

    function deleteTopic(id){
        const filteredTopics = topics.filter(
            (topic)=> topic.id !== id
        );
        setTopics(filteredTopics);
    }
    function loadVideo(topicId){
        const tempvids= videos.filter(
            (vids)=> vids.topicId===topicId
        )
        setTopicVid(tempvids);
    }
    function deleteVideo(id){
        const filteredVideos = videos.filter(
            (video)=>video.id!==id
        )
        setVideos(filteredVideos)
    }

    return (
        <>
            <>
                <div className="lefttop-header">
                    TOPICS
                </div>
                <div className="all-topic">
                    {
                        topics.map((topic)=>(
                            <div
                            key={topic.id}>
                                <span>{topic.name}</span>

                                <button onClick={()=>{
                                    deleteTopic(topic.id)
                                }}>Delete</button>
                            </div>
                        ))
                    }
                </div>
                <div>
                    <input type="text"
                    onChange={(e)=>{
                        setTopName(e.target.value)
                    }}
                    >
                    </input>
                    <button className="topic-btn"
                    onClick={()=>{
                        addTopic(topName)
                    }}
                    >+ Add Topic</button>
                </div>
            </>
            <>
                <div className="leftbot-header">
                    VIDEOS
                </div>
                <div className="topic-vid">
                    {
                        videos.map((vid)=>(
                            <div>
                                <span key={vid.id}>{vid.title}</span>
                                <button>remove</button>
                            </div>
                        ))
                    }
                </div>
            </>
        </>
    )
}