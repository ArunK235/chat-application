
document.addEventListener('DOMContentLoaded', async()=>{
    try{
        const userName = localStorage.getItem('username')
        userJoined(userName)
    }
    catch(err){
        console.log(err)
    }
})

function userJoined(userName){
    let newMessage = document.createElement("div");
    newMessage.classList.add("message-container");
    let messageText = document.createElement("p");
    messageText.classList.add("message-text");
    messageText.innerText = `${userName} joined`;
    newMessage.appendChild(messageText);
    document.querySelector(".chat-messages").appendChild(newMessage);
}

async function chatButton(){
    try{

        const token = localStorage.getItem('token')

        let textArea = document.querySelector("textarea");
        let msg = textArea.value;
        const userName = localStorage.getItem('username')
        let newMessage = document.createElement("div");
        newMessage.classList.add("message-container");
        let messageText = document.createElement("p");
        messageText.classList.add("message-text");
        messageText.innerText = `${userName}:  ${msg}`;
        newMessage.appendChild(messageText);
        document.querySelector(".chat-messages").appendChild(newMessage); 

        const storeMsg = await axios.post('http://localhost:3000/message/tostore',{msg},{ headers: { Authorization: token }})
    }
    catch(err){
        console.log(err)
    }

}