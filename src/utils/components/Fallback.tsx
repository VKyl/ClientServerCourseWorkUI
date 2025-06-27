import React from 'react';
import { useTheme } from '@mui/material/styles';

const Fallback = (props: { altText?: string }) => {
  const theme = useTheme();

  const gradientStyle: React.CSSProperties = {
    display: 'flex',
    padding: '15px',
    borderRadius: '10px',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.primary.contrastText,
    fontSize: '1.5rem',
    fontWeight: 600,
    fontFamily: theme.typography.fontFamily,
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  };

  return <div style={gradientStyle}>{props.altText ?? 'Loading...'}</div>;
};

export default Fallback;
