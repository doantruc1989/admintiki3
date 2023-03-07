import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import {
  Breadcrumb,
  Button,
  Label,
  Pagination,
  Table,
  Textarea,
  TextInput,
} from "flowbite-react";
import Link from "next/link";
import React, { Fragment, ReactElement, useEffect, useState } from "react";
import {
  FaHome,
  FaSortAmountDownAlt,
  FaSortAmountUp,
  FaEdit,
  FaRegTrashAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import CheckAuth from "../components/CheckAuth";
import Layout from "../components/Layout";
import Pagi from "../components/Pagi";

function Index() {
  const [products, setProducts] = useState([] as any);
  const [productById, setProductById] = useState([] as any);
  const [pro, setPro] =useState([] as any)
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [newProductModal, setNewProductModal] = useState(false);

  const [newProductName, setNewProductName] = useState("");
  const [newProductId, setNewProductId] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [disable, setDisable] = useState(false);

  const [editProductName, setEditProductName] = useState("");
  const [editProductPrice, setEditProductPrice] = useState("");


  const [search, setSearch] = useState("");
  const [filterPrice, setFilterPrice] = useState("adminasc");
  const [page, setPage] = useState(1);
  
  console.log(products);

  useEffect(() => {
    setDisable(
      newProductName !== "" &&
        newProductId !== "" &&
        newProductPrice !== ""
    );
  }, [
    newProductName,
    newProductId,
    newProductPrice,
  ]);

  useEffect(() => {
    try {
      axios
        .get(
          `https://quocson.fatcatweb.top/product/all?search=searchall&sortBy=${search}`
        )
        .then((res: any) => {
          setProducts(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [search]);

  useEffect(() => {
    try {
      axios.get(`https://quocson.fatcatweb.top/product/all`).then((res: any) => {
        setPro(res.data);
      });
    } catch (error) {
      console.log(error);
    };
  },[newProductModal])

  useEffect(() => {
    try {
      axios.get(`https://quocson.fatcatweb.top/v2/product?page=${page}`).then((res) => {
        setProducts(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [page, editModal, newProductModal]);

  const handleClickPrice = () => {
    try {
      axios
        .get(
          `https://quocson.fatcatweb.top/product/all?search=${filterPrice}&sortBy=price`
        )
        .then((res: any) => {
          setProducts(res.data);
          if (filterPrice === "adminasc") {
            setFilterPrice("admindesc");
          } else {
            setFilterPrice("adminasc");
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
        <Breadcrumb.Item>Products Variants Management</Breadcrumb.Item>
      </Breadcrumb>
      <CheckAuth />
      <h1 className="mb-6 font-bold uppercase text-xl text-center">
        Products Variants management
      </h1>
      <div className="flex justify-between">
        <Button
          className="mb-6"
          onClick={() => {
            setNewProductModal(!newProductModal);
          }}
        >
          Add new Product Variants
        </Button>
        <form className="w-1/2 md:w-7/12 lg:11/12">
          <div className="flex">
            <div className="relative w-full ">
              <input
                type="search"
                value={search}
                onChange={(e: any) => {
                  setSearch(e.target.value);
                }}
                id="search-dropdown"
                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg  border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                placeholder="by name, id, price, quantity, category..."
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
      {/* 
      <div className="my-6">
        
      </div> */}

      <div className="mx-auto">
        <Table hoverable={true}>
          <Table.Head>
          <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>
              <a className="cursor-pointer" onClick={handleClickPrice}>
                <div className="flex gap-1 items-center justify-end">
                  {filterPrice === "adminasc" ? (
                    <FaSortAmountDownAlt />
                  ) : (
                    <FaSortAmountUp />
                  )}
                  <p>Price</p>
                </div>
              </a>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {products
              ? products.map((product: any) => {
                  return (
                    <Table.Row
                      key={product.id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell>
                        {product.id}
                      </Table.Cell>
                      <Table.Cell>
                        <img
                          className="h-10 w-10"
                          src={product.image}
                          alt={product.productName}
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <div className="">
                        <h1>{product.productName.substring(0,30) + "..."}</h1>
                          <div className="text-xs pl-3">
                            {product.productvariant?.map((variant: any) => {
                              return (
                                <div className="flex justify-between" key={variant.id}>
                                  <p >{"- " + variant.type}</p>
                                  <a
                                    className="font-medium cursor-pointer text-blue-600 hover:underline dark:text-blue-500"
                                    onClick={() => {
                                      setEditModal(!editModal);
                                      try {
                                        axios
                                          .get(
                                            `https://quocson.fatcatweb.top/v2/productvariant/${variant.id}`
                                          )
                                          .then((res) => {
                                            setProductById(res.data);
                                          });
                                      } catch (error) {
                                        console.log(error);
                                      }
                                    }}
                                  >
                                    <FaEdit className="text-xl" />
                                  </a>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex flex-col items-end justify-end text-end">
                          <h1>{Intl.NumberFormat().format(product.price)}đ</h1>
                          <div className="text-xs pl-3">
                            {product.productvariant?.map((variant: any) => {
                              return (
                                <p key={variant.id}>
                                  {Intl.NumberFormat().format(
                                    variant.typePrice
                                  )}
                                </p>
                              );
                            })}
                          </div>
                        </div>
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
                  <Dialog.Panel className="w-full md:w-1/2 flex flex-col items-center transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="my-6 text-lg font-medium leading-6 text-gray-900"
                    >
                      Edit Product Variants
                    </Dialog.Title>
                        <div className="w-full mb-6">
                          <div className="mb-3">
                            <div className="mb-2 block">
                              <Label htmlFor="small" value="Product type" />
                            </div>
                            <Textarea
                              rows={2}
                              placeholder={productById[0]?.type}
                              value={editProductName}
                              onChange={(e) =>
                                setEditProductName(e.target.value)
                              }
                            />
                          </div>

                          <div className="mb-3">
                            <div className="mb-2 block">
                              <Label htmlFor="small" value="Product Price" />
                            </div>
                            <TextInput
                              placeholder={productById[0]?.typePrice}
                              value={editProductPrice}
                              type="number"
                              onChange={(e) =>
                                setEditProductPrice(e.target.value)
                              }
                            />
                          </div>

                        </div>
                        <div className="flex justify-evenly gap-5">
                          <Button
                            className="font-medium cursor-pointer text-blue-600 dark:text-blue-500 mt-6"
                            onClick={() => {
                              try {
                                axios
                                  .post(
                                    `https://quocson.fatcatweb.top/v2/productvariant/${productById[0]?.id}`,
                                    {
                                      type: editProductName || productById[0]?.type,
                                      typePrice: editProductPrice || productById[0]?.typePrice
                                    }
                                  )
                                  .then((res: any) => {
                                    if (res.data) {
                                      toast("Update product variants successfully", {
                                        position: toast.POSITION.TOP_RIGHT,
                                        type: toast.TYPE.SUCCESS,
                                        className: "toast-message",
                                      });
                                    }
                                    setEditModal(!editModal);
                                  });
                              } catch (error: any) {
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
                        Are you sure to delete?
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
                                `https://quocson.fatcatweb.top/v2/productvariant/${productById[0]?.id}`
                              )
                              .then((res) => {
                                console.log(res.data);
                                setDeleteModal(!deleteModal);
                                setEditModal(!editModal);
                                toast("Delete product variant successfully", {
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

        {/* new Product */}
        <Transition appear show={newProductModal} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setNewProductModal(!newProductModal)}
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
                  <Dialog.Panel className="w-full lg:w-1/2 flex flex-col items-center my-6 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <h1>New Product Variant</h1>
                      </div>
                    </Dialog.Title>

                    <div className="w-full mb-6 mt-6">
                      
                      <div className="mb-3">
                        <div className="mb-2 block">
                          <Label htmlFor="small" value="Product Type" />
                        </div>
                        <Textarea
                          rows={2}
                          value={newProductName}
                          required={true}
                          color="info"
                          onChange={(e: any) =>
                            setNewProductName(e.target.value)
                          }
                        />
                      </div>

                      <div className="mb-3">
                        <div className="mb-2 block">
                          <Label htmlFor="small" value="Price" />
                        </div>
                        <TextInput
                          type="number"
                          value={newProductPrice}
                          required={true}
                          color="info"
                          onChange={(e: any) =>
                            setNewProductPrice(e.target.value)
                          }
                        />
                      </div>

                      <div className="mb-3">
                        <div className="mb-2 block">
                          <Label htmlFor="small" value="Product ID" />
                        </div>
                        <select
                          value={newProductId}
                          className="border rounded-lg w-full bg-blue-100 border-blue-500 text-blue-900"
                          onChange={(e: any) => setNewProductId(e.target.value)}
                        >
                          <option>
                            Please choose ProductId
                          </option>
                          {pro
                            ? pro.map((item: any) => {
                                return (
                                  <option
                                    selected
                                    key={item.id}
                                    value={item.id}
                                  >
                                    {item.id + ' ' + item.productName}
                                  </option>
                                );
                              })
                            : null}
                        </select>
                 
                      </div>

                      <div className="flex justify-evenly gap-5">
                        <Button
                          disabled={!disable}
                          onClick={() => {
                            try {
                              axios
                                .post(
                                  `https://quocson.fatcatweb.top/v2/newproductvariant`,
                                  {
                                    type: newProductName,
                                    typePrice: Number(newProductPrice),
                                    product: Number(newProductId),
                                  }
                                )
                                .then((res: any) => {
                                  console.log(res.data)
                                  setNewProductModal(false);
   
                                  if (res.data) {
                                    toast("Create new product variants successfully", {
                                      position: toast.POSITION.TOP_RIGHT,
                                      type: toast.TYPE.SUCCESS,
                                      className: "toast-message",
                                    });
                                  }
                                });
                            } catch (error: any) {
                              console.log(error);
                            }
                          }}
                        >
                          OK
                        </Button>
                      </div>
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
