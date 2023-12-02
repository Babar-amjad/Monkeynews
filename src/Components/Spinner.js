import React from 'react'
import lodding from './index.svg'


const Spinner=()=> {
    return (
      <div className='sp text-center my-3'>
        <img src={lodding} alt="loading"/>
      </div>
    )
}

export default Spinner
