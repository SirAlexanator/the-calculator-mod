/**
 * @jest-environment jsdom
 */

import { calcPrice } from "../logic/calcPrice.js";

describe("calcPrice()", () => {
  test("calculates total price correctly with sample values", () => {
    const values = {
      meleeAttack: 10,
      morale: 5,
      accuracy: 8,
      hp: 100,
      chargeBonus: 2
    };
    
    const costs = {
      meleeAttack: 2.0,
      morale: 1.5,
      accuracy: 1.0,
      hp: 0.1,
      chargeBonus: 2.5
    };
    
    const result = calcPrice(values, costs);
    
    // Expected calculation:
    // (10 * 2.0) + (5 * 1.5) + (8 * 1.0) + (100 * 0.1) + (2 * 2.5)
    // = 20 + 7.5 + 8 + 10 + 5
    // = 50.5
    expect(result).toBe(50.5);
  });

  test("returns 0 when all values are 0", () => {
    const values = {
      meleeAttack: 0,
      morale: 0,
      accuracy: 0,
      hp: 0,
      chargeBonus: 0
    };
    
    const costs = {
      meleeAttack: 2.0,
      morale: 1.5,
      accuracy: 1.0,
      hp: 0.1,
      chargeBonus: 2.5
    };
    
    const result = calcPrice(values, costs);
    
    expect(result).toBe(0);
  });

  test("handles negative values correctly", () => {
    const values = {
      meleeAttack: -5,
      morale: 10,
      accuracy: 0,
      hp: 0,
      chargeBonus: 0
    };
    
    const costs = {
      meleeAttack: 2.0,
      morale: 1.5,
      accuracy: 1.0,
      hp: 0.1,
      chargeBonus: 2.5
    };
    
    const result = calcPrice(values, costs);
    
    // (-5 * 2.0) + (10 * 1.5) = -10 + 15 = 5
    expect(result).toBe(5);
  });

  test("calculates with different cost multipliers", () => {
    const values = {
      meleeAttack: 20,
      morale: 15,
      accuracy: 10,
      hp: 50,
      chargeBonus: 5
    };
    
    const costs = {
      meleeAttack: 1.0,
      morale: 2.0,
      accuracy: 0.5,
      hp: 0.2,
      chargeBonus: 3.0
    };
    
    const result = calcPrice(values, costs);
    
    // (20 * 1.0) + (15 * 2.0) + (10 * 0.5) + (50 * 0.2) + (5 * 3.0)
    // = 20 + 30 + 5 + 10 + 15
    // = 80
    expect(result).toBe(80);
  });
});