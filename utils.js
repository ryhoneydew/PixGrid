import "babel-polyfill";

export const getGalleries = async endpoint => {
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error("Failed to fetch data ", err.message);
  }
};

export const photoUrlGenerator = (farmId, serverId, id, secret) =>
  `https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}_b.jpg`;

export const removeNodes = (length, parentNode) => {
  while (length) {
    parentNode.removeChild(parentNode.childNodes[0]);
    length--;
  }
};

export const createModal = (modal, modalImg, captionText, info) => {
  modal.style.display = "block";
  modalImg.src = info.imgUrl;
  modalImg.alt = `${info.title}-photo`;
  captionText.innerHTML = info.title;
};
export class Page {
  constructor(photosList, numberPerPage, photosNode) {
    this.photosNode = photosNode;
    this.photosList = photosList;
    this.currPhotosList = [];
    this.currentPage = 1;
    this.numberPerPage = numberPerPage;
    this.totalPageNum = 0;

    this.getNumberOfPages.bind(this);
    this.createPaginationButtons.bind(this);
    this.loadList.bind(this);
    this.createNodes.bind(this);
    this.nextPage.bind(this);
    this.previousPage.bind(this);
    this.pickPage.bind(this);
    this.checkButton.bind(this);
  }

  init() {
    this.getNumberOfPages();
    this.loadList();
    this.createPaginationButtons();
  }

  getNumberOfPages() {
    this.totalPageNum = Math.ceil(this.photosList.length / this.numberPerPage);
  }

  createPaginationButtons() {
    const paginationSection = document.getElementById("pagination");

    const previousButton = document.createElement("button");
    previousButton.innerText = "previous";
    previousButton.setAttribute("id", "previous");
    previousButton.className = "pg-number";
    previousButton.addEventListener("click", () => this.previousPage());
    previousButton.disabled = true;
    paginationSection.appendChild(previousButton);

    for (let i = 1; i <= this.totalPageNum; i++) {
      const numberButton = document.createElement("button");
      numberButton.className = "pg-number";
      numberButton.addEventListener("click", event => this.pickPage(event));
      numberButton.innerText = i;
      paginationSection.appendChild(numberButton);
    }
    const nextButton = document.createElement("button");
    nextButton.innerText = "next";
    nextButton.setAttribute("id", "next");
    nextButton.className = "pg-number";
    nextButton.addEventListener("click", () => this.nextPage());
    paginationSection.appendChild(nextButton);
  }

  loadList() {
    removeNodes(this.currPhotosList.length, this.photosNode);
    const begin = (this.currentPage - 1) * this.numberPerPage;
    const end = begin + this.numberPerPage;
    this.currPhotosList = this.photosList.slice(begin, end);
    this.createNodes();

    this.checkButton();
  }

  createNodes() {
    this.currPhotosList.forEach(item => {
      const farmId = item.farm;
      const serverId = item.server;
      const id = item.id;
      const secret = item.secret;
      const title = item.title;

      const elem = document.createElement("div");
      const img = document.createElement("img");
      const text = document.createElement("p");

      const modal = document.getElementById("myModal");
      const span = document.getElementsByClassName("close")[0];
      span.onclick = function() {
        modal.style.display = "none";
      };
      const modalImg = document.getElementById("popup");
      const captionText = document.getElementById("caption");

      const imgUrl = photoUrlGenerator(farmId, serverId, id, secret);
      img.setAttribute("src", imgUrl);
      img.className = "thumb-img";
      text.className = "thumb-text";
      text.innerText = title;
      img.addEventListener("click", () =>
        createModal(modal, modalImg, captionText, { imgUrl, title })
      );
      elem.className = "thumb";
      elem.classList.add("thumb-img");
      elem.appendChild(img);
      elem.appendChild(text);

      this.photosNode.appendChild(elem);
    });
  }

  nextPage() {
    this.currentPage++;
    this.loadList();
  }

  previousPage() {
    this.currentPage--;
    this.loadList();
  }

  pickPage(event) {
    this.currentPage = Number(event.target.innerText);
    this.loadList();
  }

  checkButton() {
    const nextButton = document.getElementById("next");
    const previousButton = document.getElementById("previous");

    if (nextButton && previousButton) {
      nextButton.disabled =
        this.currentPage == this.totalPageNum ? true : false;
      previousButton.disabled = this.currentPage <= 1 ? true : false;
    }
  }
}
