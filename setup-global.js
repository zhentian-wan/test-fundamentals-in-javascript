async function test(title, cb) {
  try {
    await cb();
    console.log(`%c ✔︎ ${title}`, "color: green");
  } catch (err) {
    console.error(`✘ ${title}`);
    console.error(err);
  }
}

function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`${actual} is not equal to ${expected}`);
      }
    }
  };
}

global.test = test;
global.expect = expect;
