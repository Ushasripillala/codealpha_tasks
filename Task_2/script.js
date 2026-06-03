const display = document.getElementById('display');

// Appends values onto the active equation string
function appendValue(val) {
    if (display.value === '0' && val !== '.') {
        display.value = val;
    } else {
        display.value += val;
    }
}

// Clears the entire workspace screen (AC)
function clearDisplay() {
    display.value = '0';
}

// Removes the singular final entry character (DEL)
function deleteLast() {
    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
    } else {
        display.value = '0';
    }
}

// Evaluates the mathematical string securely
function calculateResult() {
    try {
        let computation = display.value;
        
        // Handles division by zero safely
        if (computation.includes('/0')) {
            display.value = "Error";
            return;
        }

        // Resolves equation evaluation string safely
        let finalOutput = eval(computation);
        
        // Restricts floating point precision bloat
        display.value = Number(finalOutput.toFixed(8)).toString();
    } catch (error) {
        display.value = 'Error';
    }
}

// Key Mapping Integration for Keyboard Support (Bonus Requirement)
document.addEventListener('keydown', (event) => {
    const validCharacters = /[0-9\+\-\*\/\.\%]/;
    
    if (validCharacters.test(event.key)) {
        appendValue(event.key);
    } else if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault(); // Prevents page reload trigger
        calculateResult();
    } else if (event.key === 'Backspace') {
        deleteLast();
    } else if (event.key === 'Escape') {
        clearDisplay();
    }
});