import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetCoinsList } from "../../redux/reducer/coinsFullListReducer";
import Loader from "../Loader/Loader";
import Coin from "./Coin";
import CoinHeader from "./CoinHeader";
import fulllist from './fulllist.module.css'


const CoinsList=()=>{
  const dispatch=useDispatch();
  const [search, setSearch]=useState('');
  const listLoading=useSelector(state=>state.coinsfull.loading)

  useEffect(()=>{
    dispatch(fetchGetCoinsList())
  }, [dispatch])

  let coins = useSelector((state) => state.coinsfull.coinsList)
  console.log("coins",coins )


  const searchCoin=({target:{value}})=>{
        setSearch(value)
  }

const filteredCoins=coins.filter(coin=>coin.name.toLowerCase().includes(search.toLowerCase()))
console.log("filteredCoins", filteredCoins)
return (
  <>
  {listLoading? <Loader /> :(
  
   
 <div className={`container mt-5 ${fulllist.coins}`}>
 <div className={fulllist.coinsearch}>
 
     <form className="d-flex">
     <input className="form-control" type="search" placeholder="Search by name" aria-label="Search" onChange={searchCoin}/>
     <button className="btn btn-outline-success" type="button" disabled>Search</button>
   </form>
 </div>
 <CoinHeader />
 {filteredCoins.map(coin=><Coin key={coin.id} id={coin.id} name={coin.name} image={coin.image} symbol={coin.symbol} volume={coin.market_cap} rate={coin.current_price} priceChange={coin.price_change_percentage_24h} />   )}
</div>

  )}
 </>
 
)
}
export default CoinsList;
