"use client"
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { useUserHook } from "@/features/hooks/user-hook";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignIn = () => {

  const { user, login } = useUserHook();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (user) router.push('/');

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
            <Input label="Username" type='text' onTextChange={setEmail}/>
            <Input label="Password" type='password'  onTextChange={setPassword}/>
            <div className="w-full flex justify-end">
              <Button title="Sign In" onClick={() => login({
                email, password
              })}/>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="#" className="font-semibold leading-6 text-primary hover:text-primary/50">
              Sign Up now
            </a>
          </p>
        </div>
      </div>
    </>
    )
}

export default SignIn;