export function updatePrice(rowNumber, {
    totalPrice,
    meleeAttackCost,
    moraleCost,
    accuracyCost,
    meleeWeaponCost,
    hpCost,
    chargeBonusCost,
    meleeDefenceCost,
    armorCost,
    missileBlockCost,
    ammoCost
}) {
    let price = document.getElementById(`P-${rowNumber}`);

    if (price) {
        totalPrice[rowNumber - 1] =
            (meleeAttackCost[rowNumber - 1] +
            moraleCost[rowNumber - 1] +
            accuracyCost[rowNumber - 1] +
            meleeWeaponCost[rowNumber - 1] +
            hpCost[rowNumber - 1] +
            chargeBonusCost[rowNumber - 1] +
            meleeDefenceCost[rowNumber - 1] +
            armorCost[rowNumber - 1] +
            missileBlockCost[rowNumber - 1] +
            ammoCost[rowNumber - 1]) * 0.9;

        price.textContent =
            Math.round(totalPrice[rowNumber - 1] / 10) * 10;
    }
}

