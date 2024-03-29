
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import SearchProducts from "./SearchProducts";
export default function Navbar() {
  const cookiesStore = cookies();
  const access_token = cookiesStore.get("access_token");
  return (
    <div className="flex flex-row border-b-2 pb-3 pt-2">
      <div className="basis-4/12">
        <Link href="/">
          <h1 className="font-mono m-3 text-3xl self-center">Tokosidia</h1>
        </Link>
      </div>
      <SearchProducts />
      {!access_token ? (
        <div className="basis-2/12 justify-center flex self-center gap-3">
          <Link className="border-2 p-1.5 rounded-md" href="/login">
            Masuk
          </Link>
          <Link className="border-2 p-1.5 rounded-md" href="/register">
            Daftar
          </Link>
        </div>
      ) : (
        <div className="basis-2/12 justify-center flex self-center gap-3">
          <Link className="border-2 p-1.5 rounded-md" href="/wishlist">
            <img
              className="w-5"
              src="https://cdn-icons-png.flaticon.com/512/868/868517.png"
              alt=""
            />
          </Link>
          <form
            action={async () => {
              'use server'
              cookies().get("access_token") && cookies().delete("access_token");
              revalidatePath("/", "page");
              redirect("/login");
            }}
          >
            <button className="border-2 p-1.5 rounded-md" type="submit">
              Log Out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
