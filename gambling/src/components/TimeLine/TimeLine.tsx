import React, { useEffect, useState } from "react";
import { LinearProgress, Box, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { keyframes } from "@emotion/react";

const indeterminate1Keyframes = keyframes({
  "0%": {
    left: "-35%",
    right: "100%"
  },
  "100%": {
    left: "0%",
    right: "0%"
  }
});

const StyledLinearProgress = styled(LinearProgress)({
  "& .MuiLinearProgress-bar1Indeterminate": {
    width: "auto",
    animation: `${indeterminate1Keyframes} 20s linear reverse infinite`,
    backgroundColor: 'green',
    borderRadius: '5px'
  },
  "& .MuiLinearProgress-bar2Indeterminate": {
    display: "none",
  }
});

export const TimeLine = () => {
  const [time, setTime] = useState(20);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((oldTime) => {
        if (oldTime === 0) {
          return 20;
        }
        return oldTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ maxWidth: "960px", width: "100%", my: 5 }}>
      <Typography variant="h5" gutterBottom color="white">ROLLING IN <span style={{ color: 'yellow' }}>{time}</span></Typography>
      <StyledLinearProgress sx={{ height: '6px', backgroundColor: '#1a1e239f', borderRadius: '5px' }} variant="indeterminate" />
    </Box>
  );
}
