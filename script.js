let price = 19.5;
let cid = [
    ["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1],
    ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55],
    ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]
];

const currencyUnit = { "PENNY": 0.01, "NICKEL": 0.05, "DIME": 0.1, "QUARTER": 0.25,
                       "ONE": 1, "FIVE": 5, "TEN": 10, "TWENTY": 20, "ONE HUNDRED": 100 };

document.getElementById("purchase-btn").addEventListener("click", function() {
    let cash = parseFloat(document.getElementById("cash").value);
    let changeDue = cash - price;
    if (cash < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
    }
    if (cash === price) {
        document.getElementById("change-due").innerText = "No change due - customer paid with exact cash";
        return;
    }
    let totalCid = cid.reduce((sum, item) => sum + item[1], 0).toFixed(2);
    if (totalCid < changeDue) {
        document.getElementById("change-due").innerText = "Status: INSUFFICIENT_FUNDS";
        return;
    }
    let changeArray = [];
    let tempCid = [...cid].reverse();
    for (let [unit, amount] of tempCid) {
        let unitValue = currencyUnit[unit];
        let amountToReturn = 0;
        while (changeDue >= unitValue && amount > 0) {
            changeDue -= unitValue;
            changeDue = Math.round(changeDue * 100) / 100;
            amount -= unitValue;
            amountToReturn += unitValue;
        }
        if (amountToReturn > 0) changeArray.push([unit, amountToReturn]);
    }
    if (changeDue > 0) {
        document.getElementById("change-due").innerText = "Status: INSUFFICIENT_FUNDS";
        return;
    }
    if (totalCid == cash - price) {
        document.getElementById("change-due").innerText = `Status: CLOSED ${changeArray.map(c => `${c[0]}: $${c[1]}`).join(" ")}`;
    } else {
        document.getElementById("change-due").innerText = `Status: OPEN ${changeArray.map(c => `${c[0]}: $${c[1]}`).join(" ")}`;
    }
});