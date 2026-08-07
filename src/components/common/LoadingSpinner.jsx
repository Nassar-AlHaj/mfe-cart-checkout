import PropTypes from 'prop-types';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function LoadingSpinner({ label, fullHeight }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        py: 8,
        minHeight: fullHeight ? '60vh' : 'auto',
      }}
      role="status"
      aria-live="polite"
    >
      <CircularProgress color="primary" size={40} thickness={4} />
      {label && (
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      )}
    </Box>
  );
}

LoadingSpinner.propTypes = {
  label: PropTypes.string,
  fullHeight: PropTypes.bool,
};

LoadingSpinner.defaultProps = {
  label: 'Loading...',
  fullHeight: false,
};
