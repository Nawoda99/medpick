import { FC, ReactNode } from 'react';
import { Button } from './button';

interface GoogleSignInButtonProps {
  children: ReactNode;
}
const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
  const loginWithGoogle = () => console.log('login with google');

  return (
    <Button onClick={loginWithGoogle} className='w-full  bg-black text-white p-3 rounded hover:bg-slate-700'
    >
      {children}
    </Button>
  );
};

export default GoogleSignInButton;
