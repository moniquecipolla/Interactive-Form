const jobRole = document.getElementById('title');
const otherRole = document.getElementById('other-job-role');

document.getElementById('name').focus();

otherRole.style.display = 'none';

jobRole.addEventListener('change', event => {
  if (jobRole.options[jobRole.selectedIndex].value === 'other') {
    otherRole.style.display = 'block';
  } else {
      otherRole.style.display = 'none';
  }
});

