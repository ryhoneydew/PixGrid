import "cross-fetch/polyfill";

import { getGalleries } from "../utils";
// import { getGalleries } from '../utils';
describe("getGalleries Function", () => {
  let mockEvent;
  let mockUpdateGroceryList;
  let mockGrocery;
  let mockGroceries;

  beforeEach(() => {
    mockEvent = { preventDefault: jest.fn() };
    mockUpdateGroceryList = jest.fn();
    mockGrocery = { name: "Oranges", quantity: 3 };
    mockGroceries = [
      { id: 1, name: "Pineapples", quantity: 10 },
      { id: 2, name: "Oranges", quantity: 3 }
    ];
  });
  test("Should get all the galleries with ");
});
