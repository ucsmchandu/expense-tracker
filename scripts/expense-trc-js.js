// this is menu bar code
// const navToggle = document.getElementById("three-lines");
// const mobileMenu = document.getElementById("mobile");
// if (navToggle && mobileMenu) {
//   navToggle.addEventListener("click", function () {
//     mobileMenu.classList.toggle("hidden");
//   });
// }
export function getExpensesData(){
  return JSON.parse(localStorage.getItem("expensesData") || "[]");
}

export function setExpensesData(setValue){
  return localStorage.setItem("expensesData",JSON.stringify(setValue));
}

export function getObjectArrayData(){
  return JSON.parse(localStorage.getItem("objectArray") || "[]");
}

export function setObjectArrayData(setData){
  return localStorage.setItem("objectArray",JSON.stringify(setData));
}
//here is our actual stuff begins
//this is objectArray structure
// let objectArray=[
//   {name:
//   amount:
//    }
// ];

//this is expensesData structure
// let expensesData=[
//   {
//         name:,
//         monthLimit:
//         totalExpenses: 
//         get remainingAmount(){
//           return
//         },
//         get status(){
//           return
//         }
//   }
// ]


//function for save the data in the local storage
window.saveData = function () {
  const getData=getObjectArrayData();
  const getExpData=getExpensesData();
  let found=false;
  const data = document.querySelector(".object-input");
  const budget=document.querySelector(".budget-input");
  if (!data.value.trim() || !budget.value.trim()) {
    alert("Enter Valid Data!");
    return;
  }
  else {
    getData.forEach((objName,index)=>{
      if(data.value.trim().toLowerCase()===objName.name.toLowerCase()){
        found=true;
        return;
      }
    });
    if(found===true){
      alert("Object already exists!");
    }
    else{
      getData.push({
        name:data.value.trim(),
        amount:budget.value.trim()
      });
      //localStorage.setItem("objectArray", JSON.stringify(objectArray));
      setObjectArrayData(getData)
      getExpData.push({
        name:data.value.trim(),
        monthLimit:budget.value.trim(),
        // totalAmount:0,//it is not displayed
        totalExpenses: 0,
        get remainingAmount(){
          return this.monthLimit-this.totalExpenses
        },
        get status(){
          return this.monthLimit > this.totalExpenses ? "Excellent" : "Bad"
        }
      });
      //localStorage.setItem("expensesData",JSON.stringify(expensesData));
      setExpensesData(getExpData);
      // console.log(getExpensesData());
    }
    data.value = "";
    budget.value="";
  }
  displayObjectData();
};

//display the object data
window.displayObjectData = function () {
  const getObjData=getObjectArrayData();
  let tempData = "";
  const displayData = document.getElementById("display-data");
  if (getObjData.length == 0) {
    if (displayData) {
      displayData.innerHTML = `<p class="text-2xl ">No Objects are Available!</p>`;
    }
    return;
  }
  else {
    if (displayData) {
      displayData.innerHTML = "";
    }
  }
  getObjData.forEach((data, index) => {
    tempData += ` 
     <a href="expense-details.html?category=${encodeURIComponent(data.name)}&Value=${encodeURIComponent(data.amount)}" > <p class="p-2 rounded-md bg-[#1E6091] text-white font-semibold shadow-md cursor-pointer">
          ${data.name}  /  Limit-${data.amount}$
          </p></a>
          <button class="p-2 rounded-md bg-[#d52d2d] text-white font-semibold shadow-md cursor-pointer" onclick="window.deleteObject(${index})">delete</button>
      `;
  }); 
  if(displayData) displayData.innerHTML = tempData;
};

//delete the object
window.deleteObject = function (index) {
  const decisionTake=confirm("Are you to want delete the Object?");
  if(decisionTake){
  const objData=getObjectArrayData();
  const expData=getExpensesData();
  //const deletedCategory=objData[index].name;
  objData.splice(index, 1);
  expData.splice(index, 1);
  // expData.forEach((expense)=>{
  //   if (expense.name.toLowerCase() === deletedCategory.toLowerCase()) {
  //     expense.totalExpenses = 0; // Reset total expenses
  // }
  // });
  setObjectArrayData(objData);
  setExpensesData(expData);
  displayObjectData();
 }
};

window.enterObject=function(event){
 if(event.key==="Enter") window.saveData();
};


//document.getElementById("input-data-btn")?.addEventListener("click", saveData);
window.displayObjectData();
//localStorage.clear();