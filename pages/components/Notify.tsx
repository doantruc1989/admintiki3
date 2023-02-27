import axios from "axios";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";

function Notify() {
  const [notify, setNotify] = useState([] as any);
  const [status, setStatus] = useState([] as any)
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    try {
      axios.get("https://quocson.fatcatweb.top/lowquantity").then((res: any) => {
        setNotify(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      axios.get("https://quocson.fatcatweb.top/cart/admin/checkstatus").then((res: any) => {
        setStatus(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="relative p-3">
      <div className="flex justify-between items-center w-full">
        <p className="text-gray-700 font-medium">Notifications</p>
        <a className="text-sm text-blue-500 cursor-pointer"
        onClick={() => {
          setIsActive(true)
        }}
        >
          Mark all as read
        </a>
      </div>
      <div className="mt-4 grid gap-4 grid-cols-1 overflow-hidden">
        {notify.map((item: any) => {
          return (
            <div className="flex items-center text-sm" key={item.id}>
              <div className="rounded-full shrink-0 bg-green-200 h-8 w-8 flex items-center justify-center">
                <FaCheck className="h-3 w-3 text-green-600" />
              </div>
              <div className='ml-4'>
              <Link href={"/productmanagement"}>
                <div className={isActive? "font-normal text-gray-700" : "font-medium text-gray-700"}>
                  {"SP có Id " +
                    item.id +
                    " " +
                    item.productName.substring(0, 20) +
                    "..." +
                    "chỉ còn " +
                    item.quantity +
                    " sp"}
                </div>
                <p className="text-sm text-gray-500 truncate">
                  Vui lòng nhập kho thêm
                </p>
                </Link>
              </div>
            </div>
          );
        })}

        {status.map((item:any) => {
          return(
            <div className="flex items-center text-sm" key={item.id}>
              <div className="rounded-full shrink-0 bg-green-200 h-8 w-8 flex items-center justify-center">
                <FaCheck className="h-3 w-3 text-green-600" />
              </div>
              <div className="ml-4">
                <Link href={"/ordermanagement"}>
                <div className={isActive? "font-normal text-gray-700" : "font-medium text-gray-700"}>
                  {"Order có id " +
                    item.id +
                    " do user có id " +
                    item.userId + " {" + item.username +
                    "} đặt vẫn chưa được xử lý"}
                </div>
                <p className="text-sm text-gray-500 truncate">
                  Vui lòng xử lý và gửi hàng sớm
                </p>
                </Link>
              </div>
            </div>
          )
        })}

        {/* <div className="flex items-center">
          <div className="rounded-full shrink-0 bg-green-200 h-8 w-8 flex items-center justify-center">
            <FaCheck className="h-3 w-3 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="font-medium text-gray-700">Notification Title</p>
            <p className="text-sm text-gray-500 truncate">
              Test Notification text for design
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="rounded-full shrink-0 bg-green-200 h-8 w-8 flex items-center justify-center">
            <FaCheck className="h-3 w-3 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="font-medium text-gray-700">Notification Title</p>
            <p className="text-sm text-gray-500 truncate">
              Test Notification text for design
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="rounded-full shrink-0 bg-green-200 h-8 w-8 flex items-center justify-center">
            <FaCheck className="h-3 w-3 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="font-medium text-gray-700">Notification Title</p>
            <p className="text-sm text-gray-500 truncate">
              Test Notification text for design
            </p>
          </div>
        </div> */}

      </div>
    </div>
  );
}

export default Notify;
