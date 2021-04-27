let url = "https://us-central1-forschool-5a2a8.cloudfunctions.net/app";
let arrData = [];
//Get localstorage
function loadData(){
    readDatabase(url);
}

function readDatabase(url){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText);
            if(data != null){
                arrData = [...data];
                loadTextArea();
            }
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
 
} 

loadData();

function loadTextArea(){
    let main = document.getElementsByTagName("MAIN")[0];
    for(let count = 0; count < arrData.length; count++){
       // console.log(arrData[count].question);
        let container = document.createElement("section");
        container.className = "container-quizbox";
        container.innerHTML =`   
            <h2>Question ${count+1} </h2>
            <h3>Question ID: ${arrData[count].qid}</h3>
            <textarea name="" cols="25" rows="8" disabled>
            ${arrData[count].answers.question}
            </textarea>
            <div class="question">
                <input type="radio" name="quiz${count+1}" value="A">
                <input type="text" value="${arrData[count].answers.choices[0]}" disabled>      
            </div>
            <div class="question">
                <input type="radio" name="quiz${count+1}" value="B">
                <input type="text" value="${arrData[count].answers.choices[1]}" disabled>      
            </div>
            <div class="question">
                <input type="radio" name="quiz${count+1}" value="C">
                <input type="text" value="${arrData[count].answers.choices[2]}" disabled>      
            </div>
            <div class="question">
                <input type="radio" name="quiz${count+1}" value="D">
                <input type="text" value="${arrData[count].answers.choices[3]}" disabledfi>      
            </div>
        `;

        main.appendChild(container);
    }
}

//Calcuate answwers
function calcAnswers(){
    // let answers = document.querySelectorAll()('input[name="quiz"]:checked').value;
    // Retrieve  //Data is array in json
    // let data = JSON.parse(localStorage.getItem("quizquestion"));
    let answer = document.getElementById("answer");

    if(arrData.length > 0){
        let choosenAnswers = getChoosenAnswers();

        let correct = 0;

        for(let x = 0; x < choosenAnswers.length ; x++){
            if(choosenAnswers[x] == arrData[x].answers.answer){
                correct++;
            }
        }

        let grade =  (correct/choosenAnswers.length ) * 100;
        
        
        answer.innerHTML = "You got " + correct +" correct answer" + " Your grade is: " +grade +"%";

    }
    else{
        answer.innerHTML = "There are no questions to submit";
    }

}

function getChoosenAnswers(){
    let answersPicked = [];
    let count = 0;
    let questionsDOMArr = document.getElementsByClassName("container-quizbox");
    //Loop through container
    for (const iterator of questionsDOMArr) {
        count = 0;
        //Don't need the Question number so filter it out //case sensitive
        let textData = Array
            .from(iterator.children)
            .filter(node=>check = node.nodeName!= "H2" |node.nodeName!= "TEXTAREA");

        textData.forEach(node=>{
            if(node.nodeName == "DIV" && node.className =="question"){
                //radio button
                if(node.children[0].checked == true){
                    answersPicked.push(node.children[0].value);
                }
                else{
                    //If count == 4 no answer was choosen
                    count++;
                }
                if(count == 4){
                    answersPicked.push("");
                }
                
            }
        });
    }
    return answersPicked;
}
