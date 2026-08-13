import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

/**
 * Guards a checkout step behind a boolean condition. Keeping this generic
 * (rather than one-off checks per page) means every new step added to the
 * flow gets consistent "you skipped a step" handling for free.
 */
export default function ProtectedRoute({ when, redirectTo, children }) {
  if (!when) {
    return <Navigate to={redirectTo} replace />;
  }
  return children;
}

ProtectedRoute.propTypes = {
  when: PropTypes.bool.isRequired,
  redirectTo: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
