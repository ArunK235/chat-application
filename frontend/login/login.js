async function login(e){
    try{
        e.preventDefault();
        const logInDetails={
            email:e.target.email.value,
            password: e.target.password.value
        }
        console.log(logInDetails);
        const response = await axios.post('http://localhost:3000/user/login',logInDetails)
        if(response.status ===200){
            localStorage.setItem('token',response.data.token)
            //window.location.href="../chat-window/chat-window.html"
        }
    }
    catch(err){
        document.body.innerHTML=`<div style='color:red;'>${err}</div>`
    }
}