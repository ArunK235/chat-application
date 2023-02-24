
document.addEventListener('DOMContentLoaded', async()=>{
    try{
        const userName = localStorage.getItem('username')
        userJoined(userName)
        showMessages();
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
        newMessage.classList.add("message-container-right");
        let messageText = document.createElement("p");
        messageText.classList.add("message-text");
        messageText.innerText = `You:  ${msg}`;
        newMessage.appendChild(messageText);
        document.querySelector(".chat-messages").appendChild(newMessage); 

        await axios.post('http://localhost:3000/message/tostore',{msg},{ headers: { Authorization: token }})
    }
    catch(err){
        console.log(err)
    }

}
async function showMessages(){
    try{
        const allmessages = await axios.get('http://localhost:3000/message/toget');
        console.log(allmessages.data.message)
        const msgs = allmessages.data.message
        const user= localStorage.getItem('username');
        msgs.forEach(data =>{
            let msgText = data.messages
            let userName= data.user.name
            console.log(msgText,userName)

            let newMessage = document.createElement("div");

            if(user !== userName){
                newMessage.classList.add("message-container-left");
                let messageText = document.createElement("p");
                messageText.classList.add("message-text");
                messageText.innerText = `${userName}:  ${msgText}`;
                newMessage.appendChild(messageText);
                document.querySelector(".chat-messages").appendChild(newMessage);
            }else{
                newMessage.classList.add("message-container-right");
                let messageText = document.createElement("p");
                messageText.classList.add("message-text");
                messageText.innerText = `You :  ${msgText}`;
                newMessage.appendChild(messageText);
                document.querySelector(".chat-messages").appendChild(newMessage);
            }

            
        })
    }
    catch(err){
        console.log(err);
    }
}
