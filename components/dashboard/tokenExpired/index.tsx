import React from 'react';
import { Modal } from 'react-bootstrap';
import styles from '../../../styles/dashboard/Patients.module.scss';
import Button from '../Button';

const TokenExpiredModal = ({ loginModal, onHide, handleLogin }: any) => {
  return (
    <div className={styles.modal_container}>
      <Modal
        id={styles.modal_container}
        centered
        show={loginModal}
        backdrop='static'
        keyboard={false}
        onHide={onHide}
      >
        <div className={styles.label_container}>
          <p>Login to continue</p>
        </div>

        <p
          style={{
            width: '100%',
            textAlign: 'center',
            fontSize: '14px',
            marginTop: '16px'
          }}
        >
          {' '}
          Token expired. Kindly login again to continue
        </p>

        <div className={styles.form_container}>
          <Button
            className={'btn_primary'}
            style={{ marginTop: '16px' }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default TokenExpiredModal;
