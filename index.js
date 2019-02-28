import "babel-polyfill";
import { getGalleries, removeNodes, Page } from "./utils";

const peopleShotsUrl = `https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=ed6aab79abedf1588ab39d51b9793bb1&gallery_id=66911286-72157705347519995&format=json&nojsoncallback=1`;
const architectureUrl = `https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=ed6aab79abedf1588ab39d51b9793bb1&gallery_id=66911286-72157699121913970&format=json&nojsoncallback=1`;
const blackWhiteUrl = `https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=ed6aab79abedf1588ab39d51b9793bb1&gallery_id=66911286-72157703406532791&format=json&nojsoncallback=1`;

const photoCollection = document.getElementById("photo-collection");
const photosNode = document.createElement("div");
const blackWhiteButton = document.getElementById("black-white");
const architectureButton = document.getElementById("architecture");
const peopleShotsButton = document.getElementById("people-shots");
const paginations = document.getElementById("pagination");

photoCollection.className = "flex-container";
photosNode.className = "flex-container";
photosNode.classList.add("photos-container");

const createCollection = async (url, parent) => {
  const data = await getGalleries(url);
  const photos = data.photos.photo;
  const photoNodeList = document.querySelectorAll(".thumb");
  const pgList = document.querySelectorAll(".pg-number");
  let lengthOfPhotoNodes = photoNodeList.length;
  let lengthOfPgList = pgList.length;

  removeNodes(lengthOfPhotoNodes, photosNode);
  removeNodes(lengthOfPgList, paginations);

  const newPage = new Page(photos, 10, photosNode);

  newPage.init();

  parent.appendChild(photosNode);
};

createCollection(peopleShotsUrl, photoCollection);

blackWhiteButton.addEventListener("click", () =>
  createCollection(blackWhiteUrl, photoCollection)
);
architectureButton.addEventListener("click", () =>
  createCollection(architectureUrl, photoCollection)
);
peopleShotsButton.addEventListener("click", () =>
  createCollection(peopleShotsUrl, photoCollection)
);
