import { FC, PropsWithChildren } from 'react';

const LoginLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      {children}
    </div>
  );
};

export default LoginLayout;
