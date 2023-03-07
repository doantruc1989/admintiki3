import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { Breadcrumb, Button, Label, Pagination, Table } from "flowbite-react";
import React, { Fragment, ReactElement, useEffect, useState } from "react";
import {
  FaEdit,
  FaHome,
  FaRegTrashAlt,
  FaSortAmountDownAlt,
  FaSortAmountUp,
} from "react-icons/fa";
import { toast } from "react-toastify";
import CheckAuth from "../components/CheckAuth";
import Layout from "../components/Layout";
import Pagi from "../components/Pagi";

function Index() {
  const [orders, setOrders] = useState([] as any);
  const [ordersById, setOrdersById] = useState([] as any);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [page, setPage] = useState(1);

  const [editStatus, setEditStatus] = useState(0);

  const [search, setSearch] = useState("");
  const [filterCartTotal, setFilterCartTotal] = useState("adminasc");
  const [filterUserId, setFilterUserId] = useState("adminasc");
  const [filterStatus, setFilterStatus] = useState("adminasc");
  const [filterDate, setFilterDate] = useState("adminasc");

  console.log(ordersById);

  useEffect(() => {
    try {
      axios
        .get(
          `https://quocson.fatcatweb.top/cart/admin/listorder/search?search=searchall&sortBy=${search}`
        )
        .then((res: any) => {
          setOrders(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [search, editModal]);

  useEffect(() => {
    try {
      axios
        .get(`https://quocson.fatcatweb.top/cart/admin/listorder?page=${page}`)
        .then((res) => {
          setOrders(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [page, editModal]);

  const handleClickCartTotal = () => {
    try {
      axios
        .get(
          `https://quocson.fatcatweb.top/cart/admin/listorder/search?search=${filterCartTotal}&sortBy=cartTotal`
        )
        .then((res: any) => {
          setOrders(res.data);
          if (filterCartTotal === "adminasc") {
            setFilterCartTotal("admindesc");
          } else {
            setFilterCartTotal("adminasc");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickUserId = () => {
    try {
      axios
        .get(
          `https://quocson.fatcatweb.top/cart/admin/listorder/search?search=${filterUserId}&sortBy=userId`
        )
        .then((res: any) => {
          setOrders(res.data);
          if (filterUserId === "adminasc") {
            setFilterUserId("admindesc");
          } else {
            setFilterUserId("adminasc");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickDate = () => {
    try {
      axios
        .get(
          `https://quocson.fatcatweb.top/cart/admin/listorder/search?search=${filterDate}&sortBy=createdAt`
        )
        .then((res: any) => {
          setOrders(res.data);
          if (filterDate === "adminasc") {
            setFilterDate("admindesc");
          } else {
            setFilterDate("adminasc");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickStatus = () => {
    try {
      axios
        .get(
          `https://quocson.fatcatweb.top/cart/admin/listorder/search?search=${filterStatus}&sortBy=status`
        )
        .then((res: any) => {
          setOrders(res.data);
          if (filterStatus === "adminasc") {
            setFilterStatus("admindesc");
          } else {
            setFilterStatus("adminasc");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange =(newPage :number) => {
    setPage(newPage)
  }

  return (
    <div className="my-6">
      <Breadcrumb aria-label="Default breadcrumb example" className="my-6">
        <Breadcrumb.Item href="/" icon={FaHome}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item>Order Management</Breadcrumb.Item>
      </Breadcrumb>
      <CheckAuth />
      <h1 className="mb-6 font-bold uppercase text-xl text-center">
        Orders management
      </h1>
      <div className="flex justify-end">
        <form className="w-1/2 md:w-7/12 lg:11/12">
          <div className="flex mb-5">
            <div className="relative w-full ">
              <input
                type="search"
                value={search}
                onChange={(e: any) => {
                  setSearch(e.target.value);
                }}
                id="search-dropdown"
                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg  border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                placeholder="by Id, userId, status..."
                required
              />
              <button
                type="submit"
                className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="mx-auto">
        <Table hoverable={true}>
          <Table.Head>
            <Table.HeadCell>Id</Table.HeadCell>
            <Table.HeadCell>Order Detail</Table.HeadCell>
            <Table.HeadCell>
              <a className="cursor-pointer" onClick={handleClickCartTotal}>
                <div className="flex gap-1 items-center justify-end">
                  {filterCartTotal === "adminasc" ? (
                    <FaSortAmountDownAlt />
                  ) : (
                    <FaSortAmountUp />
                  )}
                  <p>CartTotal</p>
                </div>
              </a>
            </Table.HeadCell>

            <Table.HeadCell className="text-end">
              <a className="cursor-pointer" onClick={handleClickUserId}>
                <div className="flex gap-1 items-center justify-end">
                  {filterUserId === "adminasc" ? (
                    <FaSortAmountDownAlt />
                  ) : (
                    <FaSortAmountUp />
                  )}
                  <p>UserId</p>
                </div>
              </a>
            </Table.HeadCell>
            <Table.HeadCell className="text-end">
              <a className="cursor-pointer" onClick={handleClickStatus}>
                <div className="flex gap-1 items-center justify-end">
                  {filterStatus === "adminasc" ? (
                    <FaSortAmountDownAlt />
                  ) : (
                    <FaSortAmountUp />
                  )}
                  <p>Status</p>
                </div>
              </a>
            </Table.HeadCell>
            <Table.HeadCell>
              <a className="cursor-pointer" onClick={handleClickDate}>
                <div className="flex gap-1 items-center justify-end">
                  {filterDate === "adminasc" ? (
                    <FaSortAmountDownAlt />
                  ) : (
                    <FaSortAmountUp />
                  )}
                  <p>Date</p>
                </div>
              </a>
            </Table.HeadCell>

            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {orders
              ? orders.map((order: any) => {
                  return (
                    <Table.Row
                      key={order.id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell>{order.id}</Table.Cell>

                      <Table.Cell>
                        <div className="text-xs">
                          {JSON.parse(
                            order.orderItems !== undefined
                              ? order.orderItems
                              : null
                          )?.map((item: any) => {
                            return (
                              <div
                                key={item.id}
                                className="flex gap-2 items-center justify-between"
                              >
                                <div className="flex items-center gap-2">
                                  <img
                                    className="w-10 h-10 my-1"
                                    src={item.image}
                                    alt=""
                                  />
                                  <span className="md:flex items-center gap-2 hidden">
                                    <span>
                                      {item.productName.substring(0, 30)}{" "}
                                      {" x "}
                                      <span className="font-medium">
                                        {item.quantity}
                                      </span>
                                    </span>
                                  </span>
                                </div>
                                <div className="ml-5 hidden md:block">
                                  {Intl.NumberFormat().format(item.price) + "đ"}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </Table.Cell>

                      <Table.Cell className="text-end font-medium">
                        {Intl.NumberFormat().format(order.cartTotal)}đ
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex flex-col justify-center text-xs gap-2">
                          <h1 className="font-medium">{order.userId}</h1>
                          <div className="flex flex-col justify-center gap-1">
                            <p>
                              {"Địa chỉ GH: " +
                                order.username +
                                " " +
                                order.phone}
                            </p>
                            <p>{order.address}</p>
                          </div>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex flex-col justify-center text-xs gap-1">
                          <p>
                            {order.status === 0
                              ? "0. Chờ xác nhận"
                              : order.status === 1
                              ? "1. Chờ lấy hàng"
                              : order.status === 2
                              ? "2. Đang giao"
                              : "3. Đã giao thành công"}
                          </p>
                          <p>{"- " + order.trans}</p>
                          <p>{"- " + order.payment}</p>
                          <p>
                            {order.isPaid === true
                              ? "- đã thanh toán"
                              : "- chưa thanh toán"}
                          </p>
                        </div>
                      </Table.Cell>
                      <Table.Cell>{order.createdAt}</Table.Cell>

                      <Table.Cell>
                        <a
                          className="font-medium cursor-pointer text-blue-600 hover:underline dark:text-blue-500"
                          onClick={() => {
                            try {
                              axios
                                .get(
                                  `https://quocson.fatcatweb.top/cart/admin/listorder/${order.id}`
                                )
                                .then((res) => {
                                  setOrdersById(res.data);
                                  setEditModal(!editModal);
                                });
                            } catch (error) {
                              console.log(error);
                            }
                          }}
                        >
                          <FaEdit className="text-xl" />
                        </a>
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              : null}
          </Table.Body>
        </Table>
      </div>

      <div className="flex justify-center mt-6">
      <Pagi page={page} onPageChange={handlePageChange}/>
      </div>

      <div className="mx-auto w-full">
        {/* edit modal */}
        <Transition appear show={editModal} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setEditModal(false)}
          >
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full lg:w-8/12 flex flex-col items-center transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="my-6 text-lg font-medium leading-6 text-gray-900"
                    >
                      Edit Order Status
                    </Dialog.Title>

                    <div className="grid lg:grid-cols-2 items-center gap-5">
                      <div>
                        <div className="grid grid-cols-1 items-center align-center">
                          <div>
                            <div className="my-5 p-2 border border-blue-500 rounded-xl">
                              <div className="flex gap-2 items-center justify-center">
                                <p className="font-medium text-sm">
                                  Order number:
                                </p>
                                <p>{ordersById.id}</p>
                              </div>
                              <div className="flex justify-between items-center border-t border-gray-400 mt-3 text-sm pl-2 pt-3 pb-1">
                                <div>
                                  <p className="font-medium">
                                    Địa chỉ giao hàng:
                                  </p>
                                  <div className="pl-2">
                                    <div className="flex gap-1 imtes-center">
                                      <p>{ordersById.username}</p>
                                      <p>{ordersById.phone}</p>
                                    </div>
                                    <p>{ordersById.address}</p>
                                  </div>
                                  
                                </div>
                                <div className="text-xs flex flex-col gap-1 items-end justify-end">
                                  <p>
                                    {ordersById.createdAt?.substring(0, 10)}
                                  </p>
                                  <p>
                                    {ordersById.createdAt?.substring(11, 16)}
                                  </p>
                                </div>
                              </div>

                              <div className="flex justify-between items-center border-b border-gray-400 text-sm pl-2 pb-3">
                                    <div>
                                      <div className="font-medium">
                                        Phương thức vận chuyển:
                                      </div>
                                      <div className="pl-2 flex gap-2">
                                        {ordersById.trans === "fast" ? (
                                          <p>Tiêu chuẩn</p>
                                        ) : (
                                          <p>Hoả tốc</p>
                                        )}
                                        <p className="font-medium">{ordersById.payment === "credit card" ? " " : "COD"}</p>
                                      </div>
                                    </div>

                                    <div>
                                      {ordersById.isPaid === false ? (
                                        <img
                                        className="h-8 w-auto"
                                        src="/chuathanhtoan.png"
                                        alt=""
                                      />
                                        
                                      ) : (
                                        <img
                                          className="h-7 w-auto"
                                          src="/dathanhtoan.png"
                                          alt=""
                                        />
                                      )}
                                    </div>
                                  </div>
                              <div className="text-xs p-2">
                                {JSON.parse(
                                  ordersById.orderItems !== undefined
                                    ? ordersById.orderItems
                                    : null
                                )?.map((item: any) => {
                                  return (
                                    <div
                                      key={item.id}
                                      className="flex items-center justify-between"
                                    >
                                      <div className="flex items-center gap-2">
                                        <img
                                          className="w-10 h-10 my-1"
                                          src={item.image}
                                          alt=""
                                        />
                                        <span className="flex items-center gap-2">
                                          <span>
                                            {item.productName} {" x "}
                                            <span className="font-medium">
                                              {item.quantity}
                                            </span>
                                          </span>
                                        </span>
                                      </div>
                                      <div className="font-medium ml-5">
                                        {Intl.NumberFormat().format(
                                          item.price
                                        ) + "đ"}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                              <div className="flex justify-between items-center border-t border-gray-400 pt-2">
                                <p className="font-medium">Tổng Tiền:</p>
                                <p className="text-red-800 font-medium text-xl">
                                  {Intl.NumberFormat().format(
                                    ordersById.cartTotal
                                  )}
                                  đ
                                </p>
                              </div>
                              <div className="flex justify-between items-center py-2">
                                <p className="font-medium">Lợi nhuận:</p>
                                <p className="text-md">
                                  {Intl.NumberFormat().format(
                                    ordersById.revenue
                                  )}
                                  đ
                                </p>
                              </div>
                              <div className="flex justify-center gap-1 text-xs">
                                <p>Trạng thái:</p>
                                <p className="font-medium text-blue-600">
                                  {ordersById.status === 0
                                    ? "Chờ xác nhận"
                                    : ordersById.status === 1
                                    ? "Chờ lấy hàng"
                                    : ordersById.status === 2
                                    ? "Đang giao"
                                    : "Đã giao thành công"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="w-3/4 lg:w-full mb-6 mx-auto">
                          <h1 className="text-center font-medium text-lg my-6">
                            New Status
                          </h1>
                          <div className="mb-3">
                            <div className="mb-2 block">
                              <Label htmlFor="small" value="Status" />
                            </div>
                            <select
                              value={editStatus}
                              onChange={(e: any) =>
                                setEditStatus(e.target.value)
                              }
                              className="border rounded-lg w-full bg-blue-100 border-blue-500 text-blue-900"
                            >
                              <option value="0">0. Chờ xác nhận</option>
                              <option value="1">1. Chờ lấy hàng</option>
                              <option value="2">2. Đang giao</option>
                              <option value="3">3. Đã giao thành công</option>
                            </select>
                          </div>
                        </div>
                        <div className="flex justify-evenly gap-5">
                          <Button
                            className="font-medium cursor-pointer text-blue-600 dark:text-blue-500 mt-6"
                            onClick={() => {
                              try {
                                axios
                                  .patch(
                                    `https://quocson.fatcatweb.top/cart/admin/listorder/${ordersById.id}`,
                                    {
                                      status: editStatus || ordersById.status,
                                    }
                                  )
                                  .then((res: any) => {
                                    if (res.data) {
                                      toast(
                                        "Update Order's status successfully",
                                        {
                                          position: toast.POSITION.TOP_RIGHT,
                                          type: toast.TYPE.SUCCESS,
                                          className: "toast-message",
                                        }
                                      );
                                    }
                                    setEditModal(!editModal);
                                  });
                              } catch (error) {
                                console.log(error);
                              }
                            }}
                          >
                            OK
                          </Button>

                          <Button
                            color="failure"
                            className="font-medium cursor-pointer text-blue-600 dark:text-blue-500 hover:bg-red-400 hover:text-black mt-6"
                            onClick={() => {
                              setDeleteModal(!deleteModal);
                            }}
                          >
                            <FaRegTrashAlt className="text-xl" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>

        {/* delelte modal */}
        <Transition appear show={deleteModal} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setDeleteModal(!deleteModal)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 text-center">
                        Are you sure to delete this order?
                      </p>
                    </div>

                    <div className="mt-6 flex justify-evenly">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => {
                          try {
                            axios
                              .delete(
                                `https://quocson.fatcatweb.top/cart/admin/listorder/${ordersById.id}`
                              )
                              .then((res) => {
                                setDeleteModal(!deleteModal);
                                setEditModal(!editModal);
                                toast("Delete order successfully", {
                                  position: toast.POSITION.TOP_RIGHT,
                                  type: toast.TYPE.SUCCESS,
                                  className: "toast-message",
                                });
                              });
                          } catch (error) {
                            console.log(error);
                          }
                        }}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => setDeleteModal(!deleteModal)}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
}

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <>{page}</>
    </Layout>
  );
};

export default Index;
