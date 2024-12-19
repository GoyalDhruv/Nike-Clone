import React from 'react'
import { ScaleLoader } from 'react-spinners'

function Loader() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
            <ScaleLoader color="#000" height={50} width={10} radius={2} margin={4} />
        </div>
    )
}

export default Loader