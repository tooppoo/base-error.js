# base-error.js

Safe, minimal base class for building custom Errors in TypeScript/JavaScript.

This class preserves the original stack trace reliably on V8 runtimes (Node.js, Chromium), making it a safe foundation for your domain-specific errors.

## Features

- Preserves the correct stack trace using `Error.captureStackTrace` when available (V8)
- Tiny and dependency-free
- First-class TypeScript support
- Works with inheritance: define your own error classes by extending `BaseError`

## Supported runtimes

- Node.js 20.x and 22+ (Node 21.x is intentionally not supported)

## Installation

```sh
npm install @philomagi/base-error.js
# or
pnpm add @philomagi/base-error.js
# or
yarn add @philomagi/base-error.js
```

## Usage

### Define your own error

```ts
import { BaseError } from "@philomagi/base-error.js";

export class NotFoundError extends BaseError {
	constructor(resource: string) {
		super(`Resource not found: ${resource}`);
	}
}

throw new NotFoundError("/users/123");
```

### With extra fields and methods

```ts
import { BaseError } from "@philomagi/base-error.js";

export class HttpError extends BaseError {
	constructor(message: string, public status: number) {
		super(message);
	}
}

const err = new HttpError("Not found", 404);
console.error(err.status); // 404
```

### CommonJS

```js
const { BaseError } = require("@philomagi/base-error.js");

class MyError extends BaseError {
	constructor(msg) {
		super(msg);
	}
}
```

## Stack traces

On V8-based runtimes (Node.js, Chromium), `BaseError` uses `Error.captureStackTrace` to preserve the original throw site. In non‑V8 engines, it falls back to the default `Error` behavior; `stack` may still be present, but formatting and depth can vary by engine.

Type definitions include an optional `ErrorConstructor.captureStackTrace` so your code type‑checks even when `@types/node` isn’t installed.

## API

```ts
export abstract class BaseError extends Error {
	constructor(message: string);
}
```

- `message`: human‑readable description. You can add any extra fields/methods in derived classes.

Notes:
- `BaseError` sets `this.name = new.target.name` by default, so instances of `class X extends BaseError {}` will have `err.name === "X"`. If you prefer a different naming scheme, override `name` in your subclass.
- If you want to attach structured metadata (e.g., `code`, `details`), just add public fields to your subclass.

## Examples (from tests)

```ts
class CustomError1 extends BaseError {
	constructor(message: string) { super(message); }
}
class CustomError2 extends BaseError {
	constructor(message: string, public code: number) { super(message); }
}
class CustomError3 extends BaseError {
	constructor(message: string, public foo: string, public date: Date) { super(message); }
	bar(): string { return this.foo + this.date.toISOString(); }
}
```

## Build and test (contributors)

```sh
# build library (ESM + CJS) and type declarations
npm run build

# run tests once
npm run test

# watch tests
npm run test:watch
```

CI runs tests on Node 20.x, 22, 24, and 25.

## License

MIT © philomagi
