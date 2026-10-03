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

const deletAccButton = document.getElementById("deletAcc");

const oldPasswordConfig = document.getElementById("password");
const newPasswordConfig = document.getElementById("newpassword");
const confirmnewpasswordConfig = document.getElementById("confirmnewpassword");
const saveBttn = document.getElementById("saveBttn")

const noPicture = "../assets/images/pessoas.png"
const uploadedPic = document.getElementById("profile-pic-uploaded");
const profilePic = document.getElementById("profile-pic");
const profilePicDashboard = document.getElementById("profile-picture-dashboard");

const userNameConfig = document.getElementById("user-name-config");
const userEmailConfig = document.getElementById("user-email-config");
const userCpfConfig = document.getElementById("user-cpf-config");
const userBirthdayConfig = document.getElementById("user-birthday-config");
/*FUNÇÕES IMEDIATAS*/
if(birthdateRegisterForm){
    maxBirthdayDate();
}

renderUserPicture();

renderUserInformation();

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
            userPhoto: null,
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

if(deletAccButton){
    deletAccButton.addEventListener("click", e =>{
        e.preventDefault();
        deleteUser();
    })
}

if(saveBttn){
    saveBttn.addEventListener("click", e =>{
        e.preventDefault();
        checkUpdatesSettings();
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

/* ALTERAÇÃO DE PERFIL */
function updatePassword(oldPasswordConfig, newPasswordConfig, confirmnewpasswordConfig){
    if(oldPasswordConfig.value !== usuarioLogado.password){
       alert("Opa, sua senha atual está errada! Verifique")
       
       oldPasswordConfig.focus();
       clearUpdatePassword();
    } else{
        if(!matchPasswords(newPasswordConfig.value, confirmnewpasswordConfig.value)){
            alert("Opa, senhas não são iguais, reveja!")
            clearUpdatePassword();
        } else{
            usuarioLogado.password = newPasswordConfig.value;
            DB.updateMasterList(usuarioLogado);
            DB.setLogged(usuarioLogado);
            alert("Tudo certo! Senha Alterada");
            clearUpdatePassword();
        }
    }
}

function setUserPicture(){
    const picFile = uploadedPic.files[0];
    const reader = new FileReader();

    reader.onload = () =>{
        profilePic.src = reader.result;
        usuarioLogado.userPhoto = reader.result;
        DB.updateMasterList(usuarioLogado);
        DB.setLogged(usuarioLogado);

    };

    reader.readAsDataURL(picFile);
}

function renderUserPicture(){
    if(profilePic && usuarioLogado.userPhoto !== null){
        profilePic.src = usuarioLogado.userPhoto;
    } 

    if(profilePicDashboard && usuarioLogado.userPhoto !== null){
        profilePicDashboard.src = usuarioLogado.userPhoto;
    }
}

/* EXCLUSÃO DE PERFIL */
function deleteUser(){

    const usuarioLogado = DB.getLogged();
    if(!usuarioLogado){
        alert("Nenhum usuario logado")
        redirectToLogin();
        return;

    }
    if(confirm("Você tem certeza que deseja excluir sua conta? Essa decisão não podera ser desfeita")){
        
        DB.deleteUser(usuarioLogado);
        DB.clearLogged();
        redirectToLogin();
    }
}

/* OUTRAS FUNÇÕES */
function cleanRegisterPasswordInput(){
    passwordRegisterForm.value = "";
    confirmPasswordRegisterForm.value = "";
    passwordRegisterForm.focus();
}

function clearUpdatePassword(){
    oldPasswordConfig.value = "";
    newPasswordConfig.value = "";
    confirmnewpasswordConfig.value ="";
}

function checkUpdatesSettings(){
    if(oldPasswordConfig.value || newPasswordConfig.value || confirmnewpasswordConfig.value){
        updatePassword(oldPasswordConfig, newPasswordConfig, confirmnewpasswordConfig);
    }

    if(uploadedPic.files[0]){
        setUserPicture();
    }
}

function setUpBirthdayDate(){
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, 0);
    const day = String(today.getDate()).padStart(2, 0);

    const formatedDate = `${day}/${month}/${year}`;
    return formatedDate;
}

function maxBirthdayDate(){
    if(birthdateRegisterForm){
        userAge = setUpBirthdayDate();    
        birthdateRegisterForm.max = userAge;
    }
}

function renderUserInformation(){
   
    userNameConfig.innerText = usuarioLogado.userName;
    userEmailConfig.innerText = usuarioLogado.email;
    userCpfConfig.innerText = usuarioLogado.cpf;
    userBirthdayConfig.innerText = setUpBirthdayDate(usuarioLogado.birthday)
}