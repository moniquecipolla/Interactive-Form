const jobRole = document.getElementById('title');
const otherRole = document.getElementById('other-job-role');
const colorSelector = document.getElementById('color');
const colorOptions = colorSelector.children;
const shirtDesign = document.getElementById('design');
const acitivtyRegistration = document.getElementById('activities');
const totalCost = document.getElementById('activities-cost');
let finalCost = 0;

document.getElementById('name').focus();
otherRole.style.display = 'none';
colorSelector.disabled = true;

jobRole.addEventListener('change', event => {
  if (event.target.value === 'other') {
    otherRole.style.display = 'block';
  } else {
    otherRole.style.display = 'none';
  }
});

shirtDesign.addEventListener('input', event => {
  colorSelector.disabled = false;
  let selectedOption = event.target.value;
  for (let i = 0; i < colorOptions.length; i++) {
    let colorTheme = colorOptions[i].getAttribute('data-theme');
    if (selectedOption === colorTheme) {
      colorOptions[i].hidden = false;
      colorOptions[i].selected = true;
    } else {
      colorOptions[i].hidden = true;
      colorOptions[i].selected = false;
    }
  }
});

acitivtyRegistration.addEventListener('change', event => {
  let costText = event.target.getAttribute('data-cost');
  let costNumber = +costText;
  if (event.target.checked === true) {
    finalCost += costNumber;
  } else {
    finalCost -= costNumber;
  }
  totalCost.innerHTML = `Total: $${finalCost}`;
});