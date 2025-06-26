import { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

type Account = {
  name: string;
  description: string;
  currency: 'USD' | 'EUR' | 'UAH';
};

type CreateAccountModalProps = {
  open: boolean;
  onClose: () => void;
  onAdd: (account: Account) => void;
};

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
};

const CreateAccountModal = ({ open, onClose, onAdd }: CreateAccountModalProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState<Account['currency']>('USD');

  const handleAdd = () => {
    if (!name.trim()) return;

    onAdd({
      name: name.trim(),
      description: description.trim(),
      currency,
    });

    setName('');
    setDescription('');
    setCurrency('USD');

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="create-account-title" >
      <Box sx={style}>
        <Typography color="secondary" id="create-account-title" variant="h6" component="h2" mb={2}>
          Create New Account
        </Typography>
        <TextField
          label="Account Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="currency-label">Currency</InputLabel>
          <Select
            labelId="currency-label"
            value={currency}
            label="Currency"
            onChange={(e) => setCurrency(e.target.value as Account['currency'])}
          >
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
            <MenuItem value="UAH">UAH</MenuItem>
          </Select>
        </FormControl>
        <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
          <Button color="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={handleAdd} disabled={!name.trim()}>
            Add
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateAccountModal;
