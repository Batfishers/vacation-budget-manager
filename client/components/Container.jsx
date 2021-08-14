import React, { Component, useState } from 'react';
import { TextField, Box, Paper } from '@material-ui/core';

function Container() {

  return (
    <div className='container'>
      <Box display='flex' alignItems='center' width='auto' height ='15%'>
        Destination: <TextField id='destinationBox' label='Destination' variant='filled'></TextField>
        Curent Location:<TextField id='locationBox' label='Location' variant='filled' type='password'></TextField>
      </Box>
    </div>
  )
}

export default Container;