// PortfolioSummary.tsx

import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

type AssetPosition = {
  assetId: number;
  name: string;
  ticker: string;
  totalQuantity: number;
  averageBuyPrice: number;
  currentMarketPrice: number;
  totalMarketValue: number;
  profitOrLoss: number;
  profitOrLossPercentage: number;
};

type PortfolioSummaryProps = {
  totalValue: number;
  totalProfitOrLoss: number;
  totalProfitOrLossPercentage: number;
  assetPositions: AssetPosition[];
  assetsBySector: Record<string, number>;
};

const PortfolioSummary = ({
  totalValue,
  totalProfitOrLoss,
  totalProfitOrLossPercentage,
  assetPositions,
  assetsBySector,
}: PortfolioSummaryProps) => {

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" gutterBottom>
            Portfolio Summary
          </Typography>
        </Box>

        <Typography variant="subtitle1">
          Total Value: <strong>${totalValue.toLocaleString()}</strong>
        </Typography>

        <Typography
          variant="subtitle1"
          color={totalProfitOrLoss >= 0 ? 'success.main' : 'error.main'}
        >
          Total Profit / Loss: <strong>${totalProfitOrLoss.toFixed(2)}</strong> (
          {totalProfitOrLossPercentage?.toFixed(2)}%)
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Assets by Sector
        </Typography>
        <List dense>
          {Object.entries(assetsBySector).map(([sector, value]) => (
            <ListItem key={sector} disablePadding>
              <ListItemText primary={sector} secondary={`$${value.toLocaleString()}`} />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Asset Positions ({assetPositions.length})
        </Typography>
        <List dense>
          {assetPositions.map((asset) => (
            <ListItem key={asset.assetId} disablePadding>
              <ListItemText
                primary={`${asset.name} (${asset.ticker})`}
                secondary={
                  <>
                    Qty: {asset.totalQuantity.toLocaleString()} | Avg Buy Price: ${asset.averageBuyPrice.toFixed(2)} | Current Price: ${asset.currentMarketPrice.toFixed(2)} | Market Value: ${asset.totalMarketValue.toLocaleString()}
                    <br />
                    <Box
                      component="span"
                      sx={{ color: asset.profitOrLoss >= 0 ? 'success.main' : 'error.main' }}
                    >
                      Profit/Loss: ${asset.profitOrLoss.toFixed(2)} ({asset.profitOrLossPercentage.toFixed(2)}%)
                    </Box>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default PortfolioSummary;
