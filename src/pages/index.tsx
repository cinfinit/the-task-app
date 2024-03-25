import Head from "next/head";
import BoxLayout from "~/components/BoxLayout";

export default function Home() {
  return (
    <>
      <BoxLayout>
        <Head>
          <title>The Task App </title>
          <meta name="description" content="Generated by create-t3-app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1 className="mb-5 text-center text-3xl font-bold text-black">
          Welcome
        </h1>
        <h3 className="mb-1 text-center text-xl font-bold text-black">
          So , here are the end points via which you can navigate
        </h3>
        <ul className="text-center">
          <li>
            <a
              href="/signup-page"
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Signup Page{" "}
            </a>
          </li>
          <li>
            <a
              href="/login-page"
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Login Page{" "}
            </a>
          </li>
        </ul>
      </BoxLayout>
    </>
  );
}
