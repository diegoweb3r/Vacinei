/*DECLARAÇÕES*/
const logoutButton = document.getElementById("logoutButton");
const logoutButtonLink = document.getElementById("logout-button-link");
const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
const usuarioLogadoName = document.querySelector(".profile-inf__name");

isUserLogged();

/* EVENT LISTENER */
if(logoutButton){
    logoutButton.addEventListener("click", () =>{
        logout()
    });
}

if(logoutButtonLink){
    logoutButtonLink.addEventListener("click", () =>{
        logout()
    });
}

/* FUNÇÕES */
function logout(){
    const confirmLogout = confirm("Voce realmente deseja sair?");

    if (confirmLogout){
            localStorage.removeItem("usuarioLogado");
            linkToLogin();
        }
    
}

function completeDashboardUser(){
    console.log(usuarioLogado.userName)
    usuarioLogadoName.innerText = usuarioLogado.userName;

}



function isUserLogged(){
    if(usuarioLogado && usuarioLogadoName){
        completeDashboardUser();
    } else if (!usuarioLogado){
        linkToLogin();
    }   
}
