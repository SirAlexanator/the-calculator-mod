Code Documentation
==================

Project: Rome II Unit Calculator  
Author: Alexander Redinger  
Date: 10-31-25 
Languages: HTML / CSS / JavaScript  

------------------------------------------------------------
1. Objective
------------------------------------------------------------
This document provides a high-level overview of the code structure and interaction between the three main layers of the Rome II Unit Calculator web application. It focuses on architectural design, functional purpose, and inter-module communication rather than specific implementation details. The goal is to assist future developers or maintainers in understanding how each component contributes to the overall behavior of the calculator.

------------------------------------------------------------
2. Project Overview
------------------------------------------------------------
The Rome II Unit Calculator is a browser-based tool designed to simulate and calculate unit costs, statistics, and composition limits for custom factions within the mod. It allows users to enter and adjust unit parameters, validate configurations, and view point totals dynamically. The project is developed entirely using client-side technologies (HTML, CSS, and JavaScript) to maximize accessibility and performance without requiring a backend server.

Key features include:
- Editable, scrollable, and fixed-column tables for unit customization.  
- Dynamic calculation of point usage and validation feedback.  
- Integration of static reference datasets for animals, mounts, chariots, and artillery.  
- Responsive and thematically consistent UI design inspired by the game’s aesthetic.  

------------------------------------------------------------
3. System Architecture
------------------------------------------------------------
The calculator is structured into three functional layers:

### a. HTML – Structural Layer
Defines the application’s layout, data table, and interactive elements.  
Key elements include:
- **Header & Navigation:** Contain the site title, navigation buttons, and dropdown menus for developer and info sections.  
- **Main Section:** Holds dynamic content cards, including the calculator and reference tables.  
- **Table (`#the-calc`):** Central feature where each row represents a unit entry. Cells are editable for attributes like morale, armor, attack, and equipment.

HTML also includes wrapper divs (e.g., `.table-wrapper`) for scroll control and responsive scaling, as well as placeholders for dynamically updated totals such as “Points Usage 0/34.”

### b. CSS – Presentation Layer
Responsible for the overall look and feel, consistent theming, and responsive structure.  
Key responsibilities include:
- Color scheme: Earthy tones (#4b3621, #8b6b45) to evoke a Roman military aesthetic.  
- Typography: Clean and readable using the *Inter* and *Source Sans Pro* fonts.  
- Layout control: `.card`, `.container`, and `.navbar` classes provide modular visual blocks.  
- Table styling: Borders, hover effects, and zebra striping for readability.  
- Sticky columns: CSS ensures the first three table columns remain fixed during horizontal scroll.  
- User experience: Dropdown navigation menus, responsive padding, and soft shadows to maintain modern design standards.

### c. JavaScript – Logic Layer
Implements all functional interactivity and calculations:
- **Calculation Engine:** Dynamically computes point totals, cost adjustments, and validation conditions.  
- **DOM Interaction:** Updates cell data, totals, and error indicators in real-time.  
- **Data Integration:** Pulls values from structured lookup tables (e.g., animals, shields, artillery).  
- **Event Handling:** Detects user edits, recalculates totals, and updates display states accordingly.  
- **View Control:** Manages navigation between “Developer” and “Info” sections and mode toggling for table editing.

The JavaScript file also defines multiple helper functions that calculate derived statistics and enforce the mod’s point limits and roster constraints.

------------------------------------------------------------
4. Data Handling
------------------------------------------------------------
The calculator operates entirely on client-side data structures stored as:
- Inline JavaScript objects or arrays.  
- JSON-style reference tables defining equipment or unit properties.  
- Editable DOM fields that temporarily hold user input.

No server-side storage is implemented.  
Data persistence can be optionally extended using browser `localStorage` if future functionality requires saving roster configurations.

------------------------------------------------------------
5. Component Interaction
------------------------------------------------------------
- **User Input → JavaScript Functions:**  
  When a user edits a cell, an event listener triggers a recalculation function that validates and updates totals.  

- **JavaScript → DOM:**  
  Functions directly manipulate the DOM using `document.getElementById()` and `innerText` to render updated point values, highlighting invalid entries as needed.

- **CSS → UI Feedback:**  
  Visual feedback (such as color changes) reinforces interaction cues and data states.

------------------------------------------------------------
6. Error Handling and Validation
------------------------------------------------------------
The JavaScript layer includes built-in validation for:
- Non-numeric input in numeric fields (e.g., morale or armor).  
- Unit cap violations or invalid equipment combinations.  
- Calculation errors handled through conditional checks rather than exception-heavy logic.

Where applicable, the interface displays error text or disables invalid combinations to maintain data integrity.

------------------------------------------------------------
7. Extensibility
------------------------------------------------------------
The codebase is modular enough to support additional features such as:
- Exporting results to `.csv` or `.json` format.  
- Implementing additional lookup categories (e.g., vehicles or siege towers).  
- Adding faction presets with preloaded tables.  
- Introducing real-time comparison or balancing analytics.

------------------------------------------------------------
8. Maintenance and Version Control
------------------------------------------------------------
The project should be versioned using Git.  
Recommended file organization:
