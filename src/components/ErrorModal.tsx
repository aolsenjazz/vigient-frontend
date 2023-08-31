import React, { useEffect, useState } from 'react';
import { errorEmitter } from '../events';

const ErrorModal = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const showError = (message: string) => {
      setErrorMessage(message);
    };

    errorEmitter.on('apiError', showError);

    return () => {
      errorEmitter.off('apiError', showError);
    };
  }, []);

  const handleClose = () => {
    setErrorMessage(null);
  };

  return errorMessage ? (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <p>{errorMessage}</p>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  ) : null;
};

export default ErrorModal;
