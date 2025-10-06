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
    });
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
    const iP = document.createElement("i");
    headEdit.appendChild(div);
    div.appendChild(iP);
    div.appendChild(pT);
    pT.textContent = "Mode édition";
    iP.className = "fa-solid fa-pen-to-square";
    const portofolioedit = document.getElementById("portofolioEdit");
    portofolioedit.appendChild(iP);
    portofolioedit.appendChild(pEdit);
    pEdit.textContent = "Modifier";
  }
}
addContentEditingMod();

function checkFormEmpty() {
  const inputcate = document.getElementById("categorie");
  const inputeTitle = document.getElementById("title");
  const btnFormConfirm = document.getElementById("btnFormConfirm");
  inputeTitle.addEventListener("input", function (e) {
    if (e.target.value != "") {
      btnFormConfirm.disabled = false;
    } else {
      btnFormConfirm.disabled = true;
    }
  });
}

function closeModal() {
  /**Fermeture de la modal**/
  cross.addEventListener("click", function () {
    modalHover.classList.remove("visible");
    modalHover.classList.add("hidden");
    modalElement.classList.remove("visible");
    modalElement.classList.add("hidden");
    ModalForm.classList.add("hidden");
    arrowBack.classList.add("hidden");
    arrowBack.classList.remove("visible");
    btnFC.classList.remove("hidden");
    btnFC.classList.add("visible");
    btnFormConfirm.classList.remove("visible");
    btnFormConfirm.classList.add("hidden");
    GalleryElementModal.innerHTML = "";

    AllValueWork(0);
  });
}

function backTogallery() {
  arrowBack.addEventListener("click", function () {
    arrowBack.classList.add("hidden");
    arrowBack.classList.remove("visible");
    ModalForm.classList.add("hidden");
    ModalForm.classList.remove("visible");
    GalleryElementModal.classList.remove("hidden");
    GalleryElementModal.classList.add("visibleGrid");
    btnFC.classList.remove("hidden");
    btnFC.classList.add("visible");
    btnFormConfirm.classList.remove("visible");
    btnFormConfirm.classList.add("hidden");
    btnFormConfirm.removeEventListener("click", SendNewWork);
  });
}

async function SendNewWork() {
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
    arrowBack.classList.add("hidden");
    arrowBack.classList.remove("visible");
    ModalForm.classList.add("hidden");
    ModalForm.classList.remove("visible");
    GalleryElementModal.classList.remove("hidden");
    GalleryElementModal.classList.add("visibleGrid");
    btnFC.classList.remove("hidden");
    btnFC.classList.add("visible");
    btnFormConfirm.classList.remove("visible");
    btnFormConfirm.classList.add("hidden");
    picturechange.classList.remove("pictureForm");
    picturechange.classList.add("hidden");
    formAddPic.classList.remove("hidden");
    formAddPic.classList.add("labelAddPicture");
    GalleryElementModal.innerHTML = "";
    modalGallery();
  }
}

/**Modal**/
function modalOpenClose() {
  const btn = document.querySelectorAll(".fa-pen-to-square");

  /**Création de la modal avec la gallery**/
  btn.forEach((e) => {
    e.addEventListener("click", function () {
      cross.classList.remove("hidden");
      cross.classList.add("visible");
      H2Title.textContent = "Galerie photo";
      modalHover.classList.remove("hidden");
      modalHover.classList.add("visible");
      modalHover.appendChild(modalElement);
      modalElement.classList.remove("hidden");
      modalElement.classList.add("visible");
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
      GalleryElementModal.classList.add("hidden");
      ModalForm.classList.add("visible");
      ModalForm.classList.remove("hidden");
      arrowBack.classList.add("visible");
      arrowBack.classList.remove("hidden");
      btnFC.classList.remove("visible");
      btnFC.classList.add("hidden");
      btnFormConfirm.classList.remove("hidden");
      btnFormConfirm.classList.add("visible");

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

if (localStorage.getItem("status") === "connected") {
  modalForm();
  checkFormEmpty();
}

/** FormModal **/
function modalForm() {
  const ModalForm = document.getElementById("ModalForm");
  const GalleryElementModal = document.getElementById("modalsgallery");
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
  ModalForm.classList.add("hidden");
  GalleryElementModal.classList.add("hidden");
  pictureForm.type = "file";
  pictureForm.accept = "image/*";
  pictureForm.textContent = "jpg, png : 4mo max";
  pictureForm.style.display = "none";
  pictureForm.id = "pictureForm";
  labelPicture.htmlFor = "pictureForm";

  ModalForm.appendChild(pictureForm);
  ModalForm.appendChild(divimgfile);
  divimgfile.appendChild(labelPicture);
  divimgfile.appendChild(img);
  img.classList.add("hidden");
  img.setAttribute("id", "pictureAdded");

  labelPicture.appendChild(iLabelForm);
  labelPicture.appendChild(pLabelForm);
  labelPicture.appendChild(pScondeLabelForm);
  divimgfile.classList.add("labelAddPicture");
  labelPicture.setAttribute("id", "labelAddPicture");
  iLabelForm.classList.add("fa-image", "fa-regular");
  pLabelForm.textContent = "+ Ajouter photo";
  pScondeLabelForm.textContent = "jpg, png : 4mo max";
  ModalForm.appendChild(labelTitle);
  ModalForm.appendChild(inputTitle);
  ModalForm.appendChild(labelCatégorie);
  ModalForm.appendChild(inputCatégorie);
  labelTitle.textContent = "Title";
  inputTitle.name = "title";
  inputTitle.id = "title";
  inputCatégorie.name = "categorie";
  inputCatégorie.id = "categorie";
  labelCatégorie.textContent = "Catégorie";
  inputCatégorie.appendChild(optionCatégorie);
  optionCatégorie.value = "";
  optionCatégorie.textContent = "";
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

function login() {
  const log = document.getElementById("login");
  log.addEventListener("click", function (e) {
    e.preventDefault();
    if (log.textContent === "logout") {
      window.location.href = "./index.html";
    } else {
      window.location.href = "./assets/login.html";
    }
  });
}
login();

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
