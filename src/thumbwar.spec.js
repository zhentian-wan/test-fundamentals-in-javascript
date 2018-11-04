const thumbWar = require("./thumbwar");
const utils = require("./utils");
const assert = require("assert");

test("returns winner", () => {
  //const originalGetWinner = utils.getWinner;
  //utils.getWinner = jest.fn((p1, p2) => p1); // eslint-disable-line no-unused-vars
  jest.spyOn(utils, "getWinner");
  utils.getWinner.mockImplementation((p1, p2) => p1); // eslint-disable-line no-unused-vars
  const winner = thumbWar("KCD", "KW");
  expect(winner).toBe("KCD");
  expect(utils.getWinner.mock.calls).toEqual([["KCD", "KW"], ["KCD", "KW"]]);
  expect(utils.getWinner).toHaveBeenCalledTimes(2);
  expect(utils.getWinner).toHaveBeenNthCalledWith(1, "KCD", "KW");
  expect(utils.getWinner).toHaveBeenNthCalledWith(2, "KCD", "KW");

  // utils.getWinner = originalGetWinner;
  utils.getWinner.mockRestore();
});

function fn(impl = () => {}) {
  const mockFn = (...args) => {
    mockFn.mock.calls.push(args);
    mockFn.mockImplementation = newImpl => (impl = newImpl);
    return impl(...args);
  };
  mockFn.mock = {calls: []};
  return mockFn;
}

function spyOn(obj, prop) {
  // store the origianl fn
  const originalValue = obj[prop];
  // assign new mock fn
  obj[prop] = fn;
  // add restore fn
  obj[prop].mockRestore = () => (obj[prop] = originalValue);
}

test("returns winner: fn", () => {
  spyOn(utils, "getWinner");
  utils.getWinner.mockImplementation = fn((p1, p2) => p1); // eslint-disable-line no-unused-vars
  const winner = thumbWar("KCD", "KW");
  assert.strictEqual(winner, "KCD");
  assert.deepStrictEqual(utils.getWinner.mock.calls, [
    ["KCD", "KW"],
    ["KCD", "KW"],
  ]);
  utils.getWinner.mockRestore();
});
