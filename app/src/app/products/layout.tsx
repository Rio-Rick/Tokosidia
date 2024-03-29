import Navbar from "@/components/Navbar";

const NavbarProductLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default NavbarProductLayout;
