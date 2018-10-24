const { sumAsync, subtractAsync } = require("./math");

let result, expected;

test("sum adds numbers", async () => {
  result = await sumAsync(3, 7);
  expected = 10;
  expect(result).toBe(expected);
});

test("subtract substracts numbers", async () => {
  result = await subtractAsync(7, 3);
  expected = 4;
  expect(result).toBe(expected);
});
