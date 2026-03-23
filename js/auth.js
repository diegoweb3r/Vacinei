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

const helperLength = document.getElementById("password-length");
const helperNumber = document.getElementById("password-number");
const helperLetter = document.getElementById("password-letter");
const helperSpecial = document.getElementById("password-special-caracter");

/*FUNÇÕES IMEDIATAS*/
setUpBirthdayDate();



/*EVENT LISTENERS*/
if(loginForm){
    loginForm.addEventListener("submit", (e) =>{
        e.preventDefault();
        
        if(isLoginFormEmpty()){
            return
        };

        if(authenticateUser()){
            alert("Tudo certo, voce será redirecionado")
            linkToDashboard();  
        }
        
    });
};

if(registerForm){
    passwordRegisterForm.addEventListener("input", (e) =>{
        validatePassword(passwordRegisterForm.value);   
    });
}
    
if(registerForm){
    registerForm.addEventListener("submit", (e) =>{     
        e.preventDefault();
            
        const userData = {
            userName: nameRegisterForm.value.trim(),
            email: emailRegisterForm.value.trim(),
            cpf: cpfRegisterForm.value.replace(/\D/g, ""),
            birthday: birthdateRegisterForm.value,
            password: passwordRegisterForm.value,
            confirmPassword: confirmPasswordRegisterForm.value        
        };
            
        if(isRegisterFormEmpty(userData.userName)){
            showEmptyFormErrorMessage();
            return
        };

        if(!validatePassword(userData.password)){
            alert("Senha muito fraca, pensa em outra!");
            return;
        };
    
        if(!matchPasswords(userData.password, userData.confirmPassword)){
            alert("Opa, senhas não são iguais, reveja!");
            cleanRegisterPasswordInput();
            return;             
        };

        validateResgister(userData);
    })
}   

/* FUNÇÕES DE LOGIN */
function isLoginFormEmpty(){
    
    const email = loginEmail.value;
    const password = loginPassword.value;

    if (email === "" || password === ""){
        showEmptyFormErrorMessage();
        return true;
    };

    return false;
};

function authenticateUser(userData){
    const email = loginEmail.value.trim();
    const password = loginPassword.value;

    let users = JSON.parse(localStorage.getItem("usuarios")) || [];
    const userFound = users.find(user => user.email === userData.email);

    if(!userFound){
        alert("Usuario não encontrado");
        return false;
    } else if(userFound.password !== password) {
        alert("Senha incorreta");
        return false;
    }

    sessionData = {
        name: userFound.name,
        email: userFound.email,
        cpf: userFound.cpf,
        id: userFound.id
    };

    localStorage.setItem("usuarioLogado", JSON.stringify(sessionData))

    return true;
  
}

/* FUNÇÕES DE CADASTRO */
function isRegisterFormEmpty(userData){
   if (userData.name == "" || userData.email == "" || userData.cpf == "" || userData.password == "" || userData.confirmPassword == ""){
        return true;
   };

   return false;
}

function matchPasswords(p1, p2){
    if(p1 === p2){
        return true
    };

    return false;
}

function validateResgister(userData){
    let users = JSON.parse(localStorage.getItem("usuarios")) || [];

    const emailExists = users.find(user => user.email === userData.email);
    const cpfExists = users.find(user => user.cpf === userData.cpf);
    const age = calculateAge(userData.birthday);

    if(emailExists){
        alert("Opa! email ja cadastrado, utilize outro ou recupe sua senha");
        return;
    }
 
    if (cpfExists){
        alert("Opa! CPF ja cadastrado, utilize outro ou recupe sua senha");
        return;
    }

    userData.id = Date.now();

    if(age < 16 || age > 120) {
        alert("Opa, certeza que essa idade esta certa? Voce precisa ter mais de 16 anos para usar nosso programa");
        return
    }

    users.push(userData);

    localStorage.setItem("usuarios", JSON.stringify(users));
    
    alert("Cadastro realizado com sucesso! Bem-vindo ao Vacinei.");
    linkToLogin();
}

function validatePassword(password){
    const isLengthValid = password.length >= 8;
    const hasNumber = /[0-9]/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password);

    if (isLengthValid){
       helperLength.classList.add("helper-valid")
    } else {
        helperLength.classList.remove("helper-valid")
    };

    if(hasNumber){
        helperNumber.classList.add("helper-valid")
    } else {
        helperNumber.classList.remove("helper-valid")
    };

    if(hasLetter){
        helperLetter.classList.add("helper-valid")
    } else {
        helperLetter.classList.remove("helper-valid")
    };

    if(hasSpecial){
        helperSpecial.classList.add("helper-valid")
    } else {
        helperSpecial.classList.remove("helper-valid")
    };

    return isLengthValid && hasLetter && hasNumber && hasSpecial;
}  



/* OUTRAS FUNÇÕES */
function cleanRegisterPasswordInput(){
    passwordRegisterForm.value = "";
    confirmPasswordRegisterForm.value = "";
    passwordRegisterForm.focus();
}

/*REDIRECIONADORES */
function linkToDashboard(){
    window.location.href = "dashboard.html"
}

function linkToLogin(){
    window.location.href = "login.html"
}

/* FUNÇÕES DE ALERTAS */
function showEmptyFormErrorMessage(){
    alert ("Opa! Tem campo vazio, não pode. Complete todas as informações, por favor!");
};

function showLoginErrorMessage(){
    alert("Opa, e-mail ou senha invalido! Tente novamente");
};

function calculateAge(birthdayValue){
    const today = new Date();
    const birthday = new Date(birthdateRegisterForm.value);

    let age = today.getFullYear() - birthday.getFullYear();
    const monthDiff = today.getMonth() - birthday.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() <  birthday.getDate())){
        age--;
    }

    return age;
}

function setUpBirthdayDate(){
    if(birthdateRegisterForm){
        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, 0);
        const day = String(today.getDate()).padStart(2, 0);

        const formatedDate = `${year}-${month}-${day}`;

        birthdateRegisterForm.max = formatedDate;
    }
}