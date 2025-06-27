import { useState } from 'react';
import {
  Box,
  Button,
  List,
  Typography,
} from '@mui/material';
import CreateAccountModal from "./AccountsModal.tsx";
import AccountListItem from "./AccountListItem.tsx";

type Account = {
  id?: number;
  name: string;
  description: string;
  currency: 'USD' | 'EUR' | 'UAH';
};

type AccountsProps = {
  accounts: Account[];
  addAccount: (account: Account) => void;
  selectAccount: (accountId: number) => void;
  deleteAccount: (accountId: number) => void;
};

const Accounts = ({ accounts, addAccount, selectAccount, deleteAccount }: AccountsProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelect = (id: number, index: number) => {
    setSelectedIndex(index);
    selectAccount(id);
  };

  const handleDelete = (id: number) => {
      deleteAccount(id);
  };

  return (
    <Box
      sx={{
        width: 300,
        p: 2,
        borderRight: '1px solid #ddd',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        height: '100vh',
        boxSizing: 'border-box',
      }}
    >
      <Button variant="contained" onClick={() => setModalOpen(true)}>
        Create new account
      </Button>

      <CreateAccountModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={(account) => {
          addAccount(account);
          setModalOpen(false);
          setSelectedIndex(accounts.length);
        }}
      />

      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        {accounts.length === 0 ? (
          <Typography variant="body2" color="textSecondary" align="center" mt={2}>
            No accounts yet.
          </Typography>
        ) : (
          <List>
            {accounts.map((acc, index) => (
              <AccountListItem
                  {...acc}
                  id={acc.id ?? 0}
                  key={index}
                  index={selectedIndex ?? 0}
                  onSelect={handleSelect}
                  onDelete={handleDelete}
                  selected={index === selectedIndex}
              />
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default Accounts;
