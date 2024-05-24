'use server'

import 'dotenv/config'
import {console} from "next/dist/compiled/@edge-runtime/primitives";
import {z} from 'zod'
import axios from "axios";
import {createSession} from "@/apis/session";
import {redirect} from "next/navigation";

const SignUpFormSchema = z.object({
  name: z
  .string()
  .min(2, {message: 'Be at least 2 characters long.'})
  .trim(),

  password: z
  .string()
  .min(4, {message: 'Be at least 4 characters long'})
  .regex(/[a-zA-Z]/, {message: 'Contain at least one letter.'})
  .regex(/[0-9]/, {message: 'Contain at least one number.'})
  .trim(),

  confirmPassword: z
  .string()
  .trim()
}).refine((schema) => {
  return schema.password === schema.confirmPassword
}, {message: `Password doesn't match!`})

const signUp = async (state, formData) => {
  const validatedFields = SignUpFormSchema.safeParse({
    name: formData.get('name'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword')
  })
  let userId = null
  if (!validatedFields.success) {
    console.log('You failed!')
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      formErrors: validatedFields.error.flatten().formErrors
    }
  }

  const registerStatus = await axios({
    url: process.env.HOST||'http://localhost:5000/register',
    method: 'post',
    data: {
      username: validatedFields.data.name,
      password: validatedFields.data.password
    }
  }).then((res) => {
    if (res.data['message'] !== 'ok') {
      return {
        message: res.data['message']
      }
    }
    userId = res.data['userId']
    return {
      message: 'ok'
    }
  }).catch((err) => {
    console.log(err)
  })

  if (registerStatus.message !== 'ok') {
    return {
      error: registerStatus.message
    }
  }
  if (userId === null) {
    // console.log('hihi')
    return {
      message: 'Register failed!'
    }
  }

  redirect('/login')

  // return validatedFields;
}
export default signUp