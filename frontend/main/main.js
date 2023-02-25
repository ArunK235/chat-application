let getallclicks = false;
//console.log(getallclicks);
document.addEventListener('DOMContentLoaded', async()=>{
    try{
        const userName = localStorage.getItem('username')
        userJoined(userName)
        if(!getallclicks){
            setInterval(() => {
                localmessages();
            }, 5000);
        }   
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

async function getAll(){
    try{
        getallclicks = true;
        const allmessages = await axios.get('http://localhost:3000/message/toget');
        //console.log(allmessages.data.message)
        const msgs = allmessages.data.message
        showMessages(msgs)
    }
    catch(err){
        console.log(err);
    }
}
async function localmessages(){
    if(!getallclicks){
        try{
            let beforedata = JSON.parse(localStorage.getItem('data')) ||[];
            //console.log(beforedata);
            let lastmsgid
            if(beforedata.length !== 0){
                lastmsgid = beforedata[beforedata.length-1].id
                //console.log(lastmsgid);
            }else{
                lastmsgid=-1;
            }
            const localmsgs = await axios.get(`http://localhost:3000/message/localmsg?id=${lastmsgid}`)
            //console.log(localmsgs.data.message);
            let samedata = localmsgs.data.message

            if((beforedata.length !==0) && (beforedata[beforedata.length-1].id === samedata[samedata.length-1].id)){
                console.log(beforedata[beforedata.length-1].id, samedata[samedata.length-1].id )
                let datalocal =JSON.parse(localStorage.getItem('data'))
                return showMessages(datalocal);
            }
            let alllocalmessages
            if(beforedata.length === 0){
                alllocalmessages = localmsgs.data.message
            }else{
                alllocalmessages = [...beforedata,...localmsgs.data.message]
            }
            if(alllocalmessages.length>10){
                const msgsafterdel =alllocalmessages.slice(alllocalmessages.length-10,alllocalmessages.length)
                localStorage.setItem('data',JSON.stringify(msgsafterdel))
            }else{
                localStorage.setItem('data',JSON.stringify(alllocalmessages))
            }
            let datalocal = JSON.parse(localStorage.getItem('data'))
            console.log(datalocal)
            showMessages(datalocal);

        }
        catch(err){
            console.log(err);
        }
    }
}






async function showMessages(msgs){
    try{
        document.getElementById('chat').innerHTML='';
        const user= localStorage.getItem('username');
        msgs.forEach(data =>{
            let msgText = data.messages
            let userName= data.user.name
            //console.log(msgText,userName)

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
