import React from 'react'
import Card from './Card'

export default function List() {
  return (
    <div className='flex flex-row flex-wrap justify-between lg:p-6 sm:p-2'>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
    </div>
  )
}
