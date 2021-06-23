$(document).ready(() => {
    let nameForm = $("<div>", {
        class:"w-1/3 rounded-l bg-black bg-opacity-20 flex flex-col justify-center align-between text-center shadow-xl"
    }).append(
        $("<p>", {
            class:"text-white m-2",
            text:"Enter Nickname!:"
        }),
        $("<input>", {
            id:"username",
            class:"m-2 px-2 rounded ",
            attr:{
                type:"text",
                placeholder:"Nickname"
            }
        }),
        $("<button>", {
            class:"bg-blue-500 m-2 py-5 rounded-xl hover:bg-blue-600 text-white",
            text:"Submit!"
        }).on("click", () => startGame($("#username").val()))
    )
    toggleModal(nameForm);
    
})

function startGame(name){
    toggleModal();
    joinGame(name)
}