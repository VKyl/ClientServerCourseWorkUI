import {Box, Button, Divider, Snackbar, Typography} from '@mui/material';
import Accounts from "../utils/components/dashboard/Accounts.tsx";
import {useCallback, useEffect, useState} from "react";
import {
    type Account, type Asset,
    createAccount, createAsset,
    getAccounts, getAssets,
    getPortfolioSummary,
    type PortfolioSummaryProps
} from "../api/investPortfolio.ts";
import PortfolioView from "../utils/components/dashboard/PortfolioView.tsx";
import Fallback from "../utils/components/Fallback.tsx";
import CreateAssetModal, {type NewAsset} from "../utils/components/dashboard/AssetModal.tsx";
import AssetList from "../utils/components/dashboard/AssetsList.tsx";

const Dashboard = () => {
  const [
      accounts,
      setAccounts
  ] = useState<Account[]>([]);
  const [
      portfolio,
      setProtfolio
  ] = useState<PortfolioSummaryProps | null>(null);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [
      selectedAccount,
      selectAccount
  ] = useState<number | null>(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const handleCreateAsset = (newAsset: NewAsset) => {
    if (newAsset.name && newAsset.sector && newAsset.ticker && newAsset.currentPrice && newAsset.description) {
      createAsset(newAsset).then((resp) => {
        if (resp.success) {
            setAssets([{id: resp.data.id, ...newAsset}, ...assets]);
            return;
        }
        setIsSnackbarOpen(true);
      }).catch(() => {
        setIsSnackbarOpen(true);
      });
    }
  };

   useEffect(() => {
      getAccounts().then((accountsList) => setAccounts(accountsList));
  }, []);

    useEffect(() => {
        getAssets().then((assetsList) => setAssets(assetsList));
    }, []);

  useEffect(() => {
  if(selectedAccount !== null)
    getPortfolioSummary(selectedAccount).then((data) => {
        setProtfolio(data);
        console.log(data)
    });
  }, [selectedAccount]);
  const onTransaction = useCallback(() => {
      if(selectedAccount !== null)
    getPortfolioSummary(selectedAccount).then((data) => {
        setProtfolio(data);
        console.log(data)
    });
  }, [selectedAccount])
  const addAccount = (account: Account) => {
      createAccount(account).then((response) => {
          if (response.success && response.data) {
              setAccounts((accs) => [{id: response.data.id, ...account}, ...accs]);
          }
      });
  }
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <Accounts accounts={accounts} addAccount={addAccount} selectAccount={(id) => {
        console.log(id);
        selectAccount(id);
        console.log(selectedAccount)
      }}/>

      <Box
        sx={{
          flexGrow: 1,
          p: 4,
          bgcolor: '#f5f5f5',
          overflowY: 'auto',
        }}
      >
      <Typography variant="h5" gutterBottom color="secondary">
        Portfolio Summary
      </Typography>
          {portfolio ? <PortfolioView {...portfolio} /> : <Fallback altText={"No Portfolio"} />}
        <Box sx={{marginTop: "15px"}}>
            <Button variant="contained" onClick={() => setModalOpen(true)}>
                Create Asset
            </Button>
        </Box>
        <Divider sx={{marginY: "25px"}}/>
        <AssetList onTransaction={onTransaction} assets={assets} accountId={selectedAccount ?? 0} />
      </Box>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        message="Incorrect asset data!"
        onClose={() => setIsSnackbarOpen(false)}
      />
      <CreateAssetModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreateAsset}
      />
    </Box>
  );
};

export default Dashboard;
