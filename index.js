// script.js 

// For edit item 
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
	c6.classList.add("zoom"); 
	c7.classList.add("zoom"); 
	c6.addEventListener("click", () => edit(c4, i)); 
	c7.addEventListener("click", () => del(e)); 
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
   if(e.Id === id){
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
   
   AddNewAnimal(Species,Name,Size,Location,image){
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
        
    


		// BigCatTr.addEventListener('click',(e)=>{
			
		// })





        } catch (error) {
            console.log(error);
        }
        
        
      }

   
	  LoadTablesData();











// For sorting ascending or descending 
const flag = { Name: false, Cat: false, Year: false }; 
let data = [ 
	{ Name: "HTML", Cat: "Web", Year: "1993" }, 
	{ 
		Name: "Java", 
		Cat: "Programming", 
		Year: "1995", 
	}, 
	{ Name: "JavaScript", Cat: "Web", Year: "1995" }, 
	{ Name: "MongoDB", Cat: "Database", Year: "2007" }, 
	{ Name: "Python", Cat: "Programming", Year: "1991" }, 
]; 

// To switch update or add form 
const switchEdit = () => { 
	document.getElementById("submitItem").style.display = 
		"none"; 
	document.getElementById("editItem").style.display = ""; 
}; 

const switchAdd = () => { 
	document.getElementById("submitItem").style.display = 
		""; 
	document.getElementById("editItem").style.display = 
		"none"; 
}; 

// To create table 


// Traverse and insert items to table 
// data.map((e, i) => addItem(e, i)); 

// For sorting in different cases 
function sortItems(title) { 
	remove(); 
	switch (title) { 
		case "name": 
		
			break; 
		case "category": 
			sortCat(); 
			break; 
		case "year": 
			sortYear(); 
			break; 
		default: 
			console.log("Default"); 
	} 
	data.map((e, i) => addItem(e, i)); 
} 

// Clear the table before updation 
function remove(tableId) { 
	console.log("removed"); 
	let table =document.getElementById(tableId);
	while (table.rows.length > 1) table.deleteRow(-1); 
} 

// Sort with names 
function sortName() { 

} 

// Sort with categories 
function sortCat() { 
	data.sort((a, b) => { 
		let fa = a.Cat.toLowerCase(), 
			fb = b.Cat.toLowerCase(); 
		console.log(fa, fb); 

		if (fa < fb) { 
			return -1; 
		} 
		if (fa > fb) { 
			return 1; 
		} 
		return 0; 
	}); 
	if (flag.Cat) data.reverse(); 
	flag.Cat = !flag.Cat; 
} 

// Sort with year 
function sortYear() { 
	data.sort((a, b) => a.Year - b.Year); 
	if (flag.Year) data.reverse(); 
	flag.Year = !flag.Year; 
} 

// To search and filter items 
function searchItems() { 
	let input = document 
		.getElementById("searchInput") 
		.value.toLowerCase(); 
	let filterItems = data.filter((e) => { 
		return ( 
			e.Name.toLowerCase().includes(input) || 
			e.Cat.toLowerCase().includes(input) || 
			e.Year.includes(input) 
		); 
	}); 

	remove(); 
	filterItems.map((e, i) => addItem(e, i)); 
} 

// Initiate edit form 
function edit(c, i) { 
	console.log(c.classList.value); 
	if (c.classList.value === "zoom") { 
		c.classList.add("open"); 
		el = data[i]; 
		switchEdit(); 

		let nameInput = 
			document.getElementById("nameInput"); 
		let catInput = document.getElementById("catInput"); 
		let yearInput = 
			document.getElementById("yearInput"); 
		nameInput.value = el.Name; 
		catInput.value = el.Cat; 
		yearInput.value = el.Year; 
		index = i; 
	} else { 
		c.classList.value = "zoom"; 
		switchAdd(); 

		document.getElementById("nameInput").value = ""; 
		document.getElementById("catInput").value = ""; 
		document.getElementById("yearInput").value = ""; 
		index = -1; 
	} 
} 

// Submit edit data 
function editItem() { 
	console.log("edit"); 
	nameInput = document.getElementById("nameInput"); 
	catInput = document.getElementById("catInput"); 
	yearInput = document.getElementById("yearInput"); 
	data[index] = { 
		Name: nameInput.value, 
		Cat: catInput.value, 
		Year: yearInput.value, 
	}; 
	remove(); 
	data.map((e, i) => addItem(e, i)); 

	nameInput.value = ""; 
	catInput.value = ""; 
	yearInput.value = ""; 
	switchAdd(); 
} 

// Add new data 
function submitItem() { 
	console.log("submit clicked"); 
	nameInput = document.getElementById("nameInput").value; 
	catInput = document.getElementById("catInput").value; 
	yearInput = document.getElementById("yearInput").value; 
	if ( 
		nameInput === "" || 
		catInput === "" || 
		yearInput === ""
	) { 
		window.alert("incomplete input data"); 
		return; 
	} 
	data.push({ 
		Name: nameInput, 
		Cat: catInput, 
		Year: yearInput, 
	}); 
	document.getElementById("nameInput").value = ""; 
	document.getElementById("catInput").value = ""; 
	document.getElementById("yearInput").value = ""; 
	remove(); 
	data.map((e, i) => addItem(e, i)); 
	console.log(data); 
} 

// Delete specific field 
function del(el) { 
	console.log("del clicked", el); 
	remove(); 
	data = data.filter((e) => e.Name !== el.Name); 
	data.map((e, i) => addItem(e, i)); 
}
