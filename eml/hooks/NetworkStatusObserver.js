import { useEffect } from 'react';
import {NetworkStatusService} from '../services/NetworkStatusService';
import PropTypes from 'prop-types';

export default function NetworkStatusObserver({ setIsOnline }) {
  const networkStatusService = NetworkStatusService.getInstance();

  useEffect(() => {
    const observer = {
      update: (status) => {
        setIsOnline(status);
      }
    };

    setIsOnline(networkStatusService.addObserver(observer));

    return () => networkStatusService.removeObserver(observer);
  }, [setIsOnline, networkStatusService]);

  return null; // This component does not render anything
}

NetworkStatusObserver.propTypes = {
  setIsOnline: PropTypes.func.isRequired,
};