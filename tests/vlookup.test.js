import { vlookup } from "../logic/vlookup.js";



describe("vlookup()", () => {

  test("returns the matching object when key matches", () => {
    const data = [
      { name: "Sword", damage: 10 },
      { name: "Axe", damage: 15 }
    ];

    const result = vlookup("Axe", data, "name");
    expect(result).toEqual({ name: "Axe", damage: 15 });
  });

  test("returns undefined when no match is found", () => {
    const data = [
      { name: "Sword", damage: 10 }
    ];

    const result = vlookup("Bow", data, "name");
    expect(result).toBeUndefined();
  });

});