import React from 'react';
import Button from '@material-ui/core/Button';

const GithubButton = () => {
  return (
    <div>
      {/* <Button variant='contained' color='secondary' href='https://github.com/login/oauth/authorize?client_id=5ad5082847b00373784f&scope=user:email' onClick={() => console.log('Clicked the github button')}>Log in with GitHub</Button> */}
      <Button variant='contained' color='secondary' href='/oauth/github' onClick={() => console.log('Clicked the github button')}>Log in with Github</Button>
    </div>
  )
}

export default GithubButton;
