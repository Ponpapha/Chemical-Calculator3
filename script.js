document.addEventListener('DOMContentLoaded', () => {
    // 1. Get DOM elements
    const massInput = document.getElementById('mass');
    const molarMassInput = document.getElementById('molar-mass');
    const calculateBtn = document.getElementById('calculate-btn');
    const molesOutput = document.getElementById('moles-output');
    const periodicTableGrid = document.getElementById('periodic-table-grid');
    const resetMWBtn = document.getElementById('reset-mw-btn'); // New Reset Button

    // **Accumulator Variable**
    let accumulatedMolarMass = 0;

    // --- Core Calculation Function (Simplified) ---
    function calculateMoles() {
        const mass = parseFloat(massInput.value);
        const molarMass = parseFloat(molarMassInput.value);

        if (isNaN(mass) || isNaN(molarMass) || molarMass <= 0) {
            molesOutput.textContent = 'Invalid Input (Check Mass/M.W.)';
            return;
        }

        const moles = mass / molarMass;
        molesOutput.textContent = `${moles.toFixed(4)} mol`;
    }

    // --- Periodic Table Interaction (Modified) ---
    function renderPeriodicTable() {
        periodicTableGrid.innerHTML = ''; // Clear previous content

        elementsData.forEach(element => {
            const btn = document.createElement('button');
            btn.className = `element ${element.group}`;
            btn.dataset.symbol = element.symbol;
            btn.dataset.molarMass = element.molarMass;
            btn.dataset.atomicNumber = element.atomicNumber;

            btn.style.gridRow = element.grid.row;
            btn.style.gridColumn = element.grid.col;

            btn.innerHTML = `${element.symbol}<br/><span>${element.molarMass.toFixed(3)}</span>`;

            // *** THE CLICK LOGIC ***
            btn.addEventListener('click', () => {
                // 1. Add this element's Molar Mass to the accumulator
                accumulatedMolarMass += element.molarMass;
                
                // 2. Update the Molar Mass input field
                molarMassInput.value = accumulatedMolarMass.toFixed(3);
                
                // Optional: Recalculate moles immediately if mass is present
                if (massInput.value) {
                    calculateMoles();
                }
            });
            // ************************

            periodicTableGrid.appendChild(btn);
        });
    }

    // --- Event Listeners ---
    calculateBtn.addEventListener('click', calculateMoles);
    
    // Reset M.W. button handler
    resetMWBtn.addEventListener('click', () => {
        accumulatedMolarMass = 0;
        molarMassInput.value = '';
        molesOutput.textContent = '0.00 mol';
    });

    // Initialize the periodic table
    renderPeriodicTable();
});