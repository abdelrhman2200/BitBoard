import React, { useState } from 'react';
import './Footer.css';

const Footer = () => {
  const [modalType, setModalType] = useState(null);

  const closeModal = () => setModalType(null);

  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} BitBoard Crypto. All rights reserved.</p>
        <div className="footer-links">
          <button onClick={() => setModalType('privacy')}>Privacy Policy</button>
          <button onClick={() => setModalType('terms')}>Terms & Conditions</button>
        </div>
      </div>

      {modalType && (
        <div className="footer-modal-overlay" onClick={closeModal}>
          <div className="footer-modal" onClick={(e) => e.stopPropagation()}>
            <h2>{modalType === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}</h2>
            <p>
              {modalType === 'privacy' ? (
                <>
                  We value your privacy. Any information collected on this site will never be shared or sold.
                  We use cookies only to improve your experience. You can opt out at any time.
                </>
              ) : (
                <>
                  By using this website, you agree to comply with our terms. This platform is for informational purposes only and does not provide financial advice.
                </>
              )}
            </p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
