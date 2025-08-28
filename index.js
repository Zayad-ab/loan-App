function checkCredit() {
    let income = Number(document.getElementById("annualIncome").value)
    let balance = Number(document.getElementById("accountBalance").value);
    let loanAmount = Number(document.getElementById("loanAmount").value);
    let creditHistory = new Date (document.getElementById("creditHistory").value);
    let lastDeposit = new Date(document.getElementById("lastDeposit").value);
    let lastLoan = new Date(document.getElementById("lastLoan").value);
    let repaymentPeriod = new Date(document.getElementById("repaymentPeriod").value);
    let accountType = document.getElementById("accountType").value;

    let score = 0;

    let maxLoan = income * 0.45;
    if (loanAmount > maxLoan) {
    document.getElementById("result").innerHTML = 
        "Loan request exceeds 45% of annual income. NOT ELIGIBLE.";
    return;
    }

    score += (balance >= loanAmount) ? 10 : -10;

    let today = new Date();
    let oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);
    if (lastDeposit >= oneMonthAgo) score += 5;

    let sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 6);
    if (lastLoan <= sixMonthsAgo) score += 10;
    if (creditHistory <=sixMonthsAgo) score += 10;

    if (repaymentPeriod < 6) score += 5;

    score += (accountType === "current") ? 10 : 5;

    let resultText = `Score: ${score}. `;
    resultText += (score > 30) ? 
        "Loan Approved!" : 
        "Loan cannot be granted as your score is too low";

    document.getElementById("result").innerHTML = resultText;
    alert(resultText);
}

let button = document.getElementById("btn");
button.addEventlistener("click",checkCredit);