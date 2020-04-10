const initialState = {
  login: {
    username: "",
    password: "",
    InvalidLogin: "",
    loggedIn: false,
  },
  allPackages: {
    packages: [],
    search: "",
    modal: false,
  },
  admin: {
    users: [],
  },
  allResidents: {
    residents: [],
    modal: false,
  },
  confirmation: {
    companyName: "",
    name: "",
    additionalInfo: "",
    deliveryDate: "",
  },
  editPackage: {
    companyName: [],
    name: [],
    additionalInfo: "",
    deliveryDate: "",
    companyId: "",
    residentId: "",
    packageConfirmation: false,
    currentPackageData: null,
    isDelivered: false,
  },
  editResident: {
    name: "",
    email: "",
    phone: "",
  },
  package: {
    companyName: [],
    name: [],
    deliveryDate: "",
    additionalInfo: "",
    companyId: "",
    residentId: "",
    packageConfirmation: false,
    packageId: "",
    isDelivered: false,
    isDeleted: false,
  },
  register: {
    username: "",
    password: "",
    role: "",
  },
  resident: {
    name: "",
    email: "",
    phone: "",
    isDeleted: false,
    residentConfirmation: false
  }
};

export default initialState;
