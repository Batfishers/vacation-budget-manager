import React from 'react';
import { TextField, Box, Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const SignIn = () => {
    return (
        <div id='signinPage'>
        <h2>Sign Up</h2>
        <div id='signinBox'>
            <div id='signinInputs'>
                Username: <TextField id='usernameBox' label='username' variant='filled'></TextField>
                Password:<TextField id='passwordBox' label='password' variant='filled' type='password'></TextField>
            </div>
        <div className='signinButton'>
            <Button variant='contained' color='primary'>Sign Up!</Button>
        </div>
        </div>
        </div>
    );
};
    
export default Login;