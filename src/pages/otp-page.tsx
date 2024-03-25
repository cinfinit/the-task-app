import React, { useEffect, useState } from "react";
import BoxLayout from "~/components/BoxLayout";
import OtpInput from "react-otp-input";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Page = () => {
  const [otp, setOtp] = React.useState("");
  const [receivedData, setReceivedData] = useState("");
  const [receivedEmailData, setreceivedEmailData] = useState("");

  const router = useRouter();

  const clearStorage = () => {
    setTimeout(() => {
      localStorage.removeItem("verifydata"); // Optional: Remove data after retrieving it
    }, 3000);
  };
  const { mutate } = api.authRouter.verifyOTP.useMutation({
    onSuccess: () => {
      toast(`Congrats ! User activated `, { theme: "dark", autoClose: 15000 });
      setTimeout(() => {
        router.push("/login-page");
      }, 3000);
    },
    onError: (e) => {
      console.log("the error ", e);
     
    },
  });
  const optHandler = async () => {
    await mutate({ userid: receivedData, otp });
  };
  useEffect(() => {
    const dataFromStorage = localStorage.getItem("verifydata");
    const userOtp = localStorage.getItem("otpdata");
    const emaildata = localStorage.getItem("emailData");
    toast(`Here is your OTP  ${userOtp}!`, { theme: "dark", autoClose: 15000 });
    if (dataFromStorage) {
      const parsedData = dataFromStorage;
      setReceivedData(parsedData);
      setreceivedEmailData(emaildata);
      console.log("the parsed Data ", parsedData);
      clearStorage();
      // localStorage.removeItem("verifydata"); // Optional: Remove data after retrieving it
    } else {
      router.push("/login-page");
    }
  }, []);


  return (
    <>
      <BoxLayout>
        
        <h1 className="mb-5 text-center text-3xl font-bold text-black">
          Verify your email
        </h1>

        <h3 className="mb-8 text-center text-sm text-black">
          Enter the 8 digit code you have received on <br />
          {receivedEmailData}
        </h3>
        

        <div className="mb-4">
          <label
            htmlFor="otpcode"
            className="block text-sm font-medium text-black"
          >
            Code
          </label>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={8}
            renderSeparator={<span> {` `}</span>}
            inputStyle="mr-2 mt-1 block rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none text-center"
            renderInput={(props) => (
              <input
                {...props}
                style={{ width: "2.5em" }}
              
              />
            )}
          />
        </div>

       
        <button
          className="mb-4 mt-3 w-full rounded-md bg-black px-4 py-2 tracking-widest text-white hover:bg-gray-900 focus:bg-gray-900 focus:outline-none"
          onClick={optHandler}
        >
          VERIFY
        </button>
      </BoxLayout>
      <ToastContainer />
    </>
  );
};

export default Page;
