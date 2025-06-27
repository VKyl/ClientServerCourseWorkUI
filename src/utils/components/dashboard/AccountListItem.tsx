import React from 'react';
import {
  ListItemButton,
  ListItemText,
  IconButton,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

type AccountListItemProps = {
  index: number;
  selected: boolean;
  name: string;
  description?: string;
  currency: string;
  onSelect: (id: number, index: number) => void;
  onDelete: (id: number) => void;
  id: number;
};

const AccountListItem: React.FC<AccountListItemProps> = ({
  index,
  selected,
  name,
  description,
  currency,
  onSelect,
  onDelete,
  id,
}) => {
  return (
    <ListItemButton selected={selected} onClick={() => onSelect(id, index)}>
      <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
        <ListItemText
          primary={name}
          secondary={`${description || 'No description'} — ${currency}`}
          primaryTypographyProps={{ color: 'primary' }}
        />
        <IconButton edge="end" aria-label="delete" onClick={(e) => {
          e.stopPropagation();
          onDelete(id);
        }}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </ListItemButton>
  );
};

export default AccountListItem;
