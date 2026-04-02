function setVaccineLable(vaccineDate){
    const dateVaccine = new Date(vaccineDate).getTime();
    const today = Date.now();

    if(dateVaccine > today){
        return "Pendente"
    } else {
        return "Aplicada"
    }
}