// CreateAssetModal.tsx

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
} from '@mui/material';
import { useState } from 'react';

const sectors = ['Technology', 'Healthcare', 'Finance', 'Energy', 'Automotive'];

export type NewAsset = {
  name: string;
  ticker: string;
  description: string;
  sector: string;
  currentPrice: number;
};

type CreateAssetModalProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (asset: NewAsset) => void;
};

const CreateAssetModal = ({ open, onClose, onCreate }: CreateAssetModalProps) => {
  const [newAsset, setNewAsset] = useState<NewAsset>({
    name: '',
    ticker: '',
    description: '',
    sector: '',
    currentPrice: 0,
  });

  const handleInputChange = (field: keyof NewAsset, value: string) => {
    setNewAsset((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onCreate(newAsset);
    setNewAsset({
      name: '',
      ticker: '',
      description: '',
      sector: '',
      currentPrice: 0,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create New Asset</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Name"
          fullWidth
          value={newAsset.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
        />
        <TextField
          margin="dense"
          label="Ticker"
          fullWidth
          value={newAsset.ticker}
          onChange={(e) => handleInputChange('ticker', e.target.value)}
        />
        <TextField
          margin="dense"
          label="Description"
          fullWidth
          multiline
          rows={2}
          value={newAsset.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
        />
        <TextField
          margin="dense"
          label="Sector"
          select
          fullWidth
          value={newAsset.sector}
          onChange={(e) => handleInputChange('sector', e.target.value)}
        >
          {sectors.map((sector) => (
            <MenuItem key={sector} value={sector}>
              {sector}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          margin="dense"
          label="Current Price"
          type="number"
          fullWidth
          value={newAsset.currentPrice}
          onChange={(e) => handleInputChange('currentPrice', e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateAssetModal;
