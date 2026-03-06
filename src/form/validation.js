const validateField = (name, value, values) => {
  switch (name) {
    case 'email':
      return value.includes('@') ? '' : 'Invalid email'

    case 'username':
      return value.length >= 3 ? '' : 'Min 3 characters'

    case 'password':
      return value.length >= 6 ? '' : 'Min 6 characters'

    case 'confirmPassword':
      return value === values.password ? '' : 'Passwords do not match'

    case 'companyName':
      return values.accountType === 'business' && !value
        ? 'Company name required'
        : ''

    default:
      return ''
  }
}

export default validateField
