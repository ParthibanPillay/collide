import SignUpForm from '@/components/SignUpForm'
import { SignIn, SignUp } from '@clerk/nextjs'
import React from 'react'

const SignUpPage = () => {
  return (
    <div className='flex items-center justify-center'>
      <SignUp />
    </div>
  )
}

export default SignUpPage
