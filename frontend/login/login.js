localStorage.clear()

function loginfun(e){
    e.preventDefault();
    const logInDetails={
        email:e.target.email.value,
        password: e.target.password.value
    }
    datafetch(logInDetails);

}


async function datafetch(logInDetails){
    try{
        const loginres = await axios.post('http://localhost:3000/user/login',logInDetails)
        console.log(loginres);
        if(loginres.status === 200){
            alert('login successful')
            console.log(loginres.data.data,'username')
            localStorage.setItem('token',loginres.data.token)
            localStorage.setItem('username',loginres.data.data);
            window.location.href="../main/main.html"
        }
    }
    catch(err){
        console.log(err,'error happend at dsa');
    }
}
