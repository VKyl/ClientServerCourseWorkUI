import React from 'react';

const gradientStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
  display: 'flex',
  padding: "15px",
  borderRadius: "10px",
  alignItems: 'center',
  justifyContent: 'center',
  color: '#ffffff',
  fontSize: '1.5rem',
  fontWeight: 600,
  fontFamily: 'sans-serif',
};

const Fallback = (props: {altText?: string}) => {
  return (
    <div style={gradientStyle}>
      {props.altText ?? "Loading..."}
    </div>
  );
};

export default Fallback;
