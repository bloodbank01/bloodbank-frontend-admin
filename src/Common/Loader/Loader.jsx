import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Loader = () => {

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    // <div className="fixed top-0 left-0 z-[99999999999]" style={{ width: '100vw', height: '100vh' }}>
    //   <div className="flex items-center justify-center" style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.3)' }}>
    //     <div className="circle-1 w-[50px] h-[50px] rounded-full bg-transparent">
    //       <div className="w-full h-full bg-transparent flex items-center justify-center">
    //         <div className="circle-2 w-[45px] h-[45px] rounded-full bg-transparent">
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="position-fixed top-0 start-0" style={{ width: '100vw', height: '100vh', zIndex: 99999999999 }} >
      <div className="d-flex justify-content-center align-items-center" style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.3)' }} >
        <div className="circle-1 rounded-circle" style={{ width: '50px', height: '50px', backgroundColor: 'transparent' }}>
          <div className="d-flex justify-content-center align-items-center w-100 h-100" style={{ backgroundColor: 'transparent' }}>
            <div className="circle-2 rounded-circle" style={{ width: '45px', height: '45px', backgroundColor: 'transparent' }}></div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Loader
