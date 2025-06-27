import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  Grid,
} from '@mui/material';
import {useCallback, useEffect, useState} from 'react';

type TransactionType = 'BUY' | 'SELL';

type TransactionModalProps = {
  open: boolean;
  onClose: () => void;
  accountId: number;
  assetId: number;
  onSubmit: (data: TransactionFormData) => void;
};

export type TransactionFormData = {
  accountId: number;
  assetId: number;
  type: TransactionType;
  quantity: number;
  pricePerUnit: number;
  transactionDate: string;
  commission: number;
};

const TransactionModal = ({
  open,
  onClose,
  accountId,
  assetId,
  onSubmit,
}: TransactionModalProps) => {
  const [formData, setFormData] = useState<TransactionFormData>({
    accountId,
    assetId,
    type: 'BUY',
    quantity: 0,
    pricePerUnit: 0,
    transactionDate: new Date().toISOString().slice(0, 16),
    commission: 0,
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      accountId,
      assetId,
    }));
  }, [accountId, assetId]);


  const handleChange = (field: keyof TransactionFormData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const clearForm = useCallback(() => {
    setFormData({
      accountId,
      assetId,
      type: 'BUY',
      quantity: 0,
      pricePerUnit: 0,
      transactionDate: new Date().toISOString().slice(0, 16),
      commission: 0,
    });
  }, [accountId, assetId]);

  const handleSubmit = useCallback((() => {
    if (formData.quantity === 0) {
      return;
    }
    onSubmit(formData);
    clearForm();
    onClose();
  }), [clearForm, formData, onSubmit, onClose]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Record Transaction</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} mt={1}>
          {/*// @ts-expect-error GRID TYPE MISSUNDERTANDING*/}
          <Grid item xs={12}>
            <TextField
              select
              label="Transaction Type"
              fullWidth
              value={formData.type}
              onChange={(e) => handleChange('type', e.target.value as TransactionType)}
            >
              <MenuItem value="BUY">Buy</MenuItem>
              <MenuItem value="SELL">Sell</MenuItem>
            </TextField>
          </Grid>
          {/*// @ts-expect-error GRID TYPE MISSUNDERTANDING*/}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Quantity"
              type="number"
              fullWidth
              value={formData.quantity}
              onChange={(e) => handleChange('quantity', parseFloat(e.target.value))}
            />
          </Grid>
          {/*// @ts-expect-error GRID TYPE MISSUNDERTANDING*/}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Price per Unit"
              type="number"
              fullWidth
              value={formData.pricePerUnit}
              onChange={(e) => handleChange('pricePerUnit', parseFloat(e.target.value))}
            />
          </Grid>
          {/*// @ts-expect-error GRID TYPE MISSUNDERTANDING*/}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Commission"
              type="number"
              fullWidth
              value={formData.commission}
              onChange={(e) => handleChange('commission', parseFloat(e.target.value))}
            />
          </Grid>
          {/*// @ts-expect-error GRID TYPE MISSUNDERTANDING*/}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Transaction Date & Time"
              type="datetime-local"
              fullWidth
              value={formData.transactionDate}
              onChange={(e) => handleChange('transactionDate', e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {
          clearForm();
          onClose();
        }}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransactionModal;
