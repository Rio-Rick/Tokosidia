import ErrorMessageComponent from "@/components/ErrorMessage";
import Link from "next/link";
import { onLogin } from "./action";
export const dynamic = "force-dynamic";

const Login = () => {
  return (
    <>
      <div className="flex justify-center ">
        <Link href="/">
          <h1 className="font-mono h-10 mt-5 mb-20 text-2xl font-bold">
            Tokosidia
          </h1>
        </Link>
      </div>
      <div className="flex-row flex justify-center">
        <div className="m-10">
          <img
            className="h-80 ml-12"
            src="https://th.bing.com/th/id/OIG2.W72slC.faSIOoQCH1DEe?w=1024&h=1024&rs=1&pid=ImgDetMain"
            alt="logo"
          />
          <div className="text-center">
            <h2 className="font-bold text-2xl">
              Jual beli mudah hanya di Tokosidia
            </h2>
            <p className="text-sm">
              Gabung dan rasakan kemudahan bertransaksi di Tokosidia
            </p>
          </div>
        </div>
        <div className="border-2 w-4/12 rounded p-5">
          <form action={onLogin}>
            <h1 className="text-center font-bold text-xl">Login</h1>
            <div className="flex justify-center mb-7">
              <h3>belum punya akun ?</h3>
              <Link className="text-sky-500" href="/register">
                Register
              </Link>
            </div>
            <ErrorMessageComponent />
            <div className="mt-4">
              <label
                className="block font-medium text-sm text-gray-700"
                htmlFor="email"
              />
              <input
                required
                type="email"
                name="email"
                placeholder="Email"
                className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
              />
            </div>

            <div className="mt-4">
              <label
                className="block font-medium text-sm text-gray-700"
                htmlFor="password"
              />
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#f84525]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-10 border-2 h-12 rounded-lg bg-slate-300 flex justify-center w-full p-2.5"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
