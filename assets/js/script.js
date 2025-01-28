// Initialize balance and transaction history from localStorage
let balanceElement = document.getElementById('balance');
let balance = parseFloat(localStorage.getItem('balance')) || 5000;
const transactionHistoryData = JSON.parse(localStorage.getItem('transactionHistory')) || [];

// Update initial balance and transaction history on page load
updateBalance();
loadTransactionHistory();

// Elements
const depositButton = document.getElementById('deposit-button');
const withdrawButton = document.getElementById('withdraw-button');
const depositModal = document.getElementById('deposit-modal');
const withdrawModal = document.getElementById('withdraw-modal');
const confirmDeposit = document.getElementById('confirm-deposit');
const cancelDeposit = document.getElementById('cancel-deposit');
const confirmWithdraw = document.getElementById('confirm-withdraw');
const cancelWithdraw = document.getElementById('cancel-withdraw');
const depositAmountInput = document.getElementById('deposit-amount');
const withdrawAmountInput = document.getElementById('withdraw-amount');
const transactionHistory = document.getElementById('transaction-history');

// Show deposit popup
depositButton.addEventListener('click', () => {
    depositModal.style.display = 'flex';
});

// Show withdraw popup
withdrawButton.addEventListener('click', () => {
    withdrawModal.style.display = 'flex';
});

// Close deposit popup
cancelDeposit.addEventListener('click', () => {
    depositAmountInput.value = ''; // Clear input
    depositModal.style.display = 'none';
});

// Close withdraw popup
cancelWithdraw.addEventListener('click', () => {
    withdrawAmountInput.value = ''; // Clear input
    withdrawModal.style.display = 'none';
});

// Confirm deposit
confirmDeposit.addEventListener('click', () => {
    const amount = parseFloat(depositAmountInput.value);

    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    balance += amount;
    updateBalance();
    addTransaction('Deposit', amount);

    alert(`Successfully deposited P${amount.toFixed(2)}.`);
    depositAmountInput.value = ''; // Clear input
    depositModal.style.display = 'none'; // Close modal
});

// Confirm withdrawal
confirmWithdraw.addEventListener('click', () => {
    const amount = parseFloat(withdrawAmountInput.value);

    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    if (amount > balance) {
        alert('Insufficient funds.');
        return;
    }

    balance -= amount;
    updateBalance();
    addTransaction('Withdraw', amount);

    alert(`Successfully withdrew P${amount.toFixed(2)}.`);
    withdrawAmountInput.value = ''; // Clear input
    withdrawModal.style.display = 'none'; // Close modal
});

// Update balance display and save to localStorage
function updateBalance() {
    balanceElement.innerText = balance.toFixed(2);
    localStorage.setItem('balance', balance); // Save balance to localStorage
}

// Add transaction to history and save to localStorage
function addTransaction(type, amount) {
    const transaction = {
        type,
        amount: `P${amount.toFixed()}`,
        date: new Date().toLocaleString(),
    };

    // Add transaction to the table
    const row = transactionHistory.insertRow(-1);
    row.insertCell(0).innerText = transaction.type;
    row.insertCell(1).innerText = transaction.amount;
    row.insertCell(2).innerText = transaction.date;

    // Update transaction history in localStorage
    transactionHistoryData.push(transaction);
    localStorage.setItem('transactionHistory', JSON.stringify(transactionHistoryData));
}

// Load transaction history from localStorage
function loadTransactionHistory() {
    transactionHistoryData.forEach((transaction) => {
        const row = transactionHistory.insertRow(1);
        row.insertCell(0).innerText = transaction.type;
        row.insertCell(1).innerText = transaction.amount;
        row.insertCell(2).innerText = transaction.date;
    });

}