Project Title: The Calculator Mod
Team D
Description:
The Calculator Mod is a browser-based tool that allows users to create, modify, and export units with custom statistics. The application calculates unit points, prices, and attributes based on user inputs. Additional developer tools allow exploration of weapons, shields, mounts, and more. The application runs entirely in the browser and uses Clerk for optional authentication.


1. FILE LIST AND DESCRIPTIONS
index.html - Main HTML file that loads the application UI. Contains navigation, tables, and layout for the Faction Manager, Unit Manager, Developer tools, and Information tabs.


scripts.js- Primary JavaScript logic for the application. Handles:
    UI interactions
    Event listeners
    Dynamic creation of rows and unit tables
    Exporting/importing JSON
    CSV export
    Price and point calculations
    Developer and Faction navigation logic


styles.css- Main stylesheet used to style the application layout, tables, navigation, dropdowns, and buttons.
entity-details.json- JSON data containing entity-related information used in the application.
shields-details.json- List of shield types and their properties, used for dropdown selections.
melee-weapons.json- List of melee weapons and their stats for weapon selection and calculation.
missile-weapons.json- List of ranged weapons and their stats for calculation and dropdown options.
logic/ -
  Contains modular JavaScript logic files (if included in final version). Used during development for structured functions.
  
test/ - 
  Contains Jest test files for functions such as calcPrice(), updatePrice(), and vlookup().
   Note: These files are used only in development and are not needed to run the website.
README.txt  - 
This file. Contains instructions on how to run the software and a description of every file.
package.json / package-lock.json


NodeJS development files for running Jest tests. -  
 Not required to run the browser version of the application.


2. HOW TO RUN THE SOFTWARE
This project is browser-based and does not require compilation.
 There is no runnable executable file—everything runs directly in a browser.
Steps to Run:
Option 1: Local File Run
Download all project files into the same folder.




Make sure the folder contains at a minimum:


    
    index.html
    scripts.js
    styles.css
    *.json data files
    Double-click index.html.


The application will open in your default web browser.
No compilation, installation, or server setup is required.


Option 2: Running on W3Schools Spaces


Open a new tab in your browser of choice and open https://the-calculator-mod1.w3spaces.com/




3. AUTHENTICATION INFORMATION
The app uses Clerk for optional authentication.
Example Test Account
Email: test@example.com
 Password: password123
Note: The app still works without signing in—authentication affects UI visibility only.


4. RUNNING THE APPLICATION & INPUT PARAMETERS
All interactions are done through the UI.
 No command-line arguments are required.
Allowed Inputs:
The unit table accepts:




    Parameter       Allowed Values      Description




    Name            String               Unit name
    
    Man Count       Integer ≥ 1        Number of soldiers
    Morale          Integer ≥ 0        Morale rating
    Charge Bonus    Integer ≥ 0        Charge value
    Melee Attack    Integer ≥ 0        Attack stat
    Melee Defense   Integer ≥ 0        Defense stat
    Armor           Integer ≥ 0        Armor rating
    HP              Integer ≥ 0         Hit points
    Ammo            Integer ≥ 0          Ammunition
    Accuracy        Integer ≥ 0        Accuracy rating
    Melee Weapon    Dropdown        Weapon name from melee-weapons.json
    Missile Weapon  Dropdown       Weapon from missile-weapons.json
    Shield          Dropdown        Shield from shields-details.json
    Mount           Dropdown        Mount/animal/chariot options
    Animals/Artillery Count
    Integer ≥ 0
     Number of artillery/animals




5. FEATURES THAT REQUIRE USER INPUT
    Export Units → generates a JSON file
    Import Units → selects a file through fileInput
    Submit Faction (CSV Export) → outputs the current faction to CSV
    Switch Modes → toggle select mode vs normal mode




6. TESTING INFORMATION
If testing with Jest:
How to run tests (development only):
Install Node.js




Run:


npm install
npm test


Tests are located under /test/.
This is not required for running the actual application