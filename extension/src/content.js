import { mountStudyBuddy } from "./main.jsx";

console.log("content script loaded");
if(window.location.href.includes("youtube.com")){
    console.log("yt detected")
    initStudyMode();
}

    chrome.storage.local.set({
    isStudyEnab:false
})

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
    const app= document.createElement("div");
    app.id= "study-buddy-root";

    document.body.appendChild(app);
    mountStudyBuddy();
    }
    
