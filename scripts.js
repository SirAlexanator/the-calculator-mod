document.addEventListener('DOMContentLoaded', () => {

  const meleeAttack1Input = document.getElementById('MA-1');
  const priceOutput1 = document.getElementById('P-1');

  meleeAttack1Input.addEventListener('input', () => {
    calcPrice(2);
});
});
function calcPrice(rowNumber){
const price = document.getElementById(`P-${rowNumber}`);
price.textContent = '1';
}

function updatePrice(rowNumber, change){
const price = document.getElementById(`P-${rowNumber}`);
let newPrice = price;
newPrice = newPrice+change;
price.textContent = `${newPrice}`;
}

function calcCategory(rowNumber){
    if()
}
