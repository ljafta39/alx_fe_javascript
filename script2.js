// Load quotes from local storage or use default quotes
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only way to do great work is to love what you do.", category: "Motivation" },
    { text: "In the middle of every difficulty lies opportunity.", category: "Inspiration" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Success" }
  ];
  
  const quoteDisplay = document.getElementById('quoteDisplay');
  const categoryFilter = document.getElementById('categoryFilter');
  const importFileInput = document.getElementById('importFile');
  
  // Save quotes to local storage
  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }
  
  // Populate the category filter dropdown with unique categories
  function populateCategories() {
    const categories = [...new Set(quotes.map(quote => quote.category))]; // Get unique categories
    categoryFilter.innerHTML = '<option value="all">All Categories</option>'; // Reset dropdown
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  
    // Restore the last selected filter from local storage
    const savedFilter = localStorage.getItem('selectedCategory') || 'all';
    categoryFilter.value = savedFilter;
  }
  
  // Filter quotes based on the selected category
  function filterQuotes() {
    const selectedCategory = categoryFilter.value;
    localStorage.setItem('selectedCategory', selectedCategory); // Save the filter preference
  
    const filteredQuotes = selectedCategory === 'all'
      ? quotes
      : quotes.filter(quote => quote.category === selectedCategory);
  
    displayQuotes(filteredQuotes);
  }
  
  // Display a list of quotes
  function displayQuotes(quoteArray) {
    quoteDisplay.innerHTML = quoteArray.map(quote =>
      `<p>"${quote.text}" - <em>${quote.category}</em></p>`
    ).join('');
  }
  
  // Display a random quote from the current filter
  function showRandomQuote() {
    const selectedCategory = categoryFilter.value;
    const filteredQuotes = selectedCategory === 'all'
      ? quotes
      : quotes.filter(quote => quote.category === selectedCategory);
  
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = filteredQuotes[randomIndex];
  
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote)); // Save to session storage
  
    quoteDisplay.innerHTML = `"${randomQuote.text}" - <em>${randomQuote.category}</em>`;
  }
  
  // Add a new quote and update the category dropdown if needed
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
        populateCategories(); // Update categories if new ones are added
  
        newQuoteText.value = '';
        newQuoteCategory.value = '';
  
        alert(`Quote added: "${newQuote.text}" - ${newQuote.category}`);
      } else {
        alert('Please fill out both the quote and category fields.');
      }
    });
  }
  
  // Export quotes to JSON
  function exportToJsonFile() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
  
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'quotes.json';
    downloadLink.click();
  
    URL.revokeObjectURL(url); // Clean up
  }
  
  // Import quotes from a JSON file
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      populateCategories();
      filterQuotes(); // Update the display after import
  
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
  
  // Initialize the app
  populateCategories();
  createAddQuoteForm();
  filterQuotes(); // Apply filter on load
  restoreLastViewedQuote();
  
  // Event listeners
  document.getElementById('showQuoteButton').addEventListener('click', showRandomQuote);
  importFileInput.addEventListener('change', importFromJsonFile);
  