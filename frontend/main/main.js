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
        if(!getallclicks){
            setInterval(() => {
                localmessages();
            }, 5000);
        }
        //localmessages() 
        allgroups()  
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
        //console.log(token,'token')
        if(!token){
            window.location = 'login.html'
        }
        let textArea = document.querySelector("textarea");
        let msg = textArea.value;
        textArea.value = ''

        const groupId = localStorage.getItem("groupId") ? localStorage.getItem("groupId") : 1;
    

        //const userName = localStorage.getItem('username')
        let newMessage = document.createElement("div");
        newMessage.classList.add("message-container-right");
        let messageText = document.createElement("p");
        messageText.classList.add("message-text");

        if(msg.includes('http')){
            let link=msg
            await axios.post(`http://localhost:3000/message/tostore/${groupId}`,{msg:link},{ headers: { Authorization: token }})
            messageText.innerHTML = `You : <a href="#" onclick="linkclicked(${groupId})">Join link</a>`
        }
        else{
            await axios.post(`http://localhost:3000/message/tostore/${groupId}`,{msg},{ headers: { Authorization: token }})
            messageText.innerText = `You:  ${msg}`;
        }
        
        newMessage.appendChild(messageText);
        document.querySelector(".chat-messages").appendChild(newMessage);
        

        
    }
    catch(err){
        console.log(err)
    }

}

async function getAll(){
    try{
        getallclicks = true;
        const groupId = localStorage.getItem('groupId')
        //console.log(groupId)
        const allmessages = await axios.get(`http://localhost:3000/message/toget/${groupId}`)
        //console.log(allmessages.data.message)
        const msgs = allmessages.data.message
        showMessages(msgs)
    }
    catch(err){
        console.log(err);
    }
}

let latestmessageId = localStorage.getItem("latestmessageId")||0;

async function localmessages(){
    if(!getallclicks){
        try{
            /*let beforedata = JSON.parse(localStorage.getItem('data')) ||[];
            //console.log(beforedata);
            let groupId = localStorage.getItem("groupId")
            ? localStorage.getItem("groupId")
            : 1

            let lastmsgid
            if(beforedata.length !== 0){
                lastmsgid = beforedata[beforedata.length-1].id
                console.log(lastmsgid,'lastmsgid');
            }else{
                lastmsgid=-1;
            }*/
            let groupId = localStorage.getItem('groupId');
            console.log(groupId, 'groupid')
            const localmsgs = await axios.get(`http://localhost:3000/message/localmsg?groupId=${groupId}&latestdId=${latestmessageId}`)
            console.log(localmsgs.data.message,'local');

            let Msgs = localmsgs.data.message;
            let currentMesgs= JSON.parse(localStorage.getItem('Msgs')) ||[];
            for(let i=0; i < Msgs.length;i++){
                if(Msgs[i].id >latestmessageId){
                    currentMesgs.push(Msgs[i]);
                    latestmessageId= Msgs[i].id;
                }
            }
            currentMesgs = currentMesgs.slice(-10);
            localStorage.setItem('Msgs',JSON.stringify(currentMesgs));
            let info = JSON.parse(localStorage.getItem('Msgs'));
            console.log(info,'info')
            showMessages(info);

            /*let samedata = localmsgs.data.message

            if((beforedata.length !==0) && (samedata.length !== 0) &&(beforedata[beforedata.length-1].id === samedata[samedata.length-1].id)){
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
                let uniqueid = new Set();
                alllocalmessages=alllocalmessages.filter(item =>{
                    if(!uniqueid.has(item.id)){
                        uniqueid.add(item.id)
                        return true;
                    }
                    return false;
                })
                //console.log(alllocalmessages)
            }
            if(alllocalmessages.length>10){
                const msgsafterdel =alllocalmessages.slice(alllocalmessages.length-10,alllocalmessages.length)
                localStorage.setItem('data',JSON.stringify(msgsafterdel))
            }else{
                localStorage.setItem('data',JSON.stringify(alllocalmessages))
            }
            let datalocal = JSON.parse(localStorage.getItem('data'))
            console.log(datalocal)
            showMessages(datalocal);*/

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
                if(msgText.startsWith("http://localhost:3000/group/groupid/")){
                    const url = msgText;
                    const lastSlashIndex = url.lastIndexOf('/');
                    console.log(lastSlashIndex);
                    const groupId = url.substring(lastSlashIndex + 1);
                    messageText.innerHTML = `${userName}:  <a href="#" onclick="linkclicked(${groupId})">Join link</a>`; 
                }else{
                    messageText.innerText = `${userName}:  ${msgText}`;
                }
                
                newMessage.appendChild(messageText);
                document.querySelector(".chat-messages").appendChild(newMessage);
            }else{
                newMessage.classList.add("message-container-right");
                let messageText = document.createElement("p");
                messageText.classList.add("message-text");
                if(msgText.startsWith("http://localhost:3000/group/groupid/")){
                    const url = msgText;
                    const lastSlashIndex = url.lastIndexOf('/');
                    const groupId = url.substring(lastSlashIndex + 1);
                    messageText.innerHTML = `You:  <a href="#" onclick="linkclicked(${groupId})">Join link</a>`; 
                }else{
                    messageText.innerText = `You :  ${msgText}`;
                }
                
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
        const groupname = prompt('please enter your groupname')
        //console.log(groupname)
        const creationgroup = await axios.post('http://localhost:3000/group/tocreate',{groupname})
        console.log(creationgroup)
        if(creationgroup.status === 201){
            //console.log(creationgroup.data.message.Groupname)
            groupUI(creationgroup.data)
            
        }         
    }
    catch(err){
        console.log(err);
    }
}
function groupUI(data){
    //console.log(data)
    data = Array.from(data.message)
    const parentelement = document.getElementById('group-list');
    if (Array.isArray(data)){
        data.forEach((item)=>{
            let li= document.createElement('li')
            let groupText = document.createElement("div");
            groupText.classList.add("group-text");
            groupText.id = `${item.id}`
            groupText.textContent = `${item.GroupName}`;
            groupText.addEventListener("click", () => switchGroup(item.id,item.GroupName));
            li.appendChild(groupText);
    
            let inviteLink = document.createElement("p")
            inviteLink.innerHTML = `<a href="http://localhost:3000/group/groupid/${item.id}">Invite</a>`
            inviteLink.className = 'invite'
            //inviteLink.textContent = "Invite"
            inviteLink.addEventListener('click',()=> linkclicked(item.id,item.GroupName))
            li.appendChild(inviteLink)  
            parentelement.appendChild(li)
        })
    }else{
        console.log('it is not an array');
    }
    
}
async function linkclicked(id){
    try{
        console.log(id,'clicked on the group link');
        alert('Are you sure to join in this group')
        const usercheckingroupornot = await axios.get(`http://localhost:3000/group/toadduser?groupId=${id}`)
        console.log(usercheckingroupornot.status)
        if(usercheckingroupornot === 200){
            alert('you are already in the group')
        }
        else{
            alert('successfully joined the group')
        }
        
    }
    catch(err){
        console.log(err);
    }
}
function switchGroup(id){
    try{
        console.log(id,'switching to group')
        localStorage.removeItem('Msgs');
        const groupId = localStorage.setItem("groupId",id)
        console.log(groupId);
        location.reload()
    }
    catch(err){
        console.log(err)
    }
}
async function allgroups(){
    try{
        const newgroupRes= await axios.get("http://localhost:3000/group/allgroups")
        groupUI(newgroupRes.data)
        //console.log(newgroupRes.data)
    }
    catch(err){
        console.log(err)
    }
}

