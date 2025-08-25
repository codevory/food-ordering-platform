
const addBtn = document.getElementsByClassName('add-funds')[0]
const balance = document.getElementById('balance') // Declare balance element
const message = document.getElementById('message')

// Load saved balance from localStorage on page load
let savedBalance = localStorage.getItem('balance')
if (savedBalance !== null) {
    savedBalance = Number(JSON.parse(savedBalance))
    console.log("Balance from localStorage:", savedBalance);
} else {
    savedBalance = 0.00 // Default balance if nothing in localStorage
    console.log("No balance found in localStorage, setting default to 0.00");
}

// Set the balance in the UI
balance.textContent = savedBalance.toFixed(2)
message.textContent = savedBalance.toFixed(2)

addBtn.addEventListener('click',() => {
const inputAmount = document.getElementById('amount')
  const amount = inputAmount.value
  if(!amount || isNaN(amount) || amount <= 0){
    alert("Please enter a valid amount")
    return;
  }
  if(amount){
    const newBalance = (Number(parseFloat(amount)) + Number(parseFloat(balance.textContent))).toFixed(2)
    balance.textContent = newBalance
    message.textContent = newBalance
    
    // Save to localStorage
    localStorage.setItem('balance', JSON.stringify(newBalance))
    console.log("Balance updated and saved:", newBalance);
    inputAmount.value = '' // Clear the input field after adding funds
  }
  else{
    balance.textContent = "0.00"
    message.textContent = "0.00"
    localStorage.setItem('balance', JSON.stringify("0.00"))
  }
})