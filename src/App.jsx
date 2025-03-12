import { useState, useEffect } from 'react'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faTumblr } from '@fortawesome/free-brands-svg-icons'

function App() {

  const themes = [
    "#ff5733",
    "#337dff",
    "#d133ff",
    "#04bd48",
    "#2b402f",
    "#4133ff",
    "#800800",
    "#513e63",
    "#703e01",
    "#000482",
    "#a3007d",
    "#541e28"
  ]

  useEffect(() => {
    fetchQuotes();
  },[]);

  async function fetchQuotes(){

    try{
      const response = await fetch('/api/quotes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setQuoteData(data);
    } catch (error){
      console.error('Error fetching quotes:', error);
    }
  }

  const [quoteData, setQuoteData] = useState([]);
  const [quote, setQuote] = useState({q:"Click to generate a quote!", a:""});
  const [themeColor, setThemeColor] = useState(themes[Math.floor(Math.random()*themes.length)]);

  useEffect(() => {
    document.body.style.backgroundColor = themeColor;
  }, [themeColor]);

  function setTheme(){
    setThemeColor(themes[Math.floor(Math.random()*themes.length)]);
    setQuote(quoteData[Math.floor(Math.random()*quoteData.length)]);
  };

  return (
    <>
    <h1>Quote Generator</h1>
      <div className="content-wrapper">
        <div className="quotes" id="quote-box">
          <div className="quote-text" id="text">
            <span style={{color: themeColor}}>"{quote.q}"</span>
          </div>
          <div className="quote-author" id="author">
            <span style={{color: themeColor}}>-{quote.a}</span>
          </div>
          <div className="button-line">
            <a target="_blank" href={`https://twitter.com/intent/tweet?hashtags=quote&text=${encodeURIComponent(quote.q + quote.a)}`}><button style={{backgroundColor: themeColor}}><FontAwesomeIcon icon={faTwitter} /></button></a>
            <a target="_blank" href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=${encodeURIComponent(quote.a)}&content=${encodeURIComponent(quote.q)}&canonicalUrl=https://zenquotes.io/api/quotes&shareSource=tumblr_share_button}`}><button style={{backgroundColor: themeColor}}><FontAwesomeIcon icon={faTumblr} /></button></a>
            <button onClick={setTheme} style={{backgroundColor: themeColor}}>New Quote</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
