let meleeWeaponsData = [];
let missileWeaponsData = [];
let entityData = [];
let shieldsData = [];
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
    fetch('entity-details.json').then(response => response.json()),
    fetch('shields-details.json').then(response=> response.json())
])
    .then(([meleeData, missileData, entitiesData, shieldData]) => {

        meleeWeaponsData = meleeData;
        missileWeaponsData = missileData;
        entityData = entitiesData;
        shieldsData = shieldData;
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
        accuracyCost[rowNumber-1]+meleeWeaponCost[rowNumber-1]+hpCost[rowNumber-1]+chargeBonusCost[rowNumber-1]+
    meleeDefenceCost[rowNumber-1]+armorCost[rowNumber-1]+missileBlockCost[rowNumber-1])*0.9;
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
    meleeAttack += mwWeaponDetails['Damage v Inf']*0.95;
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
weaponCost +=(//ap damage calc
    Math.min(apWeaponDamage,5)*0+
    Math.max(Math.min(apWeaponDamage-5,5),0)*8+
    Math.max(Math.min(apWeaponDamage-10,5),0)*12+
    Math.max(Math.min(apWeaponDamage-15,5),0)*18+
    Math.max(apWeaponDamage-20,0)*24
)+apWeaponDamage;
meleeWeaponCost[rowNumber-1]=weaponCost;
calcCategory(rowNumber);
updatePrice(rowNumber);
}

function calcMeleeDefense(rowNumber){
    const melDefCell = document.getElementById(`MD-${rowNumber}`);
    if(melDefCell.textContent==""||melDefCell.textContent==" "){
        return;
    }
    const meleeDefence = melDefCell.textContent;
    let meleeDefencePrice=0;
    calcCategory(rowNumber);
    const cat = unitCategories[rowNumber-1];
    if(cat==1||cat==4||cat==5||cat==6||cat==9||cat==10||cat==12||cat==11||cat==3||cat==7||cat==8||cat==14||cat==13){
        meleeDefencePrice=(
        Math.min(meleeDefence, 15)*1+
        Math.max(Math.min(meleeDefence-15,5),0)*1+
        Math.max(Math.min(meleeDefence-20,5),0)*1+
        Math.max(Math.min(meleeDefence-25,5),0)*1.25+
        Math.max(Math.min(meleeDefence-30,5),0)*1.75+
        Math.max(Math.min(meleeDefence-35,5),0)*2.75+
        Math.max(Math.min(meleeDefence-40,5),0)*4+
        Math.max(Math.min(meleeDefence-45,5),0)*5.25+
        Math.max(Math.min(meleeDefence-50,5),0)*6.5+
        Math.max(Math.min(meleeDefence-55,5),0)*8+
        Math.max(Math.min(meleeDefence-60,5),0)*9.5+
        Math.max(Math.min(meleeDefence-65,5),0)*12+
        Math.max(Math.min(meleeDefence-70,5),0)*14+
        Math.max(Math.min(meleeDefence-75,5),0)*16+
        Math.max(Math.min(meleeDefence-80,5),0)*18+
        Math.max(Math.min(meleeDefence-85,5),0)*20+
        Math.max(Math.min(meleeDefence-90,5),0)*22+
        Math.max(Math.min(meleeDefence-95,5),0)*24+
        Math.max(meleeDefence-100,0)*26)*1.5
    }
    else if(cat==2){
        meleeDefencePrice=(
        Math.min(meleeDefence, 15)*1+
        Math.max(Math.min(meleeDefence-15,5),0)*1+
        Math.max(Math.min(meleeDefence-20,5),0)*1+
        Math.max(Math.min(meleeDefence-25,5),0)*1+
        Math.max(Math.min(meleeDefence-30,5),0)*1+
        Math.max(Math.min(meleeDefence-35,5),0)*1+
        Math.max(Math.min(meleeDefence-40,5),0)*1+
        Math.max(Math.min(meleeDefence-45,5),0)*1.25+
        Math.max(Math.min(meleeDefence-50,5),0)*1.5+
        Math.max(Math.min(meleeDefence-55,5),0)*2.75+
        Math.max(Math.min(meleeDefence-60,5),0)*4+
        Math.max(Math.min(meleeDefence-65,5),0)*5.25+
        Math.max(Math.min(meleeDefence-70,5),0)*6.5+
        Math.max(Math.min(meleeDefence-75,5),0)*8+
        Math.max(Math.min(meleeDefence-80,5),0)*10+
        Math.max(Math.min(meleeDefence-85,5),0)*12+
        Math.max(Math.min(meleeDefence-90,5),0)*14+
        Math.max(Math.min(meleeDefence-95,5),0)*16+
        Math.max(meleeDefence-100,0)*18)*1.5
    }
    if(cat==7||cat==9){
        meleeDefencePrice *= 2;
    }
    if(cat==8){
        meleeDefencePrice *=2.5;
    }
    meleeDefenceCost[rowNumber-1]=meleeDefencePrice;
    updatePrice(rowNumber);
}

function calcChargeBonus(rowNumber){
    const chgCell = document.getElementById(`CB-${rowNumber}`);
    if(chgCell.textContent==""||chgCell.textContent==" "){
        return;
    }
    calcCategory(rowNumber);
    const chgBonus = chgCell.textContent;
    let chgCost = 0;
    const cat = unitCategories[rowNumber-1];
    if(cat==1||cat==2||cat==3||cat==4||cat==5||cat==6||cat==10||cat==12||cat==14){
        chgCost=(
            Math.min(chgBonus, 20)*1+
            Math.max(Math.min(chgBonus-20,5),0)*6+
            Math.max(Math.min(chgBonus-25,5),0)*8+
            Math.max(Math.min(chgBonus-30,5),0)*9+
            Math.max(Math.min(chgBonus-35,5),0)*11+
            Math.max(Math.min(chgBonus-40,5),0)*13+
            Math.max(Math.min(chgBonus-45,5),0)*15+
            Math.max(chgBonus-50,0)*18
        )
    }
    else if(cat==7||cat==9||cat==11||cat==13){
        chgCost=(
            Math.min(chgBonus, 10)*1+
            Math.max(Math.min(chgBonus-10,5),0)*1.5+
            Math.max(Math.min(chgBonus-15,5),0)*2+
            Math.max(Math.min(chgBonus-20,5),0)*4+
            Math.max(Math.min(chgBonus-25,5),0)*6+
            Math.max(Math.min(chgBonus-30,5),0)*8+
            Math.max(Math.min(chgBonus-35,5),0)*10+
            Math.max(Math.min(chgBonus-40,5),0)*15+
            Math.max(Math.min(chgBonus-45,5),0)*20
        )
    }
    else if(cat==8){
        chgCost=(
            Math.min(chgBonus, 10)*1+
            Math.max(Math.min(chgBonus-10,5),0)*1+
            Math.max(Math.min(chgBonus-15,5),0)*1.5+
            Math.max(Math.min(chgBonus-20,5),0)*1.75+
            Math.max(Math.min(chgBonus-25,5),0)*2+
            Math.max(Math.min(chgBonus-30,5),0)*2.25+
            Math.max(Math.min(chgBonus-35,5),0)*2.5+
            Math.max(Math.min(chgBonus-40,5),0)*2.75+
            Math.max(Math.min(chgBonus-45,5),0)*3.5+
            Math.max(Math.min(chgBonus-50,5),0)*4+
            Math.max(Math.min(chgBonus-55,5),0)*4.75+
            Math.max(Math.min(chgBonus-60,5),0)*5.5+
            Math.max(Math.min(chgBonus-65,5),0)*6.25+
            Math.max(Math.min(chgBonus-70,5),0)*7+
            Math.max(Math.min(chgBonus-75,5),0)*7.75+
            Math.max(Math.min(chgBonus-80,5),0)*8.5+
            Math.max(Math.min(chgBonus-85,5),0)*9.25+
            Math.max(chgBonus-45,0)*10
        )
    }
    chargeBonusCost[rowNumber-1]=chgCost;
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
        Math.max(Math.min(morale-30,5),0)*1.5+
        Math.max(Math.min(morale-35,5),0)*2+
        Math.max(Math.min(morale-40,5),0)*3+
        Math.max(Math.min(morale-45,5),0)*3+
        Math.max(Math.min(morale-50,5),0)*4+
        Math.max(Math.min(morale-55,5),0)*4+
        Math.max(Math.min(morale-60,5),0)*5+
        Math.max(Math.min(morale-65,5),0)*5+
        Math.max(Math.min(morale-70,5),0)*6+
        Math.max(Math.min(morale-75,5),0)*7+
        Math.max(Math.min(morale-80,5),0)*7.25+
        Math.max(Math.min(morale-85,5),0)*8.25+
        Math.max(Math.min(morale-90,5),0)*9.25+
        Math.max(Math.min(morale-95,5),0)*10.25+
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

function calcArmor(rowNumber){
    const armorCell = document.getElementById(`Armor-${rowNumber}`);
    if(armorCell.textContent.trim() == ""){
        return;
    }
    armor=armorCell.textContent;
    let armorPrice = 0;
    calcCategory(rowNumber);
    const cat = unitCategories[rowNumber-1];
    if(cat==1||cat==2||cat==3||cat==6||cat==7||cat==8||cat==10||cat==13){
        armorPrice = (
            Math.min(armor, 10)*0.5+
            Math.max(Math.min(armor-10,5),0)*.75+
            Math.max(Math.min(armor-15,5),0)*1+
            Math.max(Math.min(armor-20,5),0)*1.25+
            Math.max(Math.min(armor-25,5),0)*1.5+
            Math.max(Math.min(armor-30,5),0)*1.75+
            Math.max(Math.min(armor-35,5),0)*2+
            Math.max(Math.min(armor-40,5),0)*2.25+
            Math.max(Math.min(armor-45,5),0)*2.5+
            Math.max(Math.min(armor-50,5),0)*2.75+
            Math.max(Math.min(armor-55,5),0)*3+
            Math.max(Math.min(armor-60,5),0)*3.25+
            Math.max(Math.min(armor-65,5),0)*3.5+
            Math.max(Math.min(armor-70,5),0)*3.75+
            Math.max(Math.min(armor-75,5),0)*4+
            Math.max(Math.min(armor-80,5),0)*4.25+
            Math.max(Math.min(armor-85,5),0)*4.5+
            Math.max(Math.min(armor-90,5),0)*5+
            Math.max(Math.min(armor-95,5),0)*5.5+
            Math.max(Math.min(armor-100,5),0)*6+
            Math.max(Math.min(armor-105,5),0)*6.5+
            Math.max(Math.min(armor-110,5),0)*7+
            Math.max(Math.min(armor-115,5),0)*7.5+
            Math.max(Math.min(armor-120,5),0)*8+
            Math.max(Math.min(armor-125,5),0)*8.5+
            Math.max(armor-130,0)*9
        )
    }
    else if(cat==4||cat==9||cat==11||cat==12){
        armorPrice = (
            Math.min(armor, 10)*0+
            Math.max(Math.min(armor-10,5),0)*5+
            Math.max(Math.min(armor-15,5),0)*6+
            Math.max(Math.min(armor-20,5),0)*7+
            Math.max(Math.min(armor-25,5),0)*8+
            Math.max(Math.min(armor-30,5),0)*9+
            Math.max(Math.min(armor-35,5),0)*10+
            Math.max(armor-40,0)*15
        )
    }
    else if(cat==5||cat==14){
                armorPrice = (
            Math.min(armor, 10)*2+
            Math.max(Math.min(armor-10,5),0)*3+
            Math.max(Math.min(armor-15,5),0)*4+
            Math.max(Math.min(armor-20,5),0)*5+
            Math.max(Math.min(armor-25,5),0)*6+
            Math.max(Math.min(armor-30,5),0)*7+
            Math.max(Math.min(armor-35,5),0)*8+
            Math.max(armor-40,0)*10
        )
    }
    if(cat==7||cat==8||cat==9){
        armorPrice *=2;
    }
    armorCost[rowNumber-1]=armorPrice;
    console.log(armorPrice);
    updatePrice(rowNumber);
}

function calcMissileBlock(rowNumber){
    const shieldCell = document.getElementById(`S-${rowNumber}`);
    const shieldDetails = vlookup(shieldCell.value,shieldsData,'Shield');
    const missileBlock = shieldDetails['Missile Block'];
    calcCategory(rowNumber);
    const cat = unitCategories[rowNumber-1];
    let missileBlockPrice = 0;
    if(missileBlock <=20)
        missileBlockPrice=missileBlock*1.25;
    else if(missileBlock<=30)
        missileBlockPrice-missileBlock*1.66;
    else if(missileBlock<=40)
        missileBlockPrice=missileBlock*2;
    else if(missileBlock<=50)
        missileBlockPrice=missileBlock*2.2;
    else if(missileBlock<=55)
        missileBlockPrice=missileBlock*2.9;
    else if(missileBlock>55)
        missileBlockPrice=missileBlock*3.33;
    missileBlockPrice*=1.25;
    if(cat==4||cat==12||cat==14||cat==11||cat==0)
        missileBlockPrice*=6;
    if(cat==6)
        missileBlockPrice*=1.1;
    if(cat==7)
        missileBlockPrice*=2;
    if(cat==8)
        missileBlockPrice*=3.33;
    if(cat==5)
        missileBlockPrice*=1.5;
    if(cat==5||cat==6)
        missileBlockPrice-=50;
    missileBlockCost[rowNumber-1]=missileBlockPrice;
    updatePrice(rowNumber);
}

function calcAmmo(rowNumber){
    const ammoCell = document.getElementById(`Ammo-${rowNumber}`);
    if(ammoCell.textContent.trim()==""){
        ammoCost[rowNumber-1]=0;
        return;
    }
    let ammo = ammoCell.textContent;
    const misWeaponCell = document.getElementById(`MisW-${rowNumber}`);
    if(misWeaponCell.value == 'none'){
        ammoCost[rowNumber-1];
        return;
    }
    misWeaponDetails = vlookup(misWeaponCell.value,missileWeaponsData,'Key');
    const damage = misWeaponDetails['Damage'];
    const apDamage = misWeaponDetails['Ap'];
    const range = misWeaponDetails['Range'];
    const artCell = document.getElementById(`AAC-${rowNumber}`);
    if(artCell.value != 'None'){
    const artDetails = vlookup(artCell.value,entityData,'Entity');
    const standardAmmo = artDetails['Standard Ammo'];
    const pricePerAmmo = artDetails['Price Per Ammo'];
    }
    calcCategory(rowNumber);
    const cat = unitCategories[rowNumber-1];
    let ammoPrice = 0;
    if(cat==4||(cat==9&&misWeaponDetails['Type']=="arr")){
    ammo = (
        Math.min(ammo,15)+
        Math.max(ammo-15,0)*2
    );
    ammoPrice =(
        damage*0.36+apDamage
    );
    if(range<=125)
        ammoPrice*=0.7;
    }
    if(misWeaponCell.value=="arrow_long_150_31_4")
        ammoPrice*=0.93;
    else if(cat==5||(cat==9&&misWeaponDetails['Type'=="sli"])||cat==11||cat==13){
        ammo=(
            Math.max(ammo,25)+
            Math.max(ammo-25,0)*2
        );
        ammoPrice=(
            damage*0.33+apDamage
        );
        if(misWeaponCell.value=="sling_stone_150_16_4")
            ammoPrice*=0.65;
    }
    else if(cat==6||cat==14||(cat==9&&(misWeaponDetails['Type']=="pel"||misWeaponDetails['Type']=="any"))){
        ammo=(
        Math.max(ammo,7)+
        Math.max(ammo-7,0)*2+
        Math.max(ammo-10)*2
        );
        ammoPrice=(
            damage*0.4+apDamage
        )*0.8;
        if(cat==14)
            ammoPrice*=0.44;
    }
    else if(cat==1||cat==2||cat==3||cat==10||cat==7||cat==8){
        ammo=(
            Math.max(ammo,2)+
            Math.max(ammo-2,0)*2
        );
        if(misWeaponCell.value == 'javelin_wooden_80_20_9')
            ammoPrice= ammo*28;
        else if(misWeaponCell.value =="javelin_prec_40_20_12")
            ammoPrice = ammo*24;
        else if(misWeaponCell.value == "pilum_normal_40_20_10")
            ammoPrice = ammo*20;
        else if(misWeaponCell.value =="stone_hand_75_5_1")
            ammoPrice = ammo*2;
        else if(misWeaponCell.value == "torch_25_1_0")
            ammoPrice = ammo*1;
        else if(misWeaponCell.vlue=="javelin_fire_80_7_1")
            ammoPrice = ammo*4;
        else if(misWeaponCell.value == "javelin_poison_40_15_8")
            ammoPrice = ammo*20;
    }
    else if(cat==12){
        ammo=(
            Math.max(ammo,standardAmmo)+
            Math.max(ammo-standardAmmo,0)*2
        );
        ammo*= document.getElementById(`NAAC-${rowNumber}`);
        ammoPrice = ammo*pricePerAmmo;
    }
    ammoCost[rowNumber-1]=ammoPrice;
    updatePrice(rowNumber);
}

/*function calcEntity(rowNumber){
    if(unitCategories[rowNumber-1]==){
    const entityCell = document.getElementById(`AAC-${rowNumber}`);
    const enityDetails = vlookup(entityCell.value, entityData, 'Entity'); 
    const mass = enityDetails['Mass'];
    const speed = enityDetails['Run Speed'];
}
*/
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
    const chgInput = document.getElementById(`CB-1`);
    const melDefInput = document.getElementById('MD-1');
    const armorInput = document.getElementById('Armor-1');
    const shieldInput = document.getElementById('S-1');
    const ammoInput = document.getElementById('Ammo-1');
    const misWeaponInput = document.getElementById('MisW-1');

    meleeAttackInput.addEventListener('input', () => {
    calcMeleeAttack(1);
    console.log("Melee Attack calculation called:" + meleeAttackCost[0]);
    });
    moraleInput.addEventListener('input', () => {
    calcMorale(1);
    console.log("Morale Attack calculation called:"+ moraleCost[0]);
    });
        accuracyInput.addEventListener('input', () => {
    calcAccuracy(1);
    console.log("Accuracy Attack calculation called:" + accuracyCost[0]);
    });
    meleeWeaponInput.addEventListener('input',() =>{
        calcMeleeWeapon(1);
        calcMeleeAttack(1);
        console.log("Melee weapon calculation called:"+meleeWeaponCost[0]);
    });
        hpInput.addEventListener('input',() =>{
            calcHp(1);
        console.log("Hp calculation called:" +hpCost[0]);
    });
    chgInput.addEventListener('input', () => {
        calcChargeBonus(1);
        console.log("Charge Bonus Calculation called:"+chargeBonusCost[0]);
    });
        melDefInput.addEventListener('input', () => {
        calcMeleeDefense(1);
        console.log("Melee Defense Calculation called:"+meleeDefenceCost[0]);
    });
        armorInput.addEventListener('input', () => {
        calcArmor(1);
        console.log("Armor Calculation called"+armorCost[0]);
    });
        shieldInput.addEventListener('input', () => {
        calcMissileBlock(1);
        console.log("Missile Block Calculation called:"+missileBlockCost[0]);
    });
        ammoInput.addEventListener('input', () => {
        calcAmmo(1);
        console.log("Ammo Calculation called:"+ammoCost[0]);
    });
        misWeaponInput.addEventListener('input', () => {
        calcAmmo(1);
        console.log("Ammo Calculation called:"+ ammoCost[0]);
    });
}
document.addEventListener("DOMContentLoaded", () => {
    // ------------------------------------
    // MAIN TAB NAVIGATION
    // ------------------------------------
    const tabButtons = document.querySelectorAll(".tab-btn");
    const pages = document.querySelectorAll("main");
  
    tabButtons.forEach(button => {
      button.addEventListener("click", e => {
        e.preventDefault();
  
        const tab = button.dataset.tab;
        const targetPage = document.getElementById(tab);
  
        if (!targetPage) {
          console.warn(`No page found for tab: ${tab}`);
          return;
        }
  
        // Remove active class from all pages and buttons
        pages.forEach(main => main.classList.remove("active"));
        tabButtons.forEach(btn => btn.classList.remove("active"));
  
        // Activate the selected tab and button
        targetPage.classList.add("active");
        button.classList.add("active");
      });
    });
  
    // ------------------------------------
    // DROPDOWN MENU LINKS
    // ------------------------------------
    document.querySelectorAll('.dropdown-content a').forEach(link => {
        link.addEventListener("click", e => {
          e.preventDefault();
      
          const targetId = link.getAttribute("href").replace("#", "");
          const section = document.getElementById(targetId);
          if (!section) return;
      
          // Hide all pages first
          document.querySelectorAll("main").forEach(m => m.classList.remove("active"));
          document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
      
          // Developer dropdown behavior
          if (section.closest("main")?.id === "developer") {
            document.getElementById("developer").classList.add("active");
            document.querySelector('[data-tab="developer"]').classList.add("active");
      
            document.querySelectorAll(".dev-section").forEach(s => s.classList.remove("active"));
            section.classList.add("active");
          }
      
          // Information dropdown behavior
          else if (section.closest("main")?.id === "information") {
            document.getElementById("information").classList.add("active");
            document.querySelector('[data-tab="information"]').classList.add("active");
      
            document.querySelectorAll(".info-section").forEach(s => s.classList.remove("active"));
            section.classList.add("active");
          }
      
          section.scrollIntoView({ behavior: "smooth" });
        });
      });
  
      document.querySelectorAll('.info-links a').forEach(link => {
        link.addEventListener('click', e => {
          e.preventDefault();
          const targetId = link.getAttribute('href').replace('#', '');
          const section = document.getElementById(targetId);
      
          // Switch to Information page
          document.querySelectorAll('main').forEach(m => m.classList.remove('active'));
          document.getElementById('information').classList.add('active');
      
          // Highlight Information tab
          document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
          document.querySelector('[data-tab="information"]').classList.add('active');
      
          // Show the correct info section
          document.querySelectorAll('.info-section').forEach(sec => sec.classList.remove('active'));
          if (section) section.classList.add('active');
      
          section.scrollIntoView({ behavior: 'smooth' });
        });
      });

    // ------------------------------------s
    // DEVELOPER VIEW TOGGLE
    // ------------------------------------
    const toggleViewBtn = document.getElementById("toggleViewBtn");
    const userView = document.getElementById("userView");
    const devView = document.getElementById("developerView");
    const backBtn = document.getElementById("backToUserBtn");
  
    if (toggleViewBtn && userView && devView && backBtn) {
      toggleViewBtn.addEventListener("click", () => {
        userView.classList.add("hidden");
        devView.classList.remove("hidden");
      });
  
      backBtn.addEventListener("click", () => {
        devView.classList.add("hidden");
        userView.classList.remove("hidden");
      });
    }
  
    // ------------------------------------
    // INFO PAGE SUB-TABS
    // ------------------------------------
    document.querySelectorAll(".info-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        document.querySelectorAll(".info-tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        // You could dynamically change info content here if needed
      });
    });
  
    // ------------------------------------
    // PLACEHOLDER BUTTONS
    // ------------------------------------
    const exportUnitsBtn = document.getElementById("exportUnitsBtn");
    const importUnitsBtn = document.getElementById("importUnitsBtn");
    const addUnitBtn = document.getElementById("addUnitBtn");

    function showSection(sectionId) {
        // Remove active class from all pages and buttons
        document.querySelectorAll("main").forEach(main => main.classList.remove("active"));
        document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
      
        // Activate the target section and its tab button (if exists)
        const targetPage = document.getElementById(sectionId);
        if (targetPage) targetPage.classList.add("active");
      
        const relatedTab = document.querySelector(`[data-tab="${sectionId}"]`);
        if (relatedTab) relatedTab.classList.add("active");
      }

    document.getElementById('toDeveloperBtn').addEventListener('click', () => {
        showSection('developer');
      });
      
      document.getElementById('toFactionBtn').addEventListener('click', () => {
        showSection('faction');
      });
      
  
    if (exportUnitsBtn) exportUnitsBtn.addEventListener("click", () => alert("Exporting units..."));
    if (importUnitsBtn) importUnitsBtn.addEventListener("click", () => alert("Importing units..."));
    if (addUnitBtn) addUnitBtn.addEventListener("click", () => alert("Unit added!"));
  });
/*
  (function initUnitTable() {
    // lists used in dropdowns
    const factions = ["", "Roman Empire", "Carthage", "Greek City States"];
    const weapons = ["", "Dagger", "Gladius", "Celtic Longsword", "Spear", "Warsword"];
  
    // helper to build a select element HTML string
    function buildSelect(className, optionsArray) {
      let html = `<select class="${className}">`;
      html += `<option value="">—</option>`;
      optionsArray.forEach(opt => {
        html += `<option value="${opt}">${opt}</option>`;
      });
      html += `</select>`;
      return html;
    }
  
    const tbody = document.getElementById("unitTbody");
    if (!tbody) {
      console.warn("No #unitTbody found — please add <tbody id='unitTbody'></tbody> to your unit table.");
      return;
    }*/
  /*
    // create 15 rows
    const rows = [];
    for (let i = 0; i < 15; i++) {
      const rowHtml = `
        <tr data-row="${i+1}">
          <td>${i+1}</td>
          <td>${buildSelect("faction-select", factions)}</td>
          <td><input class="cell-input name-input" type="text" /></td>
          <td><input class="cell-input mancount-input" type="number" min="0" /></td>
          <td>${buildSelect("weapon-select", weapons)}</td>
          <td><input class="cell-input armor-input" type="text" /></td>
          <td><input class="cell-input speed-input" type="number" min="0" /></td>
          <td><input class="cell-input morale-input" type="number" min="0" /></td>
          <td><input class="cell-input price-input" type="number" min="0" step="1" /></td>
          <td><input class="cell-input points-input" type="number" min="0" step="1" /></td>
        </tr>`;
      rows.push(rowHtml);
    }
    tbody.innerHTML = rows.join("");
  */
    // UX: enforce numeric constraints and trim text on blur via event delegation
    tbody.addEventListener("input", (e) => {
      const target = e.target;
      if (!target) return;
      if (target.matches('input[type="number"]')) {
        const val = target.value;
        if (val === "") return;
        const n = Number(val);
        if (isNaN(n) || n < 0) target.value = Math.max(0, Math.round(Math.abs(n) || 0));
      }
    });
  
    tbody.addEventListener("blur", (e) => {
      const t = e.target;
      if (t && t.matches('input[type="text"]')) {
        t.value = t.value.trim();
      }
    }, true);
  
   /* // ---------- Clear button ----------
    const clearUnitsBtn = document.getElementById("clearUnitsBtn");
    if (clearUnitsBtn) {
      clearUnitsBtn.addEventListener("click", () => {
        if (!confirm("Clear all unit entries in the table?")) return;
        tbody.querySelectorAll("tr").forEach(row => {
          row.querySelectorAll("input").forEach(inp => inp.value = "");
          row.querySelectorAll("select").forEach(sel => sel.selectedIndex = 0);
        });
      });
    }
  */
    // ---------- Export to JSON ----------
    const exportBtn = document.getElementById("exportUnitsBtn");
    if (exportBtn) {
      exportBtn.addEventListener("click", () => {
        const data = [];
        tbody.querySelectorAll("tr").forEach(row => {
          const r = {
            index: Number(row.dataset.row),
            faction: row.querySelector(".faction-select").value || "",
            name: row.querySelector(".name-input").value || "",
            manCount: row.querySelector(".mancount-input").value || "",
            meleeWeapon: row.querySelector(".weapon-select").value || "",
            armor: row.querySelector(".armor-input").value || "",
            speed: row.querySelector(".speed-input").value || "",
            morale: row.querySelector(".morale-input").value || "",
            price: row.querySelector(".price-input").value || "",
            points: row.querySelector(".points-input").value || ""
          };
          data.push(r);
        });
  
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "units.json";
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      });
    }
  
    // ---------- Import from JSON ----------
    const importBtn = document.getElementById("importUnitsBtn");
    if (importBtn) {
      importBtn.addEventListener("click", () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "application/json";
        input.onchange = () => {
          const file = input.files[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = () => {
            try {
              const arr = JSON.parse(reader.result);
              if (!Array.isArray(arr)) throw new Error("Invalid JSON format (expected an array).");
              arr.slice(0,15).forEach((r, idx) => {
                const row = tbody.querySelector(`tr[data-row="${idx+1}"]`);
                if (!row) return;
                row.querySelector(".faction-select").value = r.faction || "";
                row.querySelector(".name-input").value = r.name || "";
                row.querySelector(".mancount-input").value = r.manCount || "";
                row.querySelector(".weapon-select").value = r.meleeWeapon || "";
                row.querySelector(".armor-input").value = r.armor || "";
                row.querySelector(".speed-input").value = r.speed || "";
                row.querySelector(".morale-input").value = r.morale || "";
                row.querySelector(".price-input").value = r.price || "";
                row.querySelector(".points-input").value = r.points || "";
              });
            } catch (err) {
              alert("Failed to import JSON: " + err.message);
            }
          };
          reader.readAsText(file);
        };
        input.click();
      });
    }
  /*})()*/;