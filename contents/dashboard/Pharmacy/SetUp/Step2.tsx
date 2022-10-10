import { Input, Button } from '../../../../components/dashboard';

const Step2 = ({ styles, setCurrentStep, handleInputChange }: any) => {
  return (
    <form className={styles.padd}>
      <div className={styles.setup_form_header}>
        <h4>Set up your payment method</h4>
      </div>
      <label>How will you like to receive payment</label>

      <div className={styles.form_input_container}>
        <div>
          <label htmlFor='Bank'>Select bank</label>
          <Input
            type={'text'}
            styles='input_primary'
            list='bank'
            placeholder='Select / type your bank'
            id='Bank'
            name='bank_name'
            onChange={handleInputChange}
          />

          <datalist id='bank'>
            {[
              'Access bank',
              'AlatbyWema',
              'Fisrt bank',
              'Guarantty Trausted Bank'
            ].map((bank: string, index: number) => (
              <option key={index} value={bank}>
                {bank}
              </option>
            ))}
          </datalist>
        </div>
        <div>
          <label htmlFor='Account number'>Account number</label>
          <Input
            type={'number'}
            styles='input_primary'
            name='account_number'
            placeholder='Account number'
            id='Account number'
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='Account name'>Account name</label>
          <Input
            type={'text'}
            styles='input_primary'
            placeholder='GOD FAVOUR BUSINESS LTD'
            id='Account number'
            name='account_name'
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className={styles.continue}>
        <Button
          onClick={(e: any) => {
            e.preventDefault();
            setCurrentStep('Step3');
          }}
          className='btn_primary w-full'
        >
          Continue
        </Button>
      </div>
    </form>
  );
};

export default Step2;
