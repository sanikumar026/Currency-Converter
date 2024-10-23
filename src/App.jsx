
import './App.css'
import { useState,useEffect } from 'react';
import axios from 'axios';
function App() {
  

  const [exchangeRates,setExchangeRates]=useState({});
  const [amount,setAmount]=useState(1);
  const[fromCurrency,setFromCurrency]=useState('USD');
  const[toCurrency,setToCurrency]=useState('INR');
  const [convertedAmount,setConvertedAmount]=useState(null);

  useEffect(()=>{
    
    const apiUrl=`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
    axios.get(apiUrl)
    .then(
      response =>{

        setExchangeRates(response.data.rates);
      }
    )
   
    .catch(error=>{
 console.log('Error fetching exchange rates:',error);
    });
   

  },[fromCurrency])


  useEffect(()=>{

    const conversionRate=exchangeRates[toCurrency];
    if(conversionRate)
    {
      const converted=amount*conversionRate;
      setConvertedAmount(converted.toFixed(2));
      
    }
  },[amount,fromCurrency,toCurrency,exchangeRates]);

  
  const handleChange=(e)=>{
    
    const{name,value}=e.target;

    switch(name){
      case 'amount': 
      setAmount(value);
      break;

      case 'fromCurrency': 
      setFromCurrency(value);
      break;

      
      case 'toCurrency': 
      setToCurrency(value);
      break;
    }
  }
 
  return (
    <div className='card'>
      <h1 className='text-6x1'>Currency Converter</h1>
      {/* wrapper */}
      <div  className='currency_exchange'>

{/* input container 1 */}
          <div className='input_container'>
          <label className ="input_label">Amount:</label>
          <input type='number' name="amount" value={amount} className="input_field"  onChange={handleChange} />  
           </div>
         
{/* input container 2 */}
           <div className='input_container'>
          <label className ="input_label">From Currency:</label>
          {/* <label for="cars">Choose a car:</label> */}

<select name="fromCurrency" value={fromCurrency} onChange={handleChange} className="input_field">
  {
    Object.keys(exchangeRates).map(currency=>(
      <option key={currency} value={currency}>
        {currency}
      </option>
    ))
  }
</select>
           </div>
{/* input container 3 */}
<div className='input_container'>
          <label className ="input_label">To Currency:</label>
          {/* <label for="cars">Choose a car:</label> */}

<select name="toCurrency" value={toCurrency} onChange={handleChange} className="input_field">
  {
    Object.keys(exchangeRates).map(currency=>(
      <option key={currency} value={currency}>
        {currency}
      </option>
    ))
  }
</select>
           </div>
        </div>




      {/* wrapper */}
   <div className="output">
    <h2>Converted Amount:  <b>{convertedAmount}</b></h2>
   </div>
    </div>
  );
};

export default App;
