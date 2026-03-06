const initialState = {
  step: 1,
  values: {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    accountType: 'personal',
    companyName: '',
  },
  errors: {},
  touched: {},
  asyncValidating: false,
  asyncError: null,
}

export default initialState
