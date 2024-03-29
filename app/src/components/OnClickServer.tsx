'use server'
import ServerProtectedComponents from "./ServerProtectedComponents";

export default async function OnClickServer () {
    const handleWishList = async(event: React.MouseEvent<HTMLElement>) => {
      console.log(event, "ini event click");
    };
  
    return (
      <ServerProtectedComponents>
        <button onClick={handleWishList}>Add to WishList</button>
      </ServerProtectedComponents>
    );
  }