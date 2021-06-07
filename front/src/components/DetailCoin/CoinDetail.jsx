import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import DataCoin from "./DataCoin";
import HistoryCoin from "./HistoryCoin";
import style from './details.css'

const CoinDetail=()=>{
  const {id}=useParams();
  const [coinData, setCoinData]=useState({})

  const arrayToobject=data=>{
    return data.map(el=>{
      return {t:el[0],y:el[1].toFixed(2)}
    })

  }
  useEffect(()=>{
    
    const fetchCoin=async()=>{
      const [day, week, year]=await Promise.all([fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1`), fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`), fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=365`)])
      const dayResult =await day.json();
      const weekResult =await week.json();
      const yearResult =await year.json();
      
      setCoinData({
        day:arrayToobject(dayResult.prices),
        week:arrayToobject(weekResult.prices),
        year:arrayToobject(yearResult.prices),
      })

    }
    fetchCoin();

  }, [])
console.log('Day', coinData)
  const renderData=()=>{
    return(
      <div className="coinlist" >
        
        <HistoryCoin coinData={coinData}/>
        <DataCoin />
      </div>
    )
  }

  return (
renderData()
  )
}
export default CoinDetail
