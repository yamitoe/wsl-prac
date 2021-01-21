
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
//I realized I could have simplfied this if I just gave them class names
function onSave(){
    let updatedArr = [];
    let tempArr= [];
    let o = {};
    if (typeof(Storage) !== "undefined") {
        //If arr has any questions to save
        if(arrData.length > 0){
            let questionsDOMArr = document.getElementsByClassName("container-quizbox");
            //Loop through container
            for (const iterator of questionsDOMArr) {
                //Don't need the Question number so filter it out //case sensitive
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
                 // {question: "" , choices: [1,1,1,1]}
                o.choices = tempArr;
                tempArr = [];
                //To be fused with localstorage //Need to copy object so no pointer issue
                updatedArr.push({...o});
            }
            // console.log(updatedArr);
            localStorage.setItem("quizquestion",JSON.stringify(updatedArr));
        }
    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
    }
}
//Add empty arr to storage
function addEmptyArr(){
    arrData.push([]);
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("quizquestion",JSON.stringify(arrData));
        
    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
    }
}

function onAdd(){
    addEmptyArr();
    createTextArea();
}

function onDelete(){
    let parentNode = document.getElementsByClassName("container-quizbox");
    let amount = parentNode.length - 1;
    if(amount >= 0){
        parentNode[amount].remove(parentNode[amount]);
        onSave();
    }
}

function createTextArea(loopNum=1){
    let main = document.getElementsByTagName("MAIN")[0];

    let container = document.createElement("section");
    container.className = "container-quizbox";
    container.innerHTML =`   
        <h2>Question ${arrData.length} </h2>
        <textarea name="" id="" cols="25" rows="8"></textarea>
        <div class="question">
            <input type="radio" name="quiz${arrData.length}" value="A">
            <input type="text">      
        </div>
        <div class="question">
            <input type="radio" name="quiz${arrData.length}" value="B">
            <input type="text">      
        </div>
        <div class="question">
            <input type="radio" name="quiz${arrData.length}" value="C">
            <input type="text">      
        </div>
        <div class="question">
            <input type="radio" name="quiz${arrData.length}" value="D">
            <input type="text">      
        </div>
    `;

    main.appendChild(container);
    
}
//Was hoping I could use the same as above but since I had to loop it I had to just make another one
function loadTextArea(){
    let main = document.getElementsByTagName("MAIN")[0];
    for(let count = 0; count < arrData.length; count++){
        console.log(arrData[count].question);
        let container = document.createElement("section");
        container.className = "container-quizbox";
        container.innerHTML =`   
            <h2>Question ${count+1} </h2>
            <textarea name="" cols="25" rows="8">
            ${arrData[count].question}
            </textarea>
            <div class="question">
                <input type="radio" name="quiz${count+1}" value="A">
                <input type="text" value="${arrData[count].choices[0]}" >      
            </div>
            <div class="question">
                <input type="radio" name="quiz${count+1}" value="B">
                <input type="text" value="${arrData[count].choices[1]}" >      
            </div>
            <div class="question">
                <input type="radio" name="quiz${count+1}" value="C">
                <input type="text" value="${arrData[count].choices[2]}" >      
            </div>
            <div class="question">
                <input type="radio" name="quiz${count+1}" value="D">
                <input type="text" value="${arrData[count].choices[3]}" >      
            </div>
        `;

        main.appendChild(container);
    }
}
