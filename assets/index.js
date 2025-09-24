const gallerySelect = document.querySelector(".gallery");
const cate = document.querySelector(".categoriesblock");
let active = 0;


function changeConnectLogout(){
  const textConect = document.getElementById("login");
  localStorage.getItem("status");
  if(localStorage.getItem("status") === "connected"){
    textConect.textContent = "logout";
    textConect.addEventListener("click", function(e){
      e.preventDefault();
      localStorage.removeItem("token");
      localStorage.removeItem("status");
      
    })
  }

}
changeConnectLogout()



function addContentEditingMod(){
  
  localStorage.getItem("status");
  if(localStorage.getItem("status") === "connected"){
    const headEdit = document.getElementById("editingHeader");
    headEdit.classList.add( "headerEdit");
    const pEdit = document.createElement("p");
    const div = document.createElement("div");
    const pT = document.createElement("p");
    const iP = document.createElement("i");
    headEdit.appendChild(div);
    div.appendChild(iP);
    div.appendChild(pT);
    pT.textContent =  "Mode édition";
    iP.className = "fa-solid fa-pen-to-square";
    const portofolioedit = document.getElementById("portofolioEdit");
    portofolioedit.appendChild(iP);
    portofolioedit.appendChild(pEdit);

    pEdit.textContent = "Modifier";
    

  }
}
addContentEditingMod();


async function getpictures() {
  const response = await fetch("http://localhost:5678/api/works");
  const pictures = await response.json();
  return pictures;
}

function AllValueWork(categoriesId) {
  gallerySelect.innerHTML = "";
  getpictures().then((pictures) => {
    pictures.forEach((e) => {
      if (categoriesId == 0 || categoriesId == e.categoryId) {
        const figure = document.createElement("figure");
        const picture = document.createElement("img");
        const subtitle = document.createElement("figcaption");

        picture.src = e.imageUrl;
        picture.alt = e.title;
        subtitle.textContent = e.title;

        figure.appendChild(picture);
        figure.appendChild(subtitle);
        gallerySelect.appendChild(figure);
      }
    });
  });
}
AllValueWork(0);

async function catégorie() {
  const categories = await fetch("http://localhost:5678/api/categories");
  const cat = await categories.json();

  cat.forEach((e) => {
    const button = document.createElement("p");

    button.textContent = e.name;
    button.id = e.id;

    cate.appendChild(button);
  });
}

function classlist() {
  const buttons = document.querySelectorAll(".categoriesblock p");
  buttons.forEach((en) => {
    if (en.id === active) {
      en.classList.add("categoriesblockactive");
    } else {
      en.classList.remove("categoriesblockactive");
    }
  });
}

function login() {
  const log = document.getElementById("login");
  log.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "./assets/login.html";
  });
}
login();

function selectedfilter() {
  const buttons = document.querySelectorAll(".categoriesblock p");

  buttons.forEach((en) => {
    en.addEventListener("click", function (e) {
      e.preventDefault();
      AllValueWork(en.id);
      active = en.id;
      classlist();
    });
  });
}

catégorie().then(selectedfilter);
