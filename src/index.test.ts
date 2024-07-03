import merge from "./index.js";

const a = {
  age: 8,
};
Object.defineProperty(a, "hiddenProp", {
  value: null,
});
const b = { name: "Bob" };
const c = merge(a, b);

console.log(c);
console.log(`${c}`);
console.log(c);
