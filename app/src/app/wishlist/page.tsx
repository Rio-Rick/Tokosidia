import Navbar from "@/components/Navbar";
import ServerProtectedComponents from "@/components/ServerProtectedComponents";
import UserWishList from "@/components/UserWishList";

const WishList = () => {

  return (
    <>
      <ServerProtectedComponents>
        <Navbar/>
        {/* <h1>this is page WishList</h1> */}
        <UserWishList />
      </ServerProtectedComponents>
    </>
  );
};

export default WishList;
