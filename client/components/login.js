import React from 'react';
import { TextField, Box, Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const Login = () => {
    const loginClick = () => {
        const username = document.getElementById('usernameBox').value;
        const password = document.getElementById('passwordBox').value;
        const user = {
            username: username,
            password: password
        }
        console.log('user obj is: ', user)
        fetch(`/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
          })
            .then((response) => response.json())
            .then((response) => {
              if (typeof response === 'string') console.log(response);
              else if (typeof response === 'object') console.log('successfully logged in');
            })
            .catch((err) => {
              console.log(err);
            })
    }

    const signupClick = () => {
      // Gather the user data
      const username = document.getElementById('usernameBox').value;
      const password = document.getElementById('passwordBox').value;
      const user = {
        username: username,
        password: password
      }
      
      // Send it off to the server to make a new account
      fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify(user),
      })
        // .then((res) => res.json())
        .then((data) => {
          // if (typeof data === 'string') console.log(data);
          // else if (typeof data === 'object') console.log('successfully created account');
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

return (
	<div id='loginPage'>
	<h2>Login</h2>
    <div id='loginBox'>
        <div id='loginInputs'>
            Username: <TextField id='usernameBox' label='username' variant='filled'></TextField>
            Password:<TextField id='passwordBox' label='password' variant='filled' type='password'></TextField>
        </div>
    <div id='loginButton'>
        <Button variant='contained' color='primary' onClick={loginClick}>Login</Button>
    </div>
    <p id='noAccount'>Don't have an account? Sign up below: </p>
    <div className='signinButton'>
    <Button variant='contained' color='primary' onClick={signupClick}>Sign up!</Button>
    </div>
    </div>
	</div>
);
};

export default Login;
