import { FC, PropsWithChildren } from 'react';

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div className="mx-auto w-full min-w-132.5 max-w-200 px-6 py-24 sm:px-0">{children}</div>
      <div className="pointer-events-none absolute bottom-0 right-0 h-128 w-lg -mr-20 sm:mr-0 bg-linear-to-tl from-blue-200/30 via-sky-100/15 to-transparent blur-3xl" />
    </>
  );
};

export default MainLayout;
