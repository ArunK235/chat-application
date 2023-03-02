axios.defaults.headers.common["Authorization"] = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : "";

let getallclicks = false;

const textarea = document.getElementById("textarea");
  textarea.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      chatButton(event);
    }
  })
//console.log(getallclicks);
document.addEventListener('DOMContentLoaded', async()=>{
    try{
        const userName = localStorage.getItem('username')
        userJoined(userName)
        /*if(!getallclicks){
            setInterval(() => {
                localmessages();
            }, 5000);
        }*/
        localmessages()   
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
        if(!token){
            window.location = 'login.html'
        }
        let textArea = document.querySelector("textarea");
        let msg = textArea.value;
        textArea.value = ''
        //const userName = localStorage.getItem('username')
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
                console.log(lastmsgid);
            }else{
                lastmsgid=-1;
            }
            const localmsgs = await axios.get(`http://localhost:3000/message/localmsg?id=${lastmsgid}`)
            //console.log(localmsgs.data.message);
            let samedata = localmsgs.data.message

            if((beforedata.length !==0) && (beforedata[beforedata.length-1].id === samedata[samedata.length-1].id)){
                //console.log(beforedata[beforedata.length-1].id, samedata[samedata.length-1].id )
                //console.log(beforedata[beforedata.length-1].id-1, samedata[samedata.length-1].id,beforedata.length,samedata.length )
                let datalocal =JSON.parse(localStorage.getItem('data'))
                return showMessages(datalocal);
            }
            let alllocalmessages
            if(beforedata.length === 0){
                alllocalmessages = localmsgs.data.message
            }else{
                alllocalmessages = [...beforedata,...localmsgs.data.message]
                let uniqueid = new set();
                alllocalmessages=alllocalmessages.filter(item =>{
                    if(!uniqueid.has(item.id)){
                        uniqueid.add(item.id)
                        return true;
                    }
                    return false;
                })
                console.log(alllocalmessages)
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

async function creategroup(){
    try{
        const parentelement = document.getElementById('group-list');
        const groupname = prompt('please enter your groupname')
        //console.log(groupname)
        const creationgroup = await axios.post('http://localhost:3000/group/tocreate',{groupname})
        console.log(creationgroup)
        if(creationgroup.status === 201){
            //console.log(creationgroup.data.message.Groupname)
            let li= document.createElement('li')
            let a= document.createElement('a');
            a.href= `http://localhost:3000/group/${creationgroup.data.message.id}`
            a.textContent =`${creationgroup.data.message.Groupname}`
            li.appendChild(a)
            parentelement.appendChild(li)
        }
               
    }
    catch(err){

    }
}