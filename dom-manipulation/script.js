// Store the initial set of quotes
const quotes = [
  { text: "The only way to do great work is to love what you do.", category: "Motivation" },
  { text: "In the middle of every difficulty lies opportunity.", category: "Inspiration" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Success" },
];

// Select the DOM elements
const quoteDisplay = document.getElementById('quoteDisplay');
const showQuoteButton = document.getElementById('showQuoteButton');

// Function to display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteDisplay.innerHTML = `"${randomQuote.text}" - <em>${randomQuote.category}</em>`;
}

// Event listener to show a new random quote
showQuoteButton.addEventListener('click', showRandomQuote);

// Function to dynamically create the quote addition form
function createAddQuoteForm() {
  const formContainer = document.createElement('div');

  // Create input fields for quote text and category
  const newQuoteText = document.createElement('input');
  newQuoteText.id = 'newQuoteText';
  newQuoteText.type = 'text';
  newQuoteText.placeholder = 'Enter a new quote';
  
  const newQuoteCategory = document.createElement('input');
  newQuoteCategory.id = 'newQuoteCategory';
  newQuoteCategory.type = 'text';
  newQuoteCategory.placeholder = 'Enter quote category';

  // Create a button to add the new quote
  const addQuoteButton = document.createElement('button');
  addQuoteButton.textContent = 'Add Quote';

  // Append inputs and button to the form container
  formContainer.appendChild(newQuoteText);
  formContainer.appendChild(newQuoteCategory);
  formContainer.appendChild(addQuoteButton);
  document.body.appendChild(formContainer);

  // Event listener for adding a new quote
  addQuoteButton.addEventListener('click', () => {
    const quoteText = newQuoteText.value.trim();
    const quoteCategory = newQuoteCategory.value.trim();

    if (quoteText && quoteCategory) {
      const newQuote = { text: quoteText, category: quoteCategory };
      quotes.push(newQuote);
      newQuoteText.value = '';
      newQuoteCategory.value = '';

      // Display the newly added quote
      quoteDisplay.innerHTML = `New quote added: "${newQuote.text}" - <em>${newQuote.category}</em>`;
    } else {
      alert('Please fill out both the quote and category fields.');
    }
  });
}

// Call the function to create the add-quote form on page load
createAddQuoteForm();
