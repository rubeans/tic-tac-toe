const optionBox = document.querySelectorAll('.option-box')
optionBox.forEach(opt => opt.addEventListener('click', () => {
    opt.textContent = 'X'
}))