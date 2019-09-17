/**
 * Copyright © 2019 Mudit Singh
 * Contact : manu.latest@gmail.com
 * 
 * All rights reserved. No part of this code may be reproduced, distributed,or
 * transmitted in any form or by any means, including photocopying, recording,
 * or other electronic or mechanical methods, without the prior written permission
 * of the owner, except in the case of brief quotations embodied in critical reviews
 * and certain other noncommercial uses permitted by copyright law.
 */

/**
 * This file is a javascript driver for a simple 4 function calculator. The +/= button works as toggle
 * functionality when an operand is already on the screen and + button is pressed, it 
 * subsequently changes to "=" operator. 
 */

/**
 * How/What is working : 
 * 1. Calculator will perform arithmetic operation between operands after pressing the +/= key.
 * 2. You need to ensure that the "+/=" button is pressed to get a result and only then move.
 * 3. For Example : 7 + 1 - 6 * 2 / 2
 *    How this calculate expression would work with this calculator:
 *      Step 01: Press 7
 *      Step 02: Press +/=
 *      Step 03: Press 1
 *      Step 04: Press +/=
 *      Step 05: Press -
 *      Step 06: Press 6
 *      Step 07: Press +/=
 *      Step 08: Press *
 *      Step 09: Press 2
 *      Step 10: Press +/=
 *      Step 11: Press /
 *      Step 12: 2
 *      Step 13: Press +/=
 * 
 * What would not work:
 * Literal chaining of operand and operation like this
 * example: a+b-c*d without pressing an equals sign would not work.
 */
"use strict";
(function () {
    window.onload = function () {
        var currentNumber = ""; // initializing with empty values.
        var previousNumber = ""; // initializing with empty values.
        var resultNumber;
        var operator;
        var resultDisplayedPreviously = false; // flag for checking if the result was displayed immediately before.
        var changeToEqual = false; // toggle flag for +/= operators.

        // Function to set the number in display and current number variable.
        var setNumber = function () {
            var currentDisplayNumber = document.getElementById("numberDisplayScreen").innerHTML;
            // To handle not adding multiple decimals in the current number/display
            if (this.innerHTML == "." && currentDisplayNumber.includes(".")) {
            }
            else {
                if (resultDisplayedPreviously == true) {
                    currentNumber += this.innerHTML;
                    resultDisplayedPreviously = false;
                } else {
                    currentNumber += this.innerHTML;
                }

                document.getElementById("numberDisplayScreen").innerHTML = currentNumber;
            }
        };

        // Function to mark the operator for operation.
        var operatorAction = function () {
            // Verifying if + was not pressed in current state. If not then the next press of
            // +/= button will set the operator to + and toggle the flag to now accept =.
            if (!changeToEqual) {
                previousNumber = currentNumber;
                currentNumber = "";
                if (this.innerHTML == "+/=") {
                    operator = "+";
                } else {
                    operator = this.innerHTML;
                }
                changeToEqual = true;
            }
            else {
                displayResult();
            }
        };

        // Function to display the result of operation
        var displayResult = function () {
            previousNumber = parseFloat(previousNumber);
            currentNumber = parseFloat(currentNumber);

            switch (operator) {
                case "+":
                    resultNumber = previousNumber + currentNumber;
                    break;

                case "-":
                    resultNumber = previousNumber - currentNumber;
                    break;

                case "X":
                    resultNumber = previousNumber * currentNumber;
                    break;

                case "/":
                    resultNumber = previousNumber / currentNumber;
                    break;
            }

            //Display the result in view area
            document.getElementById("numberDisplayScreen").innerHTML = resultNumber;
            previousNumber = 0;
            currentNumber = resultNumber;
            resultDisplayedPreviously = true;
            changeToEqual = false;
        };

        // Function to clear all the values and display to bring them to default.
        var clearAll = function () {
            previousNumber = "";
            currentNumber = "";
            operator = "";
            changeToEqual = false;
            resultDisplayedPreviously = false;
            document.getElementById("numberDisplayScreen").innerHTML = "0";
        };

        // Attribution : This method of building the elements of the DOM and assigning the
        //               event listener using an array was shown in CS5610 class.
        // Getting the list of keypad numbers and associating click events with them.
        for (var i = 0, l = document.getElementsByClassName("number").length; i < l; i++) {
            document.querySelectorAll(".number")[i].addEventListener("click", setNumber);
        }

        // Attribution : This method of building the elements of the DOM and assigning the
        //               event listener using an array was shown in CS5610 class.
        // Getting the list of operator and associating click events with them.
        for (var i = 0, l = document.querySelectorAll(".operator").length; i < l; i++) {
            document.querySelectorAll(".operator")[i].addEventListener("click", operatorAction);
        }

        // Clear All Button on mouse click
        document.getElementById("clear").addEventListener("click", clearAll);
    }
}());
