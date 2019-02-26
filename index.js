import "babel-polyfill";
import { getGalleries } from "./utils";
const APIKEY = "ed6aab79abedf1588ab39d51b9793bb1";

const endPointUrl = `https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=ed6aab79abedf1588ab39d51b9793bb1&gallery_id=66911286-72157703406532791&format=json&nojsoncallback=1`;
//const endPointUrl = `https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=abc&format=json`;

getGalleries(endPointUrl);
