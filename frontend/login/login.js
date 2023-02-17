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
        //console.log(loginres,'imp');
        if(loginres.status === 200){
            alert('login successful')
            localStorage.setItem('username',loginres.data.data.name);
            localStorage.setItem('token',loginres.data.token)
            
            window.location.href="../main/main.html"
        }
    }
    catch(err){
        console.log(err);
    }
}
