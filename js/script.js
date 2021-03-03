//Declaring my global variables that will be used throughout my code.
const form = document.querySelector('form');
const jobRole = document.getElementById('title');
const otherRole = document.getElementById('other-job-role');
const colorSelector = document.getElementById('color');
const colorOptions = colorSelector.children;
const shirtDesign = document.getElementById('design');
const activityRegistration = document.getElementById('activities');
const activityCheckboxes = document.querySelectorAll('input[type=checkbox]');
const activityInfo = activityRegistration.querySelectorAll('input');
const activityLabel = activityRegistration.querySelectorAll('label');
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
const cvv = document.getElementById('cvv');
const cvvHint = document.getElementById('cvv-hint');

//Setting up my page defaults like focusing on the name field and hiding/disabling fields that should be hidden/disabled.
fullName.focus();
otherRole.style.display = 'none';
colorSelector.disabled = true;
paymentMethod[1].setAttribute('selected', 'selected'); //selects Credit Card as the default payment choice.
payPal.hidden = true;
bitCoin.hidden = true;

//Setting up my page defaults for tabbing through activity checkboxes for accessibility.
for (i = 0; i < activityCheckboxes.length; i++) {  
  activityCheckboxes[i].addEventListener ('focus', event => {
    event.target.parentElement.classList.add('focus'); //Adds the focus class when you tab or click onto an activity checkbox.
  });
  activityCheckboxes[i].addEventListener ('blur', event => {
    event.target.parentElement.classList.remove('focus'); //Removes the focus class when you tab or click away from an activity checkbox.
  });
}

/*
Adding an event listener to the job role field.
If someone chooses "other" for their job role, the "other" textbox will appear.
Else, the "other" textbox stays hidden.
*/
jobRole.addEventListener('change', event => {
  if (event.target.value === 'other') {
    otherRole.style.display = 'block';
  } else {
    otherRole.style.display = 'none';
  }
});

/*
Adding an event listener to the shirt design field.
The color selector is disabled until someone chooses a design theme.
Once a theme is chosen, the color selector is enabled and the matching color options for the selected design theme are displayed.
*/
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

/*
Adding an event listener for activity registration.
If someone selects an activity, the final cost is updated accordingly by adding the cost amount.
Else, if someone deselects an activity, the final cost is updated accordingly by subtracting the cost amount.
*/
activityRegistration.addEventListener('change', event => {
  let costText = event.target.getAttribute('data-cost');
  let costNumber = +costText;
  if (event.target.checked === true) {
    finalCost += costNumber;
  } else {
    finalCost -= costNumber;
  }
  totalCost.innerHTML = `Total: $${finalCost}`;
/*
The loop below checks to see if the selected activity matches with the date/time of any other activities.
If any other activities match with the date/time of the selected activity, the other activity is grayed out and rendered unselectable.
Else, if someone de-selects an acitivity, any conflicting activities are un-grayed and rendered selectable once more.
*/
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

/*
Adding an event listener to the payment type selector.
If one payment type is selected, the information about the other two payment options are hidden.
*/
payment.addEventListener ('change', event => {
  let selectedPayment = event.target.value;
  if (selectedPayment === 'paypal') { //Selecting PayPal hides BitCoin and CC.
    payPal.hidden = false;
    creditCard.hidden = true;
    bitCoin.hidden = true;
  } else if (selectedPayment === 'bitcoin') { //Selecting BitCoin hides PayPal and CC.
    bitCoin.hidden = false;
    creditCard.hidden = true;
    payPal.hidden = true;
  } else if (selectedPayment === 'credit-card') { //Selecting Credit Card hides PayPal and BitCoin.
    creditCard.hidden = false;
    payPal.hidden = true;
    bitCoin.hidden = true;
  }
});

/*
The below functions are "helper functions" to validate the different required fields.
These can be called when creating event listeners to help validate whether a required field has the required information.
*/

/*
nameValidator checks that the Name field is not blank spaces or an empty string.
If it's an empty string or blank spaces, the function shows the name hint.
If it's an empty string or blank spaces, the function adds the "not-valid" class to the parent element and returns "false".
Else, if it's not an empty string or blank space, the function adds the "valid" class and removes the "not-valid" class, along with hiding the hint.
*/
function nameValidator() { 
  if (/^\s+$/.test(fullName.value) === true || fullName.value === '') {
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

/*
emailvalidator checks that the email field is a valid email with a .com address.
If it's an invalid email, the function shows the email hint.
If it's an invalid email, the function adds the "not-valid" class to the parent element and returns "false".
Else, if it is a valid email, the function adds the "valid" class and removes the "not-valid" class, along with hiding the hint.
*/
function emailValidator() {
  if (/^[^@]+@[^@.]+\.(com)+$/i.test(email.value) === false) { //Credit: TreeHouse Unit 3: Validating a Form (https://teamtreehouse.com/library/validating-an-email)
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

/*
activityValidator checks that at least one activity box has been checked.
If no activity box has been checked, the function shows the activity hint.
If no activity box has been checked, the function adds the "not-valid" class to the activity registration element and returns "false".
Else, if the activity is valid, the function adds the "valid" class and removes the "not-valid" class, along with hiding the hint.
*/
function activityValidator() {
  if (form.querySelectorAll('input[type=checkbox]:checked').length === 0) {
    activityHint.style.display = 'block';
    activityRegistration.classList.add('not-valid');
    activityRegistration.classList.remove('valid');
    return false;
  } else {
    activityHint.style.display = 'none';
    activityRegistration.classList.add('valid');
    activityRegistration.classList.remove('not-valid');
  }
} 

/*
cardValidator checks that the card number is a string of digits between 13 and 16 numbers.
If it's an invalid card number, the function shows the card hint.
If it's an invalid card number, the function adds the "not-valid" class to the parent element and returns "false".
Else, if it's a valid card number, the function adds the "valid" class and removes the "not-valid" class, along with hiding the hint.
*/
function cardValidator() {
  if (/^\d{13,16}$/.test(cardNumber.value) === false) {
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

/*
zipValidator checks that the zip code is a 5 digit string.
It provides conditional error messages, as described below.
*/
function zipValidator() {
  if (/^\d{0,4}$/.test(zipCode.value) === true) { //This checks if the zip code entered is fewer than 5 digits and updates the zip code hint accordingly.
    zipHint.textContent = 'Zip Code must be 5 digits. You have entered fewer than 5 digits.';
  } else if (/^\d{6,}$/.test(zipCode.value) === true) { //This checks if the zip code entered is more than 5 digits and updates the zip code hint accordingly.
    zipHint.textContent = 'Zip Code must be 5 digits. You have entered more than 5 digits.';
  } else if (/\D/.test(zipCode.value) === true) { //This checks if the zip code entered has any non-digit characters and updates the zip code hint accordingly.
    zipHint.textContent = 'Zip Code must be 5 digits. You have entered non-digit characters or spaces.';
  }
  if (/^\d{0,4}$/.test(zipCode.value) === true || /^\d{6,}$/.test(zipCode.value) === true || /\D/.test(zipCode.value) === true) {
    zipHint.style.display = 'block';
    zipCode.parentElement.classList.add('not-valid');
    zipCode.parentElement.classList.remove('valid');
    return false; //If any of the above conditions are met, the function adds the "not-valid" class to the activity registration element, shows the hint, and returns "false".
  } else {
    zipHint.style.display = 'none';
    zipCode.parentElement.classList.add('valid');
    zipCode.parentElement.classList.remove('not-valid'); //Else if the zip code is valid, the function adds the "valid" class and removes the "not-valid class", along with hiding the hint.
  }
}

/*
cvvValidator checks that the card CVV/security code is a 3 digit string.
If it's not a valid CVV/security code, the function shows the security/CVV hint.
If it's not a valid CVV/security code, the function adds the "not-valid" class to the parent element and returns "false".
Else if it's a valid CVV/security code, the function adds the "valid" class and removes the "not-valid class", along with hiding the hint.
*/
function cvvValidator() {
  if (/^\d{3}$/.test(cvv.value) === false) {
    cvvHint.style.display = 'block';
    cvv.parentElement.classList.add('not-valid');
    cvv.parentElement.classList.remove('valid');
    return false;
  } else {
    cvvHint.style.display = 'none';
    cvv.parentElement.classList.add('valid');
    cvv.parentElement.classList.remove('not-valid');
  }
}

/*
Adding event listeners for 'keyup' events in all the required text fields.
They call the related helper functions for each of the fields so validation can occur in real time for those fields.
*/
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

cvv.addEventListener ('keyup', () => {
  cvvValidator();
});

/*
Adding an event listener for submitting the form.
It calls all the helper functions.
If any of the helper functions return "false", it prevents the default behavior (form refresh).
There's a separate conditional for the payment field that will only run the credit card helper functions if a credit card is the selected payment type.
If any of the credit card helper functions return "false", they prevent the default behavior (form refresh).
*/
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
    cvvValidator();
    if (cardValidator() === false || zipValidator() === false || cvvValidator() === false) {
      event.preventDefault();
    }
  }
});