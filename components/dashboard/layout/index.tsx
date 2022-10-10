import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { requestCode } from '../../../services/restService';
import { removeRedirectTo } from '../../../services/localService';
import { useSelector } from 'react-redux';
import Navbar from './navbar';
import Sidebar from './sidebar';
import styles from '../../../styles/dashboard/Layout.module.scss';
import TokenExpiredModal from '../tokenExpired';

const DashboardLayout = ({ children }: any) => {
  const { push } = useRouter();
  const { admin } = useSelector((state: any) => state.adminReducer);
  const [loginModal, setLoginModal] = useState(false);

  if (Object.keys(admin).length < 1) {
    push('/auth/login');
  }

  const onHide = () => {
    setLoginModal(false);
  };
  const handleLogin = () => {
    push('/auth/login');
  };

  const handleCloseSidebar = () => {
    const sidebar: any = document.getElementById(
      'SIDEBAR_CONTAINER'
    ) as HTMLElement;
    if (sidebar.classList.contains('open_sidebar')) {
      sidebar.classList.remove('open_sidebar');
    }
  };

  useEffect(() => {
    removeRedirectTo();

    if (requestCode == 403) {
      setLoginModal(true);
    } else {
      setLoginModal(false);
    }
  }, []);

  return (
    <div>
      <Navbar />

      <Sidebar />

      <div
        onClick={handleCloseSidebar}
        className={styles.dashboard_layout_body}
      >
        {children}
      </div>

      <TokenExpiredModal
        loginModal={loginModal}
        onHide={onHide}
        handleLogin={handleLogin}
      />
    </div>
  );
};

export default DashboardLayout;
