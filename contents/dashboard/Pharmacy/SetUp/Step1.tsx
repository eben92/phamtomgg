import React from 'react';
import { Input, Button } from '../../../../components/dashboard';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Step1 = ({
  styles,
  setCurrentStep,
  handleInputChange,
  inputFields,
  setInputFields
}: any) => {
  return (
    <form className={styles.padd}>
      <div className={styles.setup_form_header}>
        <h4>Set up pharmacy</h4>
      </div>

      <div className={styles.form_input_container}>
        <div>
          <label htmlFor='Name of pharmacy'>Name of pharmacy</label>
          <Input
            type={'text'}
            styles='input_primary'
            placeholder='Enter your pharmacy name'
            id='Name of pharmacy'
            name='name_of_pharmacy'
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='suprintendent'>
            Name of suprintendent pharmacist
          </label>
          <Input
            type={'text'}
            styles='input_primary'
            placeholder='Enter supritendent full name'
            id='suprintendent'
            name='name_of_superintendent_pharmacy'
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='email'>Pharmacy email address</label>
          <Input
            type={'email'}
            styles='input_primary'
            placeholder='Enter your email address'
            id='email'
            name='pharmacy_email'
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='address'>Pharmacy physical address</label>
          <Input
            type={'text'}
            styles='input_primary'
            placeholder='Enter pharmacy physical address'
            id='address'
            name='pharmacy_physical_address'
            onChange={handleInputChange}
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
              setInputFields({
                ...inputFields,
                pharmacy_phone: phone
              });
            }}
          />
        </div>
      </div>

      <div className={styles.continue}>
        <Button
          onClick={(e: any) => {
            e.preventDefault();
            setCurrentStep('Step2');
          }}
          className='btn_primary w-full'
        >
          Continue
        </Button>
      </div>
    </form>
  );
};

export default Step1;
