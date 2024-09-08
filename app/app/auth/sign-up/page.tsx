import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import React from "react";

const SignUp = () => {
    return(
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="UNVX MOD"
            src="/logo.svg"
            className="mx-auto h-50 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign Up your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <Input label="Email" type='email'/>
            <Input label="Username" type='text'/>
            <Input label="Password" type='password'/>
            <Input label="Re-type Password" type='password'/>
            <div className="w-full flex justify-end">
              <Button title="Sign Up"/>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{' '}
            <a href="#" className="font-semibold leading-6 text-primary hover:text-primary/50">
              Sign In now
            </a>
          </p>
        </div>
      </div>
    </>
    )
}

export default SignUp;