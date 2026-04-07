const formVaccines = document.getElementById("form-Vaccines")
const vaccineName = document.getElementById("vaccine-name");
const vaccineDate = document.getElementById("vacina-data");
const vaccineDose = document.getElementById("vacina-dose");
const vaccineLote = document.getElementById("vacina-lote");
const editId = sessionStorage.getItem("editId");
const salveButton = document.getElementById("salve-button");

checkUserAccess();

/* FUNÇÕES */

if(editId){
    document.querySelector("h2").innerText = "Editar Vacina";
    salveButton.innerText = "Atualizar Vacina";
    const vaccineToEdit = usuarioLogado.vaccines.find(v => v.id == editId);

    if(vaccineToEdit){
        vaccineName.value = vaccineToEdit.vaccineName;
        vaccineDate.value = vaccineToEdit.vaccineDate;
        vaccineDose.value = vaccineToEdit.vaccineDose;
        vaccineLote.value = vaccineToEdit.vaccineLote;
    }
}

if(formVaccines){
    formVaccines.addEventListener("submit", (e) =>{
        e.preventDefault();


        const vaccineNameToAdd = vaccineName.value;
        const vaccineDateToAdd = vaccineDate.value;
        const vaccineDoseToAdd = vaccineDose.value;
        const vaccineLoteToAdd = vaccineLote.value;
       
        const vaccineData = {
            vaccineName: vaccineNameToAdd,
            vaccineDate: vaccineDateToAdd,
            vaccineDose: vaccineDoseToAdd,
            vaccineLote: vaccineLoteToAdd,
            vaccineLable: setVaccineLabel(vaccineDateToAdd),
            id: editId ? Number(editId) : Date.now()
        } 

        if(editId){
            const index = usuarioLogado.vaccines.findIndex(v => v.id == editId);
            if (index !== -1) {
                usuarioLogado.vaccines[index] = vaccineData;
            }
            sessionStorage.removeItem("editId");
        } else {
            if (!usuarioLogado.vaccines) usuarioLogado.vaccines = [];
            usuarioLogado.vaccines.push(vaccineData);
        }

        DB.setLogged(usuarioLogado);
        DB.updateMasterList(usuarioLogado);

        alert(editId ? "Vacina atualizada!" : "Vacina cadastrada!");
        redirectToDashboard();
    })
}