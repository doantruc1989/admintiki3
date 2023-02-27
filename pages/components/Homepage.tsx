import { Listbox, Popover, Transition } from "@headlessui/react";
import axios from "axios";
import { Breadcrumb, Dropdown } from "flowbite-react";
import React, { Fragment, useEffect, useState } from "react";
import {
  FaDollarSign,
  FaShoppingBag,
  FaUsers,
  FaUniversity,
  FaHome,
  FaCheck,
} from "react-icons/fa";
import Calenda from "./Calenda";
import LineChart from "./LineChart";
import Notify from "./Notify";
import CheckAuth from "./CheckAuth";
const times = [
  { id: 1, name: "day", unavailable: false },
  { id: 2, name: "week", unavailable: false },
  { id: 3, name: "month", unavailable: false },
];

function Homepage() {
  const [users, setUsers] = useState();
  const [orders, setOrders] = useState([] as any);
  const [money, setMoney] = useState([] as any);
  const [dropdown, setDropdown] = useState(times[0]);
console.log(orders);
  useEffect(() => {
    try {
      axios.get("https://quocson.fatcatweb.top/cart/admin/day").then((res) => {
        setMoney(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    axios.get("https://quocson.fatcatweb.top/users/total").then((res) => {
      setUsers(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("https://quocson.fatcatweb.top/cart/total").then((res) => {
      setOrders(res.data);
    });
  }, []);

  return (
    <div>
      <Breadcrumb aria-label="Default breadcrumb example" className="my-6">
        <Breadcrumb.Item icon={FaHome}>Dashboard</Breadcrumb.Item>
      </Breadcrumb>
      <CheckAuth />
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-5 mb-6">
        <div className="rounded-lg bg-gray-100 h-40 shadow-sm">
          <div className="col-12 lg:col-6 xl:col-4">
            <div className="card mb-0 p-5 ">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="block text-500 font-medium mb-3">Sale</span>
                  <div className="text-900 font-medium text-xl">
                    {Intl.NumberFormat().format(money.sales)}đ
                  </div>
                </div>
                <div
                  className="flex items-center justify-center bg-purple-100 border-round"
                  style={{ width: "2.5rem", height: "2.5rem" }}
                >
                  <FaUniversity className="text-center text-2xl text-cyan-500" />
                </div>
              </div>
              <div>
                <Listbox value={dropdown} onChange={setDropdown}>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-fit cursor-default rounded-lg bg-gray-100 py-2 px-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block truncate">{dropdown.name}</span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute z-10 mt-1 w-fit overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {times.map((time) => (
                          <Listbox.Option
                            key={time.id}
                            value={time}
                            onClick={() => {
                              axios.get(`https://quocson.fatcatweb.top/cart/admin/${time.name}`)
                              .then((res:any) => {
                                setMoney(res.data)
                              })
                            }}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-7 pr-4 ${
                                active
                                  ? "bg-cyan-100 text-cyan-900"
                                  : "text-gray-900"
                              }`
                            }
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {time.name}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-cyan-500">
                                    <FaCheck
                                      className="h-3 w-3"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-gray-100 h-40 shadow-sm">
          <div className="col-12 lg:col-6 xl:col-4">
            <div className="card mb-0 p-5 ">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="block text-500 font-medium mb-3">
                    Revenue
                  </span>
                  <div className="text-900 font-medium text-xl">
                    {Intl.NumberFormat().format(money.revenues)}đ
                  </div>
                </div>
                <div
                  className="flex items-center justify-center bg-orange-100 border-round"
                  style={{ width: "2.5rem", height: "2.5rem" }}
                >
                  <FaDollarSign className="text-center text-2xl text-orange-500" />
                </div>
              </div>
              <div>
                <Listbox value={dropdown} onChange={setDropdown}>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-fit cursor-default rounded-lg bg-gray-100 py-2 px-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block truncate">{dropdown.name}</span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute z-10 mt-1 w-fit overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {times.map((time) => (
                          <Listbox.Option
                            key={time.id}
                            value={time}
                            onClick={() => {
                              axios.get(`https://quocson.fatcatweb.top/cart/admin/${time.name}`)
                              .then((res:any) => {
                                setMoney(res.data)
                              })
                            }}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-7 pr-4 ${
                                active
                                  ? "bg-cyan-100 text-cyan-900"
                                  : "text-gray-900"
                              }`
                            }
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {time.name}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-cyan-500">
                                    <FaCheck
                                      className="h-3 w-3"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-gray-100 h-40 shadow-sm">
          <div className="col-12 lg:col-6 xl:col-3">
            <div className="card mb-0 p-5 ">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="block text-500 font-medium mb-3">
                    Orders
                  </span>
                  <div className="text-900 font-medium text-xl">
                    {orders.countAllOrder}
                    {" cases"}
                  </div>
                </div>
                <div
                  className="flex items-center justify-center bg-blue-100 border-round"
                  style={{ width: "2.5rem", height: "2.5rem" }}
                >
                  <FaShoppingBag className="text-center text-2xl text-blue-600" />
                </div>
              </div>
              <span className="text-green-600 font-medium text-xl">
                {orders.ordersToday}{" "}
              </span>
              <span className="text-500">new today</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-gray-100 h-40 shadow-sm">
          <div className="col-12 lg:col-6 xl:col-4">
            <div className="card mb-0 p-5 ">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="block text-500 font-medium mb-3">
                    Customers
                  </span>
                  <div className="text-900 font-medium text-xl">{users}</div>
                </div>
                <div
                  className="flex items-center justify-center bg-cyan-100 border-round"
                  style={{ width: "2.5rem", height: "2.5rem" }}
                >
                  <FaUsers className="text-center text-2xl text-purple-500" />
                </div>
              </div>
              <span className="text-green-600 font-medium text-xl">
                {users + " " + "new "}
              </span>
              <span className="text-500">since last visit</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid md:grid-cols-2 gap-5">
        <div className="w-full">
          <div className="bg-gray-100 w-full shadow-sm rounded-lg p-5 mb-5">
            <Notify />
          </div>
          <div className="bg-gray-100 w-full shadow-sm rounded-lg p-5">
            <Calenda />
          </div>
        </div>

        <div className="w-full">
          <div className="bg-gray-100 w-full shadow-sm rounded-lg p-5">
            <LineChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
