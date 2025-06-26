import { useState } from 'react';
import {
  Box,
  Button,
  List,
  ListItemText,
  Typography,
  ListItemButton,
} from '@mui/material';
import CreateAccountModal from "./AccountsModal.tsx";

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
};

const Accounts = ({ accounts, addAccount, selectAccount }: AccountsProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelect = (id: number, index: number) => {
    setSelectedIndex(index);
    selectAccount(id);
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
              <ListItemButton
                key={index}
                selected={selectedIndex === index}
                onClick={() => handleSelect(acc.id ?? 0, index)}
              >
                <ListItemText
                  slotProps={{
                    primary: {
                      color: "primary"
                    }
                  }}
                  primary={acc.name}
                  secondary={`${acc.description || 'No description'} — ${acc.currency}`}
                />
              </ListItemButton>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default Accounts;
