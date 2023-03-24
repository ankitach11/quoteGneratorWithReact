import React, { useState, useEffect } from "react";
import "./App.scss";
import colorArray from "./colorsArray";

let quoteDBurl =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function App() {
  const [quote, setQuote] = useState(
    "'It is never too late to be what you might have been.'"
  );
  const [author, setAuthor] = useState("George Eliot");
  const [randomNumber, setRandomNumber] = useState(0);
  const [quotesArray, setquotesArray] = useState(null);
  const [accentColor, setaccentColor] = useState("#282c34");

  const fetchquotes = async (url) => {
    const response = await fetch(url);
    const parsedJson = await response.json();
    setquotesArray(parsedJson.quotes);
  };
  useEffect(() => {
    fetchquotes(quoteDBurl);
  }, [quoteDBurl]);

  const generateRandomNumber = () => {
    let randomInteger = Math.floor(quotesArray.length * Math.random());
    setRandomNumber(randomInteger);
    setaccentColor(colorArray[randomInteger]);
    setQuote(quotesArray[randomInteger].quote);
    setAuthor(quotesArray[randomInteger].author);
  };
  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor: accentColor }}>
        <div id="quote-box" style={{ color: accentColor }}>
          <h1>Random Number : {randomNumber}</h1>

          <p id="text">{quote}</p>
          <p id="author"> - {author}</p>
          <div>
            <a
              id="tweet-quote"
              style={{ color: accentColor }}
              href={`https://twitter.com/`}
            >
              Tweet quote
            </a>
          </div>
          <button id="new-quote"  style={{ backgroundColor: accentColor }} onClick={() => generateRandomNumber()}>
            Generate a random quote
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
