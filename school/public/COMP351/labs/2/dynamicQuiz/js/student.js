let arrData = [];
//Get localstorage
function loadData(){
    if (typeof(Storage) !== "undefined") {
        
        // Retrieve  //Data is array in json
        let data = JSON.parse(localStorage.getItem("quizquestion"));
        if(data != null){
            arrData = [...data];
            loadTextArea();
        }
        else{
            //If its not intialized
            localStorage.setItem("quizquestion",JSON.stringify([]));
        }
    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
    }
}
loadData();

function loadTextArea(){
    let main = document.getElementsByTagName("MAIN")[0];
    for(let count = 0; count < arrData.length; count++){
        let container = document.createElement("section");
        container.className = "container-quizbox";
        container.innerHTML =`   
            <h2>Question ${count+1} </h2>
            <textarea name="" cols="25" rows="8" disabled>
            ${arrData[count].question}
            </textarea>
            <div class="question">
                <input type="radio" name="quiz">
                <input type="text" disabled value="${arrData[count].choices[0]}" >      
            </div>
            <div class="question">
                <input type="radio" name="quiz">
                <input type="text" disabled value="${arrData[count].choices[1]}" >      
            </div>
            <div class="question">
                <input type="radio" name="quiz">
                <input type="text" disabled value="${arrData[count].choices[2]}" >      
            </div>
            <div class="question">
                <input type="radio" name="quiz">
                <input type="text" disabled value="${arrData[count].choices[3]}" >      
            </div>
        `;

        main.appendChild(container);
    }
}