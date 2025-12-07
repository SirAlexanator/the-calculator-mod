Data Collection Documentation
==============================

Project: Rome II Unit Calculator  
Author: Alexander Redinger  
Languages: HTML / CSS / JavaScript  

------------------------------------------------------------
1. Objective
------------------------------------------------------------
The objective of this document is to describe the methods, structure, and procedures used for data collection within the Rome II Unit Calculator. This documentation ensures that all numerical and reference data used in calculations—such as unit attributes, point values, and cost factors—are accurately gathered, verified, and consistently formatted for use in the application.

------------------------------------------------------------
2. Data Purpose
------------------------------------------------------------
Collected data supports three main functional areas:
1. **Calculation Engine** – Uses lookup values to compute total cost, unit balance, and point usage.  
2. **User Interface** – Dynamically populates dropdowns, tables, and summaries with unit and attribute data.  
3. **Validation System** – Confirms user-entered data aligns with predefined limits or lookup tables.

------------------------------------------------------------
3. Data Sources
------------------------------------------------------------
All data originates from curated reference material and internal balancing systems developed for the mod. No external APIs are used. Primary data sources include:

- **Unit Reference Tables:** Contain unit types, armor, morale, attack, and defense statistics.  
- **Lookup Tables:** Map unit names to their respective point costs, man counts, and special modifiers.  
- **Equipment Lists:** Define relationships between weapons, shields, mounts, animals, artillery, and chariots.  
- **Static JSON Datasets:** Contain structured data loaded or referenced during runtime.

------------------------------------------------------------
4. Data Types Collected
------------------------------------------------------------
| Data Type | Description | Format | Example |
|------------|--------------|---------|----------|
| Unit Attributes | Core combat and morale data | Numeric / String | `{"Melee Attack": 45, "Morale": 60}` |
| Equipment Modifiers | Bonuses from shields, mounts, and weapons | Numeric | `{"Shield Armor": 25}` |
| Entity Data | Elephants, dogs, artillery, chariots, etc. | JSON Objects | `{"Animal": "boar", "HP": 30}` |
| Cost Data | Points, ammo cost, and price per unit | Numeric | `{"Price": 80}` |

------------------------------------------------------------
5. Data Collection Methods
------------------------------------------------------------
Data is collected and maintained through a combination of:
1. **Manual Entry** – JSON tables are constructed manually based on reference stats.  
2. **Verification Scripts** – JavaScript functions validate consistency between fields (e.g., ensuring cost aligns with class).  
3. **Automated Lookups** – The calculator uses `VLOOKUP`-style JavaScript logic to retrieve stats from lookup tables.  
4. **User Input** – Editable table cells allow for temporary user-driven data entry and testing.  

------------------------------------------------------------
6. Data Validation and Cleaning
------------------------------------------------------------
To ensure integrity:
- All JSON objects are verified using validation tools before integration.  
- Outlier detection is performed on numerical fields (e.g., unrealistic HP or price values).  
- Reference tables undergo internal audits during balance updates.  
- JavaScript automatically prevents invalid data entries in numeric fields (e.g., text in "Morale" columns).  

------------------------------------------------------------
7. Data Storage and Access
------------------------------------------------------------
Data is currently stored in JSON format and accessed through JavaScript via:
- Local arrays and lookup maps.  
- Inline JSON objects embedded in `.js` files.  
- Optional localStorage saving for session persistence.  

Access control is handled through the browser environment; users cannot alter static reference tables during runtime, ensuring data consistency across sessions.

------------------------------------------------------------
8. Data Usage
------------------------------------------------------------
Collected data feeds directly into:
- **Calculation Functions:** Compute point costs, totals, and validations.  
- **Dynamic Tables:** Populate the editable user interface for each unit row.  
- **Analysis Tools:** Display visual summaries and unit totals for balancing.

------------------------------------------------------------
9. Maintenance and Version Control
------------------------------------------------------------
Data files are maintained alongside the main project using version control. Updates to JSON tables are tagged and documented to ensure compatibility with dependent JavaScript functions. All revisions follow structured change logs indicating the reason and nature of each data update.

------------------------------------------------------------
10. Conclusion
------------------------------------------------------------
The data collection process ensures accuracy, consistency, and reproducibility for all calculations in the Rome II Unit Calculator. By maintaining clean, validated JSON datasets and enforcing strict input controls, the system provides reliable and verifiable results, forming the backbone of balance and roster generation in the project.
