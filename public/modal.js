function toggleModal(element){
    if(element){
        addToModal(element);
    }
    let screen = $("#modalScreen");
    screen.fadeToggle(1000)
}

function addToModal(element){
    let content = $("#modalContent");
    content.empty();
    content.append(element);
}