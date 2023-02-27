import { forwardRef } from "react";
import Link from "next/link";
import {
  FaHome,
  FaBorderAll,
  FaUser,
  FaRegFolderOpen,
  FaWallet,
  FaChartBar,
} from "react-icons/fa";
import { useRouter } from "next/router";

const SideBar = forwardRef(({ showNav }: any, ref: any) => {
  const router = useRouter();

  return (
    <div ref={ref} className="fixed z-20 w-56 h-full bg-white shadow-sm">
      <div className="flex justify-center mt-6 mb-14">
        <picture>
          <img className="w-32 h-auto" src="/logotiki.png" alt="company logo" />
        </picture>
      </div>

      <div className="flex flex-col">
        <Link href="/">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/"
                ? "bg-blue-100 text-blue-500"
                : "text-gray-400 hover:bg-blue-100 hover:text-blue-500"
            }`}
          >
            <div className="mr-2">
              <FaHome className="h-5 w-5" />
            </div>
            <div>
              <p>Dash Board</p>
            </div>
          </div>
        </Link>

        <Link href="/usermanagement">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/usermanagement"
                ? "bg-blue-100 text-blue-500"
                : "text-gray-400 hover:bg-blue-100 hover:text-blue-500"
            }`}
          >
            <div className="mr-2">
              <FaUser className="h-5 w-5" />
            </div>
            <div>
              <p>User Page</p>
            </div>
          </div>
        </Link>
        <Link href="/productmanagement">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/productmanagement"
                ? "bg-blue-100 text-blue-500"
                : "text-gray-400 hover:bg-blue-100 hover:text-blue-500"
            }`}
          >
            <div className="mr-2">
              <FaRegFolderOpen className="h-5 w-5" />
            </div>
            <div>
              <p>Product Page</p>
            </div>
          </div>
        </Link>
        <Link href="/ordermanagement">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/ordermanagement"
                ? "bg-blue-100 text-blue-500"
                : "text-gray-400 hover:bg-blue-100 hover:text-blue-500"
            }`}
          >
            <div className="mr-2">
              <FaWallet className="h-5 w-5" />
            </div>
            <div>
              <p>Order Page</p>
            </div>
          </div>
        </Link>
        
        <Link href="/homemanagement">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/homemanagement"
                ? "bg-blue-100 text-blue-500"
                : "text-gray-400 hover:bg-blue-100 hover:text-blue-500"
            }`}
          >
            <div className="mr-2">
              <FaBorderAll className="h-5 w-5" />
            </div>
            <div>
              <p>Home Page</p>
            </div>
          </div>
        </Link>
        
        <Link href="/chartmanagement">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/chartmanagement"
                ? "bg-blue-100 text-blue-500"
                : "text-gray-400 hover:bg-blue-100 hover:text-blue-500"
            }`}
          >
            <div className="mr-2">
              <FaChartBar className="h-5 w-5" />
            </div>
            <div>
              <p>Chart Page</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;
