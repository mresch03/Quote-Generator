const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const author = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

//Show Loading
const loading = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide Loading
const complete = () => {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show new Quote
let newQuote = () => {
    loading();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // Check if Author field is blank an replace it with 'unknown'
    if(!quote.author) {
        author.textContent = 'unknown';
    } else {
        author.textContent = quote.author;
    }
    quoteText.textContent = quote.text;

    //Check Quote length to determine stylind
    if(quote.text.length > 100) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    //Set Quote, hide loader
    quoteText.textContent = quote.text;
    complete();
}
 
//Get Quotes from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        console.log('Ooops, something went wrong!' + error);
    }
}

//Tweet Quote
const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();
