import React, { useState, useEffect } from 'react';
import { FaExclamationTriangle } from "react-icons/fa";

const ShowAlertMessage = ({ message, visible, setVisible }) => {
  const [progress, setProgress] = useState(0); // Start at 0%

  useEffect(() => {
    if (visible) {
      setProgress(0); // Reset progress on new visible alert

      const totalDuration = 3000;
      const interval = 100;
      const progressStep = (interval / totalDuration) * 100;

      const timer = setInterval(() => {
        setProgress(prev => {
          const next = prev + progressStep;
          return next >= 100 ? 100 : next;
        });
      }, interval);

      const autoHide = setTimeout(() => {
        setVisible(false); // ✅ Set visibility off after total duration
      }, totalDuration);

      return () => {
        clearInterval(timer);
        clearTimeout(autoHide);
      };
    }
  }, [visible, setVisible]);

  return (
    <div className={`hello fixed top-[70px] right-4 z-[999999] ${visible ? 'slide-in' : 'slide-out'}`} style={{ width: 'auto', position: 'fixed', top: '75px', right: '4px', zIndex: '99999999' }}>
      <div className="w-auto relative overflow-hidden">
        <div className="text-white px-4 py-4 shadow-lg" role="alert" style={{ borderRadius: '10px', backgroundImage: 'linear-gradient(to right, #f87171, #dc2626)' }}>
          <div className="d-flex align-items-center gap-4">
            <div className="d-flex align-items-center justify-content-center text-white" style={{ fontSize: '30px' }}>
              <FaExclamationTriangle />
            </div>
            <div className='d-flex align-items-center'>
              <p className="m-0">Alert! {message}</p>
            </div>
          </div>
          <div className="position-absolute bottom-0 bg-white" style={{ height: '0.25rem', width: `${progress}%`, transition: 'width 0.1s linear', left: '0' }} />
        </div>
      </div>
    </div>
  );
};

export default ShowAlertMessage;
