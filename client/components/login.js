import React from 'react';
import { TextField, Box, Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const Login = () => {
return (
    <div>
	<div id='loginPage'>
	<h2>Login</h2>
    <div id='loginBox'>
        <div id='loginInputs'>
            Username: <TextField id='usernameBox' label='username' variant='filled'></TextField>
            Password:<TextField id='passwordBox' label='password' variant='filled' type='password'></TextField>
        </div>
        <div id='loginButton'>
        <Button variant='contained' color='primary'>Login</Button>
        </div>
    </div>
	</div>
    </div>
);
};

export default Login;
