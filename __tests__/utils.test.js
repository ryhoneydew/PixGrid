import {
  getGalleries,
  photoUrlGenerator,
  removeNodes,
  createModal,
  Page
} from "../utils";

describe("getGalleries Function", async () => {
  const mockFetch = data => {
    return jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => data
      })
    );
  };

  test("Should return the correct info", async () => {
    const testPhoto = { id: "123", title: "test-photo" };
    window.fetch = mockFetch(testPhoto);
    const photo = await getGalleries("fakeEndPoint");

    expect(photo).toEqual(testPhoto);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

describe("photoUrlGenerator function", () => {
  test("should return a correct url", () => {
    const farmId = "id123";
    const serverId = "1234";
    const id = "5678";
    const secret = "supersecret";
    const title = "test";

    const expected = `https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}_b.jpg`;
    expect(photoUrlGenerator(farmId, serverId, id, secret, title)).toBe(
      expected
    );
  });
});

describe("removeNodes function", () => {
  document.body.innerHTML = `
    <div id="test"><p /><p /></div>
    `;
  test("Should remove all the children nodes from the parent node", () => {
    const parent = document.getElementById("test");
    const childrenBeforeRemove = parent.childElementCount;
    removeNodes(childrenBeforeRemove, parent);
    const childrenAfterRemove = parent.childElementCount;

    expect(childrenAfterRemove).toEqual(0);
  });
});
describe("class Page", () => {
  const photosList = [
    { id: "1", farm: "abc", server: "1000", secret: "secret1", title: "test1" },
    { id: "2", farm: "def", server: "2000", secret: "secret2", title: "test2" },
    { id: "2", farm: "ghi", server: "3000", secret: "secret3", title: "test3" }
  ];
  //   document.body.innerHTML = `
  //   <div id="collection"></div>
  //   `;
  //   const photosNode = document.getElementById("collection");
  //   const newPage = new Page(photosList, 2, photosNode);
});
