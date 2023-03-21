
var streamInput = document.getElementById('streamInput');


document.getElementById("ssportPlace").onclick = () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      function: placeOnSsport,
      args: [streamInput.value]
    });
      
    chrome.scripting.insertCSS({
      target: {tabId: tabs[0].id},
      files: ["assets/css/injectSSportPlus.css"],
    });

    chrome.scripting.insertCSS({
      target: {tabId: tabs[0].id},
      files: ["assets/css/injectSSportPlus-withChat.css"],
    });
  });
}

document.getElementById("ssportPlace-noChat").onclick = () => {
  
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
  
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      function: placeOnSsportnoChat,
      args: [streamInput.value]
    });
      
    chrome.scripting.insertCSS({
      target: {tabId: tabs[0].id},
      files: ["assets/css/injectSSportPlus.css"],
    });
    chrome.scripting.insertCSS({
      target: {tabId: tabs[0].id},
      files: ["assets/css/injectSSportPlus-noChat.css"],
    });
  });
}

function placeOnSsport(url){

  if(url.includes("https://www.twitch.tv/"))
      url = url.replace("https://www.twitch.tv/", "");
    
  streamerID = url;

  var div = document.createElement("div");
  div.style.width = "35vw"
  div.style.height= "100vh"
  div.id = 'streamDiv'

  if(url.includes("youtube.com") != true){
    div.innerHTML = '<iframe id="stream_embed" src="https://player.twitch.tv/?channel='+ streamerID +'&parent=app.ssportplus.com" frameborder="0" allowfullscreen="true" scrolling="no" height="40vh" width="100%"></iframe>'
    var liveChat = document.createElement("div");
    liveChat.innerHTML = '<iframe  id="chat_embed"  src="https://www.twitch.tv/embed/'+ streamerID +'/chat?parent=app.ssportplus.com&darkpopout"  height="60vh"  width="100%"></iframe>'
    div.appendChild(liveChat);
  }
  else{
    let paramString = url.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    var videoId;
    for (let pair of queryString.entries()) {
      console.log("Key is: " + pair[0]);
      console.log("Value is: " + pair[1]);

      videoId = pair[1]
    }
    div.innerHTML = '<iframe id="stream_embed" width="100%" height="40vh" src="https://www.youtube.com/embed/' + videoId +'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    var liveChat = document.createElement("div");
    liveChat.innerHTML = '<iframe id="chat_embed" width="100%" src="https://www.youtube.com/live_chat?v=' + videoId + '&embed_domain=app.ssportplus.com&dark_theme=1" frameborder="0"></iframe>'
    div.appendChild(liveChat);
  }
  

  document.getElementById('saranApp').appendChild(div)
}

function placeOnSsportnoChat(url){

  if(url.includes("https://www.twitch.tv/"))
      url = url.replace("https://www.twitch.tv/", "");
      
  streamerID = url;

  var div = document.createElement("div");
  div.style.width = "35vw"
  div.style.height= "100vh"
  div.id = 'streamDiv'
  
  if(url.includes("youtube.com") != true){
    div.innerHTML = '<iframe id="stream_embed" src="https://player.twitch.tv/?channel='+ streamerID +'&parent=app.ssportplus.com" frameborder="0" allowfullscreen="true" scrolling="no" height="40vh" width="100%"></iframe>'
  }
  else{
    let paramString = url.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    var videoId;
    for (let pair of queryString.entries()) {
       console.log("Key is: " + pair[0]);
       console.log("Value is: " + pair[1]);

       videoId = pair[1]
    }
    div.innerHTML = '<iframe id="stream_embed" width="100%" height="40vh" src="https://www.youtube.com/embed/' + videoId +'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  }
  document.getElementById('saranApp').appendChild(div)
}
