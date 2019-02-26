export const getGalleries = async endpoint => {
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error("Failed to fetch data ", err.message);
  }
};