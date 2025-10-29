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
    meleeDefenceCost[rowNumber-1]+armorCost[rowNumber-1]+missileBlockCost[rowNumber-1])*0.9;
    price.textContent = Math.round(totalPrice[rowNumber-1]/10)*10;
    console.log("Price changed");
    }
}

function calcPrice(rowNumber){
    calcCategory(rowNumber);
    calcMeleeAttack(rowNumber);
    calcHp(rowNumber);
    calcMeleeWeapon(rowNumber);
    calcMeleeDefense(rowNumber);
    calcChargeBonus(rowNumber);
    calcMorale(rowNumber);
    calcAccuracy(rowNumber);
    calcArmor(rowNumber);
    calcMissileBlock(rowNumber);
    calcAmmo(rowNumber);
}

//Melee In =1, Spear Inf = 2, Pike Inf =3, Archer =4, Slinger =5, Pelt =6, Mel Cav = 7, Shk Cav = 8
//MisCav = 9, Animal = 10, Chariot = 11, Arty = 12, Elepant = 13, Gun = 14
function calcCategory(rowNumber) {
    const index = rowNumber - 1;

    // --- 1. Safely get element references ---
    const chargeBonusElement = document.getElementById(`CB-${rowNumber}`);
    const ammoElement = document.getElementById(`Ammo-${rowNumber}`);
    const meleeWeaponElement = document.getElementById(`MW-${rowNumber}`);
    const missileWeaponElement = document.getElementById(`MisW-${rowNumber}`);
    const mountElement = document.getElementById(`Mount-${rowNumber}`);
    const animalArtilleryChariotElement = document.getElementById(`AAC-${rowNumber}`);

    // --- 2. Safely extract values from elements (CRITICAL FIXES HERE) ---
    // If the element is null, default its value to '0' or 'none' to prevent crashing on .textContent or .value access.
    const chargeBonusValue = parseInt(chargeBonusElement ? chargeBonusElement.textContent : '0') || 0;
    const ammoContent = ammoElement ? ammoElement.textContent.trim() : ''; // Used for text content checks
    const ammoValue = parseInt(ammoContent) || 0;

    // Fix for SELECT elements (MW, MisW, Mount, AAC) which read .value
    const meleeWeaponValue = meleeWeaponElement ? meleeWeaponElement.value : 'none';
    const missileWeaponValue = missileWeaponElement ? missileWeaponElement.value : 'none';
    const mountValue = mountElement ? mountElement.value : 'none';
    const aacValue = animalArtilleryChariotElement ? animalArtilleryChariotElement.value : 'none';

    // --- 3. Perform Lookups ---
    const mwWeaponDetails = vlookup(meleeWeaponValue, meleeWeaponsData, 'Key');
    const misWeaponDetails = vlookup(missileWeaponValue, missileWeaponsData, 'Key');
    
    // Determine entity details (default to 'none' entity for lookup)
    let entityDetails = vlookup('none', entityData, 'Entity');
    if (mountValue !== 'none') {
        entityDetails = vlookup(mountValue, entityData, 'Entity');
    }
    else if(aacValue !== 'none') {
        entityDetails = vlookup(aacValue, entityData, 'Entity');
    }

    // --- 4. CATEGORY CHECK LOGIC (with safety checks for lookups) ---
    unitCategories[index] = 0; // Default to 0 or 'unclassified'

    // Alias for less typing and clearer conditions
    const isMeleeWeapon = mwWeaponDetails && mwWeaponDetails['Unit Type'];
    const isMissileWeapon = misWeaponDetails && misWeaponDetails['Unit Type'];
    const isMissileType = misWeaponDetails && misWeaponDetails['Type'];
    const isEntity = entityDetails && entityDetails['Entity'];
    const isEntityType = entityDetails && entityDetails['Type'];
    
    const isAmmoLow = ammoValue <= 5 || ammoContent === "" || ammoContent === " ";
    const isTorchOrStone = missileWeaponValue === 'torch_25_1_0' || missileWeaponValue === 'stone_hand_75_5_1';
    const isMountNone = mountValue === 'none';
    const isAACNone = aacValue === 'none';

    // Melee Infantry Check (1)
    if (isMeleeWeapon === 'mel' && (isAmmoLow || isTorchOrStone) && isMountNone && isAACNone && isMissileType === 'any') {
        unitCategories[index] = 1;
    } 
    // Spear Infantry Check (2)
    else if ((isMeleeWeapon === 'spr' || isMeleeWeapon === 'shk') && (isAmmoLow || isTorchOrStone) && isMountNone && isAACNone && isMissileType === 'any') {
        unitCategories[index] = 2;
    }
    // Pike Infantry Check (3)
    else if (isMeleeWeapon === 'pik' && (isAmmoLow || isTorchOrStone) && isMountNone && isAACNone && isMissileType === 'any') {
        unitCategories[index] = 3;
    }
    // Archer (4)
    else if (isMissileWeapon === 'arr' && isAACNone && isMountNone) {
        unitCategories[index] = 4;
    }
    // Slinger (5)
    else if (isMissileWeapon === 'sli' && isAACNone && isMountNone) {
        unitCategories[index] = 5;
    }
    // Peltast / Javelin (6)
    else if ((isMissileWeapon === 'pel' || (isMissileType === 'any' && ammoValue > 5) && !isTorchOrStone) && isAACNone && isMountNone) {
        unitCategories[index] = 6;
    }
    // Melee Cav (7)
    else if (chargeBonusValue <= 50 && ((isAmmoLow && isMissileType === 'any') || isTorchOrStone) && isEntity === 'mt' && isMeleeWeapon !== 'shk') {
        unitCategories[index] = 7;
    }
    // Shock Cav (8)
    else if (((isAmmoLow && isMissileType === 'any') || isTorchOrStone) && isEntity === 'mt' && isMeleeWeapon === 'shk') {
        unitCategories[index] = 8;
    }
    // Missile Cav (9)
    else if ((ammoValue > 5 || isMissileType !== 'any') && isEntity === 'mt') {
        unitCategories[index] = 9;
    }
    // Animals (10)
    else if (isEntityType === 'an') {
        unitCategories[index] = 10;
    }
    // Chariot (11) - Check 1
    else if (isEntityType === 'cht') {
        unitCategories[index] = 11;
    }
    // Arty (12)
    else if (isEntityType === 'arty') {
        unitCategories[index] = 12;
    }
    // Chariot (13) - Check 2 (Keeping original structure, but this is likely redundant)
    else if (isEntityType === 'cht') { 
        unitCategories[index] = 13;
    }
    // Elephant (14)
    else if (isEntityType === 'el') {
        unitCategories[index] = 14;
    }
    // Gun (15)
    else if (isMissileWeapon === 'gun') {
        unitCategories[index] = 15;
    }

    updatePrice(rowNumber); 
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
    if (maTextContent === "") {
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
    updatePrice(rowNumber);
}

function calcHp(rowNumber){
    const hpCell = document.getElementById(`H-${rowNumber}`);

    // CRITICAL FIX: Secure against null element references.
    if (!hpCell) {
        return; 
    }

    const hpText = hpCell.textContent;

    // Check for empty or space-only content
    if(hpText.trim() === ""){
        return;
    }

    // Convert the text content to a number for calculations
    const hp = parseInt(hpText) || 0; 
    
    let hpPrice = 0;
    
    // Ensure category is updated before using it
    // Assuming calcCategory and unitCategories are globally defined
    calcCategory(rowNumber);
    const cat = unitCategories[rowNumber-1];
    console.log(`Row ${rowNumber} Category: ${cat}`); // Logging for clarity

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
    console.log(`Calculated HP Price: ${hpPrice}`);
    
    // Update the total price for the row
    updatePrice(rowNumber);
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
    calcCategory(rowNumber);
    updatePrice(rowNumber);
}


function calcMeleeDefense(rowNumber){
    const melDefCell = document.getElementById(`MD-${rowNumber}`);

    // CRITICAL FIX 1: Check if the element exists before accessing its properties.
    if (!melDefCell) {
        return;
    }

    const meleeDefenceText = melDefCell.textContent;

    // Check for empty or space-only content
    if(meleeDefenceText.trim() === ""){
        return;
    }
    
    // Convert the text content to an integer. The calculation logic relies on numeric input.
    const meleeDefence = parseInt(meleeDefenceText) || 0; 

    let meleeDefencePrice=0;
    
    // Assuming calcCategory and unitCategories are globally defined
    calcCategory(rowNumber);
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
    updatePrice(rowNumber);
}


function calcChargeBonus(rowNumber){
    const chgCell = document.getElementById(`CB-${rowNumber}`);
    
    // CRITICAL FIX 1: Check if the element exists before accessing its properties.
    if (!chgCell) {
        return;
    }
    
    const chgBonusText = chgCell.textContent;

    // Check for empty or space-only content
    if(chgBonusText.trim() === ""){
        return;
    }
    
    // Convert the text content to an integer. The calculation logic relies on numeric input.
    const chgBonus = parseInt(chgBonusText) || 0; 
    
    calcCategory(rowNumber);
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
    updatePrice(rowNumber);
}

function calcMorale(rowNumber){
    const moraleCell = document.getElementById(`M-${rowNumber}`);
    
    // CRITICAL FIX 1: Check if the element exists.
    if (!moraleCell) {
        return;
    }
    
    const moraleText = moraleCell.textContent;

    // Check for empty or space-only content
    if(moraleText.trim() === ""){
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
    
    console.log("Morale Cost for unit " + rowNumber + " is:" + moralePrice);
    
    // Assuming updatePrice is globally defined
    updatePrice(rowNumber);
}

function calcAccuracy(rowNumber){
    const accuracyCell = document.getElementById(`Accuracy-${rowNumber}`);
    
    // CRITICAL FIX 1: Check if the element exists.
    if (!accuracyCell) {
        return;
    }
    
    const accuracyText = accuracyCell.textContent;

    // Check for empty or space-only content
    if(accuracyText.trim() === ""){
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
    updatePrice(rowNumber);
}

function calcArmor(rowNumber){
    const armorCell = document.getElementById(`Armor-${rowNumber}`);
    
    // CRITICAL FIX 1: Check if the element exists.
    if (!armorCell) {
        return;
    }
    
    const armorText = armorCell.textContent;
    
    // Check for empty or space-only content
    if(armorText.trim() === ""){
        return;
    }
    
    // Convert to number, defaulting to 0 if parsing fails.
    const armor = parseInt(armorText) || 0; 
    let armorPrice = 0;
    
    // Assuming calcCategory and unitCategories are globally defined
    calcCategory(rowNumber);
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
    
    console.log(armorPrice);
    
    // Assuming updatePrice is globally defined
    updatePrice(rowNumber);
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
    
    if (missileBlock === 0) {
        // Even if the shield is 'None' or data is missing, reset cost to 0 and exit.
        missileBlockCost[rowNumber-1] = 0;
        updatePrice(rowNumber);
        return;
    }

    calcCategory(rowNumber);
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
    updatePrice(rowNumber);
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
    if(ammoCell.textContent.trim() === ""){
        ammoCost[rowNumber-1] = 0; // Assuming ammoCost is global
        return;
    }
    
    // Convert ammo input to number, defaulting to 0 if parsing fails.
    let ammo = parseInt(ammoCell.textContent) || 0; 
    
    // Check if a missile weapon is selected
    if(misWeaponCell.value === 'none' || ammo === 0){
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
    
    const damage = parseInt(misWeaponDetails['Damage']) || 0;
    const apDamage = parseInt(misWeaponDetails['Ap']) || 0;
    const range = parseInt(misWeaponDetails['Range']) || 0;
    
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
    
    calcCategory(rowNumber);
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
            Math.max(ammo,25)+
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
            Math.max(ammo,7)+
            Math.max(ammo-7,0)*2+
            Math.max(ammo-10, 0)*2 // Corrected second argument for Math.max
        );
        ammoPrice=(
            damage*0.4+apDamage
        )*0.8;
        if(cat==14)
            ammoPrice*=0.44;
    }
    // Category 4 (Hand-thrown/Misc)
    else if(cat==1||cat==2||cat==3||cat==10||cat==7||cat==8){
        ammo=(
            Math.max(ammo,2)+
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
    }
    
    // Store and update
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
const calcMap = {
        "MA": calcMeleeAttack,
        "M": calcMorale,
        "Accuracy": calcAccuracy,
        "MW": calcMeleeWeapon,
        "H": calcHp,
        "CB": calcChargeBonus,
        "MD": calcMeleeDefense,
        "Armor": calcArmor,
        "S": calcMissileBlock, // Shield
        "Ammo": calcAmmo,
        "MisW": calcAmmo // Both Ammo and Missile Weapon updates often affect Ammo cost
        // Add other calculation functions here as they are implemented
    };

    // Loop through all 15 rows
    for (let i = 1; i <= MAX_ROWS; i++) {
        const row = document.getElementById(`row-${i}`);
        if (!row) continue; // Skip if the row doesn't exist

        // Attach event listeners for each input in the row
        ALL_INPUT_PREFIXES.forEach(prefix => {
            const element = document.getElementById(`${prefix}-${i}`);
            if (element) {
                // Determine which calculation function to use
                // Default to updatePrice if no specific function is mapped
                const calcFunction = calcMap[prefix] || updatePrice;
                
                // Bind the row number to the function for proper execution
                const boundCalc = calcFunction.bind(null, i); 

                // Determine event type (input for contenteditable, change for select)
                const eventType = SELECT_PREFIXES.includes(prefix) ? 'change' : 'input';
                
                element.addEventListener(eventType, boundCalc);

                // Ensure initial price is calculated on load for this row
                if (prefix === "N" && i === 1) { // Only call once per row (e.g., when setting up Unit Name 'N')
                    updatePrice(i); 
                }
            }
        });
    }
}

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

        // Iterate through the input keys we defined
        ALL_INPUT_PREFIXES.forEach(key => {
            if (unit.hasOwnProperty(key)) {
                const elementId = `${key}-${rowNumber}`;
                const element = document.getElementById(elementId);

                if (element) {
                    const valueToSet = unit[key];

                    if (SELECT_PREFIXES.includes(key)) {
                        // For select elements, set the value property
                        element.value = valueToSet;
                    } else {
                        // For contenteditable TDs, set the textContent
                        element.textContent = valueToSet;
                    }
                    
                    // Manually trigger the change/input event to run calculator logic
                    const event = new Event('input', { bubbles: true }); // Use input for generic trigger
                    element.dispatchEvent(event);
                }
            }
        });
    }
    for(let i = 1; i <= MAX_ROWS; i++){
        calcPrice();
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
    // Wrap your code inside this block
    const exportButton = document.getElementById('exportUnitsBtn');

    if (!exportButton) {
        console.error("Export Button (id='exportUnitsBtn') was NOT found in the DOM.");
    } else {
        exportButton.addEventListener('click', function() {
            const rows = [];

            // Iterate through rows 1 to MAX_ROWS (or until a row doesn't exist)
            for (let i = 1; i <= MAX_ROWS; i++) {
                const rowElement = document.getElementById(`row-${i}`);
                if (!rowElement) continue;

                const rowObject = {};
                
                // Loop through all input/select prefixes and retrieve their values
                ALL_INPUT_PREFIXES.forEach(prefix => {
                    const element = document.getElementById(`${prefix}-${i}`);
                    if (element) {
                        let cellValue;
                        if (SELECT_PREFIXES.includes(prefix)) {
                            // Get the value of the <select> element
                            cellValue = element.value;
                        } else {
                            // Get the text content of the contenteditable <td>
                            // Use trim() to clean up whitespace
                            cellValue = element.textContent.trim();
                        }

                        // Store the value, using the prefix as the JSON key
                        rowObject[prefix] = cellValue;
                    }
                });
                
                // *** FIX: Unconditionally push the row object, regardless of whether it's empty or not. ***
                rows.push(rowObject);
            }

            // 4. HALT if no data (This should only fail if the HTML table structure is missing)
            if (rows.length === 0) {
                alert("Critical Error: No rows were found in the table to export.");
                return;
            }

            // 5. Convert array of objects to JSON string (formatted nicely)
            const jsonString = JSON.stringify(rows, null, 2);

            // 6. DOWNLOAD IMPLEMENTATION
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            const tempLink = document.createElement('a'); 
            tempLink.href = url;
            tempLink.download = 'unit_data_export.json';
            tempLink.style.display = 'none';

            document.body.appendChild(tempLink);
            tempLink.click();
            
            // Clean up temporary link
            setTimeout(() => {
                document.body.removeChild(tempLink);
                URL.revokeObjectURL(url); 
            }, 100); 

            alert('Units successfully exported and download initiated!');
        });
    }

   const importButton = document.getElementById('importUnitsBtn');
    const fileInput = document.getElementById('fileInput');

    if (importButton && fileInput) {
        fileInput.accept = ".json"; // Ensure only JSON files are selectable
        fileInput.style.display = 'none'; // Keep the file input hidden

        // Trigger the file input when the import button is clicked
        importButton.addEventListener('click', () => fileInput.click());

        fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const importedData = JSON.parse(e.target.result);
                    populateTable(importedData);
                    alert(`Successfully imported ${importedData.length} units!`);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    alert('Error: Could not read or parse the JSON file. Ensure it is a valid JSON array.');
                } finally {
                    // Reset file input value to allow importing the same file again
                    event.target.value = ''; 
                }
            };
            reader.readAsText(file);
        });
    } else {
        console.warn("Import functionality setup elements (button/input) not found in HTML. Import is disabled.");
    }


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

});