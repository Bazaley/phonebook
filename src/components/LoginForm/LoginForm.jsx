import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from 'redux/auth/auth-operations';
import { Section } from 'components/Section/Section';
import Particle from 'components/Particle/Particle';
import { selectAuthIsLoading } from 'redux/selectors';
import CircularProgress from '@mui/material/CircularProgress';

import { FormTag, Input, Label, Button } from './LoginForm.styled';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const isLoading = useSelector(selectAuthIsLoading);

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(login({ email, password }));

    setEmail('');
    setPassword('');
  };

  return (
    <>
      <Section
        title="
    Enter your details and get access to your personal contact book"
      >
        <>
          <FormTag onSubmit={handleSubmit}>
            <Label>
              <Input
                type="email"
                value={email}
                name="email"
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                autoComplete="off"
                required
              />
            </Label>
            <Label>
              <Input
                type="password"
                value={password}
                name="password"
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                autoComplete="off"
                required
              />
            </Label>

            <Button disabled={isLoading}>
              {isLoading ? (
                <CircularProgress size={19} style={{ color: 'white' }} />
              ) : (
                'Sign in'
              )}
            </Button>
          </FormTag>
          <Particle />
        </>
      </Section>
    </>
  );
};

export default LoginForm;
