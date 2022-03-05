const container = document.querySelector('.container')
const headingSpan2 = document.querySelector('.heading-span-2')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')
const form = document.querySelector('.form')

// Clear the forms when switching between signup/signin
function clearForm() {
    document.querySelectorAll('.form-input-wrapper').forEach((item) => {
        item.className = 'form-input-wrapper'
    })
    form.reset()
}

// Event listeners for changing color of signup/signin-btns
document.querySelector('.signup-btn').addEventListener('click', () => {
    container.classList.add('change')
    // Change the text content when pressing sign-btns
    setTimeout(() => {
        headingSpan2.textContent = 'Up'
    }, 200)
    form.className = 'form sign-up'
    clearForm()
})

document.querySelector('.signin-btn').addEventListener('click', () => {
    container.classList.remove('change')
    setTimeout(() => {
        headingSpan2.textContent = 'In'
    }, 200)
    form.className = 'form sign-in'
    clearForm()
})

// Input error function
function error(input, message) {
    // Get access to inputWrapper element
    const inputWrapper = input.parentElement
    inputWrapper.className = 'form-input-wrapper error'
    inputWrapper.querySelector('.message').textContent = message
}

// Input success function
function success(input) {
    const inputWrapper = input.parentElement
    inputWrapper.className = 'form-input-wrapper succes'
}

// Checking the required fields of each input
function checkRequiredFields(inputArr) {
    inputArr.forEach((input) => {
        if(input.value.trim() === '') {
            if(input.id === 'password2') {
                error(input, 'Password confirmation is required')
            } else {
                // Showing error if the input is blank
                error(input, `${input.id} is required`)
            }
        } else {
            success(input)
        }
    })
}

// Checking length of each input
function checkLength(input, min, max) {
    if(input.value.length < min) {
        error(input, `${input.id} must be at least ${min} chacarcters`)
    } else if(input.value.length > max) {
        error(input, `${input.id} must be less than ${max} chacarcters`)
    } else {
        success(input)
    }
}

// Checking the match of the passwords
function passwordsMatch(input1, input2) {
    if(input1.value !== input2.value) {
        error(input2, 'Passwords do not match')
    }
}

// Checking validity of Email
function checkEmail(input) {
    const regEx =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if(regEx.test(input.value.trim())) {
        success(input)
    } else {
        error(input, 'Email is not valid')
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    // Prevent having error message on both sign forms
    if(form.classList[1] === 'sign-up') {
        checkRequiredFields([username, email, password, password2])
        checkLength(username, 2, 15)
        checkLength(password, 5, 25)
        passwordsMatch(password, password2)
    } else {
        checkRequiredFields([email, password])
    }
    checkEmail(email)
})