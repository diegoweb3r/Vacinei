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


/* FUNÇÕES DASHBOARD */
function renderUser(){
    usuarioLogadoName.innerText = usuarioLogado.userName;
}

function renderVaccines(){
    const vaccineContainer = document.getElementById("vaccines-container");

    if (!vaccineContainer) return;

    if(usuarioLogado.vaccines.length >= 1){
        vaccineContainer.innerHTML = "";
        vaccineContainer.classList.remove("vaccines-empty");
        vaccineContainer.classList.add("vaccines-grid");

        usuarioLogado.vaccines.forEach(vaccine =>{
            const lableText = setVaccineLable(vaccine.vaccineDate);
            const lable = lableText.toLocaleLowerCase();
            const cardHTML =
            `<article id="vaccines-container" class="vaccines__card__container">
                <div class="vaccines__card">
                    <div class="vaccines__card-img">
                        <img class="vaccines__card-img-img" src="../assets/images/vacina.png" alt="icone de vacina">
                    </div>
                    <div class="vaccines__card-text">
                        <div class="vaccines_card-text__name">
                            <h3 class="vaccines__card-text__title">${vaccine.vaccineName}</h3>
                            <span class="status-badge ${lable}">${lableText}</span>
                        </div>
                        
                        <div class="vaccines__card-text__info">
                            <p class="vaccines__card-text__info__dose">${vaccine.vaccineDose}</p>
                            <p class="vaccines_card-text__info__date">${vaccine.vaccineDate}</p>
                            <p class="vaccines__card-text__info__lote">${vaccine.vaccineLote}</p>
                        </div>
                    </div>
                    
                </div>
                <div class="vaccine__buttons">
                    <button class="vaccine__buttons__edit" aria-label="Editar vacina"><img src="../assets/images/edit.png" alt="icone de editar"></button>
                    <button class="vaccine__buttons__delete" aria-label="Excluir vacina"><img src="../assets/images/delete.png" alt="icone de excluir"></button>
                </div>
            </article>`

            vaccineContainer.innerHTML += cardHTML;
        })} else {
            const emptyCardHTML = 
            `<article id='empty-slot' class='sections'>
                <h2>Sem vacinas cadastradas ainda</h2>
            </article>`;
            vaccineContainer.innerHTML = emptyCardHTML;
        }
}

renderVaccines(); 


function renderVaccinesCounter(){
    const stats = vaccinesCounter();
    let totalVaccines = document.getElementById("total-vaccines-stats");
    let appliedVaccines = document.getElementById("applied-vaccines-stats");
    let pendingVaccines = document.getElementById("pending-vaccines-stats");

    if (!totalVaccines) return;
    
    totalVaccines.innerHTML = stats.total;
    appliedVaccines.innerHTML = stats.applied;
    pendingVaccines.innerHTML = stats.pending;
    
}

function vaccinesCounter(){
    let totalVaccines = 0;
    let appliedVaccines = 0;
    let penddingVaccines = 0;

    const lista = usuarioLogado.vaccines || [];

    lista.forEach(vaccine =>{
        totalVaccines++;

        const status = setVaccineLable(vaccine.vaccineDate);
        if(status === "Aplicada"){
            appliedVaccines++;
        } else{
            penddingVaccines++
        }; 
    })

     return {
            total: totalVaccines,
            applied: appliedVaccines,
            pending: penddingVaccines
        }
}

renderVaccinesCounter();


/* OUTRAS FUNÇÕES */
function logout(){
    const confirmLogout = confirm("Voce realmente deseja sair?");

    if (confirmLogout){
            localStorage.removeItem("usuarioLogado");
            linkToLogin();
        }
    
}


function isUserLogged(){
    if(usuarioLogado && usuarioLogadoName){
        renderUser();
    } else if (!usuarioLogado){
        linkToLogin();
    }   
}
