

import { useRouter } from "next/router";
import React from "react";
import BoxLayout from "~/components/BoxLayout";
import InputField from "~/components/InputField";
import useForm from "~/hooks/useForm";

import { api } from "~/utils/api";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SignUpPage: React.FC = () => {
  const router = useRouter();

  const { mutate } = api.authRouter.signup.useMutation({
    onSuccess: (dataObj) => {
      localStorage.setItem("verifydata", dataObj.userid);
      localStorage.setItem("otpdata", dataObj.userOtp);
      localStorage.setItem("emailData", dataObj.email);

      router.push("/otp-page");
    },
    onError: (e) => {
      toast(`${e}`, { theme: "dark" });
      console.log("the error ", e);
    },
  });
  const obSubmit = async () => {
    const { name, email, password } = formData;

    await mutate({ name, email, password });
  };
  const { formData, errors,  handleChange, handleSubmit } = useForm(
    {
      name: "",
      email: "",
      password: "",
    },

    obSubmit,
    "signuppage",
  );

  return (
    <>
      <BoxLayout>
        <h1 className="mb-8 text-center text-3xl font-bold text-black">
          Create your account
        </h1>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          <button
            type="submit"
            className="mb-4 mt-3 w-full rounded-md bg-black px-4 py-2 tracking-widest text-white hover:bg-gray-900 focus:bg-gray-900 focus:outline-none"
           
          >
            CREATE ACCOUNT
          </button>
        </form>
        <div className="mt-3 flex items-center justify-center">
          <span className="text-sm text-black">Have an account?</span>
          <a
            href="/login"
            className="ml-1 text-sm font-bold tracking-widest hover:underline"
          >
            LOGIN
          </a>
        </div>
      </BoxLayout>
      <ToastContainer />
    </>
  );
};

export default SignUpPage;
