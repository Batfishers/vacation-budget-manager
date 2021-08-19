import React from 'react';
import Button from '@material-ui/core/Button';

const GithubButton = () => {
  const githubLogin = async () => {
    console.log('Clicked the GitHub button');
    let githubRedirect = '';

    await fetch('/oauth/github')
      .then(data => data.json())
      .then((data) => {
        console.log(data);
        githubRedirect = data;
      })
      .catch((err) => {
        console.log('Error when clicking the github button');
        console.log(err);
      });

    console.log('Now, lets make a get request to: ', githubRedirect);
  }

  const githubResponse = () => {
    
  }

  return (
    <div>
      <Button variant='contained' color='secondary' href='https://github.com/login/oauth/authorize?client_id=5ad5082847b00373784f&scope=user:email' onClick={() => console.log('Clicked the github button')}>Log in with GitHub</Button>
    </div>
  )
}

export default GithubButton;
