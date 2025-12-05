// Weapon point values (approximate based on damage/AP)
const WEAPON_VALUES = {
    'dagger_10_2': 5,
    'shortsword_20_4': 10,
    'gladius_elite_34_5': 20,
    'celtic_longsword_36_4': 22,
    'warsword_40_15': 30,
    'spear_20_5_20': 15,
    'pike_20_4': 12,
    'lance_14_11_10': 18,
    // Add more as needed, default to 10 if not found
};

// Shield point values
const SHIELD_VALUES = {
    'none': 0,
    'caetra_cavalry_10': 5,
    'caetra_20': 8,
    'celtic_shock_30': 12,
    'celtic_40': 15,
    'hoplite_50': 18,
    'tower_55': 20,
    'germanic_wall_60': 22,
};

// Mount point values (significant impact)
const MOUNT_VALUES = {
    'none': 0,
    'rome_horse_light': 15,
    'rome_horse_medium': 20,
    'rome_horse_heavy': 25,
    'rome_horse_very_heavy': 30,
    'rome_camel': 20,
    // Add more as needed
};

/**
 * Calculate point value for a single unit
 * @param {Object} unit - Unit data with stats
 * @returns {number} - Point value (rounded to 1 decimal)
 */
export function calcUnitPoints(unit) {
    // Parse numeric stats (default to 0 if empty/invalid)
    const meleeAttack = parseFloat(unit.meleeAttack) || 0;
    const meleeDefense = parseFloat(unit.meleeDefense) || 0;
    const morale = parseFloat(unit.morale) || 0;
    const chargeBonus = parseFloat(unit.chargeBonus) || 0;
    const armor = parseFloat(unit.armor) || 0;
    const hp = parseFloat(unit.hp) || 0;
    const accuracy = parseFloat(unit.accuracy) || 0;
    
    // Get equipment values
    const weaponKey = unit.meleeWeapon || 'dagger_10_2';
    const weaponValue = WEAPON_VALUES[weaponKey] || 10;
    
    const shieldKey = unit.shield || 'none';
    const shieldValue = SHIELD_VALUES[shieldKey] || 0;
    
    const mountKey = unit.mount || 'none';
    const mountValue = MOUNT_VALUES[mountKey] || 0;
    
    // Calculate total points based on weighted formula
    const rawPoints = (
        (meleeAttack * 0.15) +
        (meleeDefense * 0.15) +
        (morale * 0.1) +
        (chargeBonus * 0.2) +
        (armor * 0.05) +
        (hp * 0.01) +
        (accuracy * 0.1) +
        weaponValue +
        shieldValue +
        mountValue
    ) / 100; // Scale down
    
    // Round to 1 decimal place
    return Math.round(rawPoints * 10) / 10;
}

/**
 * Calculate total points for all 15 units
 * @param {Array} units - Array of unit objects
 * @returns {number} - Total points (rounded to 1 decimal)
 */
export function calcTotalPoints(units) {
    const total = units.reduce((sum, unit) => {
        return sum + calcUnitPoints(unit);
    }, 0);
    
    return Math.round(total * 10) / 10;
}

// For CommonJS compatibility (Node/Jest)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calcUnitPoints, calcTotalPoints };
}