import axios from 'axios';
// import Router from 'next/router';

const API_ENDPOINT = 'https://dev-api-phamtom.herokuapp.com/api/';

const restAgent = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json'
  }
});

export let requestCode: any = 0;

restAgent.interceptors.response.use(undefined, (error) => {
  const statusCode = error.response ? error.response.status : null;

  console.log('Inte', statusCode);
  if (
    (statusCode && statusCode === 401) ||
    (statusCode && statusCode === 403)
  ) {
    requestCode = statusCode;

    // Router.push('/auth/login');
  } else {
    requestCode = 0;
  }
});

const getRequestConfig: any = () => {
  return {
    headers: {},
    params: {}
  };
};

// Register admin
export const registerAdmin = (data: any) => {
  const config = getRequestConfig();
  return restAgent.post('v2/admins', data, config);
};

// Login admin
export const loginAdmin = (data: any) => {
  const config = getRequestConfig();
  return restAgent.post('v2/auth-admin', data, config);
};

// attempt to login admin
export const attemptLoginAdmin = (data: any) => {
  const config = getRequestConfig();
  return restAgent.post('v2/auth-admin', data, config);
};

export const staffsService = {
  getAllStaffs: (token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.get('v2/staffs', config);
  },
  addStaff: (token: any, data: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.post('v2/staffs', data, config);
  }
};

// get all patient
export const patientsService = {
  getAllPatients: (token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.get('v2/patients', config);
  },
  getTotalPatients: (token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.get('v2/patients/numberofpatientrecord', config);
  },
  getPatientsAddedToday: (token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.get('v2/patients/patientregisterin24hr', config);
  },
  addPatient: (data: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.post('v2/patients', data, config);
  }
};

// medical History Service

export const medicalHistoryService = {
  // add medical history
  addMedicalHistory: (data: any, patientId: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.post(
      `v2/patients/${patientId}/medical-histories`,
      data,
      config
    );
  },

  // get all medical history
  getAllMedicalHistory: (patientId: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.get(`v2/patients/${patientId}/medical-histories`, config);
  },

  // get single medical history
  getSingleMedicalHistory: (
    patientId: any,
    medicalHistoryId: any,
    token: any
  ) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.get(
      `v2/patients/${patientId}/medical-histories/${medicalHistoryId}`,
      config
    );
  }
};

// medication service

export const medicationService = {
  // add  medication history
  addMedicationHistory: (patientId: any, data: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.post(
      `v2/patients/${patientId}/medication-histories`,
      data,
      config
    );
  }
};

// lab service

export const labService = {
  // add  lab history
  addLabTest: (patientId: any, data: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.post(
      `v2/patients/${patientId}/laboratory-tests`,
      data,
      config
    );
  },

  // get all lab history

  getAllLabTest: (patientId: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.get(`v2/patients/${patientId}/laboratory-tests`, config);
  },
  // get single lab history
  getSingleLabTest: (patientId: any, medicalHistoryId: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.get(
      `v2/patients/${patientId}/laboratory-tests/${medicalHistoryId}`,
      config
    );
  }
};

// soap service
export const soapService = {
  addSOAP: (patientId: any, data: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.post(`v2/patients/${patientId}/assessments`, data, config);
  },
  getAllSOAP: (patientId: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.get(`v2/patients/${patientId}/assessments`, config);
  }
};

export const vitalSignsService = {
  getVitalSigns: (patientId: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.get(`v2/patients/${patientId}/vital-signs`, config);
  },
  addVitalSigns: (patientId: any, data: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.post(`v2/patients/${patientId}/vital-signs`, data, config);
  }
};

export const pharmacyService = {
  setupPharmacy: (adminId: any, data: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.post(`v2/online-pharmacy/${adminId}`, data, config);
  },
  getPharmacy: (adminId: any, token: any) => {
    const config = getRequestConfig();
    config.headers.Authorization = `Bearer ${token}`;
    return restAgent.get(`v2/online-pharmacy/${adminId}`, config);
  }
};
