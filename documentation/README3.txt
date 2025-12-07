Integration Testing Documentation
=================================

Project: Rome II Unit Calculator  
Author: Alexander Redinger  
Languages: HTML / CSS / JavaScript  

------------------------------------------------------------
1. Objective
------------------------------------------------------------
The purpose of integration testing is to validate that the interconnected front-end components of the Rome II Unit Calculator—HTML structure, CSS styling, and JavaScript logic—function together seamlessly. Testing focuses on user interactions, data propagation between layers, and the accuracy of real-time updates to the calculator’s interface.

------------------------------------------------------------
2. Scope
------------------------------------------------------------
Integration testing applies to all modules that rely on DOM manipulation and user-driven events. This includes:

- The **HTML table interface** where users input and edit unit data.
- The **JavaScript logic layer** that calculates total points, validates inputs, and updates DOM elements.
- The **CSS layout and scroll system**, including sticky columns, alternating row colors, and responsive alignment.

The integration layer ensures:
1. Data entered by the user is correctly reflected in JavaScript calculations.  
2. Visual updates (such as totals or validation warnings) render properly.  
3. Table behavior remains consistent across browsers when scrolling or copying data.  

------------------------------------------------------------
3. Testing Environment
------------------------------------------------------------
- **Platform:** Windows 10 / 11  
- **Browsers:** Google Chrome (v125+), Mozilla Firefox (v127+), Microsoft Edge (v124+)  
- **Tools:** Browser DevTools (DOM Inspector, Console, Performance Monitor)  
- **Testing Mode:** Manual interaction and live-edit validation  

------------------------------------------------------------
4. Integration Strategy
------------------------------------------------------------
A **bottom-up approach** was used:
1. Validate JavaScript calculation logic independently.  
2. Integrate logic with editable HTML table fields (`contenteditable` cells).  
3. Test CSS constraints—sticky columns, table scrolling, and resizing.  
4. Observe synchronization between user actions and display updates.  

------------------------------------------------------------
5. Key Integration Points
------------------------------------------------------------
- **HTML ↔ JavaScript:**  
  Input in any editable cell triggers real-time recalculation and DOM updates for total point usage.  
- **CSS ↔ HTML:**  
  Sticky columns and scrolling wrappers maintain structural integrity during horizontal and vertical scrolling.  
- **User Interaction ↔ System Feedback:**  
  Copying, selecting, or editing within the table behaves consistently, with proper text selection limited to editable fields.

------------------------------------------------------------
6. Test Scenarios
------------------------------------------------------------

| Test ID | Modules Tested | Description | Expected Result | Status |
|----------|----------------|-------------|-----------------|---------|
| IT-01 | HTML ↔ JS | Edit numeric cell (Morale/Armor) | Updates total points immediately | Pass |
| IT-02 | JS ↔ DOM | Delete or clear cell | Value resets and recalculates totals | Pass |
| IT-03 | HTML ↔ CSS | Scroll table horizontally | First 3 columns remain visible | Pass |
| IT-04 | User Input ↔ JS | Invalid input (non-numeric) | Error prevented, cell clears | Pass |
| IT-05 | Table Layout | Resize window | Table maintains alignment and scroll responsiveness | Pass |
| IT-06 | Selection Logic | Drag-select cells | Only editable fields are highlighted | Pass |
| IT-07 | Navigation JS | Switch between Info/Dev tabs | Proper section visibility toggles | Pass |

------------------------------------------------------------
7. Results and Findings
------------------------------------------------------------
Integration testing confirmed proper synchronization between structure, style, and logic.  
All tested browsers displayed consistent behavior for scrolling, cell editing, and updates.  
Minor layout expansion occurred in edit mode due to padding and content wrapping; mitigated by fixed-height adjustments in CSS.

The system maintained reliable event-driven updates without requiring page reloads or user confirmation dialogs.  

------------------------------------------------------------
8. Conclusion
------------------------------------------------------------
All integrated layers of the Rome II Unit Calculator function cohesively. The user interface reliably updates in response to inputs, maintaining smooth interactivity and consistent appearance. Cross-browser compatibility and scroll performance meet expectations. The project is confirmed ready for user validation and long-term maintainability testing.
