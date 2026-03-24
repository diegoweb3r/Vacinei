/*DECLARAÇÕES*/
const logoutButton = document.getElementById("logoutButton");
const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
const usuarioLogadoName = document.querySelector(".profile-inf__name");

if(usuarioLogado && usuarioLogadoName){
    completeDashboardUser();
} else if (!usuarioLogado){
    linkToLogin();
}

/* EVENT LISTENER */
if(logoutButton){
    logoutButton.addEventListener("click", () =>{
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

