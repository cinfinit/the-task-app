import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BoxLayout from "~/components/BoxLayout";

const Custom404 = () => {
  const router = useRouter();

  const [countdown, setCountdown] = useState(7);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    if (countdown === 0) {
      router.push("/");
    }

    return () => clearInterval(timer);
  }, [countdown, router]);
  return (
    <>
      <BoxLayout>
        <h1 className="mb-5 text-center text-3xl font-bold text-black">
          Well , you just went to 404 the place that doesn't exist in this realm
          :|
        </h1>
        <h3 className="text-l mb-1 text-center font-bold text-black">
          Wrong page detected ... Where are you roaming :0
        </h3>
        <h3 className="text-l mb-1 text-center font-bold text-black">
          Teleporting you to the correct page in t - {countdown} seconds
        </h3>
      </BoxLayout>
    </>
  );
};

export default Custom404;
