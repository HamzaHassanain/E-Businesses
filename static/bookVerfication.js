
var indx;
var table = document.getElementById('table');

console.log(table.rows.length);
// for (var i = 1; i < table.rows.length; i++) {
//     console.log(table.rows[i].cells[0]);
//     // table.rows[i].cells[4].onclick = () => {
//     //         console.log(indx);
//     // };
// }
    
let toastbox = document.getElementById('toastbox');
let addMsg = '<i class="fa-solid fa-circle-check"></i> Added Successfully';
let delMsg = '<i class="fa-solid fa-circle-check"></i> Deleted Successfully';

function showToast(msg, indx) {
    let toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML = msg;
    toastbox.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 6000);
    
    // indx = this.parentElement.rowIndex;
    // console.log();
    indx.closest('tr').remove();
    // table.deleteRow(indx);
}
