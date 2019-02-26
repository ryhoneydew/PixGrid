import "babel-polyfill";
const APIKEY = "ed6aab79abedf1588ab39d51b9793bb1";

const endPointUrl = `https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=ed6aab79abedf1588ab39d51b9793bb1&gallery_id=66911286-72157703406532791&format=json&nojsoncallback=1`;
//const endPointUrl = `https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=abc&format=json`;

fetch(endPointUrl)
  .then(response => {
    return response;
  })
  .then(data => {
    console.log(data);
  });
//let data = await response.json();
//   } catch (err) {
//     console.log(err);
//   }

fetch("https://api.github.com/users/KrunalLathiya")
  .then(response => response.json())
  .then(data => {
    console.log(data); // Prints result from `response.json()` in getRequest
  })
  .catch(error => console.error(error));
//getGallery(endPointUrl);
