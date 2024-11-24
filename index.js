let index = -1;
const BigCatsTableName = document.getElementById("Name");
const BigCatsTableSpecies = document.getElementById("Species");
const BigCatsTableSize = document.getElementById("Size");
const BigCatsTableLocation = document.getElementById("Location");
const BigCatTr = document.getElementById("BigCatTr");
const Tables = document.getElementsByClassName("Table");
const titles = document.getElementsByClassName("titles");
const Edit = document.getElementsByClassName("Edit");
const Delete = document.getElementsByClassName("Delete");

const validateSizeInput = function (e) {
  console.log(e.value);
  if (e.value < 0) {
    e.value = "";
  }
};

function addItem(e, i, TableId) {
  row = document.getElementById(TableId).insertRow(i + 1);
  let c0 = row.insertCell(0);
  let c1 = row.insertCell(1);
  let c2 = row.insertCell(2);
  let c3 = row.insertCell(3);
  let c4 = row.insertCell(4);
  let c5 = row.insertCell(5);
  let c6 = row.insertCell(6);
  let c7 = row.insertCell(7);
  let img =document.createElement('img')
  img.src=e.Image
  let dynamicClass =e.Species.split(" ");
  c0.innerText = i + 1;
  c1.innerText = e.Species;
  c2.innerText = e.Name;
  c2.classList.add(`${dynamicClass[0]}${dynamicClass[1]}sp`)
  console.log(`${dynamicClass[0]}${dynamicClass[1]}sp`);
  c3.innerText = e.Size;
  c4.innerText = e.Location;
  c5.appendChild(img);
  c6.innerHTML = "✍";
  c7.innerHTML = "☒";
  c6.classList.add(`zoom`);
  c7.classList.add(`zoom`);
  c6.addEventListener("click", () => MyEdit(e));
  c7.addEventListener("click", () => Mydelete(e));
}

let Mydelete;

class Table {
  Animal;
  constructor(animal) {
    this.Animal = animal;
  }
  SortByName() {
    this.Animal = this.Animal.sort((a, b) => a.Name.localeCompare(b.Name));
  }
  SortBySize() {
    this.Animal = this.Animal.sort((a, b) => a.Size.split(" ")[0] - b.Size.split(" ")[0]);
  }
  SortByLocation() {
    this.Animal = this.Animal.sort((a, b) =>
      a.Location.localeCompare(b.Location)
    );
  }

  EditAnimal(id, Species, Name, Size, Location) {
    this.Animal.map((e) => {
      if (e.Id == id) {
        e.Name = Name;
        e.Species = Species;
        e.Size = `${Size} ft`;
        e.Location = Location;
      }
    });
  }

  DeleteAnimal(id) {
    this.Animal = this.Animal.filter((e) => e.Id != id);
  }

  AddNewAnimal(Id, Species, Name, Size, Location) {
	if(this.Animal.find(e=>e.Name===Name)){
        if (Species === "Big Cats") {
			document.getElementById("errBigCat").style.display = "block";
		  } else if (Species === "Dog") {
			document.getElementById("errDogs").style.display = "block";
		  } else if (Species === "Big Fish") {
			document.getElementById("errBigFish").style.display = "block";
		  }
		  setTimeout((e)=>{
			document.getElementById("errBigCat").style.display = "none";
			document.getElementById("errDogs").style.display = "none";
			document.getElementById("errBigFish").style.display = "none";
		  },1500)
	}
	else{
		this.Animal.push({
			Id: this.Animal.length + 1,
			Species: Species,
			Name: Name,
			Size: `${Size} ft`,
			Location: Location,
			Image: './Images/Default.jpeg',
		  });
	}
   
  }
  
}

const MyEdit = (e) => {
  console.log(e);
  if (e.Species === "Big Cats") {
    document.getElementById("submitItem1").innerText = "Update";
    InputForEdit(e, 1);
  } else if (e.Species === "Dog") {
    document.getElementById("submitItem2").innerText = "Update";
    InputForEdit(e, 2);
  } else if (e.Species === "Big Fish") {
    document.getElementById("submitItem3").innerText = "Update";
    InputForEdit(e, 3);
  }
};

const InputForEdit = (e, TableId) => {
  document.getElementById(`SpeciesInput${TableId}`).value = e.Species;
  document.getElementById(`NameInput${TableId}`).value = e.Name;
  document.getElementById(`SizeInput${TableId}`).value = +e.Size.split(" ")[0];
  document.getElementById(`LocationInput${TableId}`).value = e.Location;
  document.getElementById(`hiddenInput${TableId}`).value = e.Id;
};
const ClearInput = (TableId) => {
	document.getElementById(`NameInput${TableId}`).value = "";
	document.getElementById(`SizeInput${TableId}`).value = "";
	document.getElementById(`LocationInput${TableId}`).value = "";
  };

const EditedInput = (TableId, MainMethod, flag) => {
  const id = document.getElementById(`hiddenInput${TableId}`).value;
  const Species = document.getElementById(`SpeciesInput${TableId}`).value;
  const Name = document.getElementById(`NameInput${TableId}`).value;
  const Size = document.getElementById(`SizeInput${TableId}`).value;
  const Location = document.getElementById(`LocationInput${TableId}`).value;
  // console.log('method',EditMethod)
  if (flag === "Edit") {
    MainMethod.EditAnimal(id, Species, Name, Size, Location);
	ClearInput(TableId);
    console.log("method", MainMethod);
  } else {
    MainMethod.AddNewAnimal(id, Species, Name, Size, Location);
	ClearInput(TableId);
    console.log("method", MainMethod);
  }
};

const LoadTablesData = async () => {
  try {
    const BigCatsRes = await fetch("./BigCats.json");
    const BigFishRes = await fetch("./BigFish.json");
    const DogsRes = await fetch("./Dogs.json");
    const BigCats = await BigCatsRes.json();
    const BigFish = await BigFishRes.json();
    const Dogs = await DogsRes.json();
    console.log(BigCats);
    const BigCatsTable = new Table(BigCats?.BigCats);
    const BigFishTable = new Table(BigFish?.BigFish);
    const DogsTable = new Table(Dogs?.Dogs);
    // console.log(BigCatsTable);

    Array.from(Tables).forEach((e) => {
      console.log(e.id);
      switch (e.id) {
        case "BigCattable":
          BigCatsTable.Animal.map((el, i) => addItem(el, i, e.id));
          break;
        case "Dogstable":
          DogsTable.Animal.map((el, i) => addItem(el, i, e.id));
          break;
        case "BigFishtable":
          BigFishTable.Animal.map((el, i) => addItem(el, i, e.id));
          break;
        default:
          console.log("Default");
      }
    });

    Array.from(titles).forEach((e) => {
      e.addEventListener("click", (e) => {
        const TitleId = document.getElementById(e.target.id).parentNode.id;
        const dataSet = e.target.dataset.name;
        // console.log('from tit',document.getElementById(e.target.id).parentNode.id)
        // console.log('from titels',e.target.dataset.name);
        switch (TitleId) {
          case "BigCatTr":
            SortByField(dataSet, BigCatsTable, "BigCattable");
            break;
          case "DogsTr":
            SortByField(dataSet, DogsTable, "Dogstable");
            break;
          case "BigFishTr":
            SortByField(dataSet, BigFishTable, "BigFishtable");
            break;
        }
      });
    });

    const SortByField = (id, tableClass, tableId) => {
      console.log(tableId)
      remove(tableId);
      switch (id) {
        case "Name":
          if(tableId =='BigCattable'||tableId == 'Dogstable') tableClass.SortByName();
          break;
        case "Size":
          if(tableId == 'BigCattable'|| tableId == 'BigFishtable') tableClass.SortBySize();
          break;
        case "Location":
          if(tableId == 'BigCattable'|| tableId =='Dogstable') tableClass.SortByLocation();
          break;
        default:
          console.log("Default");
      }
      tableClass.Animal.map((e, i) => addItem(e, i, tableId));
    };

    document.getElementById("submitItem1").addEventListener("click", (el) => {
      console.log(el.target.innerText);
      if (el.target.innerText === "Update") {
        console.log("upadate started");
        EditedInput(1, BigCatsTable, "Edit");
        document.getElementById("submitItem1").innerText = "Add Item";
        remove("BigCattable");
        BigCatsTable.Animal.map((e, i) => addItem(e, i, "BigCattable"));
        console.log(BigCatsTable);
      } else {
        EditedInput(1, BigCatsTable, "Add");
        remove("BigCattable");
        BigCatsTable.Animal.map((e, i) => addItem(e, i, "BigCattable"));
      }
    });

    document.getElementById("submitItem2").addEventListener("click", (el) => {
      console.log(el.target.innerText);
      if (el.target.innerText === "Update") {
        console.log("upadate started");
        EditedInput(2, DogsTable, "Edit");
        document.getElementById("submitItem2").innerText = "Add Item";
        remove("Dogstable");
        DogsTable.Animal.map((e, i) => addItem(e, i, "Dogstable"));
      } else {
        EditedInput(2, DogsTable, "Add");
        remove("Dogstable");
        DogsTable.Animal.map((e, i) => addItem(e, i, "Dogstable"));
      }
    });

    document.getElementById("submitItem3").addEventListener("click", (el) => {
      console.log(el.target.innerText);
      if (el.target.innerText === "Update") {
        console.log("upadate started");
        EditedInput(3, BigFishTable, "Edit");
        document.getElementById("submitItem3").innerText = "Add Item";
        remove("BigFishtable");
        BigFishTable.Animal.map((e, i) => addItem(e, i, "BigFishtable"));
        console.log(BigFishTable);
      } else {
        EditedInput(3, BigFishTable, "Add");
        remove("BigFishtable");
        BigFishTable.Animal.map((e, i) => addItem(e, i, "BigFishtable"));
        console.log(BigFishTable);
      }
    });

    Mydelete = (e) => {
      if (e.Species === "Big Cats") {
        BigCatsTable.DeleteAnimal(e.Id);
        remove("BigCattable");
        BigCatsTable.Animal.map((e, i) => addItem(e, i, "BigCattable"));
      } else if (e.Species === "Dog") {
        DogsTable.DeleteAnimal(e.Id);
        remove("Dogstable");
        DogsTable.Animal.map((e, i) => addItem(e, i, "Dogstable"));
      } else if (e.Species === "Big Fish") {
        BigFishTable.DeleteAnimal(e.Id);
        remove("BigFishtable");
        BigFishTable.Animal.map((e, i) => addItem(e, i, "BigFishtable"));
      }
    };
  } catch (error) {
    console.log(error);
  }
};

LoadTablesData();

function remove(tableId) {
  console.log("removed");
  let table = document.getElementById(tableId);
  while (table.rows.length > 1) table.deleteRow(-1);
}
