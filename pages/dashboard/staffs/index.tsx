import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { useSelector, useDispatch } from 'react-redux';
import { staffsService } from '../../../services/restService';
import {
  DashboardLayout,
  Input,
  Button,
  useScreenSize
} from '../../../components/dashboard';
import Image from 'next/image';
import styles from '../../../styles/dashboard/Patients.module.scss';
import { setSelectedStaff, setStaff } from '../../../redux/actions/staffs';
import {
  AddNewStaff,
  StaffPersonalData
} from '../../../contents/dashboard/staffs';

const Staffs: NextPage = () => {
  const { admin } = useSelector((state: any) => state.adminReducer);
  const { staffs, selectedStaff } = useSelector(
    (state: any) => state.staffsReducer
  );

  const dispatch = useDispatch();
  const screenSize = useScreenSize();

  const [currentTab, setCurrentTab]: any = useState('PERSONAL');
  const [searchTerm, setSearchTerm]: any = useState('');
  const [showAddNewStaffModal, setShowAddNewStaffModal]: any = useState(false);

  const handleHideAddNewStaffModal = () => {
    setShowAddNewStaffModal(false);
  };

  const handleChangeTab = (tab: any) => {
    setCurrentTab(tab);
  };

  const handleOpenStaffInfo = () => {
    const slider = document.getElementById('CHATS_SLIDER') as HTMLElement;
    slider.classList.add('slide_right');
  };

  const handleCloseStaffInfo = () => {
    const slider = document.getElementById('CHATS_SLIDER') as HTMLElement;
    slider.classList.remove('slide_right');
  };

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

  return (
    <DashboardLayout>
      <div className={styles.patients_container}>
        <div className={styles.patients}>
          <h1>Staffs</h1>

          <div>
            <div className={styles.patients_cont}>
              <Input
                styles='input_secondary'
                placeholder='Search here'
                img='/assets/dashboard/search.svg'
                width='24px'
                height='24px'
                type={'text'}
                onChange={handleSearch}
              />

              <Button
                onClick={setShowAddNewStaffModal}
                className={`${styles.add_patient} btn_primary`}
              >
                <Image
                  src={'/assets/dashboard/plus.svg'}
                  height={'14px'}
                  width={'14px'}
                />
                <p>Add new staff</p>
              </Button>
              <div>
                <ul className={styles.all_patients_container}>
                  {staffs
                    ?.filter((item: any) => {
                      if (searchTerm !== '') {
                        return (
                          item.first_name
                            ?.toLowerCase()
                            ?.includes(searchTerm?.toLowerCase()) ||
                          item.last_name
                            ?.toLowerCase()
                            ?.includes(searchTerm?.toLowerCase())
                        );
                      } else {
                        return item;
                      }
                    })
                    .map((staff: any, index: any) => (
                      <li
                        key={index}
                        onClick={() => {
                          handleOpenStaffInfo();
                          dispatch(setSelectedStaff(staff));
                        }}
                      >
                        <div className={styles.patient_list}>
                          <div className={styles.patient_info}>
                            <Image
                              src={'/assets/dashboard/avatar.svg'}
                              alt='avatar'
                              width={'40'}
                              height={'40'}
                              layout='fixed'
                            />

                            <div>
                              <p className={styles.patient_name}>
                                {staff.first_name} {staff.last_name}
                              </p>
                              <p className={styles.email}>{staff.email}</p>
                            </div>
                          </div>
                        </div>

                        <hr />
                      </li>
                    ))
                    .reverse()}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.patient_details_container}>
          <div
            id={'CHATS_SLIDER'}
            className={`${styles.patient_details} ${
              screenSize.width > 700 &&
              selectedStaff &&
              Object.keys(selectedStaff).length > 1 &&
              'slide_right'
            }`}
          >
            <div className={styles.patient_details_header}>
              <div className={styles.patient_header}>
                {screenSize.width < 700 && (
                  <Image
                    src='/assets/dashboard/arrow_left.svg'
                    alt='avatar'
                    width={'18px'}
                    height={'12px'}
                    onClick={handleCloseStaffInfo}
                  />
                )}

                {/* user avarta */}
                <Image
                  src={'/assets/dashboard/avatar.svg'}
                  alt='avatar'
                  width={'64px'}
                  height={'64px'}
                />
              </div>

              <div className={styles.tabs}>
                {['PERSONAL'].map((tab: any, index: any) => (
                  <div
                    key={index}
                    className={
                      currentTab === tab ? styles.active_tab : styles.tab
                    }
                    onClick={() => handleChangeTab(tab)}
                  >
                    {tab}
                  </div>
                ))}
              </div>
            </div>

            {currentTab === 'PERSONAL' && <StaffPersonalData styles={styles} />}
          </div>
        </div>
      </div>

      {/* add new staff */}
      <AddNewStaff
        styles={styles}
        showAddNewStaffModal={showAddNewStaffModal}
        onHide={handleHideAddNewStaffModal}
        admin={admin}
      />
    </DashboardLayout>
  );
};

export default Staffs;
