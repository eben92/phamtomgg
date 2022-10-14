import { useState, useEffect } from 'react';
import { Button, Input } from '../../../../components/dashboard';
import { useSelector } from 'react-redux';
// import { vitalSignsService } from '../../../../services/restService';
import { Modal } from 'react-bootstrap';
import moment from 'moment';
import { MoonLoader } from 'react-spinners';

const Vitals = ({ medicalHistory, setSelectedRecord, styles, Image }: any) => {
  const { admin } = useSelector((state: any) => state.adminReducer);
  const { selectedPatient } = useSelector(
    (state: any) => state.patientsReducer
  );

  const [vitalSigns, setVitalSigns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [addHistory, setAddHistory] = useState(false);
  const [inputFields, setInputFields] = useState({
    date: '',
    blood_pressure: '',
    pulse_rate: '',
    respiration_rate: '',
    body_temperature: ''
  });

  const reset = {
    date: '',
    blood_pressure: '',
    pulse_rate: '',
    respiration_rate: '',
    body_temperature: ''
  };

  const handleChange = (e: any) => {
    setInputFields({
      ...inputFields,
      [e.target.name]: e.target.value
    });
  };

  const handleClose = () => {
    setAddHistory(false);
  };
  const handleSave = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // await vitalSignsService.addVitalSigns(
      //   selectedPatient.patient_demographic.patient_recordId,
      //   inputFields,
      //   admin.access_token
      // );

      setInputFields(reset);
    } catch (error) {
      console.log(error);
    } finally {
      handleClose();
      setIsLoading(false);
    }
  };
  const getVitalSigns = async () => {
    setIsFetching(true);

    try {
      // const {
      //   data: {
      //     data: { patient_vital_signs }
      //   }
      // } = await vitalSignsService.getVitalSigns(
      //   selectedPatient.patient_demographic.patient_recordId,
      //   admin.access_token
      // );

      // setVitalSigns(patient_vital_signs);
    } catch (error) {
      console.log(error);
    } finally {
      handleClose();
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getVitalSigns();
  }, []);

  return (
    <>
      <div className={styles.medical_history_container}>
        <div className={styles.header}>
          <Image
            src='/assets/dashboard/arrow_left.svg'
            width={'18px'}
            height={'12px'}
            className='cursor-pointer'
            onClick={() => setSelectedRecord(null)}
          />
          <p>{medicalHistory?.label}</p>
        </div>

        <div className={styles.medical_history_}>
          <>
            {isFetching && (
              <div className='flex items-center justify-center'>
                <MoonLoader color='#0055d2' size={30} />
              </div>
            )}
          </>

          {vitalSigns.length < 1 && !isFetching && <p>No history found</p>}
          {vitalSigns.length > 0 &&
            vitalSigns?.map((vital: any, index: any) => (
              <div key={index} className={styles.history_container}>
                <div
                  className={styles.history_header}
                  onClick={(e) => {
                    const content: any = e.currentTarget.nextElementSibling;
                    if (content.style.maxHeight) {
                      content.style.maxHeight = null;
                      e.currentTarget.style.marginBottom = '0px';
                    } else {
                      content.style.maxHeight = content.scrollHeight + 'px';
                      e.currentTarget.style.marginBottom = '16px';
                    }
                  }}
                >
                  <p>{moment(vital?.createdAt).format('Do MMM., YYYY')}</p>
                  <Image
                    src='/assets/dashboard/chevronRight.svg'
                    width={'4.94px'}
                    height={'8px'}
                  />
                </div>

                <div className={styles.collapsible}>
                  <div className={styles.history}>
                    <div className={styles.detail}>
                      <p className={styles.detail_title}>Blood pressure</p>
                      <p className={styles.detail_statement}>
                        {vital?.blood_pressure}
                      </p>

                      <hr style={{ marginTop: '16px' }} />
                    </div>
                    <div className={styles.detail}>
                      <p className={styles.detail_title}>Body temperature</p>
                      <p className={styles.detail_statement}>
                        {vital?.body_temperature}
                      </p>

                      <hr style={{ marginTop: '16px' }} />
                    </div>
                    <div className={styles.detail}>
                      <p className={styles.detail_title}>Pulse rate</p>
                      <p className={styles.detail_statement}>
                        {vital?.pulse_rate}
                      </p>

                      <hr style={{ marginTop: '16px' }} />
                    </div>
                    <div className={styles.detail}>
                      <p className={styles.detail_title}>Respiration rate</p>
                      <p className={styles.detail_statement}>
                        {vital?.respiration_rate}
                      </p>

                      <hr style={{ marginTop: '16px' }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Button onClick={() => setAddHistory(true)} className={styles.add_record}>
        <Image
          src={'/assets/dashboard/plus.svg'}
          width={'14px'}
          height={'14px'}
        />
        <p>Add history</p>
      </Button>

      <Modal
        id={styles.modal_container}
        centered
        show={addHistory}
        onHide={handleClose}
      >
        <div className={styles.label_container}>
          <p>Add Vitals</p>

          <Image
            src={'/assets/dashboard/close_btn_white.svg'}
            width={'14px'}
            height={'14px'}
            onClick={handleClose}
          />
        </div>

        <div className={styles.form_container}>
          <form>
            <div className={styles.form_row}>
              <div className={styles.text_area_container}>
                <label htmlFor='date'>Date</label>
                <Input
                  styles='input_primary'
                  onChange={handleChange}
                  value={inputFields.date}
                  name='date'
                  id='date'
                  placeholder='Enter medication name'
                  type={'datetime-local'}
                />
              </div>

              <div className={styles.text_area_container}>
                <label htmlFor='blood_pressure'>Blood pressure</label>
                <Input
                  styles='input_primary'
                  onChange={handleChange}
                  value={inputFields.blood_pressure}
                  name='blood_pressure'
                  id='blood_pressure'
                  placeholder='Blood pressure'
                  type={'text'}
                />
              </div>

              <div className={styles.text_area_container}>
                <label htmlFor='pulse_rate'>Pulse rate</label>
                <Input
                  styles='input_primary'
                  onChange={handleChange}
                  value={inputFields.pulse_rate}
                  name='pulse_rate'
                  id='pulse_rate'
                  placeholder='Enter pulse rate'
                />
              </div>

              <div className={styles.text_area_container}>
                <label htmlFor='respiration_rate'>Respiration rate</label>
                <Input
                  styles='input_primary'
                  onChange={handleChange}
                  value={inputFields.respiration_rate}
                  name='respiration_rate'
                  id='respiration_rate'
                  placeholder='Respiration rate'
                />
              </div>

              <div className={styles.text_area_container}>
                <label htmlFor='temperature'>Body temperature</label>

                <Input
                  type='text'
                  styles='input_primary'
                  onChange={handleChange}
                  value={inputFields.body_temperature}
                  name='body_temperature'
                  id='temperature'
                  placeholder='Body temperature'
                />
              </div>
            </div>

            <Button
              onClick={handleSave}
              disabled={
                Object.values(inputFields).some((x) => x === '') || isLoading
              }
              className={'btn_primary'}
              style={{ marginTop: '16px' }}
            >
              Save
            </Button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default Vitals;
