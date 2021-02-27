import React from 'react';

import RepoFinder from 'images/repo-finder.png';
import Centered from 'components/Centered';
import LoginForm from 'forms/LoginForm';
import { FormContainer } from 'styles/global';
import { useAuth } from 'contexts/auth';
import { useHistory, useLocation } from 'react-router-dom';

function Login() {
  const history = useHistory();
  const location = useLocation();
  const { signIn } = useAuth();
  const { from } = location.state || { from: { pathname: '/' } };

  const onSubmit = async values => {
    await signIn(values);
    history.replace(from);
  };

  return (
    <Centered column>
      <img
        draggable={false}
        style={{ width: 200, marginBottom: 20 }}
        src={RepoFinder}
        alt="RepoFinder"
      />
      <FormContainer>
        <LoginForm onSubmit={onSubmit} />
      </FormContainer>
    </Centered>
  );
}

export default Login;
