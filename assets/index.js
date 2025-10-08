const gallerySelect = document.querySelector(".gallery");
const cate = document.querySelector(".categoriesblock");
const H2Title = document.getElementById("H2Title");
const btnFC = document.getElementById("ChangeToForm");
const cross = document.getElementById("exitCross");
const btn = document.querySelectorAll(".fa-pen-to-square");
const modalHover = document.getElementById("modal");
const modalElement = document.getElementById("modals");
const galleryOrmodal = document.getElementById("galleryOrModal");
const GalleryElementModal = document.getElementById("modalsgallery");
const arrowBack = document.getElementById("arrow");
const ModalForm = document.getElementById("ModalForm");
const btnFormConfirm = document.getElementById("btnFormConfirm");
let active = 1;

function changeConnectLogout() {
  const textConect = document.getElementById("login");
  localStorage.getItem("status");
  if (localStorage.getItem("status") === "connected") {
    textConect.textContent = "logout";
    textConect.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("token");
      localStorage.removeItem("status");
      window.location.href = "./index.html";
      modalForm();
  checkFormEmpty();
    });
  } else {
    window.location.href = "./assets/login.html";
  }
}
changeConnectLogout();

// Récupération des catégories
async function catégorie() {
  const categories = await fetch("http://localhost:5678/api/categories");
  const cat = await categories.json();
  return cat;
}

// Ajout du mode édition
function addContentEditingMod() {
  localStorage.getItem("status");
  if (localStorage.getItem("status") === "connected") {
    const headEdit = document.getElementById("editingHeader");
    headEdit.classList.add("headerEdit");
    const pEdit = document.createElement("p");
    const div = document.createElement("div");
    const pT = document.createElement("p");
    const iP1 = document.createElement("i");
    const iP = document.createElement("i");
    headEdit.appendChild(div);
    div.appendChild(iP1);
    div.appendChild(pT);
    pT.textContent = "Mode édition";
    iP1.classList.add("fa-solid", "fa-pen-to-square");
    iP.classList.add("fa-solid", "fa-pen-to-square");
    const portofolioedit = document.getElementById("portofolioEdit");
    portofolioedit.appendChild(iP);
    portofolioedit.appendChild(pEdit);
    pEdit.textContent = "Modifier";
  }
}
addContentEditingMod();



// Vérification du formulaire
function checkFormEmpty() {
  const inputcate = document.getElementById("categorie");
  const inputeTitle = document.getElementById("title");
  
  function checkIfOk(){
    const inputOk = inputeTitle.value != "" && inputcate.value !=Number();
    btnFormConfirm.disabled = !inputOk;
  }
  inputeTitle.addEventListener("input", checkIfOk);
  inputcate.addEventListener("input",checkIfOk);
  
}

/**Fermeture de la modal**/
function closeModal() {
  cross.addEventListener("click", function () {
    [modalHover, modalElement, ModalForm, arrowBack].forEach(e => e.classList.add("hidden"));
    [modalElement, modalHover, arrowBack, btnFormConfirm].forEach(e => e.classList.remove("visible"));
    btnFC.classList.remove("hidden");
    btnFC.classList.add("visible");
    btnFormConfirm.classList.add("hidden");
    GalleryElementModal.innerHTML = "";
    document.getElementById("ModalForm").reset()
    AllValueWork(0);
  });
}

function checkPictureChange() {
  const inputImage = document.getElementById("pictureForm");
  const picturechange = document.getElementById("pictureAdded");
  const formAddPic = document.getElementById("labelAddPicture");
  inputImage.addEventListener("change", function () {
    if (inputImage.files[0]) {
      picturechange.classList.remove("hidden");
      picturechange.classList.add("pictureForm");
      formAddPic.classList.remove("labelAddPicture");
      formAddPic.classList.add("hidden");
      picturechange.src = URL.createObjectURL(inputImage.files[0]);
    }
  });
}


function backTogallery() {
  arrowBack.addEventListener("click", function () {
    [ModalForm, arrowBack, btnFormConfirm].forEach(e => e.classList.add("hidden"));
    [ModalForm, arrowBack, btnFormConfirm].forEach(e => e.classList.remove("visible"));
    document.getElementById("ModalForm").reset()
    GalleryElementModal.classList.remove("hidden");
    btnFC.classList.remove("hidden");
    GalleryElementModal.classList.add("visibleGrid");
    btnFC.classList.add("visible");
    btnFormConfirm.removeEventListener("click", SendNewWork);
    H2Title.textContent = "Galerie photo";
  });

}

async function SendNewWork() {
  const inputImage = document.getElementById("pictureForm");
  const picturechange = document.getElementById("pictureAdded");
  const formAddPic = document.getElementById("labelAddPicture");
  const inputcate = document.getElementById("categorie").value;
  const inputeTitle = document.getElementById("title").value;
  console.log("couc");
  const image = inputImage.files[0];
  const formData = new FormData();
  formData.append("title", inputeTitle);
  formData.append("category", inputcate);
  formData.append("image", image);
  const response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: formData,
  });
  if (response.ok) {
    [arrowBack, ModalForm, btnFormConfirm, picturechange].forEach(e => e.classList.add("hidden"));
    [arrowBack, ModalForm, btnFormConfirm].forEach(e => e.classList.remove("visible"));
    [formAddPic, btnFC, GalleryElementModal].forEach(e => e.classList.remove("hidden"));
    btnFC.classList.add("visible");
    GalleryElementModal.classList.add("visibleGrid");
    picturechange.classList.remove("pictureForm");
    formAddPic.classList.add("labelAddPicture");
    GalleryElementModal.innerHTML = "";
    document.getElementById("ModalForm").reset()

    modalGallery();
  }
}

/**Modal**/
function modalOpenClose() {
  const btn = document.querySelectorAll(".fa-pen-to-square");

  /**Création de la modal avec la gallery**/
  btn.forEach((e) => {
    e.addEventListener("click", function () {

      modalHover.appendChild(modalElement);
      [cross, modalHover, modalElement].forEach(e => e.classList.add("visible"));
      [cross, modalHover, modalElement].forEach(e => e.classList.remove("hidden"));
      H2Title.textContent = "Galerie photo";
      galleryOrmodal.appendChild(GalleryElementModal);
      GalleryElementModal.classList.add("visibleGrid");
      GalleryElementModal.innerHTML = "";
      modalGallery();
    });
    closeModal();

    /** Bascule vers le formulaire */

    btnFC.addEventListener("click", function () {
      const btnFormConfirm = document.getElementById("btnFormConfirm");
      GalleryElementModal.classList.remove("visibleGrid");
      [ModalForm, arrowBack, btnFormConfirm].forEach(e => e.classList.add("visible"));
      [ModalForm, arrowBack, btnFormConfirm].forEach(e => e.classList.remove("hidden"));
      btnFC.classList.remove("visible");
      H2Title.textContent ="Ajout photo"
      GalleryElementModal.classList.add("hidden");
      btnFC.classList.add("hidden");
      /** Ajout d'un nouvelle élément **/
      btnFormConfirm.addEventListener("click", SendNewWork);
    });
    backTogallery();
  });
}
modalOpenClose();

/*GalleryModal*/
function modalGallery() {
  const modal = document.getElementById("modalsgallery");
  H2Title.textContent = "Galerie photo";
  getpictures().then((pictures) => {
    pictures.forEach((e) => {
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const i = document.createElement("i");

      img.src = e.imageUrl;
      img.alt = e.title;
      i.className = "fa-solid fa-trash";

      figure.appendChild(i);
      figure.appendChild(img);
      modal.appendChild(figure);
      figure.classList.add("modalfigure");
      img.classList.add("imgpre");
      i.classList.add("icons");
      i.setAttribute("id", e.id);
      i.addEventListener("click", function () {
        console.log(e.id);
        fetch("http://localhost:5678/api/works/" + e.id, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }).then((response) => {
          if (response.ok) {
            figure.remove();
          }
        });
      });
    });
  });
}

/** FormModal **/
function modalForm() {
  const img = document.createElement("img");
  const divimgfile = document.createElement("div");
  const inputTitle = document.createElement("input");
  const labelTitle = document.createElement("label");
  const inputCatégorie = document.createElement("select");
  const labelCatégorie = document.createElement("label");
  const optionCatégorie = document.createElement("option");
  const pictureForm = document.createElement("input");
  const labelPicture = document.createElement("label");
  const iLabelForm = document.createElement("i");
  const pLabelForm = document.createElement("span");
  const pScondeLabelForm = document.createElement("p");
  H2Title.textContent = "Ajout photo";
  Object.assign(pictureForm,{id:"pictureForm",type : "file", accept:"image/*",textContent:"jpg, png : 4mo max"});
  pictureForm.style.display = "none";
  labelPicture.htmlFor = "pictureForm";
  ModalForm.append(pictureForm, divimgfile, labelTitle, inputTitle, labelCatégorie, inputCatégorie);
  divimgfile.appendChild(labelPicture);
  divimgfile.appendChild(img);
  img.setAttribute("id", "pictureAdded");
  [ModalForm, GalleryElementModal, img].forEach(e => e.classList.add("hidden"))
  labelPicture.append(iLabelForm, pLabelForm, pScondeLabelForm);
  divimgfile.classList.add("labelAddPicture");
  labelPicture.setAttribute("id", "labelAddPicture");
  iLabelForm.classList.add("fa-image", "fa-regular");
  pLabelForm.textContent = "+ Ajouter photo";
  pScondeLabelForm.textContent = "jpg, png : 4mo max";
  labelTitle.textContent = "Title";
  inputTitle.name = "title";
  inputTitle.id = "title";
  inputCatégorie.name = "categorie";
  inputCatégorie.id = "categorie";
  labelCatégorie.textContent = "Catégorie";
  inputCatégorie.appendChild(optionCatégorie);
  optionCatégorie.value = "";
  optionCatégorie.textContent = "";
  checkPictureChange();
  catégorie().then((categories) => {
    categories.forEach((ee) => {
      const optionCatégorie = document.createElement("option");
      optionCatégorie.textContent = ee.name;
      optionCatégorie.value = ee.id;
      optionCatégorie.setAttribute("key", ee.id);
      inputCatégorie.appendChild(optionCatégorie);
    });
  });
}

/** Obtenir tous les travaux **/
async function getpictures() {
  const response = await fetch("http://localhost:5678/api/works");
  const pictures = await response.json();
  return pictures;
}

/** Intégration des élément dans la gallery **/
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



/***Ajout des button filtre*/
function CatégoriAddDom() {
  catégorie().then((cat) => {
    cat.forEach((e) => {
      const button = document.createElement("p");
      button.textContent = e.name;
      button.id = e.id;
      cate.appendChild(button);
    });
    selectedfilter();
  });
}
CatégoriAddDom();


/*Selection du filtre*/
function selectedfilter() {
  const buttons = document.querySelectorAll(".categoriesblock p");
  buttons.forEach((en) => {
    en.addEventListener("click", function (e) {
      e.preventDefault();
      AllValueWork(en.id);
      active = en.id;
      console.log(en.id);
      classlist();
    });
  });
}

/*Changement de class filtre actif*/
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
