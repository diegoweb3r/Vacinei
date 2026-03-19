const loginForm = document.querySelector(".auth-form");
const loginEmail = document.querySelector('input[type="email"]');
const loginPassword = document.querySelector('input[type="password"]');

loginForm.addEventListener("submit", (e) =>{
    e.preventDefault();

    if(authBlankLoginInformations()){
        return
    }

    console.log("Tentativa de login");

    authEmailPassword();    

})

function authBlankLoginInformations(){
    
    const email = loginEmail.value;
    const password = loginPassword.value;

    if (email === "" || password === ""){
        alert ("Opa! Digite seu e-mail ou senha");
        return true;
    }

    return false;
}

function authIncorrectMsg(){
    alert("Opa, e-mail ou senha invalido! Tente novamente")
}

function authEmailPassword(){
    const email = loginEmail.value;
    const password = loginPassword.value;

   if (email === "email@email.com" && password === "12345678"){
        alert("Login efetuado com sucesso. Voce sera redirecionado");
        window.location.href ="../pages/dashboard.html"
   } else {

        authIncorrectMsg();

   }
}