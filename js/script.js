const jobRole = document.getElementById('title');
const otherRole = document.getElementById('other-job-role');
const colorSelector = document.getElementById('color');
const shirtDesign = document.getElementById('design');

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
  let colorOptions = colorSelector.children;
  let selectedOption = event.target.value;
  for (let i = 0; i < colorOptions.length; i++ ) {
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