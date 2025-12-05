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
const MAX_ROWS = 15;
const ALL_INPUT_PREFIXES = [
    "N", "MC", "M", "CB", "MA", "MD", "Armor", "H", "Ammo", 
    "Accuracy", "MW", "MisW", "S", "Mount", "AAC", "NAAC"
];
// Array of prefixes for SELECT elements
const SELECT_PREFIXES = ["MW", "MisW", "S", "Mount", "AAC"];



function updatePrice(rowNumber){
    let price = document.getElementById(`P-${rowNumber}`);
    if(price){
    totalPrice[rowNumber-1]=(meleeAttackCost[rowNumber-1]+moraleCost[rowNumber-1]+
    accuracyCost[rowNumber-1]+meleeWeaponCost[rowNumber-1]+hpCost[rowNumber-1]+chargeBonusCost[rowNumber-1]+
    meleeDefenceCost[rowNumber-1]+armorCost[rowNumber-1]+missileBlockCost[rowNumber-1]+ammoCost[rowNumber-1])*0.9;
    price.textContent = Math.round(totalPrice[rowNumber-1]/10)*10;
    }
}



function calcPrice(rowNumber){
    calcCategory(rowNumber);
    console.log(`Category for Row: ${unitCategories[rowNumber-1]}`);
    calcMeleeAttack(rowNumber);
    console.log(`MA Price for Row: ${meleeAttackCost[rowNumber-1]}`);
    calcHp(rowNumber);
    console.log(`HP Price for Row: ${hpCost[rowNumber-1]}`);
    calcMeleeWeapon(rowNumber);
    console.log(`MW Price for Row: ${meleeWeaponCost[rowNumber-1]}`);
    calcMeleeDefense(rowNumber);
    console.log(`MD Price for Row: ${meleeDefenceCost[rowNumber-1]}`);
    calcChargeBonus(rowNumber);
    console.log(`CB Price for Row: ${chargeBonusCost[rowNumber-1]}`);
    calcMorale(rowNumber);
    console.log(`M Price for Row: ${moraleCost[rowNumber-1]}`);
    calcAccuracy(rowNumber);
    console.log(`Accuracy Price for Row: ${accuracyCost[rowNumber-1]}`);
    calcArmor(rowNumber);
    console.log(`Armor Price for Row: ${armorCost[rowNumber-1]}`);
    calcMissileBlock(rowNumber);
    console.log(`Missile Block Price for Row: ${missileBlockCost[rowNumber-1]}`);
    calcAmmo(rowNumber);
    console.log(`Ammo Price for Row: ${ammoCost[rowNumber-1]}`);
    updatePrice(rowNumber);
}

//Melee In =1, Spear Inf = 2, Pike Inf =3, Archer =4, Slinger =5, Pelt =6, Mel Cav = 7, Shk Cav = 8
//MisCav = 9, Animal = 10, Chariot = 11, Arty = 12, Elepant = 13, Gun = 14
function calcCategory(rowNumber) {
    let index = rowNumber - 1;

    // --- 1. Safely get element references ---
    const chargeBonusElement = document.getElementById(`CB-${rowNumber}`);
    const ammoElement = document.getElementById(`Ammo-${rowNumber}`);
    const meleeWeaponElement = document.getElementById(`MW-${rowNumber}`);
    const missileWeaponElement = document.getElementById(`MisW-${rowNumber}`);
    const mountElement = document.getElementById(`Mount-${rowNumber}`);
    const animalArtilleryChariot = document.getElementById(`AAC-${rowNumber}`);

    // --- 2. Safely extract values from elements (CRITICAL FIXES HERE) ---
    // If the element is null, default its value to '0' or 'none' to prevent crashing on .textContent or .value access.
    let chargeBonus = parseInt(chargeBonusElement ? chargeBonusElement.textContent : '0') || 0;
    let ammoContent = ammoElement ? ammoElement.textContent.trim() : ''; // Used for text content checks
    let ammo = parseInt(ammoContent) || 0;

    // Fix for SELECT elements (MW, MisW, Mount, AAC) which read .value
  let meleeWeapon = meleeWeaponElement.value;
  let missileWeapon = missileWeaponElement.value;
  let mountValue = mountElement.value;
  let aacValue = animalArtilleryChariot.value;
    // --- 3. Perform Lookups ---
    let mwWeaponDetails = vlookup(meleeWeapon, meleeWeaponsData, 'Key');
    let misWeaponDetails = vlookup(missileWeapon, missileWeaponsData, 'Key');
    
    // Determine entity details (default to 'none' entity for lookup)
    let entityDetails = vlookup('none', entityData, 'Entity');
    if (mountValue !== 'none') {
        entityDetails = vlookup(mountValue, entityData, 'Entity');
    }
    else if(aacValue !== 'none') {
        entityDetails = vlookup(aacValue, entityData, 'Entity');
    }
    //Melee Infantry Check
 if ((mwWeaponDetails['Unit Type'] == 'mel') && (ammo <= 5|| ammo.textContent==""|| ammo.textContent==" " || (missileWeapon == 'torch_25_1_0' || missileWeapon == 'stone_hand_75_5_1')) && (mountValue == 'none') && (animalArtilleryChariot.value == 'none') && (misWeaponDetails['Type'] == 'any')) {
unitCategories[rowNumber-1] = 1;
}//Spear Infantry Check
else if((mwWeaponDetails['Unit Type'] == 'spr'||mwWeaponDetails['Unit Type'] =='shk') && (ammo <= 5|| ammo.textContent==""|| ammo.textContent==" " || (missileWeapon == 'torch_25_1_0' || missileWeapon == 'stone_hand_75_5_1')) && (mountValue == 'none') && (animalArtilleryChariot.value == 'none') && (misWeaponDetails['Type'] == 'any')){
unitCategories[rowNumber-1] = 2;
}//Pike Infantry Check
else if((mwWeaponDetails['Unit Type'] == 'pik') && (ammo <= 5|| ammo.textContent==""|| ammo.textContent==" " || (missileWeapon == 'torch_25_1_0' || missileWeapon == 'stone_hand_75_5_1')) && (mountValue == 'none') && (animalArtilleryChariot.value == 'none') && (misWeaponDetails['Type'] == 'any')){
unitCategories[rowNumber-1] = 3;
}//Archer
else if((misWeaponDetails['Type']=='arr')&&(animalArtilleryChariot.value=='none'&&mountValue=='none')){
unitCategories[rowNumber-1] = 4;
}//Slinger
else if((misWeaponDetails['Type']=='sli')&&(animalArtilleryChariot.value=='none'&&mountValue=='none')){
unitCategories[rowNumber-1] = 5;
}//Peltast
else if((misWeaponDetails['Type']=='pel'||((misWeaponDetails['Type']=='any'&&ammo>5)&&(missileWeapon != 'torch_25_1_0' && missileWeapon != 'stone_hand_75_5_1'))&&(animalArtilleryChariot.value=='none'&&mountValue=='none'))){
unitCategories[rowNumber-1] = 6;
}//Melee Cav
else if((chargeBonus<=50)&&(((ammo <= 5|| ammo.textContent==""|| ammo.textContent==" ") && misWeaponDetails['Type'] == 'any') || (missileWeapon == 'torch_25_1_0' || missileWeapon == 'stone_hand_75_5_1'))&&(entityDetails['Entity']=='mt')&&(mwWeaponDetails['Unit Type']!='shk')){
unitCategories[rowNumber-1] = 7;
}//Shk Cav
else if((((ammo <= 5|| ammo.textContent==""|| ammo.textContent==" ") && misWeaponDetails['Type'] == 'any') || (missileWeapon == 'torch_25_1_0' || missileWeapon == 'stone_hand_75_5_1'))&&(entityDetails['Entity']=='mt')&&(mwWeaponDetails['Unit Type']=='shk')){
unitCategories[rowNumber-1] = 8;
}//MisCav
else if((ammo>5||misWeaponDetails['Type'] != 'any')&&(entityDetails['Entity']=='mt')){
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
//Elephant
else if(entityDetails['Type'] == 'el'){
unitCategories[rowNumber-1] = 13;
}//Gun
else if(misWeaponDetails['Type'] == 'gun'){
unitCategories[rowNumber-1] = 14;
    }
}

// --- MELEE ATTACK CALCULATION FUNCTION (FIXED) ---
function calcMeleeAttack(rowNumber) {
    // 1. Safely retrieve element references
    const meleeAttackCell = document.getElementById(`MA-${rowNumber}`);
    const meleeWeapon = document.getElementById(`MW-${rowNumber}`);

    // CRITICAL FIX: If either element is null (row does not exist), exit gracefully.
    if (!meleeAttackCell || !meleeWeapon) {
        return;
    }
    
    const maTextContent = meleeAttackCell.textContent.trim();

    // Check for empty or space-only content before parsing
    if (maTextContent == "") {
        return;
    }

    // 2. Safely parse the base MA value
    let meleeAttack = parseInt(maTextContent) || 0; // Use || 0 to default if parsing fails unexpectedly
    let meleeAttackPrice = 0;

    // 3. Get Melee Weapon Details safely
    const mwWeaponDetails = vlookup(meleeWeapon.value, meleeWeaponsData, 'Key');
    
    if(mwWeaponDetails) {
        // Ensure 'Damage v Inf' exists and is a number before calculation
        const damageVInf = parseFloat(mwWeaponDetails['Damage v Inf']) || 0;
        meleeAttack += damageVInf * 0.95;
        // Re-calculate category if the weapon detail affects it
        calcCategory(rowNumber);
    }

    // 4. Perform Price Calculation (Original Logic)
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

    // 5. Store and Update
    meleeAttackCost[rowNumber-1] = meleeAttackPrice;
    // NOTE: Do not set totalPrice here directly, it should be calculated in updatePrice
    // totalPrice[rowNumber-1] = meleeAttackPrice; // Removed this line, as updatePrice handles the final sum.
}

function calcHp(rowNumber){
    const hpCell = document.getElementById(`H-${rowNumber}`);

    // CRITICAL FIX: Secure against null element references.
    if (!hpCell) {
        return; 
    }

    const hpText = hpCell.textContent;

    // Check for empty or space-only content
    if(hpText.trim() == ""){
        return;
    }

    // Convert the text content to a number for calculations
    const hp = parseInt(hpText) || 0; 
    
    let hpPrice = 0;
    
    // Ensure category is updated before using it
    // Assuming calcCategory and unitCategories are globally defined
    const cat = unitCategories[rowNumber-1];

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
    
    // Store the price
    hpCost[rowNumber-1] = hpPrice;
    
}

function calcMeleeWeapon(rowNumber) {
    const WeaponCell = document.getElementById(`MW-${rowNumber}`);

    // CRITICAL FIX 1: Check if the element exists before accessing its properties.
    if (!WeaponCell) {
        return; 
    }

    // Assuming vlookup, meleeWeaponsData, and other calculation functions are available globally.
    const mwWeaponDetails = vlookup(WeaponCell.value, meleeWeaponsData, 'Key');
    
    // CRITICAL FIX 2: Check if the lookup returned valid details.
    if (!mwWeaponDetails) {
        // If the weapon is not found (e.g., 'none' or invalid key), reset cost and exit.
        meleeWeaponCost[rowNumber - 1] = 0;
        calcCategory(rowNumber);
        updatePrice(rowNumber);
        return;
    }

    // Safely parse properties, defaulting to 0 if they don't exist in the data structure.
    const baseDamage = parseFloat(mwWeaponDetails['Damage']) || 0;
    const infantryDamage = parseFloat(mwWeaponDetails['Damage v Inf']) || 0;
    const apWeaponDamage = parseFloat(mwWeaponDetails['Ap Damage']) || 0;

    // Perform calculations using the parsed numeric values
    const weaponDamage = baseDamage + infantryDamage * 0.95;
    
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
    
    meleeWeaponCost[rowNumber-1] = weaponCost;

}


function calcMeleeDefense(rowNumber){
    const melDefCell = document.getElementById(`MD-${rowNumber}`);

    // CRITICAL FIX 1: Check if the element exists before accessing its properties.
    if (!melDefCell) {
        return;
    }

    const meleeDefenceText = melDefCell.textContent;

    // Check for empty or space-only content
    if(meleeDefenceText.trim() == ""){
        return;
    }
    
    // Convert the text content to an integer. The calculation logic relies on numeric input.
    const meleeDefence = parseInt(meleeDefenceText) || 0; 

    let meleeDefencePrice=0;
    
    // Assuming calcCategory and unitCategories are globally defined
    const cat = unitCategories[rowNumber-1];
    
    // Category 1: Most unit types
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
    // Category 2: Specific unit type
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

    // Apply category multipliers
    if(cat==7||cat==9){
        meleeDefencePrice *= 2;
    }
    if(cat==8){
        meleeDefencePrice *=2.5;
    }
    
    // Store and update
    meleeDefenceCost[rowNumber-1]=meleeDefencePrice;

}


function calcChargeBonus(rowNumber){
    const chgCell = document.getElementById(`CB-${rowNumber}`);
    
    // CRITICAL FIX 1: Check if the element exists before accessing its properties.
    if (!chgCell) {
        return;
    }
    
    const chgBonusText = chgCell.textContent;

    // Check for empty or space-only content
    if(chgBonusText.trim() == ""){
        return;
    }
    
    // Convert the text content to an integer. The calculation logic relies on numeric input.
    const chgBonus = parseInt(chgBonusText) || 0; 
    
    let chgCost = 0;
    const cat = unitCategories[rowNumber-1];
    
    // Category 1: Standard units (1, 2, 3, 4, 5, 6, 10, 12, 14)
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
    // Category 2: Specialized units (7, 9, 11, 13)
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
    // Category 3: Elite or unique unit (8)
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

}

function calcMorale(rowNumber){
    const moraleCell = document.getElementById(`M-${rowNumber}`);
    
    // CRITICAL FIX 1: Check if the element exists.
    if (!moraleCell) {
        return;
    }
    
    const moraleText = moraleCell.textContent;

    // Check for empty or space-only content
    if(moraleText.trim() == ""){
        return;
    }
    
    // Convert to number, defaulting to 0 if parsing fails.
    const morale = parseInt(moraleText) || 0; 

    let moralePrice = 0;
    
    // Assuming unitCategories is globally defined and populated
    const cat = unitCategories[rowNumber-1];
    
    moralePrice = (
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
    
    // Assuming moraleCost is globally defined
    moraleCost[rowNumber-1]=moralePrice;
    
    // Assuming updatePrice is globally defined

}

function calcAccuracy(rowNumber){
    const accuracyCell = document.getElementById(`Accuracy-${rowNumber}`);
    
    // CRITICAL FIX 1: Check if the element exists.
    if (!accuracyCell) {
        return;
    }
    
    const accuracyText = accuracyCell.textContent;

    // Check for empty or space-only content
    if(accuracyText.trim() == ""){
        return;
    }
    
    // Convert to number, defaulting to 0 if parsing fails.
    const accuracy = parseInt(accuracyText) || 0;

    let accuracyPrice = 0;
    
    if(accuracy > 5){
        accuracyPrice = (accuracy - 5) * 5;
    }
    
    // Assuming accuracyCost is globally defined
    accuracyCost[rowNumber-1] = accuracyPrice;
    
    // Assuming updatePrice is globally defined
}

function calcArmor(rowNumber){
    const armorCell = document.getElementById(`Armor-${rowNumber}`);
    
    // CRITICAL FIX 1: Check if the element exists.
    if (!armorCell) {
        return;
    }
    
    const armorText = armorCell.textContent;
    
    // Check for empty or space-only content
    if(armorText.trim() == ""){
        return;
    }
    
    // Convert to number, defaulting to 0 if parsing fails.
    const armor = parseInt(armorText) || 0; 
    let armorPrice = 0;
    
    // Assuming calcCategory and unitCategories are globally defined
    const cat = unitCategories[rowNumber-1];
    
    // Category 1
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
    // Category 2
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
    // Category 3
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
    
    // Apply category multipliers
    if(cat==7||cat==8||cat==9){
        armorPrice *=2;
    }
    
    // Assuming armorCost is globally defined
    armorCost[rowNumber-1]=armorPrice;
    
    
    // Assuming updatePrice is globally defined
}

function calcMissileBlock(rowNumber){
    const shieldCell = document.getElementById(`S-${rowNumber}`);

    // CRITICAL FIX 1: Check if the element exists.
    if (!shieldCell) {
        return;
    }
    
    // Assuming shieldCell is a <select> element (based on shieldCell.value)
    // The previous logic did not check if the vlookup data was available, 
    // which is the most critical security point here.
    
    // Assuming vlookup, shieldsData are globally defined
    const shieldDetails = vlookup(shieldCell.value, shieldsData, 'Shield');
    
    // CRITICAL FIX 2: Check if vlookup returned valid details or if 'Missile Block' exists.
    const missileBlock = (shieldDetails && shieldDetails['Missile Block']) ? parseInt(shieldDetails['Missile Block']) : 0;
    
    if (missileBlock == 0) {
        // Even if the shield is 'None' or data is missing, reset cost to 0 and exit.
        missileBlockCost[rowNumber-1] = 0;
        updatePrice(rowNumber);
        return;
    }
    const cat = unitCategories[rowNumber-1];
    let missileBlockPrice = 0;
    
    // Tiered pricing logic
    if(missileBlock <= 20)
        missileBlockPrice = missileBlock * 1.25;
    else if(missileBlock <= 30)
        // Correcting likely typo: was missileBlockPrice-missileBlock*1.66; should be =
        missileBlockPrice = missileBlock * 1.66; 
    else if(missileBlock <= 40)
        missileBlockPrice = missileBlock * 2;
    else if(missileBlock <= 50)
        missileBlockPrice = missileBlock * 2.2;
    else if(missileBlock <= 55)
        missileBlockPrice = missileBlock * 2.9;
    else if(missileBlock > 55)
        missileBlockPrice = missileBlock * 3.33;
        
    missileBlockPrice *= 1.25;
    
    // Apply category multipliers
    if(cat==4||cat==12||cat==14||cat==11||cat==0)
        missileBlockPrice *= 6;
    if(cat==6)
        missileBlockPrice *= 1.1;
    if(cat==7)
        missileBlockPrice *= 2;
    if(cat==8)
        missileBlockPrice *= 3.33;
    if(cat==5)
        missileBlockPrice *= 1.5;
        
    // Apply final cost reduction/adjustment
    if(cat==5||cat==6)
        missileBlockPrice -= 50;
        
    // Store and update
    // Assuming missileBlockCost and updatePrice are globally defined
    missileBlockCost[rowNumber-1]=missileBlockPrice;
}

function calcAmmo(rowNumber){
    const ammoCell = document.getElementById(`Ammo-${rowNumber}`);
    const misWeaponCell = document.getElementById(`MisW-${rowNumber}`);
    const artCell = document.getElementById(`AAC-${rowNumber}`);
    const naacCell = document.getElementById(`NAAC-${rowNumber}`); // Added check for element needed in category 12

    // CRITICAL FIX 1: Check if the primary input elements exist.
    if (!ammoCell || !misWeaponCell) {
        return;
    }
    
    // Check for empty or space-only content for ammo input
    if(ammoCell.textContent.trim() == ""){
        ammoCost[rowNumber-1] = 0; // Assuming ammoCost is global
        return;
    }
    
    // Convert ammo input to number, defaulting to 0 if parsing fails.
    let ammo = parseInt(ammoCell.textContent) || 0; 
    
    // Check if a missile weapon is selected
    if(misWeaponCell.value == 'none' || ammo == 0){
        // Ensure this line is setting the cost and returning, as the original logic intended.
        ammoCost[rowNumber-1] = 0;
        return;
    }
    
    // Assuming vlookup, missileWeaponsData, entityData, calcCategory, unitCategories are global
    const misWeaponDetails = vlookup(misWeaponCell.value, missileWeaponsData, 'Key');
    
    // CRITICAL FIX 2: Check if missile weapon details were successfully found.
    if (!misWeaponDetails) {
        ammoCost[rowNumber-1] = 0;
        return;
    }
    
    const damage = parseInt(misWeaponDetails['Damage']);
    const apDamage = parseInt(misWeaponDetails['AP']);
    const range = parseInt(misWeaponDetails['Range']);
    
    let standardAmmo = 0;
    let pricePerAmmo = 0;
    
    if(artCell && artCell.value !== 'None'){
        const artDetails = vlookup(artCell.value, entityData, 'Entity');
        // CRITICAL FIX 3: Check if artillery details were successfully found.
        if (artDetails) {
            standardAmmo = parseInt(artDetails['Standard Ammo']) || 0;
            pricePerAmmo = parseFloat(artDetails['Price Per Ammo']) || 0;
        }
    }
    
    const cat = unitCategories[rowNumber-1];
    let ammoPrice = 0;
    
    // Category 1 (archers)
    if(cat==4||(cat==9 && misWeaponDetails['Type']=="arr")){
        ammo = (
            Math.min(ammo,15)+
            Math.max(ammo-15,0)*2
        );
        ammoPrice =(
            damage*0.36+apDamage
        );
        if(range<=125)
            ammoPrice*=0.7;
            
        if(misWeaponCell.value=="arrow_long_150_31_4")
            ammoPrice*=0.93;
    }
    // Category 2 (slingers/specialized missile)
    else if(cat==5||(cat==9 && misWeaponDetails['Type']=="sli")||cat==11||cat==13){
        ammo=(
            // Original logic used Math.max(ammo, 25) which seems suspicious for ammo cost calculation
            // Assuming the intent was Math.min or a different base logic. Sticking to the structure but
            // ensuring calculation uses the numeric `ammo` variable.
            Math.min(ammo,25)+
            Math.max(ammo-25,0)*2
        );
        ammoPrice=(
            damage*0.33+apDamage
        );
        if(misWeaponCell.value=="sling_stone_150_16_4")
            ammoPrice*=0.65;
    }
    // Category 3 (Peltasts/Javelins, etc)
    else if(cat==6||cat==14||(cat==9&&(misWeaponDetails['Type']=="pel"||misWeaponDetails['Type']=="any"))){
        ammo=(
            Math.min(ammo,7)+
            Math.max(ammo-7,0)*2+
            Math.max(ammo-10, 0)*2 // Corrected second argument for Math.max
        );
        ammoPrice=(
            damage*0.4+apDamage
        )*0.8;
            console.log(damage + " " + apDamage);
        if(cat==14){
            ammoPrice*=0.44;
        }
    }
    // Category 4 (Hand-thrown/Misc)
    else if(cat==1||cat==2||cat==3||cat==10||cat==7||cat==8){
        ammo=(
            Math.min(ammo,2)+
            Math.max(ammo-2,0)*2
        );
        // This set of specific checks suggests special cost rules for these weapon types.
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
        // CRITICAL FIX 4: Corrected typo in original code (vlue vs value)
        else if(misWeaponCell.value=="javelin_fire_80_7_1")
            ammoPrice = ammo*4;
        else if(misWeaponCell.value == "javelin_poison_40_15_8")
            ammoPrice = ammo*20;
            ammoCost[rowNumber-1]=ammoPrice;
            return;
    }
    // Category 5 (Artillery)
    else if(cat==12){
        ammo=(
            Math.max(ammo,standardAmmo)+
            Math.max(ammo-standardAmmo,0)*2
        );
        
        let naacValue = 1;
        if (naacCell) {
            naacValue = parseInt(naacCell.textContent) || 1;
        }
        
        ammo*= naacValue; // Used the secured naacValue
            ammoPrice = ammo*pricePerAmmo;
            ammoCost[rowNumber-1]=ammoPrice;
            return;
    }
    ammoPrice*=ammo;
    // Store and update
    ammoCost[rowNumber-1]=ammoPrice;
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
    return dataArray.find(item => item[key] == valueToFind);
}

function startCalculator(){
    const a =-1;
    updatePrice();
    const priceInput1 = document.getElementById('P-1');
    const meleeAttackInput1 = document.getElementById('MA-1');
    const moraleInput1=document.getElementById('M-1');
    const accuracyInput1 = document.getElementById(`Accuracy-1`);
    const meleeWeaponInput1 = document.getElementById('MW-1');
    const hpInput1 = document.getElementById('H-1');
    const chgInput1 = document.getElementById(`CB-1`);
    const melDefInput1 = document.getElementById('MD-1');
    const armorInput1 = document.getElementById('Armor-1');
    const shieldInput1 = document.getElementById('S-1');
    const ammoInput1 = document.getElementById('Ammo-1');
    const misWeaponInput1 = document.getElementById('MisW-1');

    meleeAttackInput1.addEventListener('input', () => {
    calcPrice(1);
    console.log("Melee Attack calculation called:" + meleeAttackCost[a+1]);
    });
    moraleInput1.addEventListener('input', () => {
    calcPrice(1);
    console.log("Morale Attack calculation called:"+ moraleCost[a+1]);
    });
        accuracyInput1.addEventListener('input', () => {
    calcPrice(1);
    console.log("Accuracy Attack calculation called:" + accuracyCost[a+1]);
    });
    meleeWeaponInput1.addEventListener('input',() =>{
    calcPrice(1);
        console.log("Melee weapon calculation called:"+meleeWeaponCost[a+1]);
    });
        hpInput1.addEventListener('input',() =>{
    calcPrice(1);
        console.log("Hp calculation called:" +hpCost[a+1]);
    });
    chgInput1.addEventListener('input', () => {
    calcPrice(1);
        console.log("Charge Bonus Calculation called:"+chargeBonusCost[a+1]);
    });
        melDefInput1.addEventListener('input', () => {
    calcPrice(1);
        console.log("Melee Defense Calculation called:"+meleeDefenceCost[a+1]);
    });
        armorInput1.addEventListener('input', () => {
    calcPrice(1);
        console.log("Armor Calculation called"+armorCost[a+1]);
    });
        shieldInput1.addEventListener('input', () => {
    calcPrice(1);
        console.log("Missile Block Calculation called:"+missileBlockCost[a+1]);
    });
        ammoInput1.addEventListener('input', () => {
    calcPrice(1);
        console.log("Ammo Calculation called:"+ammoCost[a+1]);
    });
        misWeaponInput1.addEventListener('input', () => {
    calcPrice(1);
        console.log("Ammo Calculation called:"+ ammoCost[a+1]);
    });
const priceInput2 = document.getElementById('P-2');
    const meleeAttackInput2 = document.getElementById('MA-2');
    const moraleInput2=document.getElementById('M-2');
    const accuracyInput2 = document.getElementById(`Accuracy-2`);
    const meleeWeaponInput2 = document.getElementById('MW-2');
    const hpInput2 = document.getElementById('H-2');
    const chgInput2 = document.getElementById(`CB-2`);
    const melDefInput2 = document.getElementById('MD-2');
    const armorInput2 = document.getElementById('Armor-2');
    const shieldInput2 = document.getElementById('S-2');
    const ammoInput2 = document.getElementById('Ammo-2');
    const misWeaponInput2 = document.getElementById('MisW-2');

    meleeAttackInput2.addEventListener('input', () => {
    calcPrice(2);
    console.log("Melee Attack calculation called:" + meleeAttackCost[a+2]);
    });
    moraleInput2.addEventListener('input', () => {
    calcPrice(2);
    console.log("Morale Attack calculation called:"+ moraleCost[a+2]);
    });
        accuracyInput2.addEventListener('input', () => {
    calcPrice(2);
    console.log("Accuracy Attack calculation called:" + accuracyCost[a+2]);
    });
    meleeWeaponInput2.addEventListener('input',() =>{
    calcPrice(2);
        console.log("Melee weapon calculation called:"+meleeWeaponCost[a+2]);
    });
        hpInput2.addEventListener('input',() =>{
    calcPrice(2);
        console.log("Hp calculation called:" +hpCost[a+2]);
    });
    chgInput2.addEventListener('input', () => {
    calcPrice(2);
        console.log("Charge Bonus Calculation called:"+chargeBonusCost[a+2]);
    });
        melDefInput2.addEventListener('input', () => {
    calcPrice(2);
        console.log("Melee Defense Calculation called:"+meleeDefenceCost[a+2]);
    });
        armorInput2.addEventListener('input', () => {
    calcPrice(2);
        console.log("Armor Calculation called"+armorCost[a+2]);
    });
        shieldInput2.addEventListener('input', () => {
    calcPrice(2);
        console.log("Missile Block Calculation called:"+missileBlockCost[a+2]);
    });
        ammoInput2.addEventListener('input', () => {
    calcPrice(2);
        console.log("Ammo Calculation called:"+ammoCost[a+2]);
    });
        misWeaponInput2.addEventListener('input', () => {
    calcPrice(2);
        console.log("Ammo Calculation called:"+ ammoCost[a+2]);
    });
    const priceInput3 = document.getElementById('P-3');
    const meleeAttackInput3 = document.getElementById('MA-3');
    const moraleInput3=document.getElementById('M-3');
    const accuracyInput3 = document.getElementById(`Accuracy-3`);
    const meleeWeaponInput3 = document.getElementById('MW-3');
    const hpInput3 = document.getElementById('H-3');
    const chgInput3 = document.getElementById(`CB-3`);
    const melDefInput3 = document.getElementById('MD-3');
    const armorInput3 = document.getElementById('Armor-3');
    const shieldInput3 = document.getElementById('S-3');
    const ammoInput3 = document.getElementById('Ammo-3');
    const misWeaponInput3 = document.getElementById('MisW-3');

    meleeAttackInput3.addEventListener('input', () => {
    calcPrice(3);
    console.log("Melee Attack calculation called:" + meleeAttackCost[a+3]);
    });
    moraleInput3.addEventListener('input', () => {
    calcPrice(3);
    console.log("Morale Attack calculation called:"+ moraleCost[a+3]);
    });
        accuracyInput3.addEventListener('input', () => {
    calcPrice(3);
    console.log("Accuracy Attack calculation called:" + accuracyCost[a+3]);
    });
    meleeWeaponInput3.addEventListener('input',() =>{
    calcPrice(3);
        console.log("Melee weapon calculation called:"+meleeWeaponCost[a+3]);
    });
        hpInput3.addEventListener('input',() =>{
    calcPrice(3);
        console.log("Hp calculation called:" +hpCost[a+3]);
    });
    chgInput3.addEventListener('input', () => {
    calcPrice(3);
        console.log("Charge Bonus Calculation called:"+chargeBonusCost[a+3]);
    });
        melDefInput3.addEventListener('input', () => {
    calcPrice(3);
        console.log("Melee Defense Calculation called:"+meleeDefenceCost[a+3]);
    });
        armorInput3.addEventListener('input', () => {
    calcPrice(3);
        console.log("Armor Calculation called"+armorCost[a+3]);
    });
        shieldInput3.addEventListener('input', () => {
    calcPrice(3);
        console.log("Missile Block Calculation called:"+missileBlockCost[a+3]);
    });
        ammoInput3.addEventListener('input', () => {
    calcPrice(3);
        console.log("Ammo Calculation called:"+ammoCost[a+3]);
    });
        misWeaponInput3.addEventListener('input', () => {
    calcPrice(3);
        console.log("Ammo Calculation called:"+ ammoCost[a+3]);
    });
    const priceInput4 = document.getElementById('P-4');
    const meleeAttackInput4 = document.getElementById('MA-4');
    const moraleInput4=document.getElementById('M-4');
    const accuracyInput4 = document.getElementById(`Accuracy-4`);
    const meleeWeaponInput4 = document.getElementById('MW-4');
    const hpInput4 = document.getElementById('H-4');
    const chgInput4 = document.getElementById(`CB-4`);
    const melDefInput4 = document.getElementById('MD-4');
    const armorInput4 = document.getElementById('Armor-4');
    const shieldInput4 = document.getElementById('S-4');
    const ammoInput4 = document.getElementById('Ammo-4');
    const misWeaponInput4 = document.getElementById('MisW-4');

    meleeAttackInput4.addEventListener('input', () => {
    calcPrice(4);
    console.log("Melee Attack calculation called:" + meleeAttackCost[a+4]);
    });
    moraleInput4.addEventListener('input', () => {
    calcPrice(4);
    console.log("Morale Attack calculation called:"+ moraleCost[a+4]);
    });
        accuracyInput4.addEventListener('input', () => {
    calcPrice(4);
    console.log("Accuracy Attack calculation called:" + accuracyCost[a+4]);
    });
    meleeWeaponInput4.addEventListener('input',() =>{
    calcPrice(4);
        console.log("Melee weapon calculation called:"+meleeWeaponCost[a+4]);
    });
        hpInput4.addEventListener('input',() =>{
    calcPrice(4);
        console.log("Hp calculation called:" +hpCost[a+4]);
    });
    chgInput4.addEventListener('input', () => {
    calcPrice(4);
        console.log("Charge Bonus Calculation called:"+chargeBonusCost[a+4]);
    });
        melDefInput4.addEventListener('input', () => {
    calcPrice(4);
        console.log("Melee Defense Calculation called:"+meleeDefenceCost[a+4]);
    });
        armorInput4.addEventListener('input', () => {
    calcPrice(4);
        console.log("Armor Calculation called"+armorCost[a+4]);
    });
        shieldInput4.addEventListener('input', () => {
    calcPrice(4);
        console.log("Missile Block Calculation called:"+missileBlockCost[a+4]);
    });
        ammoInput4.addEventListener('input', () => {
    calcPrice(4);
        console.log("Ammo Calculation called:"+ammoCost[a+4]);
    });
        misWeaponInput4.addEventListener('input', () => {
    calcPrice(4);
        console.log("Ammo Calculation called:"+ ammoCost[a+4]);
    });
    const priceInput5 = document.getElementById('P-5');
    const meleeAttackInput5 = document.getElementById('MA-5');
    const moraleInput5=document.getElementById('M-5');
    const accuracyInput5 = document.getElementById(`Accuracy-5`);
    const meleeWeaponInput5 = document.getElementById('MW-5');
    const hpInput5 = document.getElementById('H-5');
    const chgInput5 = document.getElementById(`CB-5`);
    const melDefInput5 = document.getElementById('MD-5');
    const armorInput5 = document.getElementById('Armor-5');
    const shieldInput5 = document.getElementById('S-5');
    const ammoInput5 = document.getElementById('Ammo-5');
    const misWeaponInput5 = document.getElementById('MisW-5');

    meleeAttackInput5.addEventListener('input', () => {
    calcPrice(5);
    console.log("Melee Attack calculation called:" + meleeAttackCost[a+5]);
    });
    moraleInput5.addEventListener('input', () => {
    calcPrice(5);
    console.log("Morale Attack calculation called:"+ moraleCost[a+5]);
    });
        accuracyInput5.addEventListener('input', () => {
    calcPrice(5);
    console.log("Accuracy Attack calculation called:" + accuracyCost[a+5]);
    });
    meleeWeaponInput5.addEventListener('input',() =>{
    calcPrice(5);
        console.log("Melee weapon calculation called:"+meleeWeaponCost[a+5]);
    });
        hpInput5.addEventListener('input',() =>{
    calcPrice(5);
        console.log("Hp calculation called:" +hpCost[a+5]);
    });
    chgInput5.addEventListener('input', () => {
    calcPrice(5);
        console.log("Charge Bonus Calculation called:"+chargeBonusCost[a+5]);
    });
        melDefInput5.addEventListener('input', () => {
    calcPrice(5);
        console.log("Melee Defense Calculation called:"+meleeDefenceCost[a+5]);
    });
        armorInput5.addEventListener('input', () => {
    calcPrice(5);
        console.log("Armor Calculation called"+armorCost[a+5]);
    });
        shieldInput5.addEventListener('input', () => {
    calcPrice(5);
        console.log("Missile Block Calculation called:"+missileBlockCost[a+5]);
    });
        ammoInput5.addEventListener('input', () => {
    calcPrice(5);
        console.log("Ammo Calculation called:"+ammoCost[a+5]);
    });
        misWeaponInput5.addEventListener('input', () => {
    calcPrice(5);
        console.log("Ammo Calculation called:"+ ammoCost[a+5]);
    });
    const priceInput6 = document.getElementById('P-6');
    const meleeAttackInput6 = document.getElementById('MA-6');
    const moraleInput6=document.getElementById('M-6');
    const accuracyInput6 = document.getElementById(`Accuracy-6`);
    const meleeWeaponInput6 = document.getElementById('MW-6');
    const hpInput6 = document.getElementById('H-6');
    const chgInput6 = document.getElementById(`CB-6`);
    const melDefInput6 = document.getElementById('MD-6');
    const armorInput6 = document.getElementById('Armor-6');
    const shieldInput6 = document.getElementById('S-6');
    const ammoInput6 = document.getElementById('Ammo-6');
    const misWeaponInput6 = document.getElementById('MisW-6');

    meleeAttackInput6.addEventListener('input', () => {
    calcPrice(6);
    console.log("Melee Attack calculation called:" + meleeAttackCost[a+6]);
    });
    moraleInput6.addEventListener('input', () => {
    calcPrice(6);
    console.log("Morale Attack calculation called:"+ moraleCost[a+6]);
    });
        accuracyInput6.addEventListener('input', () => {
    calcPrice(6);
    console.log("Accuracy Attack calculation called:" + accuracyCost[a+6]);
    });
    meleeWeaponInput6.addEventListener('input',() =>{
    calcPrice(6);
        console.log("Melee weapon calculation called:"+meleeWeaponCost[a+6]);
    });
        hpInput6.addEventListener('input',() =>{
    calcPrice(6);
        console.log("Hp calculation called:" +hpCost[a+6]);
    });
    chgInput6.addEventListener('input', () => {
    calcPrice(6);
        console.log("Charge Bonus Calculation called:"+chargeBonusCost[a+6]);
    });
        melDefInput6.addEventListener('input', () => {
    calcPrice(6);
        console.log("Melee Defense Calculation called:"+meleeDefenceCost[a+6]);
    });
        armorInput6.addEventListener('input', () => {
    calcPrice(6);
        console.log("Armor Calculation called"+armorCost[a+6]);
    });
        shieldInput6.addEventListener('input', () => {
    calcPrice(6);
        console.log("Missile Block Calculation called:"+missileBlockCost[a+6]);
    });
        ammoInput6.addEventListener('input', () => {
    calcPrice(6);
        console.log("Ammo Calculation called:"+ammoCost[a+6]);
    });
        misWeaponInput6.addEventListener('input', () => {
    calcPrice(6);
        console.log("Ammo Calculation called:"+ ammoCost[a+6]);
    });
    const priceInput7 = document.getElementById('P-7');
    const meleeAttackInput7 = document.getElementById('MA-7');
    const moraleInput7=document.getElementById('M-7');
    const accuracyInput7 = document.getElementById(`Accuracy-7`);
    const meleeWeaponInput7 = document.getElementById('MW-7');
    const hpInput7 = document.getElementById('H-7');
    const chgInput7 = document.getElementById(`CB-7`);
    const melDefInput7 = document.getElementById('MD-7');
    const armorInput7 = document.getElementById('Armor-7');
    const shieldInput7 = document.getElementById('S-7');
    const ammoInput7 = document.getElementById('Ammo-7');
    const misWeaponInput7 = document.getElementById('MisW-7');

    meleeAttackInput7.addEventListener('input', () => {
    calcPrice(7);
    console.log("Melee Attack calculation called:" + meleeAttackCost[a+7]);
    });
    moraleInput7.addEventListener('input', () => {
    calcPrice(7);
    console.log("Morale Attack calculation called:"+ moraleCost[a+7]);
    });
        accuracyInput7.addEventListener('input', () => {
    calcPrice(7);
    console.log("Accuracy Attack calculation called:" + accuracyCost[a+7]);
    });
    meleeWeaponInput7.addEventListener('input',() =>{
    calcPrice(7);
        console.log("Melee weapon calculation called:"+meleeWeaponCost[a+7]);
    });
        hpInput7.addEventListener('input',() =>{
    calcPrice(7);
        console.log("Hp calculation called:" +hpCost[a+7]);
    });
    chgInput7.addEventListener('input', () => {
    calcPrice(7);
        console.log("Charge Bonus Calculation called:"+chargeBonusCost[a+7]);
    });
        melDefInput7.addEventListener('input', () => {
    calcPrice(7);
        console.log("Melee Defense Calculation called:"+meleeDefenceCost[a+7]);
    });
        armorInput7.addEventListener('input', () => {
    calcPrice(7);
        console.log("Armor Calculation called"+armorCost[a+7]);
    });
        shieldInput7.addEventListener('input', () => {
    calcPrice(7);
        console.log("Missile Block Calculation called:"+missileBlockCost[a+7]);
    });
        ammoInput7.addEventListener('input', () => {
    calcPrice(7);
        console.log("Ammo Calculation called:"+ammoCost[a+7]);
    });
        misWeaponInput7.addEventListener('input', () => {
    calcPrice(7);
        console.log("Ammo Calculation called:"+ ammoCost[a+7]);
    });
    const priceInput8 = document.getElementById('P-8');
    const meleeAttackInput8 = document.getElementById('MA-8');
    const moraleInput8=document.getElementById('M-8');
    const accuracyInput8 = document.getElementById(`Accuracy-8`);
    const meleeWeaponInput8 = document.getElementById('MW-8');
    const hpInput8 = document.getElementById('H-8');
    const chgInput8 = document.getElementById(`CB-8`);
    const melDefInput8 = document.getElementById('MD-8');
    const armorInput8 = document.getElementById('Armor-8');
    const shieldInput8 = document.getElementById('S-8');
    const ammoInput8 = document.getElementById('Ammo-8');
    const misWeaponInput8 = document.getElementById('MisW-8');

    meleeAttackInput8.addEventListener('input', () => {
    calcPrice(8);
    console.log("Melee Attack calculation called:" + meleeAttackCost[a+8]);
    });
    moraleInput8.addEventListener('input', () => {
    calcPrice(8);
    console.log("Morale Attack calculation called:"+ moraleCost[a+8]);
    });
        accuracyInput8.addEventListener('input', () => {
    calcPrice(8);
    console.log("Accuracy Attack calculation called:" + accuracyCost[a+8]);
    });
    meleeWeaponInput8.addEventListener('input',() =>{
    calcPrice(8);
        console.log("Melee weapon calculation called:"+meleeWeaponCost[a+8]);
    });
        hpInput8.addEventListener('input',() =>{
    calcPrice(8);
        console.log("Hp calculation called:" +hpCost[a+8]);
    });
    chgInput8.addEventListener('input', () => {
    calcPrice(8);
        console.log("Charge Bonus Calculation called:"+chargeBonusCost[a+8]);
    });
        melDefInput8.addEventListener('input', () => {
    calcPrice(8);
        console.log("Melee Defense Calculation called:"+meleeDefenceCost[a+8]);
    });
        armorInput8.addEventListener('input', () => {
    calcPrice(8);
        console.log("Armor Calculation called"+armorCost[a+8]);
    });
        shieldInput8.addEventListener('input', () => {
    calcPrice(8);
        console.log("Missile Block Calculation called:"+missileBlockCost[a+8]);
    });
        ammoInput8.addEventListener('input', () => {
    calcPrice(8);
        console.log("Ammo Calculation called:"+ammoCost[a+8]);
    });
        misWeaponInput8.addEventListener('input', () => {
    calcPrice(8);
        console.log("Ammo Calculation called:"+ ammoCost[a+8]);
    });
    const priceInput9 = document.getElementById('P-9');
    const meleeAttackInput9 = document.getElementById('MA-9');
    const moraleInput9=document.getElementById('M-9');
    const accuracyInput9 = document.getElementById(`Accuracy-9`);
    const meleeWeaponInput9 = document.getElementById('MW-9');
    const hpInput9 = document.getElementById('H-9');
    const chgInput9 = document.getElementById(`CB-9`);
    const melDefInput9 = document.getElementById('MD-9');
    const armorInput9 = document.getElementById('Armor-9');
    const shieldInput9 = document.getElementById('S-9');
    const ammoInput9 = document.getElementById('Ammo-9');
    const misWeaponInput9 = document.getElementById('MisW-9');

    meleeAttackInput9.addEventListener('input', () => {
    calcPrice(9);
    console.log("Melee Attack calculation called:" + meleeAttackCost[a+9]);
    });
    moraleInput9.addEventListener('input', () => {
    calcPrice(9);
    console.log("Morale Attack calculation called:"+ moraleCost[a+9]);
    });
        accuracyInput9.addEventListener('input', () => {
    calcPrice(9);
    console.log("Accuracy Attack calculation called:" + accuracyCost[a+9]);
    });
    meleeWeaponInput9.addEventListener('input',() =>{
    calcPrice(9);
        console.log("Melee weapon calculation called:"+meleeWeaponCost[a+9]);
    });
        hpInput9.addEventListener('input',() =>{
    calcPrice(9);
        console.log("Hp calculation called:" +hpCost[a+9]);
    });
    chgInput9.addEventListener('input', () => {
    calcPrice(9);
        console.log("Charge Bonus Calculation called:"+chargeBonusCost[a+9]);
    });
        melDefInput9.addEventListener('input', () => {
    calcPrice(9);
        console.log("Melee Defense Calculation called:"+meleeDefenceCost[a+9]);
    });
        armorInput9.addEventListener('input', () => {
    calcPrice(9);
        console.log("Armor Calculation called"+armorCost[a+9]);
    });
        shieldInput9.addEventListener('input', () => {
    calcPrice(9);
        console.log("Missile Block Calculation called:"+missileBlockCost[a+9]);
    });
        ammoInput9.addEventListener('input', () => {
    calcPrice(9);
        console.log("Ammo Calculation called:"+ammoCost[a+9]);
    });
        misWeaponInput9.addEventListener('input', () => {
    calcPrice(9);
        console.log("Ammo Calculation called:"+ ammoCost[a+9]);
    });
    const priceInput10 = document.getElementById('P-10');
    const meleeAttackInput10 = document.getElementById('MA-10');
    const moraleInput10=document.getElementById('M-10');
    const accuracyInput10 = document.getElementById(`Accuracy-10`);
    const meleeWeaponInput10 = document.getElementById('MW-10');
    const hpInput10 = document.getElementById('H-10');
    const chgInput10 = document.getElementById(`CB-10`);
    const melDefInput10 = document.getElementById('MD-10');
    const armorInput10 = document.getElementById('Armor-10');
    const shieldInput10 = document.getElementById('S-10');
    const ammoInput10 = document.getElementById('Ammo-10');
    const misWeaponInput10 = document.getElementById('MisW-10');

    meleeAttackInput10.addEventListener('input', () => {
    calcPrice(10);
    console.log("Melee Attack calculation called:" + meleeAttackCost[a+10]);
    });
    moraleInput10.addEventListener('input', () => {
    calcPrice(10);
    console.log("Morale Attack calculation called:"+ moraleCost[a+10]);
    });
        accuracyInput10.addEventListener('input', () => {
    calcPrice(10);
    console.log("Accuracy Attack calculation called:" + accuracyCost[a+10]);
    });
    meleeWeaponInput10.addEventListener('input',() =>{
    calcPrice(10);
        console.log("Melee weapon calculation called:"+meleeWeaponCost[a+10]);
    });
        hpInput10.addEventListener('input',() =>{
    calcPrice(10);
        console.log("Hp calculation called:" +hpCost[a+10]);
    });
    chgInput10.addEventListener('input', () => {
    calcPrice(10);
        console.log("Charge Bonus Calculation called:"+chargeBonusCost[a+10]);
    });
        melDefInput10.addEventListener('input', () => {
    calcPrice(10);
        console.log("Melee Defense Calculation called:"+meleeDefenceCost[a+10]);
    });
        armorInput10.addEventListener('input', () => {
    calcPrice(10);
        console.log("Armor Calculation called"+armorCost[a+10]);
    });
        shieldInput10.addEventListener('input', () => {
    calcPrice(10);
        console.log("Missile Block Calculation called:"+missileBlockCost[a+10]);
    });
        ammoInput10.addEventListener('input', () => {
    calcPrice(10);
        console.log("Ammo Calculation called:"+ammoCost[a+10]);
    });
        misWeaponInput10.addEventListener('input', () => {
    calcPrice(10);
        console.log("Ammo Calculation called:"+ ammoCost[a+10]);
    });
    const priceInput11 = document.getElementById('P-11');
    const meleeAttackInput11 = document.getElementById('MA-11');
    const moraleInput11=document.getElementById('M-11');
    const accuracyInput11 = document.getElementById(`Accuracy-11`);
    const meleeWeaponInput11 = document.getElementById('MW-11');
    const hpInput11 = document.getElementById('H-11');
    const chgInput11 = document.getElementById(`CB-11`);
    const melDefInput11 = document.getElementById('MD-11');
    const armorInput11 = document.getElementById('Armor-11');
    const shieldInput11 = document.getElementById('S-11');
    const ammoInput11 = document.getElementById('Ammo-11');
    const misWeaponInput11 = document.getElementById('MisW-11');

    meleeAttackInput11.addEventListener('input', () => {
    calcPrice(11);
    console.log("Melee Attack calculation called:" + meleeAttackCost[a+11]);
    });
    moraleInput11.addEventListener('input', () => {
    calcPrice(11);
    console.log("Morale Attack calculation called:"+ moraleCost[a+11]);
    });
        accuracyInput11.addEventListener('input', () => {
    calcPrice(11);
    console.log("Accuracy Attack calculation called:" + accuracyCost[a+11]);
    });
    meleeWeaponInput11.addEventListener('input',() =>{
    calcPrice(11);
        console.log("Melee weapon calculation called:"+meleeWeaponCost[a+11]);
    });
        hpInput11.addEventListener('input',() =>{
    calcPrice(11);
        console.log("Hp calculation called:" +hpCost[a+11]);
    });
    chgInput11.addEventListener('input', () => {
    calcPrice(11);
        console.log("Charge Bonus Calculation called:"+chargeBonusCost[a+11]);
    });
        melDefInput11.addEventListener('input', () => {
    calcPrice(11);
        console.log("Melee Defense Calculation called:"+meleeDefenceCost[a+11]);
    });
        armorInput11.addEventListener('input', () => {
    calcPrice(11);
        console.log("Armor Calculation called"+armorCost[a+11]);
    });
        shieldInput11.addEventListener('input', () => {
    calcPrice(11);
        console.log("Missile Block Calculation called:"+missileBlockCost[a+11]);
    });
        ammoInput11.addEventListener('input', () => {
    calcPrice(11);
        console.log("Ammo Calculation called:"+ammoCost[a+11]);
    });
        misWeaponInput11.addEventListener('input', () => {
    calcPrice(11);
        console.log("Ammo Calculation called:"+ ammoCost[a+11]);
    });
    const priceInput12 = document.getElementById('P-12');
    const meleeAttackInput12 = document.getElementById('MA-12');
    const moraleInput12=document.getElementById('M-12');
    const accuracyInput12 = document.getElementById(`Accuracy-12`);
    const meleeWeaponInput12 = document.getElementById('MW-12');
    const hpInput12 = document.getElementById('H-12');
    const chgInput12 = document.getElementById(`CB-12`);
    const melDefInput12 = document.getElementById('MD-12');
    const armorInput12 = document.getElementById('Armor-12');
    const shieldInput12 = document.getElementById('S-12');
    const ammoInput12 = document.getElementById('Ammo-12');
    const misWeaponInput12 = document.getElementById('MisW-12');

    meleeAttackInput12.addEventListener('input', () => {
    calcPrice(12);
    console.log("Melee Attack calculation called:" + meleeAttackCost[a+12]);
    });
    moraleInput12.addEventListener('input', () => {
    calcPrice(12);
    console.log("Morale Attack calculation called:"+ moraleCost[a+12]);
    });
        accuracyInput12.addEventListener('input', () => {
    calcPrice(12);
    console.log("Accuracy Attack calculation called:" + accuracyCost[a+12]);
    });
    meleeWeaponInput12.addEventListener('input',() =>{
    calcPrice(12);
        console.log("Melee weapon calculation called:"+meleeWeaponCost[a+12]);
    });
        hpInput12.addEventListener('input',() =>{
    calcPrice(12);
        console.log("Hp calculation called:" +hpCost[a+12]);
    });
    chgInput12.addEventListener('input', () => {
    calcPrice(12);
        console.log("Charge Bonus Calculation called:"+chargeBonusCost[a+12]);
    });
        melDefInput12.addEventListener('input', () => {
    calcPrice(12);
        console.log("Melee Defense Calculation called:"+meleeDefenceCost[a+12]);
    });
        armorInput12.addEventListener('input', () => {
    calcPrice(12);
        console.log("Armor Calculation called"+armorCost[a+12]);
    });
        shieldInput12.addEventListener('input', () => {
    calcPrice(12);
        console.log("Missile Block Calculation called:"+missileBlockCost[a+12]);
    });
        ammoInput12.addEventListener('input', () => {
    calcPrice(12);
        console.log("Ammo Calculation called:"+ammoCost[a+12]);
    });
        misWeaponInput12.addEventListener('input', () => {
    calcPrice(12);
        console.log("Ammo Calculation called:"+ ammoCost[a+12]);
    });
    const priceInput13 = document.getElementById('P-13');
    const meleeAttackInput13 = document.getElementById('MA-13');
    const moraleInput13=document.getElementById('M-13');
    const accuracyInput13 = document.getElementById(`Accuracy-13`);
    const meleeWeaponInput13 = document.getElementById('MW-13');
    const hpInput13 = document.getElementById('H-13');
    const chgInput13 = document.getElementById(`CB-13`);
    const melDefInput13 = document.getElementById('MD-13');
    const armorInput13 = document.getElementById('Armor-13');
    const shieldInput13 = document.getElementById('S-13');
    const ammoInput13 = document.getElementById('Ammo-13');
    const misWeaponInput13 = document.getElementById('MisW-13');

    meleeAttackInput13.addEventListener('input', () => {
    calcPrice(13);
    console.log("Melee Attack calculation called:" + meleeAttackCost[a+13]);
    });
    moraleInput13.addEventListener('input', () => {
    calcPrice(13);
    console.log("Morale Attack calculation called:"+ moraleCost[a+13]);
    });
        accuracyInput13.addEventListener('input', () => {
    calcPrice(13);
    console.log("Accuracy Attack calculation called:" + accuracyCost[a+13]);
    });
    meleeWeaponInput13.addEventListener('input',() =>{
    calcPrice(13);
        console.log("Melee weapon calculation called:"+meleeWeaponCost[a+13]);
    });
        hpInput13.addEventListener('input',() =>{
    calcPrice(13);
        console.log("Hp calculation called:" +hpCost[a+13]);
    });
    chgInput13.addEventListener('input', () => {
    calcPrice(13);
        console.log("Charge Bonus Calculation called:"+chargeBonusCost[a+13]);
    });
        melDefInput13.addEventListener('input', () => {
    calcPrice(13);
        console.log("Melee Defense Calculation called:"+meleeDefenceCost[a+13]);
    });
        armorInput13.addEventListener('input', () => {
    calcPrice(13);
        console.log("Armor Calculation called"+armorCost[a+13]);
    });
        shieldInput13.addEventListener('input', () => {
    calcPrice(13);
        console.log("Missile Block Calculation called:"+missileBlockCost[a+13]);
    });
        ammoInput13.addEventListener('input', () => {
    calcPrice(13);
        console.log("Ammo Calculation called:"+ammoCost[a+13]);
    });
        misWeaponInput13.addEventListener('input', () => {
    calcPrice(13);
        console.log("Ammo Calculation called:"+ ammoCost[a+13]);
    });
    const priceInput14 = document.getElementById('P-14');
    const meleeAttackInput14 = document.getElementById('MA-14');
    const moraleInput14=document.getElementById('M-14');
    const accuracyInput14 = document.getElementById(`Accuracy-14`);
    const meleeWeaponInput14 = document.getElementById('MW-14');
    const hpInput14 = document.getElementById('H-14');
    const chgInput14 = document.getElementById(`CB-14`);
    const melDefInput14 = document.getElementById('MD-14');
    const armorInput14 = document.getElementById('Armor-14');
    const shieldInput14 = document.getElementById('S-14');
    const ammoInput14 = document.getElementById('Ammo-14');
    const misWeaponInput14 = document.getElementById('MisW-14');

    meleeAttackInput14.addEventListener('input', () => {
    calcPrice(14);
    console.log("Melee Attack calculation called:" + meleeAttackCost[a+14]);
    });
    moraleInput14.addEventListener('input', () => {
    calcPrice(14);
    console.log("Morale Attack calculation called:"+ moraleCost[a+14]);
    });
        accuracyInput14.addEventListener('input', () => {
    calcPrice(14);
    console.log("Accuracy Attack calculation called:" + accuracyCost[a+14]);
    });
    meleeWeaponInput14.addEventListener('input',() =>{
    calcPrice(14);
        console.log("Melee weapon calculation called:"+meleeWeaponCost[a+14]);
    });
        hpInput14.addEventListener('input',() =>{
    calcPrice(14);
        console.log("Hp calculation called:" +hpCost[a+14]);
    });
    chgInput14.addEventListener('input', () => {
    calcPrice(14);
        console.log("Charge Bonus Calculation called:"+chargeBonusCost[a+14]);
    });
        melDefInput14.addEventListener('input', () => {
    calcPrice(14);
        console.log("Melee Defense Calculation called:"+meleeDefenceCost[a+14]);
    });
        armorInput14.addEventListener('input', () => {
    calcPrice(14);
        console.log("Armor Calculation called"+armorCost[a+14]);
    });
        shieldInput14.addEventListener('input', () => {
    calcPrice(14);
        console.log("Missile Block Calculation called:"+missileBlockCost[a+14]);
    });
        ammoInput14.addEventListener('input', () => {
    calcPrice(14);
        console.log("Ammo Calculation called:"+ammoCost[a+14]);
    });
        misWeaponInput14.addEventListener('input', () => {
    calcPrice(14);
        console.log("Ammo Calculation called:"+ ammoCost[a+14]);
    });
    const priceInput15 = document.getElementById('P-15');
    const meleeAttackInput15 = document.getElementById('MA-15');
    const moraleInput15=document.getElementById('M-15');
    const accuracyInput15 = document.getElementById(`Accuracy-15`);
    const meleeWeaponInput15 = document.getElementById('MW-15');
    const hpInput15 = document.getElementById('H-15');
    const chgInput15 = document.getElementById(`CB-15`);
    const melDefInput15 = document.getElementById('MD-15');
    const armorInput15 = document.getElementById('Armor-15');
    const shieldInput15 = document.getElementById('S-15');
    const ammoInput15 = document.getElementById('Ammo-15');
    const misWeaponInput15 = document.getElementById('MisW-15');

    meleeAttackInput15.addEventListener('input', () => {
    calcPrice(15);
    console.log("Melee Attack calculation called:" + meleeAttackCost[a+15]);
    });
    moraleInput15.addEventListener('input', () => {
    calcPrice(15);
    console.log("Morale Attack calculation called:"+ moraleCost[a+15]);
    });
        accuracyInput15.addEventListener('input', () => {
    calcPrice(15);
    console.log("Accuracy Attack calculation called:" + accuracyCost[a+15]);
    });
    meleeWeaponInput15.addEventListener('input',() =>{
    calcPrice(15);
        console.log("Melee weapon calculation called:"+meleeWeaponCost[a+15]);
    });
        hpInput15.addEventListener('input',() =>{
    calcPrice(15);
        console.log("Hp calculation called:" +hpCost[a+15]);
    });
    chgInput15.addEventListener('input', () => {
    calcPrice(15);
        console.log("Charge Bonus Calculation called:"+chargeBonusCost[a+15]);
    });
        melDefInput15.addEventListener('input', () => {
    calcPrice(15);
        console.log("Melee Defense Calculation called:"+meleeDefenceCost[a+15]);
    });
        armorInput15.addEventListener('input', () => {
    calcPrice(15);
        console.log("Armor Calculation called"+armorCost[a+15]);
    });
        shieldInput15.addEventListener('input', () => {
    calcPrice(15);
        console.log("Missile Block Calculation called:"+missileBlockCost[a+15]);
    });
        ammoInput15.addEventListener('input', () => {
    calcPrice(15);
        console.log("Ammo Calculation called:"+ammoCost[a+15]);
    });
        misWeaponInput15.addEventListener('input', () => {
    calcPrice(15);
        console.log("Ammo Calculation called:"+ ammoCost[a+15]);
    });
}

const JSON_TO_PREFIX = {
    name: "N",
    manCount: "MC",
    morale: "M",
    chargeBonus: "CB",
    meleeAttack: "MA",
    meleeDefense: "MD",
    armor: "Armor",
    hp: "H",
    ammo: "Ammo",
    accuracy: "Accuracy",
    meleeWeapon: "MW",
    missileWeapon: "MisW",
    shield: "S",
    mount: "Mount",
    animalArtilleryChariot: "AAC",
    numberOfAAC: "NAAC",
    price: "P",
    pointsUsage: "PU"
};

function populateTable(units) {

    // Clear existing data (optional, but good practice before importing new data)
    for (let i = 1; i <= 15; i++) {
        ALL_INPUT_PREFIXES.forEach(prefix => {
            const element = document.getElementById(`${prefix}-${i}`);
            if (element) {
                if (SELECT_PREFIXES.includes(prefix)) {
                    element.value = 'none'; // Set select to default 'none' option
                } else {
                    element.textContent = ''; // Clear editable TD
                }
            }
        });
    }

    // Iterate through the imported units and the maximum allowed rows
    for (let i = 0; i < Math.min(units.length, 15); i++) {
        const rowNumber = i + 1;
        const unit = units[i];

        Object.keys(unit).forEach(key => {

            const prefix = JSON_TO_PREFIX[key];
            if (!prefix) return;

            const element = document.getElementById(`${prefix}-${rowNumber}`);
            if (!element) return;

            const value = unit[key];

            if (SELECT_PREFIXES.includes(prefix)) {
                element.value = value;
            } else {
                element.textContent = value;
            }
        });

        setTimeout(() => {
            calcPrice(rowNumber);
            updateUnitPoints(rowNumber); // if you have this
        }, 0);
        

    }
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
});
// ------------------------------------
// NAVIGATION: Show/Hide Sections
// ------------------------------------
function showSection(sectionId) {
    document.querySelectorAll("main").forEach(main => main.classList.remove("active"));
    document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
  
    const targetPage = document.getElementById(sectionId);
    if (targetPage) targetPage.classList.add("active");
  
    const relatedTab = document.querySelector(`[data-tab="${sectionId}"]`);
    if (relatedTab) relatedTab.classList.add("active");
}

document.getElementById('toDeveloperBtn')?.addEventListener('click', () => {
    showSection('developer');
});

document.getElementById('toFactionBtn')?.addEventListener('click', () => {
    showSection('faction');
});

// ------------------------------------
// EXPORT UNITS (for existing table)
// ------------------------------------
const exportButton = document.getElementById('exportUnitsBtn');

if (exportButton) {
    exportButton.addEventListener('click', function() {
        const rows = [];
        const MAX_ROWS = 15;

        for (let i = 1; i <= MAX_ROWS; i++) {
            const rowElement = document.getElementById(`row-${i}`);
            if (!rowElement) continue;

            const rowObject = {
                pointsUsage: document.getElementById(`PU-${i}`)?.textContent.trim() || "",
                price: document.getElementById(`P-${i}`)?.textContent.trim() || "",
                name: document.getElementById(`N-${i}`)?.textContent.trim() || "",
                manCount: document.getElementById(`MC-${i}`)?.textContent.trim() || "",
                morale: document.getElementById(`M-${i}`)?.textContent.trim() || "",
                chargeBonus: document.getElementById(`CB-${i}`)?.textContent.trim() || "",
                meleeAttack: document.getElementById(`MA-${i}`)?.textContent.trim() || "",
                meleeDefense: document.getElementById(`MD-${i}`)?.textContent.trim() || "",
                armor: document.getElementById(`Armor-${i}`)?.textContent.trim() || "",
                hp: document.getElementById(`H-${i}`)?.textContent.trim() || "",
                ammo: document.getElementById(`Ammo-${i}`)?.textContent.trim() || "",
                accuracy: document.getElementById(`Accuracy-${i}`)?.textContent.trim() || "",
                meleeWeapon: document.getElementById(`MW-${i}`)?.value || "",
                missileWeapon: document.getElementById(`MisW-${i}`)?.value || "",
                shield: document.getElementById(`S-${i}`)?.value || "",
                mount: document.getElementById(`Mount-${i}`)?.value || "",
                animalArtilleryChariot: document.getElementById(`AAC-${i}`)?.value || "",
                numberOfAAC: document.getElementById(`NAAC-${i}`)?.textContent.trim() || ""
            };
            
            rows.push(rowObject);
        }

        if (rows.length == 0) {
            alert("Critical Error: No rows were found in the table to export.");
            return;
        }

        const jsonString = JSON.stringify(rows, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const tempLink = document.createElement('a'); 
        tempLink.href = url;
        tempLink.download = 'unit_data_export.json';
        tempLink.style.display = 'none';

        document.body.appendChild(tempLink);
        tempLink.click();
        
        setTimeout(() => {
            document.body.removeChild(tempLink);
            URL.revokeObjectURL(url); 
        }, 100); 

        alert('Units successfully exported and download initiated!');
    });
}

// ------------------------------------
// TOGGLE SELECT/EDIT MODE
// ------------------------------------
const toggleBtn = document.getElementById('toggleSelectMode');
if (toggleBtn) {
    let selectMode = false;

    toggleBtn.addEventListener('click', () => {
        selectMode = !selectMode;
        const rows = document.querySelectorAll('#the-calc tr');

        rows.forEach(row => {
            const cells = row.querySelectorAll('td, th');
            cells.forEach((cell, i) => {
                if (i < 2) {
                    cell.setAttribute('contenteditable', 'false');
                    cell.classList.add('no-select');
                } else {
                    cell.setAttribute('contenteditable', selectMode ? 'false' : 'true');
                    cell.classList.toggle('no-select', false);
                }
            });
        });

        toggleBtn.textContent = selectMode
            ? 'Switch to Edit Mode'
            : 'Switch to Select Mode';
    });
}

// ------------------------------------
// IMPORT UNITS
// ------------------------------------
const importButton = document.getElementById('importUnitsBtn');
const fileInput = document.getElementById('fileInput');

if (importButton && fileInput) {
    fileInput.accept = ".json";
    fileInput.style.display = 'none';

    importButton.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const importedData = JSON.parse(e.target.result);
                // You'll need to implement populateTable function
                populateTable(importedData);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                alert('Error: Could not read or parse the JSON file. Ensure it is a valid JSON array.');
            } finally {
                event.target.value = ''; 
            }
        };
        reader.readAsText(file);
    });
} else {
    console.warn("Import functionality setup elements (button/input) not found in HTML. Import is disabled.");
}

// ------------------------------------
// CLEAR UNITS BUTTON
// ------------------------------------
const clearUnitsBtn = document.getElementById("clearUnitsBtn");
if (clearUnitsBtn) {
    clearUnitsBtn.addEventListener("click", () => {
        if (!confirm("Clear all unit entries in the table?")) return;
        
        for (let i = 1; i <= 15; i++) {
            // Clear contenteditable cells
            ['N', 'MC', 'M', 'CB', 'MA', 'MD', 'Armor', 'H', 'Ammo', 'Accuracy', 'NAAC'].forEach(prefix => {
                const el = document.getElementById(`${prefix}-${i}`);
                if (el) el.textContent = '';
            });
            
            // Reset selects
            ['MW', 'MisW', 'S', 'Mount', 'AAC'].forEach(prefix => {
                const el = document.getElementById(`${prefix}-${i}`);
                if (el) el.selectedIndex = 0;
            });
        }
    });
}

// =============================
// FACTION MANAGER - SAVE/LOAD SYSTEM
// =============================

/**
 * Save current faction to localStorage
 */
function saveFaction() {
    // Get faction data
    const factionName = document.getElementById('factionName')?.value.trim();
    
    if (!factionName) {
        alert('Please enter a faction name before saving!');
        return;
    }
    
    const factionData = {
        name: factionName,
        colors: {
            primary: document.getElementById('colorPrimary')?.value || '#000000',
            secondary: document.getElementById('colorSecondary')?.value || '#000000',
            tertiary: document.getElementById('colorTertiary')?.value || '#000000',
            unitCard: document.getElementById('colorUnitCard')?.value || '#000000',
        },
        units: getAllUnitsData(), // Get all 15 units
        savedAt: new Date().toISOString(),
    };
    
    // Get existing factions from localStorage
    const savedFactions = JSON.parse(localStorage.getItem('savedFactions') || '{}');
    
    // Save this faction (using name as key)
    savedFactions[factionName] = factionData;
    
    localStorage.setItem('savedFactions', JSON.stringify(savedFactions));
    
    alert(`✅ Faction "${factionName}" saved successfully!`);
    
    // Update the faction list display
    displaySavedFactions();
}

/**
 * Load a faction from localStorage
 */
function loadFaction(factionName) {
    const savedFactions = JSON.parse(localStorage.getItem('savedFactions') || '{}');
    const faction = savedFactions[factionName];
    
    if (!faction) {
        alert(`Faction "${factionName}" not found!`);
        return;
    }
    
    // Load faction name and colors
    document.getElementById('factionName').value = faction.name;
    document.getElementById('colorPrimary').value = faction.colors.primary;
    document.getElementById('colorSecondary').value = faction.colors.secondary;
    document.getElementById('colorTertiary').value = faction.colors.tertiary;
    document.getElementById('colorUnitCard').value = faction.colors.unitCard;
    
    // Load units data
    if (faction.units && Array.isArray(faction.units)) {
        faction.units.forEach((unit, index) => {
            const rowNumber = index + 1;
            if (rowNumber <= 15) {
                // Load stats
                document.getElementById(`MA-${rowNumber}`).textContent = unit.meleeAttack || '';
                document.getElementById(`MD-${rowNumber}`).textContent = unit.meleeDefense || '';
                document.getElementById(`M-${rowNumber}`).textContent = unit.morale || '';
                document.getElementById(`CB-${rowNumber}`).textContent = unit.chargeBonus || '';
                document.getElementById(`Armor-${rowNumber}`).textContent = unit.armor || '';
                document.getElementById(`H-${rowNumber}`).textContent = unit.hp || '';
                document.getElementById(`Accuracy-${rowNumber}`).textContent = unit.accuracy || '';
                
                // Load equipment
                document.getElementById(`MW-${rowNumber}`).value = unit.meleeWeapon || 'dagger_10_2';
                document.getElementById(`S-${rowNumber}`).value = unit.shield || 'none';
                document.getElementById(`Mount-${rowNumber}`).value = unit.mount || 'none';
                
                // Recalculate price and points for this unit
                calcPrice(rowNumber);
                updateUnitPoints(rowNumber);
            }
        });
    }
    
    alert(`✅ Faction "${factionName}" loaded successfully!`);
}

/**
 * Delete a faction from localStorage
 */
function deleteFaction(factionName) {
    if (!confirm(`Are you sure you want to delete faction "${factionName}"?`)) {
        return;
    }
    
    const savedFactions = JSON.parse(localStorage.getItem('savedFactions') || '{}');
    delete savedFactions[factionName];
    localStorage.setItem('savedFactions', JSON.stringify(savedFactions));
    
    alert(`✅ Faction "${factionName}" deleted!`);
    displaySavedFactions();
}

/**
 * Display saved factions in the UI
 */
function displaySavedFactions() {
    const savedFactions = JSON.parse(localStorage.getItem('savedFactions') || '{}');
    const factionList = document.getElementById('factionList');
    
    if (!factionList) {
        console.warn('factionList element not found');
        return;
    }
    
    // Clear existing list
    factionList.innerHTML = '';
    
    const factionNames = Object.keys(savedFactions);
    
    if (factionNames.length === 0) {
        factionList.innerHTML = '<li style="color: #888; font-style: italic;">No saved factions yet</li>';
        return;
    }
    
    // Create list items for each faction
    factionNames.forEach(name => {
        const faction = savedFactions[name];
        const li = document.createElement('li');
        li.className = 'faction-item';
        li.style.cssText = `
            padding: 0.75rem;
            margin: 0.5rem 0;
            background: #f8f5f0;
            border-radius: 6px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;
        
        // Faction name and date
        const info = document.createElement('div');
        const savedDate = new Date(faction.savedAt).toLocaleDateString();
        info.innerHTML = `
            <strong>${name}</strong><br>
            <small style="color: #666;">Saved: ${savedDate}</small>
        `;
        
        // Buttons
        const buttons = document.createElement('div');
        buttons.style.cssText = 'display: flex; gap: 0.5rem;';
        
        const loadBtn = document.createElement('button');
        loadBtn.textContent = 'Load';
        loadBtn.className = 'submit';
        loadBtn.style.cssText = 'padding: 0.4rem 0.8rem; font-size: 0.9rem;';
        loadBtn.onclick = () => loadFaction(name);
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'submit danger';
        deleteBtn.style.cssText = 'padding: 0.4rem 0.8rem; font-size: 0.9rem;';
        deleteBtn.onclick = () => deleteFaction(name);
        
        buttons.appendChild(loadBtn);
        buttons.appendChild(deleteBtn);
        
        li.appendChild(info);
        li.appendChild(buttons);
        factionList.appendChild(li);
    });
}

// =============================
// INITIALIZE FACTION MANAGER
// =============================

// Update the Save Faction button
const saveFactionBtn = document.getElementById("saveFactionBtn");
if (saveFactionBtn) {
    // Remove old event listener by replacing the button
    const newSaveFactionBtn = saveFactionBtn.cloneNode(true);
    saveFactionBtn.parentNode.replaceChild(newSaveFactionBtn, saveFactionBtn);
    
    newSaveFactionBtn.addEventListener("click", saveFaction);
}

// Update Export/Import buttons (keep the alerts for now, or implement later)
const exportFactionsBtn = document.getElementById("exportFactionsBtn");
if (exportFactionsBtn) {
    exportFactionsBtn.addEventListener("click", () => {
        const savedFactions = localStorage.getItem('savedFactions');
        if (!savedFactions || savedFactions === '{}') {
            alert('No factions to export!');
            return;
        }
        
        // Download as JSON file
        const blob = new Blob([savedFactions], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'factions_export.json';
        a.click();
        URL.revokeObjectURL(url);
    });
}

const importFactionsBtn = document.getElementById("importFactionsBtn");
if (importFactionsBtn) {
    importFactionsBtn.addEventListener("click", () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const imported = JSON.parse(event.target.result);
                    localStorage.setItem('savedFactions', JSON.stringify(imported));
                    alert('✅ Factions imported successfully!');
                    displaySavedFactions();
                } catch (err) {
                    alert('❌ Error importing factions: ' + err.message);
                }
            };
            reader.readAsText(file);
        };
        input.click();
    });
}

if (clearFactionsBtn) {
    clearFactionsBtn.addEventListener("click", () => {
        if (confirm("Clear all saved factions? This cannot be undone!")) {
            localStorage.removeItem('savedFactions');
            displaySavedFactions();
            alert('✅ All factions cleared!');
        }
    });
}




// Load and display saved factions on page load
displaySavedFactions();


// ------------------------------------
// COLOR PICKER PREVIEWS
// ------------------------------------
const colorInputs = document.querySelectorAll(".color-pickers input[type='color']");
// ... rest of color picker code

colorInputs.forEach(input => {
  const preview = document.createElement("span");
  preview.className = "color-preview";
  preview.style.display = "inline-block";
  preview.style.width = "20px";
  preview.style.height = "20px";
  preview.style.border = "1px solid #ccc";
  preview.style.borderRadius = "4px";
  preview.style.marginLeft = "8px";
  preview.style.verticalAlign = "middle";
  preview.style.backgroundColor = input.value;

  input.insertAdjacentElement("afterend", preview);

  input.addEventListener("input", () => {
    preview.style.backgroundColor = input.value;
  });
});

// =============================
// DATA LOADING
// =============================
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
    initializePointsSystem();
})
.catch(error => {
    console.error('Failed to load necessary data:', error);
});

// =============================
// CLERK AUTHENTICATION
// =============================
window.addEventListener("load", async () => {
    const clerk = window.Clerk;
    await clerk.load();

    const signedInDiv = document.getElementById("signedIn");
    const userButton = document.getElementById("user-button");

    if (clerk.user) {
        signedInDiv.style.display = "block";  
        clerk.mountUserButton(userButton);
    } else {
        signedInDiv.style.display = "block";
    }

    const signInLink = document.getElementById("openSignIn");
    if (signInLink) {
        signInLink.onclick = () => {
            clerk.openSignIn({ redirectUrl: "/" });
        };
    }
});

// =============================
// CSV EXPORT BUTTON
// =============================
const exportCSVButton = document.getElementById('exportCSVBtn');

if (exportCSVButton) {
    exportCSVButton.addEventListener('click', function() {
        const rows = [];
        const MAX_ROWS = 15;

        for (let i = 1; i <= MAX_ROWS; i++) {
            const rowElement = document.getElementById(`row-${i}`);
            if (!rowElement) continue;

            const rowObject = {};
            
            ALL_INPUT_PREFIXES.forEach(prefix => {
                const element = document.getElementById(`${prefix}-${i}`);
                if (element) {
                    let cellValue;
                    if (SELECT_PREFIXES.includes(prefix)) {
                        cellValue = element.value;
                    } else {
                        cellValue = element.textContent.trim();
                    }
                    rowObject[prefix] = cellValue;
                }
            });

            rows.push(rowObject);
        }

        if (rows.length === 0) {
            alert("Error: No table rows found.");
            return;
        }

        function convertToCSV(objArray) {
            const headers = Object.keys(objArray[0]);
            const csvRows = [];

            csvRows.push(headers.join(','));

            objArray.forEach(row => {
                const values = headers.map(h => {
                    const val = row[h] ?? "";
                    return `"${val.replace(/"/g, '""')}"`;
                });
                csvRows.push(values.join(','));
            });

            return csvRows.join('\n');
        }

        const csvString = convertToCSV(rows);
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);

        const tempLink = document.createElement('a');
        tempLink.href = url;
        tempLink.download = 'unit_data_export.csv';
        tempLink.style.display = 'none';

        document.body.appendChild(tempLink);
        tempLink.click();

        setTimeout(() => {
            document.body.removeChild(tempLink);
            URL.revokeObjectURL(url);
        }, 100);

        alert("CSV file exported!");
    });
}

// =============================
// EMAIL SUBMISSION
// =============================
function openEmailDraft(factionData) {
    const recipient = "example@example.com";
    const subject = "Faction Data Submission";
  
    const body =
        "Here is my faction data:\n\n" +
        factionData +
        "\n\n(Attached file downloaded automatically.)";
  
    window.location.href =
        "mailto:" +
        recipient +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);
}

function handleFactionSubmission() {
    const data = generateFactionData();
  
    downloadFactionFile(data);
    openEmailDraft(data);
  
    setTimeout(() => {
        alert("Email draft opened! Your faction file was downloaded.");
    }, 600);
}

const emailBtn = document.getElementById("emailBtn");
if (emailBtn) {
    emailBtn.addEventListener("click", handleFactionSubmission);
}

// =============================
// MODULE EXPORTS (for testing)
// =============================
if (typeof module !== "undefined") {
    module.exports = {
        vlookup,
        updatePrice,
        calcPrice
    };
}

// =============================
// POINTS CALCULATION SYSTEM
// =============================

/**
 * Get all unit data from the table
 */
function getAllUnitsData() {
    const units = [];
    
    for (let i = 1; i <= 15; i++) {
        const unit = {
            meleeAttack: document.getElementById(`MA-${i}`)?.textContent.trim() || '0',
            meleeDefense: document.getElementById(`MD-${i}`)?.textContent.trim() || '0',
            morale: document.getElementById(`M-${i}`)?.textContent.trim() || '0',
            chargeBonus: document.getElementById(`CB-${i}`)?.textContent.trim() || '0',
            armor: document.getElementById(`Armor-${i}`)?.textContent.trim() || '0',
            hp: document.getElementById(`H-${i}`)?.textContent.trim() || '0',
            accuracy: document.getElementById(`Accuracy-${i}`)?.textContent.trim() || '0',
            meleeWeapon: document.getElementById(`MW-${i}`)?.value || 'dagger_10_2',
            shield: document.getElementById(`S-${i}`)?.value || 'none',
            mount: document.getElementById(`Mount-${i}`)?.value || 'none',
        };
        units.push(unit);
    }
    
    return units;
}


// =============================
// POINTS CALCULATION LOOKUP TABLES
// =============================

const WEAPON_VALUES = {
    'dagger_10_2': 5,
    'shortsword_20_4': 10,
    'gladius_elite_34_5': 20,
    'celtic_longsword_36_4': 22,
    'warsword_40_15': 30,
    'spear_20_5_20': 15,
    'pike_20_4': 12,
    'lance_14_11_10': 18,
};

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

const MOUNT_VALUES = {
    'none': 0,
    'rome_horse_light': 15,
    'rome_horse_medium': 20,
    'rome_horse_heavy': 25,
    'rome_horse_very_heavy': 30,
    'rome_camel': 20,
};

function calcUnitPoints(unit) {
    const meleeAttack = parseFloat(unit.meleeAttack) || 0;
    const meleeDefense = parseFloat(unit.meleeDefense) || 0;
    const morale = parseFloat(unit.morale) || 0;
    const chargeBonus = parseFloat(unit.chargeBonus) || 0;
    const armor = parseFloat(unit.armor) || 0;
    const hp = parseFloat(unit.hp) || 0;
    const accuracy = parseFloat(unit.accuracy) || 0;
    
    const weaponKey = unit.meleeWeapon || 'dagger_10_2';
    const weaponValue = WEAPON_VALUES[weaponKey] || 10;
    
    const shieldKey = unit.shield || 'none';
    const shieldValue = SHIELD_VALUES[shieldKey] || 0;
    
    const mountKey = unit.mount || 'none';
    const mountValue = MOUNT_VALUES[mountKey] || 0;
    
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
    ) / 10;
    
    return Math.floor((rawPoints * 10) / 10);
}

function calcTotalPoints(units) {
    const total = units.reduce((sum, unit) => {
        return sum + calcUnitPoints(unit);
    }, 0);
    
    return Math.round(total * 10) / 10;
}

/**
 * Update individual unit points display
 */
function updateUnitPoints(rowNumber) {
    const unit = {
        meleeAttack: document.getElementById(`MA-${rowNumber}`)?.textContent.trim() || '0',
        meleeDefense: document.getElementById(`MD-${rowNumber}`)?.textContent.trim() || '0',
        morale: document.getElementById(`M-${rowNumber}`)?.textContent.trim() || '0',
        chargeBonus: document.getElementById(`CB-${rowNumber}`)?.textContent.trim() || '0',
        armor: document.getElementById(`Armor-${rowNumber}`)?.textContent.trim() || '0',
        hp: document.getElementById(`H-${rowNumber}`)?.textContent.trim() || '0',
        accuracy: document.getElementById(`Accuracy-${rowNumber}`)?.textContent.trim() || '0',
        meleeWeapon: document.getElementById(`MW-${rowNumber}`)?.value || 'dagger_10_2',
        shield: document.getElementById(`S-${rowNumber}`)?.value || 'none',
        mount: document.getElementById(`Mount-${rowNumber}`)?.value || 'none',
    };
    
    // Calculate points for this unit
    const points = calcUnitPoints(unit);
    
    // Update the PU (Points Usage) cell for this row
    const pointsCell = document.getElementById(`PU-${rowNumber}`);
    if (pointsCell) {
        pointsCell.textContent = points.toFixed(1);
    }
    
    // Update total points
    updateTotalPoints();
}

/**
 * Update the total points display in the header
 */
function updateTotalPoints() {
    const units = getAllUnitsData();
    const total = calcTotalPoints(units);
    
    const totalElement = document.getElementById('total-points-usage');
    if (totalElement) {
        totalElement.textContent = `Points Usage ${total.toFixed(1)}/34`;
        
        // Highlight red if over limit
        if (total > 34) {
            totalElement.style.color = 'red';
            totalElement.style.fontWeight = 'bold';
            
            // Show warning (only once per edit)
            if (!totalElement.dataset.warningShown) {
                alert(`⚠️ Warning: You've exceeded the 34 point limit! Current total: ${total.toFixed(1)} points`);
                totalElement.dataset.warningShown = 'true';
            }
        } else {
            totalElement.style.color = '';
            totalElement.style.fontWeight = '';
            totalElement.dataset.warningShown = '';
        }
    }
}

/**
 * Add event listeners to all inputs to update points
 */
function initializePointsSystem() {
    // Add listeners to all contenteditable cells
    const editableCells = ['MA', 'MD', 'M', 'CB', 'Armor', 'H', 'Accuracy'];
    
    for (let i = 1; i <= 15; i++) {
        editableCells.forEach(prefix => {
            const element = document.getElementById(`${prefix}-${i}`);
            if (element) {
                element.addEventListener('input', () => {
                    updateUnitPoints(i);
                });
                element.addEventListener('blur', () => {
                    updateUnitPoints(i);
                });
            }
        });
        
        // Add listeners to select dropdowns
        const selects = ['MW', 'S', 'Mount'];
        selects.forEach(prefix => {
            const element = document.getElementById(`${prefix}-${i}`);
            if (element) {
                element.addEventListener('change', () => {
                    updateUnitPoints(i);
                });
            }
        });
    }
    
    // Initial calculation
    for (let i = 1; i <= 15; i++) {
        updateUnitPoints(i);
    }
}

