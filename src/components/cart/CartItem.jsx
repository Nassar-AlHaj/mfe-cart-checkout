import PropTypes from 'prop-types';
import { Box, Typography, IconButton, Stack, Avatar, Tooltip } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import QuantitySelector from './QuantitySelector';
import { formatCurrency } from '../../utils/formatCurrency';

export default function CartItem({ item, maxQty, onIncrease, onDecrease, onRemove }) {
  const lineTotal = item.price * item.quantity;

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      alignItems={{ xs: 'flex-start', sm: 'center' }}
      sx={{ py: 2.5, borderBottom: '1px solid', borderColor: 'divider' }}
    >
      <Avatar
        src={item.image}
        alt={item.name}
        variant="rounded"
        sx={{ width: 72, height: 72, flexShrink: 0 }}
      />

      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography variant="subtitle1" fontWeight={700} noWrap title={item.name}>
          {item.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {formatCurrency(item.price)} each
        </Typography>
      </Box>

      <Stack direction="row" spacing={2} alignItems="center" sx={{ width: { xs: '100%', sm: 'auto' }, justifyContent: { xs: 'space-between', sm: 'flex-end' } }}>
        <QuantitySelector
          quantity={item.quantity}
          max={maxQty}
          onIncrease={() => onIncrease(item.id)}
          onDecrease={() => onDecrease(item.id)}
        />

        <Typography variant="subtitle1" fontWeight={700} sx={{ minWidth: 80, textAlign: 'right' }}>
          {formatCurrency(lineTotal)}
        </Typography>

        <Tooltip title="Remove item">
          <IconButton
            aria-label={`Remove ${item.name} from cart`}
            onClick={() => onRemove(item)}
            color="default"
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  maxQty: PropTypes.number.isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};
