import React, { useContext } from 'react';
import AlertContext from '../context/Alter/AlertContext';

const Alert = () => {

  const {alert} = useContext(AlertContext);

  return (
    alert && <div className={`alert alert-${alert.type}`} role="alert">
        {alert.message}
    </div>
  )
}

export default Alert