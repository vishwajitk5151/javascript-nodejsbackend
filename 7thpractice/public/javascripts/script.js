const dropdownButton = document.getElementById('dropdownButton');
const dropdownMenu = document.getElementById('dropdownMenu');
const form = document.querySelector('.form'); // Select the form div

dropdownButton.addEventListener('click', () => {
    dropdownMenu.classList.toggle('hidden');

    // Adjust the form position based on the dropdown's visibility
    if (!dropdownMenu.classList.contains('hidden')) {
        form.classList.add('mt-20'); // Add margin when dropdown is visible
    } else {
        form.classList.remove('mt-20'); // Remove margin when dropdown is hidden
    }
});

// Close the dropdown if clicked outside
document.addEventListener('click', (e) => {
    if (!dropdownButton.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.add('hidden');
        form.classList.remove('mt-20'); // Remove margin if dropdown is closed by clicking outside
    }
});
