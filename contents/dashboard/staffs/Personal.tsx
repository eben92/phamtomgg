import React from 'react';
import { useSelector } from 'react-redux';

const StaffPersonalData = ({ styles }: any) => {
  const { selectedStaff } = useSelector((state: any) => state.staffsReducer);

  const personal = [
    {
      label: 'First name',
      value: selectedStaff?.first_name
    },

    {
      label: 'Last name',
      value: selectedStaff?.last_name
    },
    {
      label: 'Email',
      value: selectedStaff?.email
    },
    {
      label: 'Phone number',
      value: selectedStaff?.phone_number
    },
    {
      label: 'Date of birth',
      value: selectedStaff?.dob?.slice(0, 10)
    },

    {
      label: 'Role',
      value: selectedStaff?.role?.replace('_', ' ')
    }
  ];

  return (
    <div className={styles.personal_details_body_container}>
      <div className={styles.details_body}>
        {/* staff personal info */}
        <div className={styles.personal_details_container}>
          {selectedStaff &&
            Object.keys(selectedStaff).length > 0 &&
            personal.map((item: any, index: any) => (
              <div key={index} style={{ display: 'contents' }}>
                <div className={styles.personal_details}>
                  <p className={styles.label}>{item.label}</p>
                  <p className={styles.value}>{item.value}</p>
                </div>
                <hr />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default StaffPersonalData;
