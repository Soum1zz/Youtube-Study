console.log("content script loaded");
if(window.location.href.includes("watch?v=")){
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

    popup.innerHTML= `
    <div>
    <div>
        <h2>Hello studd , ready for a study session?</h2>
    </div>

    <div>Enable study buddy</div>
    <input type="radio"
    id="enable-study"
    />
    </div>
    `;

    document.body.appendChild(popup);


    document
        .getElementById("enable-study")
        .onclick= ()=>{
            popup.remove();
            enableStudyMode();
        };
}
}

function enableStudyMode(){
    chrome.storage.local.set({
    isStudyEnab:true
})
    const app= document.createElement("div");
    app.id= "study-buddy-root";
    document.body.appendChild(app);

    
}