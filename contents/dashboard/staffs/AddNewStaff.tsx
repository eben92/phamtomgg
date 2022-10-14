import { useState } from 'react';
import Image from 'next/image';
import { Modal } from 'react-bootstrap';
import { Button, Input } from '../../../components/dashboard';
import { staffsService } from '../../../services/restService';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { setStaff } from '../../../redux/actions/staffs';

interface IAddNewStaffProps {
  showAddNewStaffModal: boolean;
  onHide: () => void;
  styles: any;
  admin: any;
}
const AddNewStaff = ({
  showAddNewStaffModal,
  onHide,
  styles,
  admin
}: IAddNewStaffProps) => {
  const [inputField, setInputField] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    dob: '',
    role: ''
  });

  const { staffs } = useSelector((state: any) => state.staffsReducer);

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const onInputChange = (e: any) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };
  const reset = () => {
    setInputField({
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      dob: '',
      role: ''
    });
  };

  const handleAddStaff = async (e: any, staffData: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      dispatch(setStaff([...staffs, staffData]));

      reset();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      onHide();
    }
  };

  return (
    <div className={styles.modal_container}>
      <Modal
        id={styles.modal_container}
        centered
        show={showAddNewStaffModal}
        onHide={onHide}
      >
        <div className={styles.label_container}>
          <p>Add new staff</p>

          <Image
            src={'/assets/dashboard/close_btn_white.svg'}
            width={'14px'}
            height={'14px'}
            onClick={onHide}
          />
        </div>

        <div className={styles.form_container}>
          <form>
            <div>
              <label htmlFor='firstname'>First name</label>
              <Input
                type={'text'}
                styles='input_primary'
                placeholder='Matthew'
                id='firstname'
                name='first_name'
                onChange={onInputChange}
                value={inputField.first_name}
              />
            </div>

            <div>
              <label htmlFor='Lastname'>Last name</label>
              <Input
                type={'text'}
                styles='input_primary'
                placeholder='Olukoju'
                id='Lastname'
                name='last_name'
                onChange={onInputChange}
                value={inputField.last_name}
              />
            </div>

            <div>
              <label htmlFor='email_address'>Email address</label>
              <Input
                type={'email'}
                styles='input_primary'
                placeholder='thematthewola@gmail.com'
                id='email_address'
                name='email'
                onChange={onInputChange}
                value={inputField.email}
              />
            </div>

            <div>
              <label htmlFor='email_address'>Date of birth</label>
              <Input
                type={'date'}
                styles='input_primary'
                // placeholder='thematthewola@gmail.com'
                id='dob'
                name='dob'
                onChange={onInputChange}
                value={inputField.dob}
              />
            </div>

            <div>
              <label className={styles.label} htmlFor='email'>
                Phone number
              </label>
              <PhoneInput
                country={'ng'}
                containerClass='phone_input_container'
                placeholder='Phone number'
                onChange={(phone: any) => {
                  setInputField({ ...inputField, phone_number: phone });
                }}
                value={inputField.phone_number}
              />
            </div>

            <div>
              <label className={styles.label} htmlFor='role'>
                Role
              </label>
              <select
                className={styles.select}
                name='role'
                id='role'
                // value={inputField.role}
                onChange={(e: any) =>
                  setInputField({
                    ...inputField,
                    role: e.target.value.toUpperCase().replace(' ', '_')
                  })
                }
              >
                <option hidden selected disabled>
                  Select role
                </option>
                {['Doctor', 'Pharmacist', 'Nurse', 'Lab attendant'].map(
                  (item: any, index: any) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  )
                )}
              </select>
            </div>

            <Button
              disabled={
                Object.values(inputField).some((x) => x === '') || loading
              }
              className={'btn_primary'}
              style={{ marginTop: '16px' }}
              onClick={(e: any) => handleAddStaff(e, inputField)}
            >
              Save
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AddNewStaff;
