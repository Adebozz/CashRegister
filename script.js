const price = 19.5;  // Item price
let cid = [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
];

const currencyUnit = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
};

document.getElementById("purchase-btn").addEventListener("click", () => {
    let cashGiven = parseFloat(document.getElementById("cash").value);
    let changeDue = cashGiven - price;
    let totalCID = cid.reduce((sum, curr) => sum + curr[1], 0).toFixed(2);
    let changeArr = [];

    // Handle insufficient funds
    if (cashGiven < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
    }

    // Exact payment case
    if (cashGiven === price) {
        document.getElementById("change-due").textContent = "No change due - customer paid with exact cash";
        return;
    }

    // Check if we have enough cash to give change
    if (parseFloat(totalCID) < changeDue) {
        document.getElementById("change-due").textContent = "Status: INSUFFICIENT_FUNDS";
        return;
    }

    // Try to return change with available denominations
    for (let i = cid.length - 1; i >= 0; i--) {
        let [unit, amountAvailable] = cid[i];
        let unitValue = currencyUnit[unit];
        let amountToReturn = 0;

        while (changeDue >= unitValue && amountAvailable > 0) {
            changeDue -= unitValue;
            changeDue = Math.round(changeDue * 100) / 100;
            amountAvailable -= unitValue;
            amountToReturn += unitValue;
        }

        if (amountToReturn > 0) {
            changeArr.push([unit, amountToReturn]);
        }
    }

    // If we cannot give exact change, return insufficient funds
    if (changeDue > 0) {
        document.getElementById("change-due").textContent = "Status: INSUFFICIENT_FUNDS";
        return;
    }

    // If change equals total CID, return CLOSED status
    if (parseFloat(totalCID) === cashGiven - price) {
        document.getElementById("change-due").textContent = `Status: CLOSED ${changeArr.map(c => `${c[0]}: $${c[1]}`).join(" ")}`;
        return;
    }

    // Return OPEN status with change breakdown
    document.getElementById("change-due").textContent = `Status: OPEN ${changeArr.map(c => `${c[0]}: $${c[1]}`).join(" ")}`;
});
