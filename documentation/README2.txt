Unit Testing Documentation
==========================

Project: Rome II Unit Calculator  
Author: Alexander Redinger  
Languages: HTML / CSS / JavaScript  

------------------------------------------------------------
1. Objective
------------------------------------------------------------
The purpose of unit testing in the Rome II Unit Calculator is to validate 
the correctness of core JavaScript functions that handle calculations, input validation, 
and dynamic table updates. Unit testing ensures that each function performs as intended, 
independent of other components.

------------------------------------------------------------
2. Scope
------------------------------------------------------------
Unit testing focuses on the following modules and functions:

- Input handling and data validation functions
- Calculation logic (e.g., total points usage, morale computation)
- Dynamic DOM manipulation (row creation, deletion, and updating)
- Event handling for editable table cells
- Utility functions such as reset or value normalization
- DOM related function are directly event friven, need testing in a browser
------------------------------------------------------------
3. Testing Environment
------------------------------------------------------------
- Platform: Google Chrome / Microsoft Edge  
- Language: JavaScript (ES6)  
- Framework: Manual testing and console-based assertions  
- Tools: Browser Developer Tools (Console, DOM Inspector)

------------------------------------------------------------
4. Testing Methodology
------------------------------------------------------------
Each function is tested in isolation by:
- Providing controlled sample input data.
- Observing the returned output or DOM changes.
- Comparing the output to expected results.
- Using `console.assert()` or manual DOM verification.

------------------------------------------------------------
5. Sample Test Cases
------------------------------------------------------------

| Test Case ID | Function | Input | Expected Output | Result |
|---------------|-----------|--------|------------------|--------|
| UT-01 | calcMorale() | {base: 50, modifier: +10} | 60 | Pass |
| UT-02 | updatePoints() | 15 units × 2 pts | 30/34 | Pass |
| UT-03 | resetTable() | N/A | Table cleared | Pass |
| UT-04 | validateInput() | “abc” in numeric field | Error flagged | Pass |
| UT-05 | calculateAmmoCost() | 15 ammo × 25 price | 375 | Pass |

------------------------------------------------------------
6. Results and Findings
------------------------------------------------------------
All primary computational and DOM manipulation functions performed as expected. Minor issues were observed when editing multiple contenteditable cells simultaneously; these were mitigated by adjusting event delegation and CSS behavior.

------------------------------------------------------------
7. Conclusion
------------------------------------------------------------
The unit testing phase confirmed the stability and correctness of all essential front-end logic in the Unit Calculator. The functions responsible for table management and data calculations operate reliably under normal conditions, providing a solid base for integration testing and deployment.
