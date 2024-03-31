// GET HTML ELEMENT BY IDs

const quoteContainer = document.getElementById(`quote_container`)
const quoteText = document.getElementById(`quote`)
const authorText = document.getElementById(`author`)
const twitterBtn = document.getElementById(`twitter`)
const newQuoteBtn = document.getElementById(`new_quote`)
const loader = document.getElementById(`loader`)



// GET QUOTES FROM API

let apiQuotes = []

// SHOW LOADING 

function loading (){
    loader.hidden = false
    quoteContainer.hidden = true
}

// HIDE LOADER 

function complete( ){
    quoteContainer.hidden = false
    loader.hidden = true
}

// GET QUOTE FROM API
async function getQuotes(){
    loading()
    const apiUrl = ` https://type.fit/api/quotes`
    try {
        const response = await fetch(apiUrl)
        apiQuotes = await response.json()
        newQuote()
        complete()
    } catch (error){
        //Catch ERROR here

    }
}

// NEW QUOTE 

function newQuote(){
    // SHOW LOADER 
    loading()
    
    // PICK A RANDOM QUOTE FROM API
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    quote.author = quote.author.replace("type.fit", "").replace(",", "");

    // CHECK IF AUTHOR FIELD IS BLANK -> UNKNOWN
    if (!quote.author) {
        authorText.textContent = `Unknown`;
    } else {
        authorText.textContent = quote.author;
    }

    // CHECK QUOTE LENGTH
    if (quote.text.length > 50) {
        quoteText.classList.add(`long-quote`);
    } else {
        quoteText.classList.remove(`long-quote`);
    }
    // SET QUOTE , HIDE LOADER
    quoteText.textContent = quote.text;
    complete()
}




// TWEET QUOTE
function tweetQuote ( ){ 
    const twitterUrl = ` https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${ authorText.textContent}`
    window.open(twitterUrl, ` _blank`)
}


// EVENT LISTENERS 

newQuoteBtn.addEventListener(`click`, newQuote)
twitterBtn.addEventListener(`click`, tweetQuote)

// On LOAD

getQuotes()