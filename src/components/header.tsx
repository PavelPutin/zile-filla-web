"use client"

import { Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Stack alignItems="center" direction="row" gap={1}>
            <Image src={"/images/ZileFilla.png"} alt="Логотип" width={50} height={50} />
            <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>Zile Filla</Typography>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}