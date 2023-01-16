const optionBox = document.querySelectorAll('.option-box')
optionBox.forEach(opt => opt.addEventListener('click', () => {
    opt.style.color = '#7aefd8'
    opt.textContent = 'X'
}))