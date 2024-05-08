import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState,useEffect } from 'react'
import axios from "axios";

export default function BasicTextFields({ value, setValue, label, variant }) {
    const handleChange = (e) => {
        setValue(e.target.value);
      };
  
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      
      <TextField  label={label}
        variant={variant}
        value={value}
        onChange={handleChange}
         />
        
    </Box>
  );
}