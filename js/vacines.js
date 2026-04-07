const formVaccines = document.getElementById("form-Vaccines")
const vaccineName = document.getElementById("vaccine-name");
const vaccineDate = document.getElementById("vacina-data");
const vaccineDose = document.getElementById("vacina-dose");
const vaccineLote = document.getElementById("vacina-lote");

const salveButton = document.getElementById("salve-button");

checkUserAccess();

/* FUNÇÕES */

if(formVaccines){
    formVaccines.addEventListener("submit", (e) =>{
        e.preventDefault();

        const vaccineNameToAdd = vaccineName.value;
        const vaccineDateToAdd = vaccineDate.value;
        const vaccineDoseToAdd = vaccineDose.value;
        const vaccineLoteToAdd = vaccineLote.value;
       
        const newVaccine = {
            vaccineName: vaccineNameToAdd,
            vaccineDate: vaccineDateToAdd,
            vaccineDose: vaccineDoseToAdd,
            vaccineLote: vaccineLoteToAdd,
            vaccineLable: setVaccineLabel(vaccineDateToAdd),
            id: Date.now()
        } 

        if (!usuarioLogado.vaccines) {
            usuarioLogado.vaccines = [];
        }

        usuarioLogado.vaccines.push(newVaccine);
        DB.setLogged(usuarioLogado);
    
        const userList = DB.getUsers();
        const index = userList.findIndex(u => u.id === usuarioLogado.id);
        
        if(index !== -1){
            userList[index] = usuarioLogado;
        }

        DB.setUsers(userList);

        alert("Tudo certo!")
    })
}