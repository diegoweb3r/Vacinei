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
if(birthdateRegisterForm){
    setUpBirthdayDate();
}

/*EVENT LISTENERS*/
if(loginForm){
    loginForm.addEventListener("submit", (e) =>{
        e.preventDefault();
        
        if(isLoginFormEmpty()){
            return
        };

        if(authenticateUser()){
            alert("Tudo certo, voce será redirecionado")
            redirectToDashboard();  
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
            confirmPassword: confirmPasswordRegisterForm.value,
            vaccines: []       
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

        validateRegister(userData);
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

function authenticateUser(){
    const email = loginEmail.value.trim();
    const password = loginPassword.value;

    let users = DB.getUsers();
    const userFound = users.find(user => user && user.email === email);

    if(!userFound){
        alert("Usuario não encontrado");
        return false;
    } else if(userFound.password !== password) {
        alert("Senha incorreta");
        return false;
    }

    DB.setLogged(userFound);

    return true;  
}

/* FUNÇÕES DE CADASTRO */
function isRegisterFormEmpty(userData){
   if (userData.userName == "" || userData.email == "" || userData.cpf == "" || userData.password == "" || userData.confirmPassword == ""){
        return true;
   };

   return false;
}

function validateRegister(userData){
    let users = DB.getUsers();

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

    DB.setUsers(users);
    
    alert("Cadastro realizado com sucesso! Bem-vindo ao Vacinei.");
    redirectToLogin();
}


/* OUTRAS FUNÇÕES */
function cleanRegisterPasswordInput(){
    passwordRegisterForm.value = "";
    confirmPasswordRegisterForm.value = "";
    passwordRegisterForm.focus();
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