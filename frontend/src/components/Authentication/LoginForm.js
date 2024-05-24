'use client'

import {useFormState} from 'react-dom'

import FormInput from "@/components/Authentication/FormInput";
import logIn from "@/apis/logIn";
import Link from "next/link";

import './style.css'

const LoginForm = () => {
  const [state, action] = useFormState(logIn, undefined)

  return (
    <form style={FormStyle} action={action}>
      <FormInput name={"name"} placeholder={"USERNAME"}>
      </FormInput>
      <FormInput name={"password"} placeholder={"PASSWORD"} type={"password"}>
      </FormInput>
      <button style={ButtonStyle} type="submit">Login</button>
      {state && state.error && (
        <div style={{
          padding: 0,
          margin: 0,
        }}>
          <p style={{
            padding: 0,
            margin: 0,
          }}>
            {state.error}
          </p>
        </div>
      )}
      <Link href={'/register'}> Register </Link>
    </form>
  )
}

const FormStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
}

const ButtonStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '18.75rem',
  height: '2.8125rem',
  borderRadius: '0.25rem',
}

export default LoginForm;