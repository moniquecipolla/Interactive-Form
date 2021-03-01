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
const payment = document.getElementById('payment');
const paymentMethod = payment.children;
const creditCard = document.getElementById('credit-card');
const payPal = document.getElementById('paypal');
const bitCoin = document.getElementById('bitcoin');
const fullName = document.getElementById('name');
const email = document.getElementById('email');
const cardNumber = document.getElementById('cc-num');
const zipCode = document.getElementById('zip');
const cardSecurity = document.getElementById('cvv');
const form = document.querySelector('form');

document.getElementById('name').focus();
otherRole.style.display = 'none';
colorSelector.disabled = true;
paymentMethod[1].setAttribute('selected', 'selected');
payPal.hidden = true;
bitCoin.hidden = true;

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
  let costNumber = +costText;
  if (event.target.checked === true) {
    finalCost += costNumber;
  } else {
    finalCost -= costNumber;
  }
  totalCost.innerHTML = `Total: $${finalCost}`;

  for (let i = 0; i < activityInfo.length; i++) {
    let selectedDate = event.target.getAttribute('data-day-and-time');
    let selectedActivity = event.target.getAttribute('name');
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

payment.addEventListener ('change', event => {
  let selectedPayment = event.target.value;
  if (selectedPayment === 'paypal') {
    payPal.hidden = false;
    creditCard.hidden = true;
    bitCoin.hidden = true;
  } else if (selectedPayment === 'bitcoin') {
    bitCoin.hidden = false;
    creditCard.hidden = true;
    payPal.hidden = true;
  } else if (selectedPayment === 'credit-card') {
    creditCard.hidden = false;
    payPal.hidden = true;
    bitCoin.hidden = true;
  }
});

form.addEventListener('submit', event => {
  const nameInput = fullName.value;
  const nameRegex = /^(\w+\S+)$/;
  const nameHint = document.getElementById('name-hint');
  if (nameRegex.test(nameInput) === false) {  
    event.preventDefault();
    nameHint.style.display = 'block';
  }
  const emailInput = email.value;
  const emailRegex = /^[^@]+@[^@.]+\.[a-z]+$/i;
  const emailHint = document.getElementById('email-hint');
  if (emailRegex.test(emailInput) === false) {
    event.preventDefault();
    emailHint.style.display = 'block';
  }
  const activitySelection = form.querySelectorAll('input[type=checkbox]:checked');//https://stackoverflow.com/questions/11787665/making-sure-at-least-one-checkbox-is-checked
  const activityHint = document.getElementById('activities-hint');
  if (activitySelection.length === 0) {
    event.preventDefault();
    activityHint.style.display = 'block';
  }
  if (payment.value !== 'paypal' && payment.value !== 'bitcoin') {
    const cardInput = cardNumber.value;
    const cardRegex = /^[1-9][0-9]{12,15}$/;
    const cardHint = document.getElementById('cc-hint');
    if (cardRegex.test(cardInput) === false) {
      event.preventDefault();
      cardHint.style.display = 'block';
    }
    const zipInput = zipCode.value;
    const zipRegex = /^\d{5}$/;
    const zipHint = document.getElementById('zip-hint');
    if (zipRegex.test(zipInput) === false) {
      event.preventDefault();
      zipHint.style.display = 'block';
    }
    const securityInput = cardSecurity.value;
    const securityRegex = /^(?!000)\d{3}$/;
    const securityHint = document.getElementById('cvv-hint');
    if (securityRegex.test(securityInput) === false) {
      event.preventDefault();
      securityHint.style.display = 'block';
    }
  }
});