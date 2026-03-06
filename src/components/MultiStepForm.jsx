import React, {useReducer, useCallback, useMemo} from 'react'
import initialState from '../form/initialState'
import reducer from '../form/reducer'
import checkUsernameUnique from './api/userAPI'
import Input from './Input'

export default function MultiStepForm() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleChange = useCallback((name, value) => {
    dispatch({type: 'SET_FIELD', name, value})
  }, [])

  const handleBlur = useCallback(
    async (name) => {
      dispatch({type: 'SET_TOUCHED', name})

      if (name === 'username') {
        dispatch({type: 'SET_ASYNC_STATUS', loading: true, error: null})

        const isUnique = await checkUsernameUnique(state.values.username)

        dispatch({
          type: 'SET_ASYNC_STATUS',
          loading: false,
          error: isUnique ? null : 'Username already taken',
        })
      }
    },
    [state.values.username],
  )

  const isStepValid = useMemo(() => {
    return Object.values(state.errors).every((e) => !e) && !state.asyncError
  }, [state.errors, state.asyncError])

  return (
    <div style={{maxWidth: 400}}>
      {state.step === 1 && (
        <>
          <Input
            label="Email"
            name="email"
            value={state.values.email}
            error={state.touched.email && state.errors.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <Input
            label="Username"
            name="username"
            value={state.values.username}
            error={
              state.touched.username &&
              (state.errors.username || state.asyncError)
            }
            onChange={handleChange}
            onBlur={handleBlur}
          />

          {state.asyncValidating && <div>Checking availability...</div>}

          <button
            disabled={!isStepValid}
            onClick={() => dispatch({type: 'NEXT_STEP'})}
          >
            Next
          </button>
        </>
      )}

      {state.step === 2 && (
        <>
          <Input
            label="Password"
            name="password"
            type="password"
            value={state.values.password}
            error={state.touched.password && state.errors.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={state.values.confirmPassword}
            error={
              state.touched.confirmPassword && state.errors.confirmPassword
            }
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <button onClick={() => dispatch({type: 'PREV_STEP'})}>Back</button>
          <button disabled={!isStepValid} onClick={() => alert('Submitted!')}>
            Submit
          </button>
        </>
      )}
    </div>
  )
}
