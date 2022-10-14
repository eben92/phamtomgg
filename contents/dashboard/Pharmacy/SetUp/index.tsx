import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
// import { pharmacyService } from '../../../../services/restService';

const SetUpPharmacy = ({ styles }: any) => {
  const { admin } = useSelector((state: any) => state.adminReducer);

  const [currentStep, setCurrentStep] = useState('Step1');
  const [inputFields, setInputFields] = useState({
    name_of_pharmacy: 'Red Shop',
    name_of_superintendent_pharmacy: 'Redis',
    pharmacy_email: 'redaid@gmail.com',
    pharmacy_physical_address: '13th street',
    pharmacy_phone: '234454543454',
    account_name: 'Red',
    account_number: '343323534544',
    bank_name: 'Redit',
    bank_code: '34324',
    valid_document: 'dfgfdg'
  });

  const handleInputChange = (e: any) => {
    setInputFields({
      ...inputFields,
      [e.target.name]: e.target.value
    });
  };

  const handleSumbmit = async (e: any) => {
    e.preventDefault();
    try {
      // const data = await pharmacyService.setupPharmacy(
      //   admin._id,
      //   inputFields,
      //   admin.access_token
      // );

      // console.log(data);
      setCurrentStep('Step4');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(inputFields);
  }, [inputFields]);

  return (
    <>
      <div className={styles.setup_container}>
        <div className={styles.details}>
          <Image
            src={'/assets/dashboard/arrow_left.svg'}
            height={'12px'}
            width={'18px'}
          />

          <div className={styles.details_container}>
            <Image
              src={'/assets/dashboard/ehr/medic.svg'}
              height={'194px'}
              width={'144px'}
              layout='fixed'
            />

            <div>
              <h4>Setup your Online Pharmacy</h4>
            </div>

            <ol>
              <li>Sell your product to your patients/customers online</li>
              <li>Set your own price</li>
              <li>Deliver to them easily</li>
            </ol>
          </div>
        </div>
        <div className={styles.setup_form_container}>
          <div className={styles.form}>
            {currentStep === 'Step1' && (
              <Step1
                styles={styles}
                handleInputChange={handleInputChange}
                setCurrentStep={setCurrentStep}
                setInputFields={setInputFields}
                inputFields={inputFields}
              />
            )}
            {currentStep === 'Step2' && (
              <Step2
                styles={styles}
                setCurrentStep={setCurrentStep}
                handleInputChange={handleInputChange}
              />
            )}
            {currentStep === 'Step3' && (
              <Step3
                styles={styles}
                setCurrentStep={setCurrentStep}
                setInputFields={setInputFields}
                inputFields={inputFields}
                handleSumbmit={handleSumbmit}
              />
            )}
            {currentStep === 'Step4' && (
              <Step4 styles={styles} setCurrentStep={setCurrentStep} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SetUpPharmacy;
