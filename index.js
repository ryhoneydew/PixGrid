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

const createCollection = async (url, parent) => {
  const data = await getGalleries(url);
  const photos = data.photos.photo;
  const photoNodeList = document.querySelectorAll(".photo");
  const pgList = document.querySelectorAll(".pg-number");
  let lengthOfPhotoNodes = photoNodeList.length;
  let lengthOfPgList = pgList.length;

  removeNodes(lengthOfPhotoNodes, photosNode);
  removeNodes(lengthOfPgList, paginations);

  const newPage = new Page(photos, 10, photosNode);

  newPage.init();

  // data.photos.photo.forEach((item, idx) => {
  //   const farmId = item.farm;
  //   const serverId = item.server;
  //   const id = item.id;
  //   const secret = item.secret;

  //   const elem = document.createElement("div");
  //   elem.className = "photo";
  //   elem.setAttribute("id", `photo${idx}`);
  //   const img = document.createElement("img");
  //   const imgUrl = photoUrlGenerator(farmId, serverId, id, secret);
  //   img.setAttribute("src", imgUrl);
  //   elem.appendChild(img);

  //   photosNode.appendChild(elem);
  // });
  parent.appendChild(photosNode);
};

blackWhiteButton.addEventListener("click", () =>
  createCollection(blackWhiteUrl, photoCollection)
);
architectureButton.addEventListener("click", () =>
  createCollection(architectureUrl, photoCollection)
);
peopleShotsButton.addEventListener("click", () =>
  createCollection(peopleShotsUrl, photoCollection)
);
