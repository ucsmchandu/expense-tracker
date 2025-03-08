//this is for the back button without loosing any data
window.goBack=function (){
    window.history.back();
  }

  import { setDescriptionData , getDescriptionData} from "./expense-det.js";

//   name: categoryName,
//   description: descData.value.trim(),
//   date:formattedDate,
//   amount: amountData.value.trim()

  //function to display the history
  window.displayHistory = function(){
    const getDescData=getDescriptionData();
    const setDescData=setDescriptionData();
    const displayData=document.querySelector('.display-history');
    const displayNoHistory=document.querySelector('.display-nohistory');
    let display="";
    try{
      if(getDescData.length===0)
        displayNoHistory.innerHTML=`<p class="text-3xl">No History Available!</p>`;
        getDescData.forEach((data,index)=>{
            display+=`
            <div class="grid sm:grid-cols-4 gap-6 grid-cols-1 justify-items-center border h-auto rounded-2xl p-4 ">
            <p>Object: ${data.name}</p>
            <p class="break-words">Desc: ${data.description}</p>
            <p>ON: ${data.date}</p>
            <p>Cost: ${data.amount} ₹</p>
            </div>
            `;
        });
        if(displayData) displayData.innerHTML=display;
    }
    catch(error){
        console.log("Error :",error.message);
    }
  };

  //function to delete data
  window.deleteHistory=function(){
    const decision=confirm("Are you to delete all history?");
    if(decision){
      setDescriptionData([]);
      window.displayHistory();
    }
  };
  
  window.onload=function(){
    window.displayHistory();
  }
