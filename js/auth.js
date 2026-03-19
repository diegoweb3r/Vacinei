/* DECLARAÇÃO */
const loginForm = document.getElementById("login-form");
const loginEmail = document.querySelector('input[type="email"]');
const loginPassword = document.querySelector('input[type="password"]');

const registerForm = document.getElementById("register-form")
const nameRegisterForm = document.querySelector("#full_name");
const emailRegisterForm = document.querySelector("#email");
const cpfRegisterForm = document.querySelector("#cpf");
const birthdateRegisterForm = document.querySelector("#birthdate");
const passwordRegisterForm = document.querySelector("#password");
const confirmPasswordRegisterForm = document.querySelector("#password_confirm");


/*EVENT LISTENERS*/
if(loginForm){

    loginForm.addEventListener("submit", (e) =>{
        e.preventDefault();
        
        if(isLoginFormEmpty()){
            return
        }
        
        console.log("Tentativa de login");
        
        authenticateUser();    
        
    })
}

if(registerForm){
    registerForm.addEventListener("submit", (e) =>{     
            console.log("Click");
            e.preventDefault();
            
            const userData = {
                name: nameRegisterForm.value.trim(),
                email: emailRegisterForm.value.trim(),
                cpf: cpfRegisterForm.value.trim()   ,
                password: passwordRegisterForm.value,
                confirmPassword: confirmPasswordRegisterForm.value        
            }
            
            if(isRegisterFormEmpty(userData)){
                showEmptyFormErrorMessage();
                return
        };
        
        if(!matchPasswords(userData.password, userData.confirmPassword)){
            alert("Opa, senhas não são iguais, reveja!");
            passwordRegisterForm.value = "";
            confirmPasswordRegisterForm.value = "";
            passwordRegisterForm.focus();
            return;
                       
        }

        validateResgister();
    })
}   



/* FUNÇÕES DE LOGIN */
function isLoginFormEmpty(){
    
    const email = loginEmail.value;
    const password = loginPassword.value;

    if (email === "" || password === ""){
        showEmptyFormErrorMessage();
        return true;
    }

    return false;
}

function showEmptyFormErrorMessage(){
    alert ("Opa! Tem campo vazio, não pode. Complete todas as informações, por favor!");
}
function showLoginErrorMessage(){
    alert("Opa, e-mail ou senha invalido! Tente novamente");
}

function authenticateUser(){
    const email = loginEmail.value;
    const password = loginPassword.value;

   if (email === "email@email.com" && password === "12345678"){
        alert("Login efetuado com sucesso. Voce sera redirecionado");
        window.location.href ="../pages/dashboard.html"
   } else {

        showLoginErrorMessage();

   }
}

/* FUNÇÕES DE CADASTRO */

function isRegisterFormEmpty(userData){
   if (userData.name == "" || userData.email == "" || userData.cpf == "" || userData.password == "" || userData.confirmPassword == ""){
        return true;
   }

   return false;
}

function matchPasswords(p1, p2){
    if(p1 === p2){
        return true
    }
    return false;
}

function validateResgister(){
    alert("Cadastro realizado com sucesso! Bem-vindo ao Vacinei.");
    window.location.href = "login.html";
}