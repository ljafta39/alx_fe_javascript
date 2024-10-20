const API_URL = 'https://jsonplaceholder.typicode.com/posts'; // Mock API for simulation

// Initialize quotes from local storage or use default quotes
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The only way to do great work is to love what you do.", category: "Motivation" },
  { text: "In the middle of every difficulty lies opportunity.", category: "Inspiration" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Success" }
];

// Function to fetch quotes from the server
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch quotes from server');
    }
    const serverQuotes = await response.json();
    // Return only the body as quotes, or adjust based on your API structure
    return serverQuotes.map(quote => ({ text: quote.body, category: 'Uncategorized' })); 
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return []; // Return an empty array on error
  }
}

// Function to sync quotes with the server
async function syncQuotes() {
  const serverQuotes = await fetchQuotesFromServer();
  
  const localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];

  // Simple conflict resolution: server data takes precedence
  const mergedQuotes = serverQuotes.map(serverQuote => {
    const existingQuote = localQuotes.find(localQuote => localQuote.text === serverQuote.text);
    return existingQuote || serverQuote; // Use the server quote if not found locally
  });

  // Update local storage with merged quotes
  localStorage.setItem('quotes', JSON.stringify(mergedQuotes));
  
  // Refresh the displayed quotes
  quotes = mergedQuotes; // Update the in-memory quotes array
  filterQuotes(); // Re-filter to update display
  console.log('Quotes synchronized successfully');
}

// Function to show a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = `<p>${quote.text}</p><p><em>(${quote.category})</em></p>`;
}

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  if (newQuoteText && newQuoteCategory) {
    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);
    saveQuotes(); // Save the updated quotes to local storage
    showRandomQuote(); // Display a new random quote
    populateCategories(); // Update category dropdown
    document.getElementById('newQuoteText').value = ''; // Clear input field
    document.getElementById('newQuoteCategory').value = ''; // Clear input field
  } else {
    alert("Please enter both a quote and a category.");
  }
}

// Function to save quotes to local storage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to populate categories dynamically
function populateCategories() {
  const categoryFilter = document.getElementById('categoryFilter');
  const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];
  
  // Clear existing options
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  
  // Populate the dropdown with unique categories
  uniqueCategories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

// Function to filter quotes based on selected category
function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);
  
  // Update the displayed quote or indicate no quotes available
  const quoteDisplay = document.getElementById('quoteDisplay');
  if (filteredQuotes.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const quote = filteredQuotes[randomIndex];
    quoteDisplay.innerHTML = `<p>${quote.text}</p><p><em>(${quote.category})</em></p>`;
  } else {
    quoteDisplay.innerHTML = `<p>No quotes available for this category.</p>`;
  }
}

// Event listener for the "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Load existing quotes from local storage when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
  populateCategories();
  showRandomQuote();
});

// Periodically call syncQuotes every 30 seconds
setInterval(syncQuotes, 30000);

// Import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    populateCategories();
    filterQuotes();
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

// Export quotes to a JSON file
function exportToJson() {
  const jsonQuotes = JSON.stringify(quotes, null, 2); // Pretty print
  const blob = new Blob([jsonQuotes], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  a.click();
  URL.revokeObjectURL(url);
}

// Bind export functionality to a button
document.getElementById('exportButton').addEventListener('click', exportToJson);
