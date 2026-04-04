const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

function setVaccineLabel(vaccineDate){
    const dateVaccine = new Date(vaccineDate).getTime();
    const today = Date.now();

    if(dateVaccine > today){
        return "Pendente"
    } else {
        return "Aplicada"
    }
}

function redirectToLogin(){
    window.location.href = "login.html"
}

function redirectToDashboard(){
    window.location.href = "dashboard.html"
}

function calculateAge(){
    const today = new Date();
    const birthday = new Date(birthdateRegisterForm.value);

    let age = today.getFullYear() - birthday.getFullYear();
    const monthDiff = today.getMonth() - birthday.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() <  birthday.getDate())){
        age--;
    }

    return age;
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

function matchPasswords(p1, p2){
    if(p1 === p2){
        return true
    };

    return false;
}

function checkUserAccess(){
    if(usuarioLogado && usuarioLogadoName){
        renderUser();
        renderVaccines();
        renderVaccinesCounter();
    } else if (!usuarioLogado){
        linkToLogin();
    }   
}