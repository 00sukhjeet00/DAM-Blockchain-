export const getEtherPrice=async()=>{
    const res=await fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
    const data=await res.json()
    console.log('data: ', data);
}