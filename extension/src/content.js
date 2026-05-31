import { mountStudyBuddy } from "./main.jsx";
import addLogo from "./assets/add-logo.png"
console.log("content script loaded");



if(window.location.href.includes("watch?v")){
    addVidHandler();
}


if(window.location.href.includes("youtube.com")){
    console.log("yt detected")
    initStudyMode();
}

    chrome.storage.local.set({
    isStudyEnab:false
})


 function addVidHandler() {
    const bookmarkBtnExists = document.getElementsByClassName("add-btn")[0];

    if (!bookmarkBtnExists) {
      const bookmarkBtn = document.createElement("img");

      bookmarkBtn.src = chrome.runtime.getURL(addLogo);
      console.log(addLogo);
      bookmarkBtn.className = "ytp-button " + "add-btn";
      bookmarkBtn.title = "Click to add video";

      const youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
      console.log(youtubeLeftControls)
      youtubeLeftControls.appendChild(bookmarkBtn);
      bookmarkBtn.addEventListener("click", addVidToTopicHandler);
    }
  };

async function addVidToTopicHandler() {

    const { Topics = [] } =
      await chrome.storage.local.get(["Topics"]);

    const dropdown =
      document.createElement("select");

    dropdown.id = "topic-dropdown";

    Topics.forEach(topic => {

        const option =
          document.createElement("option");

        option.value = topic.id;
        option.textContent = topic.name;

        dropdown.appendChild(option);
    });

    document.body.appendChild(dropdown);

    dropdown.onchange = async () => {

        const selectedTopicId =
          dropdown.value;

        const { videos = [] } =
          await chrome.storage.local.get(
            ["videos"]
          );

        const newVideo = {
            id: crypto.randomUUID(),
            url: window.location.href,
            topicId: selectedTopicId,
            title:
              document.querySelector(
                "h1.ytd-watch-metadata"
              )?.innerText
        };

        await chrome.storage.local.set({
            videos: [...videos, newVideo]
        });

        dropdown.remove();
    };
}




function initStudyMode(){

    console.log("INIT CALLED");
    chrome.storage.local.get(
        ["isStudyEnab"],
        (res)=> {
            if(res.isStudyEnab){

                enableStudyMode();
            }else{
                showPopup();
            }
        }
    );
}
function showPopup(){
    if(!document.getElementById("study-popup")){
    const popup=document.createElement("div");
    popup.id= "study-popup";

    popup.innerHTML = `
    <div class="study-popup-content">

        <h2>
            Hello studd, ready for a study session?
        </h2>

        <div class="study-enable-row">

            <label for="enable-study-btn">
                Enable study buddy
            </label>

            <input
                type="checkbox"
                id="enable-study-btn"
            />

        </div>

    </div>
`;

    document.body.appendChild(popup);


    document
        .getElementById("enable-study-btn")
        .onclick= ()=>{
                chrome.storage.local.set({
                isStudyEnab:true
            })
            popup.remove();
            enableStudyMode();
        };
}
}

function enableStudyMode(){

if(document.getElementById("study-buddy-root")){
    return;
}
    const secondary =
        document.querySelector("#secondary");

    if (secondary) {
        secondary.style.display = "none";
    }
    // const primary =
    // document.querySelector("#primary");

    // if (primary) {
    // primary.style.width = "65vw";
    // }
    const page = document.querySelector("ytd-page-manager");

    if(page){
        page.style.marginRight = "500px";
    }
    const app= document.createElement("div");
    app.id= "study-buddy-root";

    document.body.appendChild(app);
    mountStudyBuddy();
    }
    
