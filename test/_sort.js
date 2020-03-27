const Sort = require("../src/Sort");
const { expect } = require("chai");

describe("Sort", () => {
  it("should be a function", () => {
    expect(Sort).to.be.a("function");
  });
  it("should have a sort method", () => {
    expect(Sort.prototype.sort).to.be.a("function");
  });

  it("should sort array", () => {
    //Generate random array
    const maxLength = 10;

    const array = [];
    for (let i = 0; i < maxLength; i++) {
      array.push(Math.floor(Math.random() * 10));
    }

    console.log("input", array);
    //Call sort
    const expected = array.slice().sort((a, b) => (a < b ? -1 : 1));
    const sort = new Sort(array);

    const result = sort.sort();
    // console.log("input", array);//Mutable?
    console.log("result", result);
    console.log("expected", expected);

    //Assert
    expect(expected).to.deep.equal(result);
  });
});
