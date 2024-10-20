// Array to store quote objects
const quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Get busy living or get busy dying.", category: "Inspiration" },
  ];
  
// Select DOM elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');
const addQuoteButton = document.getElementById('addQuoteButton');

// Function to show a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.textContent = `"${quote.text}" - ${quote.category}`;
}

// Event listener for showing a new random quote
newQuoteButton.addEventListener('click', showRandomQuote);

// Function to add a new quote to the array and update the DOM
function addQuote() {
  const quoteText = newQuoteText.value.trim();
  const quoteCategory = newQuoteCategory.value.trim();

  if (quoteText && quoteCategory) {
    // Add new quote to the array
    const newQuote = { text: quoteText, category: quoteCategory };
    quotes.push(newQuote);

    // Clear input fields
    newQuoteText.value = '';
    newQuoteCategory.value = '';

    // Display a confirmation or show the newly added quote
    quoteDisplay.textContent = `New quote added: "${newQuote.text}" - ${newQuote.category}`;
  } else {
    alert('Please enter both a quote and a category.');
  }
}

// Event listener for adding a new quote
addQuoteButton.addEventListener('click', addQuote);