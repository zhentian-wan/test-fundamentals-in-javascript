const thumbWar = require("./thumbwar");
const utils = require("./utils");
const assert = require("assert");

test("returns winner", () => {
  utils.getWinner = jest.fn((p1, p2) => p1); // eslint-disable-line no-unused-vars
  const winner = thumbWar("KCD", "KW");
  expect(winner).toBe("KCD");
  expect(utils.getWinner.mock.calls).toEqual([["KCD", "KW"], ["KCD", "KW"]]);
  expect(utils.getWinner).toHaveBeenCalledTimes(2);
  expect(utils.getWinner).toHaveBeenNthCalledWith(1, "KCD", "KW");
  expect(utils.getWinner).toHaveBeenNthCalledWith(2, "KCD", "KW");
});

function fn(impl) {
  const mockFn = (...args) => {
    mockFn.mock.calls.push(args);
    return impl(...args);
  };
  mockFn.mock = {calls: []};
  return mockFn;
}

test("returns winner: fn", () => {
  utils.getWinner = fn((p1, p2) => p1); // eslint-disable-line no-unused-vars
  const winner = thumbWar("KCD", "KW");
  assert.strictEqual(winner, "KCD");
  assert.deepStrictEqual(utils.getWinner.mock.calls, [
    ["KCD", "KW"],
    ["KCD", "KW"],
  ]);
});
