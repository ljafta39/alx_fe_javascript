// Store the initial set of quotes
const quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Motivation" },
    { text: "In the middle of every difficulty lies opportunity.", category: "Inspiration" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Success" },
  ];
  
  // Select the DOM elements
  const quoteDisplay = document.getElementById('quoteDisplay');
  const showQuoteButton = document.getElementById('showQuoteButton');
  const newQuoteText = document.getElementById('newQuoteText');
  const newQuoteCategory = document.getElementById('newQuoteCategory');
  const addQuoteButton = document.getElementById('addQuoteButton');
  
  // Function to display a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `"${randomQuote.text}" - <em>${randomQuote.category}</em>`;
  }
  
  // Event listener for showing a new random quote
  showQuoteButton.addEventListener('click', showRandomQuote);
  
  // Function to add a new quote to the array and update the DOM
  function addQuote() {
    const quoteText = newQuoteText.value.trim();
    const quoteCategory = newQuoteCategory.value.trim();
  
    if (quoteText && quoteCategory) {
      // Add the new quote to the array
      const newQuote = { text: quoteText, category: quoteCategory };
      quotes.push(newQuote);
  
      // Clear the input fields
      newQuoteText.value = '';
      newQuoteCategory.value = '';
  
      // Update the DOM with the newly added quote
      quoteDisplay.innerHTML = `New quote added: "${newQuote.text}" - <em>${newQuote.category}</em>`;
    } else {
      alert('Please fill out both the quote and category fields.');
    }
  }
  
  // Event listener for adding a new quote
  addQuoteButton.addEventListener('click', addQuote);
  