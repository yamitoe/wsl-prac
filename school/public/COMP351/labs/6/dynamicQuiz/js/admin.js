
let arrData = [];
let url = "http://localhost:5001/forschool-5a2a8/us-central1/app";

//Get localstorage
function loadData(){
    readDatabase(url);
}

function enableDisable(disable)
{
     document.getElementById("textBoxID").disabled = disable;
}
// {question: "" , choices: [1,1,1,1] answer:"A"}

function readDatabase(url){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // document.getElementById("result").innerHTML = this.responseText;
            let data = JSON.parse(this.responseText);
            if(data != null){
                arrData = [...data];
                resetTextArea();
                loadTextArea();
            }
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
 
} 

loadData();
//I realized I could have simplfied this if I just gave them class names
function onSave(){
    let updatedArr = [];
    let tempArr= [];
    let o = {};
    let tempobj = {};
        let questionsDOMArr = document.getElementsByClassName("container-add");
        for (const iterator of questionsDOMArr) {
            let textData = Array
                .from(iterator.children)
                .filter(node=>check = node.nodeName!= "H2");
            // Grab the data from input fields to store away
            textData.forEach(node=>{
                if(node.nodeName == "DIV" && node.className =="question"){
                    tempArr.push(node.children[1].value); 
                    //radio button
                    if(node.children[0].checked == true){
                        o.answer = node.children[0].value;
                    }
             
                }
                else{
                    // {question: ""}
                    o.question = node.value;
                }
            });
                // {question: "" , choices: [1,1,1,1]. answer:"A"}
            o.choices = tempArr;
            //Reset arrary
            tempArr = [];
      
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    //Reload
                    loadData();
                }
            };
            let updateOrInsert = document.querySelector('input[name="insertupdate"]:checked').value;
            let qid = document.getElementById("textBoxID").value;
            if(updateOrInsert == "PUT"){
                //{"qid":2, "anws":{"question": "No" , "choices": [1,1,1,1], "answer":"A"}}
                tempobj = {qid:qid, anws: o};
                xhttp.open("PUT", url, true);
                xhttp.setRequestHeader("Content-Type", "application/json");
                xhttp.send(JSON.stringify(tempobj));
            }else{
                xhttp.open("POST", url, true);
                xhttp.setRequestHeader("Content-Type", "application/json");
                xhttp.send(JSON.stringify(o));
            }
            

        }
}

function onDelete(){
    let qid = document.getElementById("textBoxID").value;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            resetTextArea();
            //Reload
            loadData();
        }
    };
    xhttp.open("DELETE", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify({qid}));
   
}


function resetTextArea(){
    let parentNode = document.getElementsByClassName("container-quizbox");
    let length = parentNode.length;
    let amount = parentNode.length -1;
    while( length > 0){
        parentNode[amount].remove(parentNode[amount]);
        length--;
        amount--;
    }
}


//Was hoping I could use the same as above but since I had to loop it I had to just make another one
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
                <input type="radio" name="quiz${count+1}" value="A" disabled>
                <input type="text" value="${arrData[count].answers.choices[0]}" disabled>      
            </div>
            <div class="question">
                <input type="radio" name="quiz${count+1}" value="B" disabled>
                <input type="text" value="${arrData[count].answers.choices[1]}" disabled>      
            </div>
            <div class="question">
                <input type="radio" name="quiz${count+1}" value="C" disabled>
                <input type="text" value="${arrData[count].answers.choices[2]}" disabled>      
            </div>
            <div class="question">
                <input type="radio" name="quiz${count+1}" value="D" disabled>
                <input type="text" value="${arrData[count].answers.choices[3]}" disabled>      
            </div>
        `;

        main.appendChild(container);
    }
}
