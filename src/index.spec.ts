import { describe, it, expect } from "vitest";
import { BaseError } from "./index";

class CustomError1 extends BaseError {
    constructor(message: string) {
        super(message);
    }
}
class CustomError2 extends BaseError {
    constructor(message: string, public code: number) {
        super(message);
    }
}
class CustomError3 extends BaseError {
    constructor(message: string, public foo: string, public date: Date) {
        super(message);
    }

    bar(): string {
        return this.foo + this.date.toISOString();
    }
}

describe("BaseError", () => {
    describe(CustomError1.name, () => {
        it("should work with derived classes", () => {
            const error1 = new CustomError1("Custom error 1");
            expect(error1.name).toBe("CustomError1");
            expect(error1 instanceof Error).toBe(true);
            expect(error1 instanceof CustomError1).toBe(true);
            expect(error1 instanceof CustomError2).toBe(false);
            expect(error1 instanceof CustomError3).toBe(false);
            expect(error1.message).toBe("Custom error 1");
            expect(error1.stack).toBeDefined();
        })
    })
    describe(CustomError2.name, () => {
        it("should work with derived classes", () => {
            const error2 = new CustomError2("Custom error 2", 404);
            expect(error2.name).toBe("CustomError2");
            expect(error2 instanceof Error).toBe(true);
            expect(error2 instanceof CustomError1).toBe(false);
            expect(error2 instanceof CustomError2).toBe(true);
            expect(error2 instanceof CustomError3).toBe(false);
            expect(error2.message).toBe("Custom error 2");
            expect(error2.code).toBe(404);
            expect(error2.stack).toBeDefined();
        })
    })
    describe(CustomError3.name, () => {
        it("should work with derived classes", () => {
            const error3 = new CustomError3("Custom error 3", "fooValue", new Date("2024-01-01T00:00:00Z"));
            expect(error3.name).toBe("CustomError3");
            expect(error3 instanceof Error).toBe(true);
            expect(error3 instanceof CustomError1).toBe(false);
            expect(error3 instanceof CustomError2).toBe(false);
            expect(error3 instanceof CustomError3).toBe(true);
            expect(error3.message).toBe("Custom error 3");
            expect(error3.foo).toBe("fooValue");
            expect(error3.date.toISOString()).toBe("2024-01-01T00:00:00.000Z");
            expect(error3.bar()).toBe("fooValue2024-01-01T00:00:00.000Z");
            expect(error3.stack).toBeDefined();
        });
    });
});
