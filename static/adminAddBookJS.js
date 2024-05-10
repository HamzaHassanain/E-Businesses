
// ---------------------------{ template }----------------------------------
// valid the input

// get interger from the user:
function get_int(theMessage){
    do{var the_number = prompt(theMessage);
    }while(isNaN(the_number));
    return Number(the_number);
}

// get a string from the user:
function get_text(theMessage){
    do{var the_text = prompt(theMessage);
    }while(isFinite(the_text) || the_text == "")
    return the_text;
}


function getDataFromLocalStorage(keyName, defualtValue = "[]"){
    if(localStorage.getItem(keyName) === null) { 
        localStorage.setItem(keyName, defualtValue); }
    return localStorage.getItem(keyName);
}

function setDataToLocalStorage(keyName, newValue){
    localStorage.setItem(keyName, newValue);
}

function clearLocalStorge(keyName){
    // setDataToLocalStorage(keyName, "[]");
    localStorage.removeItem(keyName);
}

function convertTextToJson(JsonObjectAsText){
    return JSON.parse(JsonObjectAsText);
}

function convertJsonToText(JsonObjectAsJson){
    return JSON.stringify(JsonObjectAsJson);
}

function writeJson(ObjectToWrite, bookTitle, bookAuthor, bookCategory, bookPrice, bookQuantity, bookDescription){
    ObjectToWrite.push(createNewBookObject(bookTitle, bookAuthor, bookCategory, bookPrice, bookQuantity, bookDescription));
}

function deleteJson(ObjectToDelete, taskID){
    var tasks_number = ObjectToDelete.length;
    for(var i = 0; i < tasks_number; i++){
        if(ObjectToDelete[i].id === taskID){
            ObjectToDelete.splice(i,1);
            break;
        }
    }
}

function getUniqueIDForTasks(){
    const ID_Storage_Name = "UniqueIDForTasks";
    var id = Number(getDataFromLocalStorage(ID_Storage_Name, "1"));
    setDataToLocalStorage(ID_Storage_Name, String(Number(id + 1)));
    return id;
}

function createNewBookObject(bookTitle, bookAuthor, bookCategory, bookPrice, bookQuantity, bookDescription){
    var id = getUniqueIDForTasks();
    var newBook = {"bookId" : id,
                "bookTitle" : bookTitle,
                "bookAuthor" : bookAuthor, 
                "bookImage" : "staticstatic\images\book.png", 
                "bookCategory" : bookCategory, 
                "bookPrice" : bookPrice, 
                "bookQuantity" : bookQuantity, 
                "bookDescription" : bookDescription
                };
    return newBook;
}

function saveEndOprationForTasks(tasks_storage_key_name, tasksInfoObject){
    setDataToLocalStorage(tasks_storage_key_name, convertJsonToText(tasksInfoObject));
}


function showPopup(message) {
    var popup = document.getElementById("popup");
    document.getElementById("messageTitle").innerHTML = "Error message: " + message; 
    popup.style.display = "block";
    popup.parentNode.style.display = "flex";
    setTimeout(function () {
        hidePopup();
    }, 3000);
}

function hidePopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "none";
    popup.parentNode.style.display = "none";
}

// ---------------------------------------------------------------

let localStorageKeyName = "bookDataInfo";

function verificateData(data, isAsText = true, isAsNumber = false){
    if(isAsText){
        if(isFinite(data) || data == "") return false;
    }
    if(isAsNumber){
        if(isNaN(data) || data == "") return false;
    }
    return true;
}



document.addEventListener("DOMContentLoaded", function(){

    document.getElementById("AddBookBtn").addEventListener("click", function(){
        let bookTitle = document.getElementById("bookTitle").value;
        let bookAuthor = document.getElementById("bookAuthor").value;
        let bookCategory = ""
        let seletionData = document.getElementsByClassName("theOption");
        for(let i = 0; i < seletionData.length; i++){ if(seletionData[i].hasAttribute("selected")){bookCategory =  seletionData[i].value;}}
        let bookPrice = document.getElementById("bookPrice").value;
        let bookQuantity = document.getElementById("bookQuantity").value;
        let bookDescription = document.getElementById("descriptionArea").value;


        if(!verificateData(bookTitle)) {showPopup("book title should be text and not empty!"); }
        else if(!verificateData(bookAuthor)) {showPopup("book Author name should be text and not empty!"); }
        else if(!verificateData(bookCategory)) {showPopup("book category name should be text and not empty!"); }
        else if(!verificateData(bookPrice, false, true)) {showPopup("book price should be number and not empty!"); }
        else if(!verificateData(bookQuantity, false, true)) {showPopup("book Quantity should be number and not empty!"); }
        else if(!verificateData(bookDescription)){showPopup("book description should be text and not empty!"); }
        else{
            let dataObject = convertTextToJson(getDataFromLocalStorage(localStorageKeyName));
            writeJson(dataObject, bookTitle, bookAuthor, bookCategory, bookPrice, bookQuantity, bookDescription);
            // dataObject.push(createNewBookObject(bookTitle, bookAuthor, bookCategory, bookPrice, bookQuantity, bookDescription));
            saveEndOprationForTasks(localStorageKeyName, dataObject);
            console.log(getDataFromLocalStorage(localStorageKeyName));
        }

    });


    





});