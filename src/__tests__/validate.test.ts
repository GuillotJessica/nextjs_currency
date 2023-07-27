import { validateEmail } from "../utils/validate";

describe("Validate", () => {
  it("validate email", () => {
    expect(validateEmail("ddd")).toBeFalsy();
    expect(validateEmail("ddd@ss.df")).toBeTruthy();
  });
});
