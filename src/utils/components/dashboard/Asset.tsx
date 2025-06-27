import {Card, CardContent, Typography, Box, Button, Snackbar} from '@mui/material';
import { useState } from 'react';
import {type Asset, createTransaction, type Transaction} from '../../../api/investPortfolio.ts';
import TransactionModal from "./TransactionModal.tsx";

type AssetCardProps = {
  asset: Asset;
  accountId: number;
  onTransaction: () => void;
};

const AssetCard = ({ asset, accountId, onTransaction }: AssetCardProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const onSubmit = (transaction: Transaction) => {
    createTransaction(transaction).then((resp) => {
      if (resp.success) {
        onTransaction();
        return;
      }
      setIsSnackbarOpen(true);
    }).catch(() => {
      setIsSnackbarOpen(true);
    })
  }
  return (
    <>
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="h6">
              {asset.name}{' '}
              <Typography component="span" variant="subtitle1" color="text.secondary">
                ({asset.ticker})
              </Typography>
            </Typography>
            <Button variant="contained" size="small" onClick={() => setModalOpen(true)}>
              Buy / Sell
            </Button>
          </Box>

          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Sector:</strong> {asset.sector}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            <strong>Description:</strong> {asset.description || 'No description provided.'}
          </Typography>

          <Typography variant="body1">
            <strong>Current Market Price:</strong> ${Number.parseFloat(`${asset.currentPrice}`).toFixed(2)}
          </Typography>
        </CardContent>
      </Card>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        message="Incorrect transaction data! (check if any Account is selected)"
        onClose={() => setIsSnackbarOpen(false)}
      />
      <TransactionModal
          open={modalOpen}
          onSubmit={(transaction) => onSubmit(transaction as unknown as Transaction)}
          onClose={() => setModalOpen(false)}
          assetId={asset.id}
          accountId={accountId}
      />
    </>
  );
};

export default AssetCard;
