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
  // https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret +
  `https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}.jpg`;

export const removeNodes = (length, parentNode) => {
  while (length) {
    parentNode.removeChild(parentNode.childNodes[0]);
    length--;
  }
};
