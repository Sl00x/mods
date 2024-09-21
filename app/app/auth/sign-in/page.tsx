"use client";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { useUserHook } from "@/features/hooks/user-hook";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignIn = () => {
  const { user, login, loginLoading } = useUserHook();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (user) router.push("/");

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-white p-6 rounded-md shadow-md">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="UNVX MOD"
              src="/logo_l.svg"
              className="mx-auto h-50 w-auto"
            />
            <h2 className="mt-10 text-center text-xl uppercase font-bold text-gray-900/50">
              Sign Up your account
            </h2>
          </div>
          <div className="space-y-6 mt-10">
            <Input
              label="e-mail"
              type="text"
              placeholder="uvxmod@mail.com"
              onTextChange={setEmail}
              required
            />
            <Input
              label="Password"
              type="password"
              onTextChange={setPassword}
              required
            />
            <div className="w-full flex justify-end">
              <Button
                title="Sign Me"
                loading={loginLoading}
                onClick={() =>
                  login({
                    email,
                    password,
                  })
                }
                color={"primary"}
              />
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-primary hover:text-primary/50"
            >
              Sign Up now
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
