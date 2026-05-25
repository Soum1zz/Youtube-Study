import { useEffect, useState } from "react"

export default function buddy_right(){

    const [topics, setTopics]= useState([])

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
                    <input type="text">
                    </input>
                    <button className="topic-btn">+ Add Topic</button>
                </div>
            </>
            <>
                <div className="leftbot-header">
                    VIDEOS
                </div>
                <div className="topic-vid">

                </div>
            </>
        </>
    )
}