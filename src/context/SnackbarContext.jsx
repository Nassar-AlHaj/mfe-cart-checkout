import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppSnackbar from '../components/common/AppSnackbar';

const SnackbarContext = createContext(undefined);

const DEFAULT_STATE = { open: false, message: '', severity: 'info' };

export function SnackbarProvider({ children }) {
  const [state, setState] = useState(DEFAULT_STATE);

  const showSnackbar = useCallback((message, severity = 'info') => {
    setState({ open: true, message, severity });
  }, []);

  const handleClose = useCallback((_event, reason) => {
    if (reason === 'clickaway') return;
    setState((prev) => ({ ...prev, open: false }));
  }, []);

  const value = useMemo(() => ({ showSnackbar }), [showSnackbar]);

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <AppSnackbar
        open={state.open}
        message={state.message}
        severity={state.severity}
        onClose={handleClose}
      />
    </SnackbarContext.Provider>
  );
}

SnackbarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export function useSnackbar() {
  const ctx = useContext(SnackbarContext);
  if (!ctx) throw new Error('useSnackbar must be used within a SnackbarProvider');
  return ctx;
}
