import React from "react";
import LoginForm from "../composants/form/LoginForm";
import RegisterForm from "../composants/form/RegisterForm";

const Auth = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-10 bg-gray-100">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>

      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Auth;
