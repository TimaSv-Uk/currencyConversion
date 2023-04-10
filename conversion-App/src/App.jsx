import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'


// url to data
const BASE_URL = 'https://api.freecurrencyapi.com/v1/latest?apikey=b57fFfQVcN0TAidh0DKqMalORm8LOvImil81NS4j'


function App() {
  // store all variables
  const [currencyOptions, setCurrencyOptions] = useState({ data: [] });
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [amount, setAmount] = useState(1)
  const [amountTo, setAmountTo] = useState(true)
  const [exchange, setExchange] = useState()
  const [index, setIndex] = useState()
  

  // calculations
  let toAmount, fromAmount
  if (amountTo) {
    fromAmount = amount
    toAmount = amount * exchange
  } else {
    toAmount = amount
    fromAmount = amount / exchange
  }



  // get default and all data from api Once
  useEffect(() => {
    fetch(BASE_URL)
    .then(res => res.json())
    .then(data => {
      setCurrencyOptions(data)
      setFromCurrency('USD')
      setToCurrency('AUD')
      setExchange(data.AUD || 1.48)
    })
  }, [])
 

  const keys = Object.keys(currencyOptions?.data ?? {});
  // long and painfull debuging

  // console.log(currencyOptions)
  // console.log(fromCurrency)
  // console.log(toCurrency)
  // console.log(amount)
  // console.log(exchange)
  // console.log(index)


  function handleFrom(e) {
    setAmount(e.target.value)
    setAmountTo(true)
  }

  
  function handleTo(e) {
    setAmount(e.target.value)
    setAmountTo(false)
  }
  // set Exchange and Amount rates
  useEffect(() => {
    if(fromCurrency !== null && toCurrency!== null){
      if(fromCurrency === toCurrency){
        setExchange(1)
        setAmount(currencyOptions.data[fromCurrency])
      }else{

        setExchange(currencyOptions.data[toCurrency]/currencyOptions.data[fromCurrency])
        setAmount(currencyOptions.data[fromCurrency])
      }
    }
  }, [fromCurrency, toCurrency])


  return (
    <>    
    <div>
        <h2>Convert</h2>
        <CurrencyConvert 
          keys={keys}
          selectCurrency={fromCurrency}
          onChangeCurrency={e => setFromCurrency(e.target.value)}
          onChangeAmount={handleFrom}
          amount={fromAmount}
        />
        <h1>=</h1>
        <CurrencyConvert 
          keys={keys}
          selectCurrency={toCurrency}
          onChangeCurrency={e => setToCurrency(e.target.value)}
          onChangeAmount={handleTo}
          amount={toAmount}
          />
      </div>
    </>
  )
}

function CurrencyConvert(props) {
  
  // main components of app
  const{
    keys,
    selectCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount,
  } = props

  return(
    // main html
    <div>
      <div className='conSection'>
        <input type="number" className="inp" value={amount} onChange={onChangeAmount}/>
        <select className='sel' value={selectCurrency} onChange={onChangeCurrency}>
          {keys.map(option => {
            return <option key={option} value={option}>{option}</option>
          })}
        </select>
      </div>
    </div>
  )
}

export default App
