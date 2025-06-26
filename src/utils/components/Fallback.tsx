import React from 'react';

const gradientStyle: React.CSSProperties = {
  height: '100%',
  width: '100%',
  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
  display: 'flex',
  padding: "15px",
  alignItems: 'center',
  justifyContent: 'center',
  color: '#ffffff',
  fontSize: '1.5rem',
  fontWeight: 600,
  fontFamily: 'sans-serif',
};

const Fallback: React.FC = () => {
  return (
    <div style={gradientStyle}>
      Loading...
    </div>
  );
};

export default Fallback;
