import React from 'react';
import { Route } from 'react-router-dom';
import SignUp from './SignUp';

function SignUpPage() {
  return (
    <div>
      <Route path="/SignUp" Component={SignUp} />
    </div>
  );
}

export default SignUpPage;