import React, { useState, useEffect } from 'react'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
// import COLORS from './ColorsArray.jsx'

const quotesData = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'

function App() {
  const[quote, setQuote] = useState('Life is 10% what happens to me and 90% how I react to it.')
  const [author, setAuthor] = useState("Charles Swindoll")
  const [randomNumber, setRandomNumber] = useState(0)
  const [quotes, setQuotes] = useState(null)
  // const[boxColor, setBoxColor] = useState('#A08794')

  const fetchQuotes = async (url) => {
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setQuotes(parsedJSON.quotes)
    console.log(parsedJSON)
  }

  useEffect(() => {
    fetchQuotes(quotesData)
  }, [quotesData])

  const getQuote = () => {
    let randomInt = Math.floor(quotes.length * Math.random())
    setRandomNumber(randomInt)
    setQuote(quotes[randomInt].quote)
    setAuthor(quotes[randomInt].author)
  }
  
  return (

    <div className="App">
      <header className="App-header">
        <div id="quote-box">
          <p id="text">"{quote}"</p>
          <p id="author">- {author}</p>
          <div id="clickables">
          <a id="tweet-quote" href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} -${author}`)}><FontAwesomeIcon icon={faTwitter}/></a>
          <button id="new-quote" onClick={()=>getQuote()}>NEW QUOTE</button>
          </div>
        </div>
      </header>
    </div>
  )
}

export default App
