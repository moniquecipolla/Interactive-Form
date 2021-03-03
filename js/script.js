const form = document.querySelector('form');
const jobRole = document.getElementById('title');
const otherRole = document.getElementById('other-job-role');
const colorSelector = document.getElementById('color');
const colorOptions = colorSelector.children;
const shirtDesign = document.getElementById('design');
const activtyRegistration = document.getElementById('activities');
const acitivityCheckboxes = document.querySelectorAll('input[type=checkbox]');
const activityInfo = activtyRegistration.querySelectorAll('input');
const activityLabel = activtyRegistration.querySelectorAll('label');
const activityHint = document.getElementById('activities-hint');
const totalCost = document.getElementById('activities-cost');
let finalCost = 0;
const payment = document.getElementById('payment');
const paymentMethod = payment.children;
const creditCard = document.getElementById('credit-card');
const payPal = document.getElementById('paypal');
const bitCoin = document.getElementById('bitcoin');
const fullName = document.getElementById('name');
const nameHint = document.getElementById('name-hint');
const email = document.getElementById('email');
const emailHint = document.getElementById('email-hint');
const cardNumber = document.getElementById('cc-num');
const cardHint = document.getElementById('cc-hint');
const zipCode = document.getElementById('zip');
const zipHint = document.getElementById('zip-hint');
const cardSecurity = document.getElementById('cvv');
const securityHint = document.getElementById('cvv-hint');

fullName.focus();
otherRole.style.display = 'none';
colorSelector.disabled = true;
paymentMethod[1].setAttribute('selected', 'selected');
payPal.hidden = true;
bitCoin.hidden = true;

for (i = 0; i < acitivityCheckboxes.length; i++) {  
  acitivityCheckboxes[i].addEventListener ('focus', event => {
    event.target.parentElement.classList.add('focus');
  });
  acitivityCheckboxes[i].addEventListener ('blur', event => {
    event.target.parentElement.classList.remove('focus');
  });
}

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
    nameHint.style.display = 'block';
    fullName.parentElement.classList.add('not-valid');
    fullName.parentElement.classList.remove('valid');
    return false;
  } else {
    nameHint.style.display = 'none';
    fullName.parentElement.classList.add('valid');
    fullName.parentElement.classList.remove('not-valid');
  }
}

function emailValidator() {
  const emailInput = email.value;
  const emailRegex = /^[^@]+@[^@.]+\.[a-z]+$/i;
  if (emailRegex.test(emailInput) === false) {
    emailHint.style.display = 'block';
    email.parentElement.classList.add('not-valid');
    email.parentElement.classList.remove('valid');
    return false;
  } else {
    emailHint.style.display = 'none';
    email.parentElement.classList.add('valid');
    email.parentElement.classList.remove('not-valid');
  }
}

function activityValidator() {
  const activitySelection = form.querySelectorAll('input[type=checkbox]:checked');
  if (activitySelection.length === 0) {
    activityHint.style.display = 'block';
    activtyRegistration.classList.add('not-valid');
    activtyRegistration.classList.remove('valid');
    return false;
  } else {
    activityHint.style.display = 'none';
    activtyRegistration.classList.add('valid');
    activtyRegistration.classList.remove('not-valid');
  }
} 

function cardValidator() {
  const cardInput = cardNumber.value;
  const cardRegex = /^[1-9][0-9]{12,15}$/;
  if (cardRegex.test(cardInput) === false) {
    cardHint.style.display = 'block';
    cardNumber.parentElement.classList.add('not-valid');
    cardNumber.parentElement.classList.remove('valid');
    return false;
  } else {
    cardHint.style.display = 'none';
    cardNumber.parentElement.classList.add('valid');
    cardNumber.parentElement.classList.remove('not-valid');
  }
}

function zipValidator() {
  const zipInput = zipCode.value;
  const zipRegexFewer = /^\d{0,4}$/;
  const zipRegexGreater = /^\d{6,}$/;
  if (zipRegexFewer.test(zipInput) === true) {
    zipHint.textContent = 'Zip Code must be 5 digits. You have entered fewer than 5 digits.'
    zipHint.style.display = 'block';
    zipCode.parentElement.classList.add('not-valid');
    zipCode.parentElement.classList.remove('valid');
    return false;
  } else if (zipRegexGreater.test(zipInput) === true) {
    zipHint.textContent = 'Zip Code must be 5 digits. You have entered more than 5 digits.'
    zipHint.style.display = 'block';
    zipCode.parentElement.classList.add('not-valid');
    zipCode.parentElement.classList.remove('valid');
    return false;
  } else {
    zipHint.style.display = 'none';
    zipCode.parentElement.classList.add('valid');
    zipCode.parentElement.classList.remove('not-valid');
  }
}

function securityValidator() {
  const securityInput = cardSecurity.value;
  const securityRegex = /^\d{3}$/;
  if (securityRegex.test(securityInput) === false) {
    securityHint.style.display = 'block';
    cardSecurity.parentElement.classList.add('not-valid');
    cardSecurity.parentElement.classList.remove('valid');
    return false;
  } else {
    securityHint.style.display = 'none';
    cardSecurity.parentElement.classList.add('valid');
    cardSecurity.parentElement.classList.remove('not-valid');
  }
}

fullName.addEventListener ('keyup', () => {
  nameValidator();
});

email.addEventListener ('keyup', () => {
  emailValidator();
});

cardNumber.addEventListener ('keyup', () => {
  cardValidator();
});

zipCode.addEventListener ('keyup', () => {
  zipValidator();
});

cardSecurity.addEventListener ('keyup', () => {
  securityValidator();
});

form.addEventListener('submit', event => {
  nameValidator();
  emailValidator();
  activityValidator();
  if (nameValidator() === false || emailValidator() === false || activityValidator() === false) {  
    event.preventDefault();
  }
  if (payment.value !== 'paypal' && payment.value !== 'bitcoin') {
    cardValidator();
    zipValidator();
    securityValidator();
    if (cardValidator() === false || zipValidator() === false || securityValidator() === false) {
      event.preventDefault();
    }
  }
});