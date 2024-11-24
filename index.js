let index = -1; 
const BigCatsTableName = document.getElementById("Name");
const BigCatsTableSpecies = document.getElementById("Species");
const BigCatsTableSize = document.getElementById("Size");
const BigCatsTableLocation = document.getElementById("Location");
const BigCatTr = document.getElementById("BigCatTr");
// console.log(BigCatTr);
const Tables =document.getElementsByClassName('Table');
const titles =document.getElementsByClassName('titles');
const Edit =document.getElementsByClassName('Edit');
const Delete =document.getElementsByClassName('Delete');

function addItem(e, i,TableId) {
	row = document.getElementById(TableId).insertRow(i + 1);
	let c0 = row.insertCell(0); 
	let c1 = row.insertCell(1); 
	let c2 = row.insertCell(2); 
	let c3 = row.insertCell(3); 
	let c4 = row.insertCell(4); 
	let c5 = row.insertCell(5);
	let c6 = row.insertCell(6);
	let c7 = row.insertCell(7);
	c0.innerText = i + 1; 
	c1.innerText = e.Species; 
	c2.innerText = e.Name; 
	c3.innerText = e.Size;
	c4.innerText = e.Location;
	c5.innerText = e.Image;
	c6.innerHTML = "✍";
	c7.innerHTML = "☒"; 
	c6.classList.add(`zoom`); 
	c7.classList.add(`zoom`);
	c6.addEventListener("click", () => MyEdit(e));
	c7.addEventListener("click", () => del(e)); 
} 



const MyEdit =(e)=>{
  console.log(e);
  if(e.Species==='Big Cats'){
	
	document.getElementById('submitItem1').innerText='Update';
	InputForEdit(e,1)
	

  }
  else if(e.Species==='Dog'){
	
	document.getElementById('submitItem2').innerText='Update';
	InputForEdit(e,2)
  }
  else{
	document.getElementById('submitItem3').innerText='Update';
	InputForEdit(e,3)
  }

 
}

const InputForEdit = (e,TableId)=>{
	document.getElementById(`SpeciesInput${TableId}`).value=e.Species;
	document.getElementById(`NameInput${TableId}`).value=e.Name;
	document.getElementById(`SizeInput${TableId}`).value=e.Size;
	document.getElementById(`LocationInput${TableId}`).value=e.Location;
	document.getElementById(`hiddenInput${TableId}`).value=e.Id;
   
}

const EditedInput =(TableId,MainMethod,flag)=>{
	const id=document.getElementById(`hiddenInput${TableId}`).value
	const Species = document.getElementById(`SpeciesInput${TableId}`).value
	const Name =  document.getElementById(`NameInput${TableId}`).value
	const Size= document.getElementById(`SizeInput${TableId}`).value
	const Location = document.getElementById(`LocationInput${TableId}`).value
	const Image = document.getElementById(`ImageInput${TableId}`).value
	// console.log('method',EditMethod)
	if(flag ==='Edit'){
		MainMethod.EditAnimal(id,Species,Name,Size,Location,Image);
	}
	else{
		MainMethod.AddNewAnimal(id,Species,Name,Size,Location,Image);
	}
	
	
}


class Table {
    Animal
   constructor(animal){
   this.Animal =animal;
   }
   SortByName(){
   this.Animal = this.Animal.sort((a,b)=>a.Name.localeCompare(b.Name))
   }
	SortBySize(){
		this.Animal = this.Animal.sort((a,b)=>a.Size.localeCompare(b.Size))
		}
		SortByLocation(){
			this.Animal = this.Animal.sort((a,b)=>a.Location.localeCompare(b.Location))
			}


   EditAnimal(id,Species,Name,Size,Location){
     this.Animal.map((e)=>{
   if(e.Id == id){
   e.Name =Name;
   e.Species=Species;
   e.Size=Size;
   e.Location=Location;
   }
   
   })
   }
   
   DeleteAnimal(id){
   this.Animal =this.Animal.filter((e)=>e.Id!=id);
   }
   
   AddNewAnimal(Id,Species,Name,Size,Location,image){
   this.Animal.push({
   Id:this.Animal.length+1,
   Species:Species,
   Name:Name,
    Size:Size,
    Location:Location,
    Image:image
   
   })
   }
   }

const LoadTablesData =async()=>{
        try {
            const BigCatsRes =await fetch('./BigCats.json');
        const BigFishRes =await fetch('./BigFish.json');
        const DogsRes =await fetch('./Dogs.json');
        const BigCats =await BigCatsRes.json()
        const BigFish =await BigFishRes.json()
        const Dogs =await DogsRes.json()
		console.log(BigCats)
        const BigCatsTable =new Table(BigCats?.BigCats);
        const BigFishTable =new Table(BigFish?.BigFish);
        const DogsTable =new Table(Dogs?.Dogs);
        // console.log(BigCatsTable);

Array.from(Tables).forEach((e)=>{
	console.log(e.id);
	switch (e.id) { 
		case "BigCattable": 
		BigCatsTable.Animal.map((el, i) => addItem(el, i,e.id));
			break; 
		case "Dogstable": 
		DogsTable.Animal.map((el, i) => addItem(el, i,e.id));
			break;
			case "BigFishtable": 
		BigFishTable.Animal.map((el, i) => addItem(el, i,e.id));
			break;
		default: 
			console.log("Default"); 
	} 

});

Array.from(titles).forEach((e)=>{
	
e.addEventListener('click',(e)=>{

	const TitleId =document.getElementById(e.target.id).parentNode.id;
	const dataSet =e.target.dataset.name;
	// console.log('from tit',document.getElementById(e.target.id).parentNode.id)
	// console.log('from titels',e.target.dataset.name);
switch(TitleId){
	case "BigCatTr":
		SortByField(dataSet,BigCatsTable,'BigCattable')
		break;
	case "DogsTr":
		SortByField(dataSet,DogsTable,'Dogstable')
		break;
	case "BigFishTr":
		SortByField(dataSet,BigFishTable,'BigFishtable')
		break;

}


})

	

});

const SortByField =(id,tableClass,tableId)=>{
	
	remove(tableId)
	switch (id) { 
		case "Name": 
		tableClass.SortByName();
			break; 
		case "Size": 
		tableClass.SortBySize();
			break;
			case "Location": 
			tableClass.SortByLocation();
			break;
		default: 
			console.log("Default"); 
	} 
	tableClass.Animal.map((e, i) => addItem(e, i,tableId));
}

document.getElementById('submitItem1').addEventListener('click',(el)=>{
	console.log(el.target.innerText);
	if(el.target.innerText==='Update'){
		console.log('upadate started')
		EditedInput(1,BigCatsTable,'Edit');
		document.getElementById('submitItem1').innerText ='Add Item'
		remove('BigCattable');
		BigCatsTable.Animal.map((e, i) => addItem(e, i,'BigCattable'));
		console.log(BigCatsTable);
	}
	else{
		EditedInput(1,BigCatsTable,'Add');
		remove('BigCattable');
		BigCatsTable.Animal.map((e, i) => addItem(e, i,'BigCattable'));
	}
})


document.getElementById('submitItem2').addEventListener('click',(el)=>{
	console.log(el.target.innerText);
	if(el.target.innerText==='Update'){
		console.log('upadate started')
		EditedInput(2,DogsTable,'Edit');
		document.getElementById('submitItem2').innerText ='Add Item'
		remove('Dogstable');
		DogsTable.Animal.map((e, i) => addItem(e, i,'Dogstable'));
		console.log(BigFishTable);
	}
	else{
		EditedInput(2,DogsTable,'Add');
		remove('Dogstable');
		DogsTable.Animal.map((e, i) => addItem(e, i,'Dogstable'));
	}
})

document.getElementById('submitItem3').addEventListener('click',(el)=>{
	console.log(el.target.innerText);
	if(el.target.innerText==='Update'){
		console.log('upadate started')
		EditedInput(3,BigFishTable,'Edit');
		document.getElementById('submitItem3').innerText ='Add Item'
		remove('BigFishtable');
		BigFishTable.Animal.map((e, i) => addItem(e, i,'BigFishtable'));
		console.log(BigFishTable);
	}
	else{
		EditedInput(3,BigFishTable,'Add');
	}
})






        } catch (error) {
            console.log(error);
        }
        
        
      }

   
	  LoadTablesData();











// For sorting ascending or descending 
// const flag = { Name: false, Cat: false, Year: false }; 
// let data = [ 
// 	{ Name: "HTML", Cat: "Web", Year: "1993" }, 
// 	{ 
// 		Name: "Java", 
// 		Cat: "Programming", 
// 		Year: "1995", 
// 	}, 
// 	{ Name: "JavaScript", Cat: "Web", Year: "1995" }, 
// 	{ Name: "MongoDB", Cat: "Database", Year: "2007" }, 
// 	{ Name: "Python", Cat: "Programming", Year: "1991" }, 
// ]; 

// To switch update or add form 
// const switchEdit = () => { 
// 	document.getElementById("submitItem").style.display = 
// 		"none"; 
// 	document.getElementById("editItem").style.display = ""; 
// }; 

// const switchAdd = () => { 
// 	document.getElementById("submitItem").style.display = 
// 		""; 
// 	document.getElementById("editItem").style.display = 
// 		"none"; 
// }; 


function remove(tableId) { 
	console.log("removed"); 
	let table =document.getElementById(tableId);
	while (table.rows.length > 1) table.deleteRow(-1); 
} 



// // Initiate edit form 
// function edit(c, i) { 
// 	console.log(c.classList.value); 
// 	if (c.classList.value === "zoom") { 
// 		c.classList.add("open"); 
// 		el = data[i]; 
// 		switchEdit(); 

// 		let nameInput = 
// 			document.getElementById("nameInput"); 
// 		let catInput = document.getElementById("catInput"); 
// 		let yearInput = 
// 			document.getElementById("yearInput"); 
// 		nameInput.value = el.Name; 
// 		catInput.value = el.Cat; 
// 		yearInput.value = el.Year; 
// 		index = i; 
// 	} else { 
// 		c.classList.value = "zoom"; 
// 		switchAdd(); 

// 		document.getElementById("nameInput").value = ""; 
// 		document.getElementById("catInput").value = ""; 
// 		document.getElementById("yearInput").value = ""; 
// 		index = -1; 
// 	} 
// } 