import React from 'react'
import { ScaleLoader } from 'react-spinners'

function Loader() {
    return (
        <div className='flex justify-center w-100 h-[70vh] items-center'>
            <ScaleLoader color="#000" height={50} width={10} radius={2} margin={4} />
        </div>
    )
}

export default Loader