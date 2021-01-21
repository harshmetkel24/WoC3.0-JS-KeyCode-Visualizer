const items = [
    {code:'239',key:'0'},
    {code:'241',key:'1'},
    {code:'243',key:'2'},
    {code:'245',key:'3'},
    {code:'247',key:'4'},
    {code:'249',key:'5'},
    {code:'251',key:'6'},
    {code:'253',key:'7'},
    {code:'255',key:'8'},
    {code:'256',key:'9'},
];
    
  
  function loadTableData(items){
    
    const table = document.getElementById("tBody");
    
    items.forEach(item =>{
      let row = table.insertRow();//this will create the new row for data in every iteration
      
      let code = row.insertCell(0);//insertCell(0) will create the assign the first element in row to code
      code.innerHTML=item.code; //this will add value of code variable to code value in item
      
      let key = row.insertCell(1);//insertCell(1) will create the assign the second element in row to key
      key.innerHTML=item.key;
    }) ;
  }

  loadTableData(items);
  