import { Box, Typography } from '@mui/material';
import type {Asset} from "../../../api/investPortfolio.ts";
import AssetCard from "./Asset.tsx";

type AssetListProps = {
  assets: Asset[];
  accountId: number;
  onTransaction: () => void;
};

const AssetList = ({ assets, accountId, onTransaction }: AssetListProps) => {
  return (
    <Box marginTop={"10px"}>
      <Typography variant="h5" gutterBottom color="secondary">
        Asset List
      </Typography>
      {assets.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No assets available.
        </Typography>
      ) : (
        assets.map((asset) => (
        <AssetCard
            onTransaction={onTransaction}
            accountId={accountId} key={asset.id}
            asset={asset}
        />))
      )}
    </Box>
  );
};

export default AssetList;
