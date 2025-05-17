import React, { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { FaCheck } from "react-icons/fa6";

const ShowSuccessMessage = ({ message, visible, setVisible }) => {
  const [progress, setProgress] = useState(0); // Start at 0%

  useEffect(() => {
    if (visible) {
      const totalDuration = 3000; // Total duration in ms (3 seconds for demo)
      const interval = 100; // Interval to update progress bar
      const progressStep = (interval / totalDuration) * 100; // Progress step for each interval

      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setVisible(false);
            return 100;
          }
          return prev + progressStep;
        });
      }, interval);

      return () => clearInterval(timer); // Clean up interval on unmount
    }
  }, [visible]);

  return (
    <div className={`hello w-auto ${visible ? 'slide-in' : 'slide-out'}`} style={{ width: 'auto', position : 'fixed', top : '75px', right : '4px', zIndex : '99999999' }}>
      <div className="w-auto position-relative overflow-hidden">
        <div className="overflow-hidden text-white px-4 py-4 shadow-lg" role="alert" style={{borderRadius : '10px', backgroundImage: 'linear-gradient(to right, #22c55e, #16a34a)'}}>
          <div className="d-flex align-items-center gap-4">
            <div className="d-flex align-items-center justify-content-center text-white" style={{fontSize : '30px'}}>
              <FaCheck />
            </div>
            <div className='d-flex align-items-center'>
              <p className='m-0'>Success! {message}</p>
            </div>
          </div>
          <div className="position-absolute bottom-0 bg-white" style={{height: '0.25rem', width: `${progress}%`, transition: 'width 0.1s linear', left : '0' }}></div>
        </div>
      </div>
    </div>
  );
};

export default ShowSuccessMessage;
