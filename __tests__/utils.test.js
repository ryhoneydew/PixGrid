import { getGalleries, photoUrlGenerator, removeNodes, Page } from "../utils";
import mockDom from "../mockDom";

document.body.innerHTML = mockDom;

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

  const photosNode = document.getElementById("collection");
  const newPage = new Page(photosList, 2, photosNode);

  newPage.init();

  describe("Init the new page", () => {
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const pgButtons = document.querySelectorAll(".pg-number");
    const photos = document.querySelectorAll(".thumb");

    test("should generate the total page number ", () => {
      expect(newPage.totalPageNum).toBe(2);
    });

    test("Should generate the pagination button", () => {
      expect(previousButton).toBeDefined();
      expect(nextButton).toBeDefined();
      expect(pgButtons.length).toEqual(4);
    });

    test("Should disable the previous button when a page inits", () => {
      expect(previousButton.disabled).toBe(true);
    });

    test("Should create correct amount of photos when a page inits", () => {
      expect(photos.length).toBe(newPage.numberPerPage);
    });
  });

  describe("Change pages functionalities", () => {
    const currentPage = newPage.currentPage;
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    afterEach(() => {
      newPage.currentPage = 1;
      newPage.loadList();
    });

    test("Should change to next page when evoke nextPage function", () => {
      newPage.nextPage();

      expect(newPage.currentPage).not.toBe(currentPage);
      expect(newPage.currentPage).toBe(currentPage + 1);
    });

    test("Should change to previous page when evoke previousPage function", () => {
      newPage.nextPage();
      newPage.previousPage();

      expect(newPage.currentPage).toBe(currentPage);
    });

    test("Should be able to change the page when invoke the pickPage function", () => {
      const mockEvent = { target: { innerText: "2" } };
      newPage.pickPage(mockEvent);

      expect(newPage.currentPage).not.toBe(currentPage);
      expect(newPage.currentPage).toBe(2);
    });

    // test("Should disable previous or next button when necessary", () => {
    //   //expect(previousButton.disabled).toBe(true);
    //   console.log(newPage.currentPage);
    //   expect(nextButton.disabled).toBe(false);
    //   newPage.pickPage(newPage.totalPageNum);
    //   //   expect(nextButton.disabled).toBe(false);
    //   //   expect(previousButton.disabled).toBe(true);
    // });
  });
});
