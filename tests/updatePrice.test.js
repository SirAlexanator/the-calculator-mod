/**
 * @jest-environment jsdom
 */
import { updatePrice } from "../logic/updatePrice.js";

describe("updatePrice()", () => {
  let totalPrice;
  let costs;

  beforeEach(() => {
    document.body.innerHTML = `<span id="P-1"></span>`;
    
    // Initialize the arrays
    totalPrice = [];
    costs = {
      meleeAttackCost: [10],
      moraleCost: [20],
      accuracyCost: [30],
      meleeWeaponCost: [40],
      hpCost: [50],
      chargeBonusCost: [60],
      meleeDefenceCost: [70],
      armorCost: [80],
      missileBlockCost: [90],
      ammoCost: [100]
    };
  });

  test("computes and updates DOM price", () => {
    updatePrice(1, {
      totalPrice,
      ...costs
    });

    // Expected sum = 10+20+...+100 = 550
    // Multiply by 0.9: 550 * 0.9 = 495
    // round to nearest 10: 500
    expect(document.getElementById("P-1").textContent).toBe("500");
  });
});