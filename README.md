# @cch137/merge

The `@cch137/merge` package provides a utility to merge multiple objects into a single object, allowing you to perform CRUD operations on the merged object. It works on both the browser and Node.js environments. This package does not support deep merge.

## Installation

```bash
npm install @cch137/merge
```

## Usage

Here is an example demonstrating the merge functionality and performing CRUD operations on the merged object:

```typescript
import merge from "@cch137/merge";

const obj1 = { a: 1, b: 2, c: 3 };
const obj2 = { b: "two", d: 4 };
const obj3 = { e: 5 };

const merged = merge(obj1, obj2, obj3);

// Read properties
console.log(merged.a); // Output: 1
console.log(merged.b); // Output: 'two'
console.log(merged.c); // Output: 3
console.log(merged.d); // Output: 4
console.log(merged.e); // Output: 5

// Update properties
merged.b = "updated";
console.log(merged.b); // Output: 'updated'

// Add new properties
merged.f = 6;
console.log(merged.f); // Output: 6

// Delete properties
delete merged.a;
console.log(merged.a); // Output: undefined
```

In this example:

- The `merge` function combines `obj1`, `obj2`, and `obj3` into a single object.
- You can access properties from all merged objects.
- You can update properties, add new properties, and delete existing properties on the merged object.

## Limitations

- This package does not support deep merge; it only merges properties at the top level.
