'use client';
import Navbar from './Navbar';
import Footer from './Footer';
import useCartStore from '../../hooks/useCartStore';
import LoginPage from '@/app/login/page';
const LandingPage = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isAuthenticated } = useCartStore();
  return (
    <div>
      {isAuthenticated ? (
        <>
          <Navbar />
          {children}
          <Footer />
        </>
      ) : (
        <LoginPage />
      )}
    </div>
  );
};

export default LandingPage;
