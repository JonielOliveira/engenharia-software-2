import React, { useState } from 'react';
import SignupForm from '../components/SignupForm';
import ConsentCheckbox from '../components/ConsentCheckbox';

const UserSignup: React.FC = () => {
  const [consent, setConsent] = useState(false);

  return (
    <div>
      <h1>Cadastro de Usuário</h1>
      <SignupForm consent={consent} setConsent={setConsent} />
      {/* <ConsentCheckbox consent={consent} setConsent={setConsent} /> */}
    </div>
  );
};

export default UserSignup;
