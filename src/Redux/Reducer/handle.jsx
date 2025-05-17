const initialState = {
  profile: {},
  hospitalList: [],
  doctorList: [],
  doctorProfile: {},
  bloodGroupList: [],
  contactList: []
};

const handle = (state = initialState, action) => {
  switch (action.type) {
    case 'profile':
      return {
        ...state,
        profile: action.payload,
      };

    case 'hospital_list':
      return {
        ...state,
        hospitalList: action.payload,
      };

    case 'doctor_list':
      return {
        ...state,
        doctorList: action.payload,
      };

    case 'doctor_profile':
      return {
        ...state,
        doctorProfile: action.payload,
      };

    case 'bloodgroup_list':
      return {
        ...state,
        bloodGroupList: action.payload,
      };

    case 'contact_list':
      return {
        ...state,
        contactList: action.payload,
      };

    default:
      return state;
  }
};

export default handle;