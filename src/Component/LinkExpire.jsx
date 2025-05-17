import React, { useState, useEffect } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from 'react-router';

const LinkExpire = ({ setValue, navigateTo }) => {
    const [closing, setClosing] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const timer = setTimeout(() => {
            handleClose(); // Auto-close after 3 seconds
        }, 5000);

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleClose = () => {
        if (closing) return; // Prevent multiple calls
        setClosing(true);
        setTimeout(() => {
            setValue(false);
            navigate(navigateTo);
        }, 300);
    };


    return (
        <>
            <div className={`position-fixed top-0 start-0 z-50 w-100 h-100 d-flex justify-content-center align-items-center px-3 modal-overlay ${closing ? 'hide' : ''}`} style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: '9999' }}>
                <div className={`bg-white position-relative overflow-hidden rounded-4 modal-content ${closing ? 'hide' : ''}`} style={{ width: '600px', height: '364px' }}>
                    <div className="position-absolute rounded-circle bg-circle overflow-hidden" style={{ bottom: 'calc(100% - 120px)', left: '-80px', width: '1100px', height: '1100px', zIndex: 0 }}></div>
                    <div className="position-absolute rounded-circle bg-circle overflow-hidden" style={{ bottom: 'calc(100% - 118px)', right: 'calc(100% - 240px)', width: '350px', height: '350px', zIndex: 0 }}></div>
                    <div className="position-absolute top-0 start-0 w-100 d-flex justify-content-center py-5">
                        <div className="d-flex flex-column align-items-center justify-content-center h-auto text-center">
                            <div className="right-icon fw-bold d-flex justify-content-center align-items-center rounded-circle text-white" style={{ width: '110px', height: '110px', fontSize: '3rem', backgroundColor: '#2E37A4' }}>
                                <IoCloseSharp />
                            </div>
                            <h3 className="mt-4 fw-semibold" style={{ fontSize: '28px' }}>Oops, This Link Is Expired!</h3>
                            <p className="text-muted my-1">{'Please check your inbox and verify.'}</p>
                            <button onClick={handleClose} className="mt-3 btn btn-primary fw-semibold px-4 py-2" style={{ fontSize: '18px', letterSpacing: '0.05em' }}>Done</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default LinkExpire;
