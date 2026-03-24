import React from 'react'
import { ImWarning } from "react-icons/im";
import { GoDot } from "react-icons/go";

const ContentWarning = ({data}) => {
    console.log(data)
  return (
    <div className='p-5 flex flex-col gap-2 bg-white rounded-md'>
        <div className='flex gap-4'>
            {/* <ImWarning className='text-2xl text-red-400'/> */}
            <h1 className='text-2xl font-bold'>Content Warning</h1>
        </div>
        {/* <p className='text-sm'>This book contains material that may be offensive, sensitive, or potentially harmful to some readers. 
        </p> */}
        <p className='text-lg font-semibold'>Topics include:</p>
        <ul class="w-96 text-surface ">
            {
                data?.map((warning, index) => (

                    <li key={index} class="w-full flex items-center">
                        <span className='ml-6 mr-2'>  <GoDot/></span>
                        <span className='text-base '>{warning}</span>
                    </li>
                ))
            }
            
        </ul>
        <p>Reader discretion is advised.</p>
  </div>
  )
}

export default ContentWarning