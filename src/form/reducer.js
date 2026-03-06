import validateField from './validation'

export default function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        values: {
          ...state.values,
          [action.name]: action.value,
        },
        errors: {
          ...state.errors,
          [action.name]: validateField(action.name, action.value, {
            ...state.values,
            [action.name]: action.value,
          }),
        },
      }

    case 'SET_TOUCHED':
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.name]: true,
        },
      }

    case 'SET_ASYNC_STATUS':
      return {
        ...state,
        asyncValidating: action.loading,
        asyncError: action.error,
      }

    case 'NEXT_STEP':
      return {...state, step: state.step + 1}

    case 'PREV_STEP':
      return {...state, step: state.step - 1}

    default:
      return state
  }
}
