/*DECLARAÇÕES*/
const logoutButton = document.getElementById("logoutButton");
const logoutButtonLink = document.getElementById("logout-button-link");
const usuarioLogadoName = document.querySelector(".profile-inf__name");

const searchInput = document.getElementById("vaccine-search");

checkUserAccess();

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

if(searchInput){
    searchInput.addEventListener("input", handleSearch)
}


/* FUNÇÕES DASHBOARD */

function goToAddVaccine() {
    sessionStorage.removeItem("editId");
    window.location.href = "cadastro-vacina.html";
}

function renderUser(){
    usuarioLogadoName.innerText = usuarioLogado.userName;
}

function renderVaccines(vaccinesList = usuarioLogado.vaccines){
    const vaccineContainer = document.getElementById("vaccines-container");

    if (!vaccineContainer) return;

    if(vaccinesList && vaccinesList.length > 0){
        vaccineContainer.innerHTML = "";
        vaccineContainer.classList.remove("vaccines-empty");
        vaccineContainer.classList.add("vaccines-grid");

        vaccinesList.forEach(vaccine =>{
            const lableText = setVaccineLabel(vaccine.vaccineDate);
            const lable = lableText.toLocaleLowerCase();
            const cardHTML =
            `<article  class="vaccines__card__container">
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
                            <p class="vaccines_card-text__info__date">${formateDateToBR(vaccine.vaccineDate)}</p>
                            <p class="vaccines__card-text__info__lote">${vaccine.vaccineLote}</p>
                        </div>
                    </div>
                    
                </div>
                <div class="vaccine__buttons">
                    <button class="vaccine__buttons__edit" onclick="prepareToEditVaccine(${vaccine.id})" aria-label="Editar vacina"><img src="../assets/images/edit.png" alt="icone de editar"></button>
                    <button class="vaccine__buttons__delete" onclick="deleteVaccine(${vaccine.id})" aria-label="Excluir vacina"><img src="../assets/images/delete.png" alt="icone de excluir"></button>
                </div>
            </article>`

            vaccineContainer.innerHTML += cardHTML;
        })} else {
            vaccineContainer.innerHTML = "";
            vaccineContainer.classList.remove("vaccines-grid");
            vaccineContainer.classList.add("vaccines-empty");
            const emptyCardHTML = 
            `<article id='empty-slot' class='sections'>
                <h2>Sem vacinas cadastradas ainda</h2>
            </article>`;
            vaccineContainer.innerHTML = emptyCardHTML;
        }
}

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
    let pendingVaccines = 0;

    const userVaccines = usuarioLogado.vaccines || [];

    userVaccines.forEach(vaccine =>{
        totalVaccines++;

        const status = setVaccineLabel(vaccine.vaccineDate);
        if(status === "Aplicada"){
            appliedVaccines++;
        } else{
            pendingVaccines++
        }; 
    })

     return {
            total: totalVaccines,
            applied: appliedVaccines,
            pending: pendingVaccines
        }
}

function deleteVaccine(id){
    if(confirm("Voce tem certeza que deseja excluir essa vacina?")){
        usuarioLogado.vaccines = usuarioLogado.vaccines.filter(v => v.id !== id);

        DB.setLogged(usuarioLogado);

        DB.updateMasterList(usuarioLogado);

        renderVaccines();
        renderVaccinesCounter();

        alert("Vacina removida")
    }
}

function handleSearch(e){
  e.preventDefault();

  const searchInput = document.getElementById("vaccine-search");
  const searchTerm = searchInput.value.toLowerCase().trim();

  const allVaccines = document.querySelectorAll(".vaccines__card__container");

  allVaccines.forEach((vaccine) => {
    const titleText = vaccine.querySelector(".vaccines_card-text__name").textContent.toLowerCase();
    vaccine.style.display = titleText.includes(searchTerm) ? "flex" : "none";
  });
}


function prepareToEditVaccine(id){
    sessionStorage.setItem("editId", id);
    redirectToCadastro();
}

/* OUTRAS FUNÇÕES */
function logout(){
    const confirmLogout = confirm("Voce realmente deseja sair?");

    if (confirmLogout){
            DB.clearLogged();
            redirectToLogin();
        }
    
}



