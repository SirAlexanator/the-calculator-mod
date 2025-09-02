let meleeWeaponsData = [];
let missileWeaponsData = [];
let entityData = [];
let unitCategory1 = 0;
let unitCategory2 = 0;
let unitCategory3 = 0;
let unitCategory4 = 0;
let unitCategory5 = 0;
let unitCategory6 = 0;
let unitCategory7 = 0;
let unitCategory8 = 0;
let unitCategory9 = 0;
let unitCategory10 = 0;
let unitCategory11 = 0;
let unitCategory12 = 0;
let unitCategory13 = 0;
let unitCategory14 = 0;
let unitCategory15 = 0;

Promise.all([
    fetch('melee-weapons.json').then(response => response.json()),
    fetch('missile-weapons.json').then(response => response.json()),
    fetch('entity-details.json').then(response => response.json())
])
    .then(([meleeData, missileData, entitiesData]) => {

        meleeWeaponsData = meleeData;
        missileWeaponsData = missileData;
        entityData = entitiesData;
        console.log("All data loaded. Calculator ready!");

        const meleeWeaponInput = document.getElementById('MW-1');
        if (meleeWeaponInput) {
            meleeWeaponInput.addEventListener('input', () => {
                calcCategory(1);
            });
        }

    })
    .catch(error => {
        console.error('Failed to load necessary data:', error);
    });

function updatePrice(rowNumber, change) {
    const price = document.getElementById(`P-${rowNumber}`);
    let newPrice = price;
    newPrice = newPrice + change;
    price.textContent = `${newPrice}`;
}

function calcCategory(rowNumber) {
    const chargeBonus = document.getElementById(`CB-${rowNumber}`);
    const ammmo = document.getElementById(`Ammo-${rowNumber}`);
    const meleeWeapon = document.getElementById(`MW-${rowNumber}`);
    const missileWeapon = document.getElementById(`MisW-${rowNumber}`);
    const mount = document.getElementById(`Mount-${rowNumber}`);
    const animalArtilleryChariot = document.getElementById(`AAC-${rowNumber}`);
    const mwWeaponDetails = vlookup(meleeWeapon.value, meleeWeaponsData, 'Key');
    const misWeaponDetails = vlookup(missileWeapon.value, missileWeaponsData, 'Key')
    if (mount.value != 'none') {
        const entityDetails = vlookup(mount.value, entityData, 'Entity');
    }
    if (animalArtilleryChariot.value != 'none') {
        const entityDetails = vlookup(animalArtilleryChariot.value, entityData, 'Entity');
    }
    //Melee Infantry Check
    if ((mwWeaponDetails['Unit Type'] == 'mel') && (ammo <= 5 || (missileWeapon.value == 'torch_25_1_0' || missileWeapon.value == 'stone_hand_75_5_1')) && (mount.value == 'none') && (animalArtilleryChariot.value == 'none') && (misWeaponDetails['Type'] == 'any')) {
    }
}


function vlookup(valueToFind, dataArray, key) {
    return dataArray.find(item => item[key] === valueToFind);
}