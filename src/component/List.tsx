import React from 'react'
import { getNameOfJSDocTypedef } from 'typescript'
import Card from './Card'

export default function List(props:{nfts:any,disable?:boolean}) {
  return (
    <div className='flex flex-row flex-wrap justify-between lg:p-6 sm:p-2'>
      {
        props.nfts.length?
        props.nfts.map((nft:any,id:number)=>(
          <Card nft={nft} id={id+1} disable={props.disable}/>
        )):null
      }
    </div>
  )
}
