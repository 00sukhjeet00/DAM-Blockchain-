import React, { useContext } from 'react'
import { webConnect } from '../../interface'
import { EtherContext } from '../../utils/EthContext'

export default function MarketScreen() {
  const {Ether} =useContext(EtherContext) as webConnect
  
  return (
    <div>index</div>
  )
}
