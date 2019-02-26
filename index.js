import "babel-polyfill";
import { getGalleries, photoUrlGenerator } from "./utils";
// const APIKEY = "ed6aab79abedf1588ab39d51b9793bb1";

const peopleShotsUrl = `https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=ed6aab79abedf1588ab39d51b9793bb1&gallery_id=66911286-72157705347519995&format=json&nojsoncallback=1`;

const photoCollection = document.getElementById("photo-collection");

getGalleries(peopleShotsUrl).then(data => {
  data.photos.photo.forEach(item => {
    var farmId = item.farm;
    var serverId = item.server;
    var id = item.id;
    var secret = item.secret;

    const img = document.createElement("img");
    const imgUrl = photoUrlGenerator(farmId, serverId, id, secret);
    img.setAttribute("src", imgUrl);
    photoCollection.appendChild(img);
  });
});
