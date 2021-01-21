//Its an embedded script so I cant simply import it
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
                <input type="radio" name="quiz${count+1}" value="A">
                <input type="text" disabled value="${arrData[count].choices[0]}" >      
            </div>
            <div class="question">
                <input type="radio" name="quiz${count+1}" value="B">
                <input type="text" disabled value="${arrData[count].choices[1]}" >      
            </div>
            <div class="question">
                <input type="radio" name="quiz${count+1}" value="C">
                <input type="text" disabled value="${arrData[count].choices[2]}" >      
            </div>
            <div class="question">
                <input type="radio" name="quiz${count+1}" value="D">
                <input type="text" disabled value="${arrData[count].choices[3]}" >      
            </div>
        `;

        main.appendChild(container);
    }
}

//Calcuate answwers
function calcAnswers(){
    // let answers = document.querySelectorAll()('input[name="quiz"]:checked').value;
    // Retrieve  //Data is array in json
    let data = JSON.parse(localStorage.getItem("quizquestion"));
    let choosenAnswers = getChoosenAnswers();

    let correct = 0;

    for(let x = 0; x < choosenAnswers.length ; x++){
        console.log(data[x].answer);
        if(choosenAnswers[x] == data[x].answer){
            correct++;
        }
    }

    let grade =  (correct/choosenAnswers.length ) * 100;
    
    let answer = document.getElementById("answer");
    answer.innerHTML = "You got " + correct +" correct answer" + " Your grade is: " +grade +"%";



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
