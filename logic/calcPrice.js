export function calcPrice(values, costs) {
    return (
        values.meleeAttack * costs.meleeAttack +
        values.morale * costs.morale +
        values.accuracy * costs.accuracy +
        values.hp * costs.hp +
        values.chargeBonus * costs.chargeBonus
    );
}