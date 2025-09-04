let meleeWeaponsData = [];
let missileWeaponsData = [];
let entityData = [];
let unitCategories = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let ammoCost = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let accuracyCost = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let moraleCost = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let meleeWeaponCost = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let chargeBonusCost = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let meleeDefenceCost =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let hpCost =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let meleeAttackCost = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let armorCost = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let missileBlockCost = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let mountCost = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let animalEngineCost = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let abilityCost = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let totalPrice = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

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
        startCalculator();

    })
    .catch(error => {
        console.error('Failed to load necessary data:', error);
    });


function updatePrice(rowNumber){
    let price = document.getElementById(`P-${rowNumber}`);
    if(price){
    totalPrice[rowNumber-1]=(meleeAttackCost[rowNumber-1]+moraleCost[rowNumber-1]+
        accuracyCost[rowNumber-1]+meleeWeaponCost[rowNumber-1]+hpCost[rowNumber-1]);
    price.textContent = totalPrice[rowNumber-1];
    console.log("Price changed");
    }
}

//Melee In =1, Spear Inf = 2, Pike Inf =3, Archer =4, Slinger =5, Pelt =6, Mel Cav = 7, Shk Cav = 8
//MisCav = 9, Animal = 10, Chariot = 11, Arty = 12, Elepant = 13, Gun = 14
function calcCategory(rowNumber) {
    const chargeBonus = document.getElementById(`CB-${rowNumber}`);
    const ammo = document.getElementById(`Ammo-${rowNumber}`);
    const meleeWeapon = document.getElementById(`MW-${rowNumber}`);
    const missileWeapon = document.getElementById(`MisW-${rowNumber}`);
    const mount = document.getElementById(`Mount-${rowNumber}`);
    const animalArtilleryChariot = document.getElementById(`AAC-${rowNumber}`);
    const mwWeaponDetails = vlookup(meleeWeapon.value, meleeWeaponsData, 'Key');
    const misWeaponDetails = vlookup(missileWeapon.value, missileWeaponsData, 'Key')
    let entityDetails = vlookup('none',entityData,'Entity');
    if (mount.value != 'none') {
        entityDetails = vlookup(mount.value, entityData, 'Entity');
    }
    else if(animalArtilleryChariot.value != 'none') {
        entityDetails = vlookup(animalArtilleryChariot.value, entityData, 'Entity');
    }

//Melee Infantry Check
 if ((mwWeaponDetails['Unit Type'] == 'mel') && (ammo.value <= 5|| ammo.textContent==""|| ammo.textContent==" " || (missileWeapon.value == 'torch_25_1_0' || missileWeapon.value == 'stone_hand_75_5_1')) && (mount.value == 'none') && (animalArtilleryChariot.value == 'none') && (misWeaponDetails['Type'] == 'any')) {
unitCategories[rowNumber-1] = 1;
}//Spear Infantry Check
else if((mwWeaponDetails['Unit Type'] == 'spr'||mwWeaponDetails['Unit Type'] =='shk') && (ammo.value <= 5|| ammo.textContent==""|| ammo.textContent==" " || (missileWeapon.value == 'torch_25_1_0' || missileWeapon.value == 'stone_hand_75_5_1')) && (mount.value == 'none') && (animalArtilleryChariot.value == 'none') && (misWeaponDetails['Type'] == 'any')){
unitCategories[rowNumber-1] = 2;
}//Pike Infantry Check
else if((mwWeaponDetails['Unit Type'] == 'pik') && (ammo.value <= 5|| ammo.textContent==""|| ammo.textContent==" " || (missileWeapon.value == 'torch_25_1_0' || missileWeapon.value == 'stone_hand_75_5_1')) && (mount.value == 'none') && (animalArtilleryChariot.value == 'none') && (misWeaponDetails['Type'] == 'any')){
unitCategories[rowNumber-1] = 3;
}//Archer
else if((misWeaponDetails['Unit Type']=='arr')&&(animalArtilleryChariot.value=='none'&&mount.value=='none')){
unitCategories[rowNumber-1] = 4;
}//Slinger
else if((misWeaponDetails['Unit Type']=='sli')&&(animalArtilleryChariot.value=='none'&&mount.value=='none')){
unitCategories[rowNumber-1] = 5;
}//Peltast
else if((misWeaponDetails['Unit Type']=='pel'||(misWeaponDetails['Unit Type']=='any'&&ammo.value>5)&&(missileWeapon.value != 'torch_25_1_0' && missileWeapon.value != 'stone_hand_75_5_1'))&&(animalArtilleryChariot.value=='none'&&mount.value=='none')){
unitCategories[rowNumber-1] = 6;
}//Melee Cav
else if((chargeBonus<=50)&&(((ammo.value <= 5|| ammo.textContent==""|| ammo.textContent==" ") && misWeaponDetails['Type'] == 'any') || (missileWeapon.value == 'torch_25_1_0' || missileWeapon.value == 'stone_hand_75_5_1'))&&(mountDetails['Entity']=='mt')&&(mwWeaponDetails['Unit Type']!='shk')){
unitCategories[rowNumber-1] = 7;
}//Shk Cav
else if((((ammo.value <= 5|| ammo.textContent==""|| ammo.textContent==" ") && misWeaponDetails['Type'] == 'any') || (missileWeapon.value == 'torch_25_1_0' || missileWeapon.value == 'stone_hand_75_5_1'))&&(mountDetails['Entity']=='mt')&&(mwWeaponDetails['Unit Type']=='shk')){
unitCategories[rowNumber-1] = 8;
}//MisCav
else if((ammo.value>5||misWeaponDetails['Type'] != 'any')&&(mountDetails['Entity']=='mt')){
 unitCategories[rowNumber-1] = 9;
}//Animals
else if(entityDetails['Type'] == 'an'){
unitCategories[rowNumber-1] = 10;
}//Chariot
else if(entityDetails['Type'] == 'cht'){
unitCategories[rowNumber-1] = 11;
}//Arty
else if(entityDetails['Type'] == 'arty'){
unitCategories[rowNumber-1] = 12;
}//Chariot
else if(entityDetails['Type'] == 'cht'){
unitCategories[rowNumber-1] = 13;
}//Elephant
else if(entityDetails['Type'] == 'el'){
unitCategories[rowNumber-1] = 14;
}//Gun
else if(misWeaponDetails['Unit Type' == 'gun']){
unitCategories[rowNumber-1] = 15;
}
}

function calcPrice(rowNumber){
totalPrice[rowNumber-1] = meleeAttackCost[rowNumber-1];
}

function calcMeleeAttack(rowNumber){
    const meleeAttackCell = document.getElementById(`MA-${rowNumber}`);
    let meleeAttack = parseInt(meleeAttackCell.textContent)
    let meleeAttackPrice = 0;
    if(meleeAttackCell.textContent===" "||meleeAttackCell.textContent===""){
        return;
    }
    const meleeWeapon = document.getElementById(`MW-${rowNumber}`);
    const mwWeaponDetails = vlookup(meleeWeapon.value, meleeWeaponsData, 'Key');
    if(mwWeaponDetails){
    meleeAttack += mwWeaponDetails['Damage v Inf'];
    calcCategory(rowNumber);
    }
    let cat = unitCategories[rowNumber-1];
    meleeAttackPrice = (
        Math.min(meleeAttack,15)*1+
        Math.max(Math.min(meleeAttack-15,5),0)*1.25+
        Math.max(Math.min(meleeAttack-20,5),0)*1.5+
        Math.max(Math.min(meleeAttack-25,5),0)*2.75+
        Math.max(Math.min(meleeAttack-30,5),0)*4+
        Math.max(Math.min(meleeAttack-35,5),0)*5.25+
        Math.max(Math.min(meleeAttack-40,5),0)*6.5+
        Math.max(Math.min(meleeAttack-45,5),0)*8+
        Math.max(Math.min(meleeAttack-50,5),0)*9.5+
        Math.max(Math.min(meleeAttack-55,5),0)*12+
        Math.max(Math.min(meleeAttack-60,5),0)*14+
        Math.max(Math.min(meleeAttack-65,5),0)*16+
        Math.max(Math.min(meleeAttack-70,5),0)*18+
        Math.max(Math.min(meleeAttack-75,5),0)*20+
        Math.max(Math.min(meleeAttack-80,5),0)*22+
        Math.max(Math.min(meleeAttack-85,5),0)*24+
        Math.max(Math.min(meleeAttack-90,5),0)*26+
        Math.max(Math.min(meleeAttack-95,5),0)*28+
        Math.max(meleeAttack-100,0)*30
    )*1.5*1.07;
    if(cat == 7){
        meleeAttackPrice = meleeAttackPrice*1.8 - 100;
    }
    totalPrice[rowNumber-1] = meleeAttackPrice;
    meleeAttackCost[rowNumber-1] = meleeAttackPrice;
    updatePrice(rowNumber);
}

function calcHp(rowNumber){
    const hpCell = document.getElementById(`H-${rowNumber}`);
    const hp = hpCell.textContent;
    if(hpCell.textContent===" "||hpCell.textContent===""){
        return;
    }
    let hpPrice = 0;
    calcCategory(rowNumber);
    const cat = unitCategories[rowNumber-1];
    console.log(cat);
    if(cat==1||cat==2||cat==3||cat==10){
        hpPrice=(
        Math.min(hp,40)*.123+
        Math.max(Math.min(hp-40,5),0)*2.46+
        Math.max(Math.min(hp-45,5),0)*3.69+
        Math.max(Math.min(hp-50,5),0)*5.535+
        Math.max(Math.min(hp-55,5),0)*7.38+
        Math.max(Math.min(hp-60,5),0)*11.07+
        Math.max(Math.min(hp-65,5),0)*13.53+
        Math.max(Math.min(hp-70,5),0)*15.99+
        Math.max(Math.min(hp-75,5),0)*18.45+
        Math.max(Math.min(hp-80,5),0)*22.14+
        Math.max(Math.min(hp-85,5),0)*25.83+
        Math.max(Math.min(hp-90,5),0)*29.52+
        Math.max(Math.min(hp-95,5),0)*30.75+
        Math.max(hp-100,0)*35)
    }
    else if(cat==4||cat==5||cat==6||cat==12||cat==14){
        hpPrice=(
        Math.min(hp,40)*.123+
        Math.max(Math.min(hp-40,5),0)*6+
        Math.max(Math.min(hp-45,5),0)*8+
        Math.max(Math.min(hp-50,5),0)*10+
        Math.max(Math.min(hp-55,5),0)*12+
        Math.max(Math.min(hp-60,5),0)*14+
        Math.max(Math.min(hp-65,5),0)*15.53+
        Math.max(Math.min(hp-70,5),0)*17.99+
        Math.max(Math.min(hp-75,5),0)*20.45+
        Math.max(Math.min(hp-80,5),0)*24.14+
        Math.max(Math.min(hp-85,5),0)*26.83+
        Math.max(Math.min(hp-90,5),0)*31.52+
        Math.max(Math.min(hp-95,5),0)*32.75+
        Math.max(hp-100,0)*37)
    }
        else if(cat==7||cat==8||cat==9){
        hpPrice=(
        Math.min(hp,70)*.1+
        Math.max(Math.min(hp-70,5),0)*10+
        Math.max(Math.min(hp-75,5),0)*12+
        Math.max(Math.min(hp-80,5),0)*14+
        Math.max(Math.min(hp-85,5),0)*16+
        Math.max(Math.min(hp-90,5),0)*20+
        Math.max(Math.min(hp-95,5),0)*24+
        Math.max(Math.min(hp-100,5),0)*28+
        Math.max(Math.min(hp-105,5),0)*32+
        Math.max(Math.min(hp-110,5),0)*36+
        Math.max(Math.min(hp-115,5),0)*40+
        Math.max(Math.min(hp-120,5),0)*44+
        Math.max(hp-125,0)*50)
    }
    hpCost[rowNumber-1] = hpPrice;
    console.log(hpPrice);
    updatePrice(rowNumber);
}

function calcMeleeWeapon(rowNumber){
const WeaponCell = document.getElementById(`MW-${rowNumber}`);
const mwWeaponDetails = vlookup(WeaponCell.value, meleeWeaponsData, 'Key');
const weaponDamage = mwWeaponDetails['Damage']+mwWeaponDetails['Damage v Inf']*0.95;
const apWeaponDamage = mwWeaponDetails['Ap Damage'];
let weaponCost = 0;
weaponCost = (//base weapon damage calc
    Math.min(weaponDamage,15)*0+
    Math.max(Math.min(weaponDamage-15,5),0)*2+
    Math.max(Math.min(weaponDamage-20,5),0)*4+
    Math.max(Math.min(weaponDamage-25,5),0)*6+
    Math.max(Math.min(weaponDamage-30,5),0)*6+
    Math.max(Math.min(weaponDamage-35,5),0)*8+
    Math.max(weaponDamage-40,0)*10
)+weaponDamage;
    console.log(weaponCost);
weaponCost +=(//ap damage calc
    Math.min(apWeaponDamage,5)*0+
    Math.max(Math.min(apWeaponDamage-5,5),0)*8+
    Math.max(Math.min(apWeaponDamage-10,5),0)*12+
    Math.max(Math.min(apWeaponDamage-15,5),0)*18+
    Math.max(apWeaponDamage-20,0)*24
)+apWeaponDamage;
    console.log(weaponCost);
meleeWeaponCost[rowNumber-1]=weaponCost;
calcCategory(rowNumber);
updatePrice(rowNumber);
}

function calcMorale(rowNumber){
    const moraleCell = document.getElementById(`M-${rowNumber}`);
    const morale = moraleCell.textContent;
        if(moraleCell.textContent===" "||moraleCell.textContent===""){
        return;
    }
    let moralePrice = 0;
    cat = unitCategories[rowNumber-1];
    moralePrice= (
        Math.min(morale,25)*1+
        Math.max(Math.min(morale-25,5),0)*1+
        Math.max(Math.min(morale-25,5),0)*1.5+
        Math.max(Math.min(morale-25,5),0)*2+
        Math.max(Math.min(morale-25,5),0)*3+
        Math.max(Math.min(morale-25,5),0)*3+
        Math.max(Math.min(morale-25,5),0)*4+
        Math.max(Math.min(morale-25,5),0)*4+
        Math.max(Math.min(morale-25,5),0)*5+
        Math.max(Math.min(morale-25,5),0)*5+
        Math.max(Math.min(morale-25,5),0)*6+
        Math.max(Math.min(morale-25,5),0)*7+
        Math.max(Math.min(morale-25,5),0)*7.25+
        Math.max(Math.min(morale-25,5),0)*8.25+
        Math.max(Math.min(morale-25,5),0)*9.25+
        Math.max(Math.min(morale-25,5),0)*10.25+
        Math.max(morale-100,0)*11.25
    );
    if(cat==7){
        moralePrice*=2;
    }
    moraleCost[rowNumber-1]=moralePrice;
    console.log("Morale Cost for unit " + rowNumber + " is:" + moralePrice);
    updatePrice(rowNumber);
}

function calcAccuracy(rowNumber){
const accuracyCell = document.getElementById(`Accuracy-${rowNumber}`);
const accuracy = accuracyCell.textContent;
        if(accuracyCell.textContent===" "||accuracyCell.textContent===""){
        return;
    }
let accuracyPrice = 0;
if(accuracy>5){
    accuracyPrice= (accuracy-5)*5;
}
accuracyCost[rowNumber-1]=accuracyPrice;
updatePrice(rowNumber);
}

function vlookup(valueToFind, dataArray, key) {
    return dataArray.find(item => item[key] === valueToFind);
}
function startCalculator(){
    updatePrice();
    const priceInput = document.getElementById('P-1');
    const meleeAttackInput = document.getElementById('MA-1');
    const moraleInput=document.getElementById('M-1');
    const accuracyInput = document.getElementById(`Accuracy-1`);
    const meleeWeaponInput = document.getElementById('MW-1');
    const hpInput = document.getElementById('H-1');
    meleeAttackInput.addEventListener('input', () => {
    calcMeleeAttack(1);
    console.log("Melee Attack calculation called");
    });
    moraleInput.addEventListener('input', () => {
    calcMorale(1);
    console.log("Morale Attack calculation called");
    });
        accuracyInput.addEventListener('input', () => {
    calcAccuracy(1);
    console.log("Accuracy Attack calculation called");
    });
    meleeWeaponInput.addEventListener('input',() =>{
        calcMeleeWeapon(1);
        calcMeleeAttack(1);
        console.log("Melee weapon calculation called");
    });
        hpInput.addEventListener('input',() =>{
            calcHp(1);
        console.log("Hp calculation called");
    });
}