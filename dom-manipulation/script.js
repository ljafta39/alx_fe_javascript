// Store the initial quotes or load them from localStorage
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only way to do great work is to love what you do.", category: "Motivation" },
    { text: "In the middle of every difficulty lies opportunity.", category: "Inspiration" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Success" }
  ];
  
  // Select DOM elements
  const quoteDisplay = document.getElementById('quoteDisplay');
  const showQuoteButton = document.getElementById('showQuoteButton');
  const importFileInput = document.getElementById('importFile');
  
  // Function to save quotes to local storage
  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }
  
  // Display a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    
    // Save the last viewed quote to session storage
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote));
    
    quoteDisplay.innerHTML = `"${randomQuote.text}" - <em>${randomQuote.category}</em>`;
  }
  
  // Add a new quote and update localStorage
  function createAddQuoteForm() {
    const formContainer = document.createElement('div');
  
    const newQuoteText = document.createElement('input');
    newQuoteText.id = 'newQuoteText';
    newQuoteText.type = 'text';
    newQuoteText.placeholder = 'Enter a new quote';
  
    const newQuoteCategory = document.createElement('input');
    newQuoteCategory.id = 'newQuoteCategory';
    newQuoteCategory.type = 'text';
    newQuoteCategory.placeholder = 'Enter quote category';
  
    const addQuoteButton = document.createElement('button');
    addQuoteButton.textContent = 'Add Quote';
  
    formContainer.appendChild(newQuoteText);
    formContainer.appendChild(newQuoteCategory);
    formContainer.appendChild(addQuoteButton);
    document.body.appendChild(formContainer);
  
    addQuoteButton.addEventListener('click', () => {
      const quoteText = newQuoteText.value.trim();
      const quoteCategory = newQuoteCategory.value.trim();
  
      if (quoteText && quoteCategory) {
        const newQuote = { text: quoteText, category: quoteCategory };
        quotes.push(newQuote);
        saveQuotes();
  
        newQuoteText.value = '';
        newQuoteCategory.value = '';
  
        quoteDisplay.innerHTML = `New quote added: "${newQuote.text}" - <em>${newQuote.category}</em>`;
      } else {
        alert('Please fill out both the quote and category fields.');
      }
    });
  }
  
  // Export quotes to a JSON file
  function exportToJsonFile() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
  
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'quotes.json';
    downloadLink.click();
  
    URL.revokeObjectURL(url); // Clean up the URL
  }
  
  // Import quotes from a JSON file
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  }
  
  // Restore the last viewed quote from session storage (if available)
  function restoreLastViewedQuote() {
    const lastViewedQuote = JSON.parse(sessionStorage.getItem('lastViewedQuote'));
    if (lastViewedQuote) {
      quoteDisplay.innerHTML = `"${lastViewedQuote.text}" - <em>${lastViewedQuote.category}</em>`;
    }
  }
  
  // Event listeners
  showQuoteButton.addEventListener('click', showRandomQuote);
  importFileInput.addEventListener('change', importFromJsonFile);
  
  // Initialize the app
  createAddQuoteForm();
  restoreLastViewedQuote();
  