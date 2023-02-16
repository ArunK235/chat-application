async function signUp(e){
    try{
        e.preventDefault();
        console.log(e.target.email.value);
        const signUpDetails={
            name: e.target.name.value,
            email: e.target.email.value,
            number: e.target.number.value,
            password: e.target.password.value
        }
        console.log(signUpDetails);
        const response= await axios.post('http://localhost:3000/user/signup', signUpDetails)
        console.log(response);
        if(response.status === 200){
            alert(response.data.message)
            window.location.href="../login/login.html";
        }
        else{
            console.log(err);
            throw new Error('failed to login')
        }
    }
    catch(err){
        console.log(err);
        document.body.innerHTML=`<div style='color:red;'>${err}</div>`
    }
}