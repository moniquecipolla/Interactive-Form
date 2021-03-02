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
const nameHint = document.getElementById('name-hint');
const emailHint = document.getElementById('email-hint');
const activityHint = document.getElementById('activities-hint');
const cardHint = document.getElementById('cc-hint');
const zipHint = document.getElementById('zip-hint');
const securityHint = document.getElementById('cvv-hint');

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

function nameValidator() {
  const nameInput = fullName.value;
  const nameRegex = /^\s+$/;
  if (nameRegex.test(nameInput) === true || nameInput === '') {
    return false;
  }
}

function emailValidator() {
  const emailInput = email.value;
  const emailRegex = /^[^@]+@[^@.]+\.[a-z]+$/i;
  if (emailRegex.test(emailInput) === false) {
    return false;
  }
}

function activityValidator() {
  const activitySelection = form.querySelectorAll('input[type=checkbox]:checked');
  if (activitySelection.length === 0)
    return false;
}

function cardValidator() {
  const cardInput = cardNumber.value;
  const cardRegex = /^[1-9][0-9]{12,15}$/;
  if (cardRegex.test(cardInput) === false) {
    return false;
  }
}

function zipValidator() {
  const zipInput = zipCode.value;
  const zipRegex = /^\d{5}$/;
  if (zipRegex.test(zipInput) === false) {
    return false;
  }
}

function securityValidator() {
  const securityInput = cardSecurity.value;
  const securityRegex = /^(?!000)\d{3}$/;
  if (securityRegex.test(securityInput) === false) {
    return false;
  }
}

fullName.addEventListener ('input', () => {
  if (nameValidator() === false) {
    nameHint.style.display = 'block';
  } else {
    nameHint.style.display = 'none';
  }
});

email.addEventListener ('keyup', () => {
  if (emailValidator() === false) {
    emailHint.style.display = 'block';
  } else {
    emailHint.style.display = 'none';
  }
});

form.addEventListener('submit', event => {
  if (nameValidator() === false) {  
    event.preventDefault();
    nameHint.style.display = 'block';
  } else {
    nameHint.style.display = 'none';
  }
  if (emailValidator() === false) {
    event.preventDefault();
    emailHint.style.display = 'block';
  } else {
    emailHint.style.display = 'none';
  }
  if (activityValidator() === false) {
    event.preventDefault();
    activityHint.style.display = 'block';
  } else {
    activityHint.style.display = 'none';
  }
  if (payment.value !== 'paypal' && payment.value !== 'bitcoin') {
    if (cardValidator() === false) {
      event.preventDefault();
      cardHint.style.display = 'block';
    } else {
      cardHint.style.display = 'none';
    }
    if (zipValidator() === false) {
      event.preventDefault();
      zipHint.style.display = 'block';
    } else {
      zipHint.style.display = 'none';
    }
    if (securityValidator() === false) {
      event.preventDefault();
      securityHint.style.display = 'block';
    } else {
      securityHint.style.display = 'none';
    }
  }
});