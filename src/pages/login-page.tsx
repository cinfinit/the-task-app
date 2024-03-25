import { useRouter } from "next/router";
import React from "react";
import BoxLayout from "~/components/BoxLayout";
import InputField from "~/components/InputField";

import useForm from "~/hooks/useForm";
import { api } from "~/utils/api";

const LoginPage = () => {
  const router = useRouter();

  const { mutate } = api.authRouter.login.useMutation({
    onSuccess: (dataObj) => {
      if (dataObj) {
 
        localStorage.setItem("token", JSON.stringify(dataObj.token));
        localStorage.setItem("useremail", JSON.stringify(dataObj.email));

        router.push(`/data-page/${dataObj.userid}`);
      }
   
    },
    onError: (e) => {
      console.log("the error ", e);
    
    },
  });
  const obSubmit = async () => {
    const { email, password } = formData;
    
    await mutate({ email, password });
  };
  const { formData, errors,  handleChange, handleSubmit } = useForm(
    {
      name: "",
      email: "",
      password: "",
    },

    obSubmit,
    "loginpage",
  );

  return (
    <>
      <BoxLayout>
      
        <h1 className="mb-5 text-center text-3xl font-bold text-black">
          Login
        </h1>
        <h3 className="mb-1 text-center text-xl font-bold text-black">
          Welcome back to ECOMMERCE
        </h3>
        <h1 className="mb-8 text-center text-sm text-black">
          The next gen business marketplace
        </h1>
       
        <form onSubmit={handleSubmit}>
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
       
          <button className="mb-4 mt-3 w-full rounded-md bg-black px-4 py-2 tracking-widest text-white hover:bg-gray-900 focus:bg-gray-900 focus:outline-none">
            LOGIN
          </button>
        </form>

        <hr />

        <div className="mt-3 flex items-center justify-center">
          <span className="text-sm text-black">Don't have an Account?</span>
          <a
            href="/loginpage"
            className=" ml-1 text-sm font-bold tracking-widest hover:underline"
          >
            SIGNUP
          </a>
        </div>
      </BoxLayout>
    </>
  );
};

export default LoginPage;
