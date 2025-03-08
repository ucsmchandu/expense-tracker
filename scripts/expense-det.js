import { getExpensesData, setExpensesData, getObjectArrayData, setObjectArrayData } from "./expense-trc-js.js";
//for the menu bar
const navToggle = document.getElementById("three-lines");
const mobileView = document.getElementById("mobile");
if (navToggle && mobileView) {
    navToggle.addEventListener("click", function () {
        mobileView.classList.toggle("hidden");
    });
}
//actual stuff starts here
//here the localstorage name is descriptionData
//use this data in history page

//structure of the description data
// let descriptionData=[
//     {
//         name:
//         description:
//         amount:
//     }
// ];

// export function setDescriptionData(setTextData) {
//     return localStorage.setItem("descriptionData", JSON.stringify(setTextData));
// }
export function setDescriptionData(setTextData) {
    if (!setTextData) {
        console.error("setTextData is undefined, not saving to localStorage.");
        return;
    }
    localStorage.setItem("descriptionData", JSON.stringify(setTextData));
}


// export function getDescriptionData() {
//     return JSON.parse(localStorage.getItem("descriptionData")) || [];
// }
export function getDescriptionData() {
    const data = localStorage.getItem("descriptionData");
    if (!data) {
        return []; // Return an empty array if no data is found
    }
    try {
        return JSON.parse(data);
    } catch (error) {
        console.error("Error parsing descriptionData:", error.message);
        return []; // Return an empty array on error
    }
}


window.saveExpenseData = function () {
    //description value
    //amount-value
    const params = new URLSearchParams(window.location.search);
    const categoryName = params.get("category");
    const maxMoney = Number(params.get("Value"));
    const descData = document.querySelector('.description-value');
    const amountData = document.querySelector('.amount-value');
    let money=Number(amountData.value.trim());
    const demoExpData = getExpensesData();
    const getDesValue = getDescriptionData();
    try {
        let categoryData = demoExpData.find(data => data.name.toLowerCase() === categoryName.toLowerCase());
        if (categoryData && categoryData.remainingAmount <= 0 ||money>categoryData.monthLimit) {
            let confirmMsg = confirm("Total Expenses have crossed the limit! Do you still want to add?");
            if (!confirmMsg) return;
        }
        let currentDate=new Date();
        let year=currentDate.getFullYear();
        let month=String(currentDate.getMonth()+1).padStart(2,'0');
        let day=String(currentDate.getDate()).padStart(2,'0');
        let formattedDate=`${day}-${month}-${year}`;
        if (!descData.value.trim() || !amountData.value.trim()) {
            alert("Enter valid Data!");
            return;
        }
        //this saves for history
        getDesValue.push({
            name: categoryName,
            description: descData.value.trim(),
            date:formattedDate,
            amount: money
        });
        //this saves for expenses value


        //use this in history page
        setDescriptionData(getDesValue);
         //console.log(getDescriptionData());
        //here we have to update the expensesData localstorage

        //console.log(totalAmount);
        let found=false;
        demoExpData.forEach((data)=>{
            if(data.name.toLowerCase()===categoryName.toLowerCase()){
                data.totalExpenses+=money;
                found=true;
                data.remainingAmount = Number(data.monthLimit) - Number(data.totalExpenses);
                data.status = Number(data.monthLimit) > Number(data.totalExpenses) ? "Excellent" : "Limit Exceeds";
            }
        });
        if (!found) {
            demoExpData.push({
                name: categoryName,
                monthLimit: maxMoney,
                totalExpenses: money,
                remainingAmount: Number(maxMoney) - Number(money), 
                status: Number(maxMoney) > Number(money) ? "Excellent" : "Limit Exceeds" 
            });      
         }
        
       setExpensesData(demoExpData);
        displayObject();
        alert("Expenses Added!");
    }
    catch (error) {
        console.log("Error :", error.message);
    }
    descData.value = "";
    amountData.value = "";
};

//this is for displaying the details
window.displayObject = function () {
    try {
        const objectsData = getObjectArrayData();
        const expsData = getExpensesData();
        let foundObject = false;
        const params = new URLSearchParams(window.location.search);
        const categoryName = params.get("category");
        const maxMoney = params.get("Value");
        if (!categoryName) {
            throw new Error("Error : Category Name Is Not Found! ");
        }
        objectsData.forEach((object, index) => {
            if (typeof object.name === "string" && object.name.toLowerCase() === categoryName.toLowerCase()) {
                foundObject = true;
            }
        });
        const data = document.querySelector('.display-Expense');

        if (categoryName && foundObject) {
            data.innerHTML = `
     <p class="p-4 text-2xl font-extrabold text-white">This month expenses on ${categoryName}</p>
    `;
            let found = false;
            expsData.forEach((value) => {
                if (value.name.toLowerCase() === categoryName.toLowerCase()) {
                    //console.log("present");
                    // console.log(categoryName);
                    // console.log(maxMoney);
                    //we have to display the actual data i.e expenses
                    //class name = obj-details
                    const displayObjectDetails = document.querySelector('.obj-details');
                    if (displayObjectDetails) {
                        displayObjectDetails.innerHTML = `
                        <p class=" md:text-xl">Object :</p>
                        <p class=" md:text-xl">${value.name} </p>
                        <p class=" md:text-xl">Month Limit :</p>
                        <p class=" md:text-xl">${value.monthLimit}</p>
                        <p class=" md:text-xl">Total :</p>
                        <p class=" md:text-xl">${value.totalExpenses}</p>
                        <p class=" md:text-xl">Remaining :</p>
                        <p class=" md:text-xl">${value.remainingAmount}</p>
                        <p class=" md:text-xl">Status :</p>
                        <p class=" md:text-xl">${value.status}</p>  
                        `;
                    }
                    found = true;
                }
            });
            if (!found) {
                //here the all details are become zero
                const objDetails = document.querySelector('.obj-details');
                if (objDetails) {
                    objDetails.innerHTML = `
                    <p class="flex text-2xl">No Data Found!</p>
                    `;
                }
            }
        }
        else {
            data.innerHTML = `
        <p class="p-4 text-2xl text-white">Object Not Found!</p>
       `;
        }
    }
    catch (error) {
        console.error("Error in displayObject function:", error.message);
    }
};

window.enterByData=function(event){
    if(event.key==="Enter"){
        window.saveExpenseData();
    }
}

window.onload = function () {
    window.displayObject();
}
//localStorage.clear();




