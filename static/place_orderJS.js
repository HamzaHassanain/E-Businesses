
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

function writeJson(ObjectToWrite, orderTotalPrice, orderAddress, orderPhone){
    ObjectToWrite.push(createNewBookObject(orderTotalPrice, orderAddress, orderPhone));
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


function createNewOrderObject(orderTotalPrice, orderAddress, orderPhone){
    var id = getUniqueIDForTasks();
    var orderDate = Date.now();
    var newBook = {"orderId" : id,
                "orderTotalPrice" : orderTotalPrice,
                "orderAddress" : orderAddress, 
                "orderPhone" : orderPhone, 
                "orderDate" : orderDate
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

let localStorageKeyNameCart = "cart";
let localStorageKeyNameOrders = "orders";

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

    document.getElementById("placeOrderBtn").addEventListener("click", function(){

        let addressInput = document.getElementById("address");
        let phonenumInput = document.getElementById("phonenum");

        if(!verificateData(addressInput.value)){
            showPopup("address is not valid");
        }
        else if(!verificateData(phonenumInput.value)){
            showPopup("phonenum is not valid");
        }else{
            let cartObject = convertTextToJson(getDataFromLocalStorage(localStorageKeyNameCart));
            let totalPrice = 0;
            for(let i = 0; i < cartObject.length; i++){
                totalPrice += Number(cartObject[i].bookQuantity) * Number(cartObject[i].bookPrice);
            }
            clearLocalStorge(localStorageKeyNameCart);

            let orderObject = convertTextToJson(getDataFromLocalStorage(localStorageKeyNameOrders));
            writeJson(orderObject, totalPrice, addressInput.value, phonenumInput.value);
            saveEndOprationForTasks(localStorageKeyNameOrders, orderObject);

            addressInput.value = "";
            phonenumInput.value = "";
        }   

    });





});


