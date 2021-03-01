const jobRole = document.getElementById('title');
const otherRole = document.getElementById('other-job-role');
const colorSelector = document.getElementById('color');
const colorOptions = colorSelector.children;
const shirtDesign = document.getElementById('design');
const activtyRegistration = document.getElementById('activities');
const totalCost = document.getElementById('activities-cost');
let finalCost = 0;
const activityInfo = activtyRegistration.querySelectorAll('input');
const activityLabel = activtyRegistration.querySelectorAll('label');

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

activtyRegistration.addEventListener('change', event => {
  let costText = event.target.getAttribute('data-cost');
  let selectedDate = event.target.getAttribute('data-day-and-time');
  let selectedActivity = event.target.getAttribute('name');
  let costNumber = +costText;
  if (event.target.checked === true) {
    finalCost += costNumber;
  } else {
    finalCost -= costNumber;
  }
  totalCost.innerHTML = `Total: $${finalCost}`;
  for (let i = 0; i < activityInfo.length; i++) {
    let activityDate = activityInfo[i].getAttribute('data-day-and-time');
    let activityName = activityInfo[i].getAttribute('name');
    if (event.target.checked === true && selectedDate === activityDate && selectedActivity !== activityName) {
     activityInfo[i].disabled = true;
     activityLabel[i].classList.add('grayout');
    } else if (event.target.checked === false && selectedDate === activityDate) {
      activityInfo[i].disabled = false;
      activityLabel[i].classList.remove('grayout');
    }
   }
});