"use strict";

// Global variable required by the Excel page
let result;

// Run once the DOM is ready
document.addEventListener("DOMContentLoaded", function () {
    // THEME BUTTONS (both pages)
    const lightBtn = document.getElementById("light-theme-btn");
    const darkBtn = document.getElementById("dark-theme-btn");

    if (lightBtn && darkBtn) {
        lightBtn.addEventListener("click", function () {
            document.body.classList.add("theme-light");
            document.body.classList.remove("theme-dark");
        });

        darkBtn.addEventListener("click", function () {
            document.body.classList.add("theme-dark");
            document.body.classList.remove("theme-light");
        });
    }

    // MAIN FORM
    const mainForm = document.getElementById("main-form");
    if (!mainForm) return;

    // Detect which page it is based on specific elements
    if (document.getElementById("first-name")) {
        // index.html page (User form)
        mainForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent page reload
            userForm();
        });
    } else if (document.getElementById("numbers")) {
        // excel.html page
        const calcBtn = document.getElementById("calc-btn");
        if (calcBtn) {
            calcBtn.addEventListener("click", function (event) {
                event.preventDefault();
                myExcelFuns();
            });
        }
    }
});

/**
 * userForm()
 * Reads all fields from index.html form and prints
 * formatted output to the div#output.
 */
function userForm() {
    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();
    const city = document.getElementById("city").value.trim();
    const province = document.getElementById("province").value.trim();

    // Basic validation: ensure none of the required fields are empty
    if (!firstName || !lastName || !email || !address || !city || !province) {
        alert("Please fill in all fields before submitting the form.");
        return;
    }

    // Membership selection
    let membership = "Basic";
    if (document.getElementById("premium").checked) {
        membership = "Premium";
    } else if (document.getElementById("standard").checked) {
        membership = "Standard";
    }

    const fullName = firstName + " " + lastName;
    const outputDiv = document.getElementById("output");
    if (!outputDiv) return;

    // Use innerHTML to show formatted result
    outputDiv.innerHTML = `
        <h2>Submitted Information</h2>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Address:</strong> ${address}, ${city}, ${province}</p>
        <p><strong>Membership:</strong> ${membership}</p>
    `;
}

/**
 * myExcelFuns()
 * Reads numbers from excel.html, cleans them, converts to numeric array,
 * and applies AutoSum / Average / Max / Min, then prints the result.
 */
function myExcelFuns() {
    const numbersInput = document.getElementById("numbers");
    const outputDiv = document.getElementById("output");

    if (!numbersInput || !outputDiv) return;

    let numberStr = numbersInput.value;

    // Check if user entered anything
    if (!numberStr || numberStr.trim() === "") {
        alert("Please enter some numbers separated by spaces.");
        numbersInput.focus();
        return;
    }

    // Remove leading and trailing spaces
    numberStr = numberStr.trim();

    // Convert string to array using space as delimiter
    const tempArr = numberStr.split(" ");

    // Create final numeric array (no empty strings, only numbers)
    const finalNumericArray = [];

    for (let i = 0; i < tempArr.length; i++) {
        const item = tempArr[i].trim();

        if (item !== "") {
            const num = Number(item);
            if (!Number.isNaN(num)) {
                finalNumericArray.push(num);
            }
        }
    }

    // If no valid numbers found
    if (finalNumericArray.length === 0) {
        alert("No valid numeric values were found. Please check your input.");
        numbersInput.focus();
        return;
    }

    // Determine which Excel function is selected
    if (document.getElementById("sum").checked) {
        // AutoSum
        let total = 0;
        for (let i = 0; i < finalNumericArray.length; i++) {
            total += finalNumericArray[i];
        }
        result = total;
    } else if (document.getElementById("avg").checked) {
        // Average
        let total = 0;
        for (let i = 0; i < finalNumericArray.length; i++) {
            total += finalNumericArray[i];
        }
        result = total / finalNumericArray.length;
    } else if (document.getElementById("max").checked) {
        // Maximum
        result = Math.max(...finalNumericArray);
    } else {
        // Minimum (either "min" checked or fallback)
        result = Math.min(...finalNumericArray);
    }

    // Print result into the output div
    outputDiv.innerText = `Result: ${result}`;
}
