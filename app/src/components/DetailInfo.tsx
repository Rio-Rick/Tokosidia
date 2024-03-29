export default function DetailInfo() {
  return (
    <div className="flex-col md:flex-col lg:flex-row flex">
      <div className="basis-4/12 md:pl-16">
        <h1 className=" font-bold text-xl">Tokosidia</h1>
        <p className="text-sm">Tentang Tokosidia</p>
        <p className="text-sm">Hak kekayaan intelektual</p>
        <p className="text-sm">Karir</p>
        <p className="text-sm">Mitra Blog</p>
        <p className="text-sm">Blog</p>
        <p className="text-sm">Tokosidia Farma</p>
      </div>
      <div className="basis-4/12 gap-y-5 flex flex-col">
        <div>
          <h1 className=" font-bold text-xl">Beli</h1>
          <p className="text-sm">Tagihan & Top up</p>
          <p className="text-sm">Tukar Tambah</p>
          <p className="text-sm">COD</p>
        </div>
        <div>
          <h1 className=" font-bold text-xl">Jual</h1>
          <p className="text-sm">Pusat Edukasi Seller</p>
          <p className="text-sm">Mitra</p>
          <p className="text-sm">Daftar Official Store</p>
        </div>
        <div>
          <h1 className=" font-bold text-xl">Bantuan dan Panduan</h1>
          <p className="text-sm">Tokosidia Care</p>
          <p className="text-sm">Syarat dan Ketentuan</p>
          <p className="text-sm">Kebijakan Privasi</p>
        </div>
      </div>
      <div className="basis-6/12 mb-10">
        <img
          className="h-80 ml-12 rounded-2xl"
          src="https://th.bing.com/th/id/OIG2.N4xH0roSuY9UPD0RZTke?pid=ImgGn"
          alt="logo"
        />
        <p className="ml-24">© 2002 - 2024, PT. Tokosidia.</p>
      </div>
    </div>
  );
}
