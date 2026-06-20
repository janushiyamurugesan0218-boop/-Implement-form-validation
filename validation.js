document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registration-form');
    const successToast = document.getElementById('success-toast');

    // DOM Target Input Pointers
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Helper visibility engine class modifiers
    const setValidationPassed = (inputElement, parentContainer) => {
        parentContainer.classList.remove('invalid-state');
        parentContainer.classList.add('valid-state');
    };

    const setValidationFailed = (inputElement, parentContainer) => {
        parentContainer.classList.remove('valid-state');
        parentContainer.classList.add('invalid-state');
    };

    // 1. Validation Logic Operations Block
    const validateUsername = () => {
        const value = usernameInput.value.trim();
        const container = document.getElementById('username-container');
        if (value.length >= 4) {
            setValidationPassed(usernameInput, container);
            return true;
        } else {
            setValidationFailed(usernameInput, container);
            return false;
        }
    };

    const validateEmail = () => {
        const value = emailInput.value.trim();
        const container = document.getElementById('email-container');
        // Comprehensive regular expression tracking valid structural criteria
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailPattern.test(value)) {
            setValidationPassed(emailInput, container);
            return true;
        } else {
            setValidationFailed(emailInput, container);
            return false;
        }
    };

    const validatePassword = () => {
        const value = passwordInput.value.trim();
        const container = document.getElementById('password-container');
        if (value.length >= 6) {
            setValidationPassed(passwordInput, container);
            return true;
        } else {
            setValidationFailed(passwordInput, container);
            return false;
        }
    };

    // 2. Attach Input Event Listeners for real-time validation feedback while typing
    usernameInput.addEventListener('input', validateUsername);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);

    // 3. Intercept form submission cycle
    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Run validation evaluations explicitly upon submission attempt
        const isUsernameValid = validateUsername();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();

        // Evaluate overall structure completeness state flags
        if (isUsernameValid && isEmailValid && isPasswordValid) {
            console.log("Validation Clear! Data payload ready for transit:", {
                username: usernameInput.value.trim(),
                email: emailInput.value.trim(),
                password: passwordInput.value.trim() // Cleartext logging is strictly for debug demo visualization
            });

            // Fire success banner indicator visibility states
            successToast.style.display = 'block';
            registrationForm.reset();

            // Clear green validation success outlines from fields after resetting
            document.querySelectorAll('.form-control-group').forEach(group => {
                group.classList.remove('valid-state');
            });

            // Dismiss the toast banner notification interface after brief delay
            setTimeout(() => {
                successToast.style.display = 'none';
            }, 4000);
        }
    });
});