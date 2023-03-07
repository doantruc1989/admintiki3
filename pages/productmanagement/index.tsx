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
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [newProductModal, setNewProductModal] = useState(false);

  const [newProductName, setNewProductName] = useState("");
  const [newProductContent, setNewProductContent] = useState("");
  const [newProductImage, setNewProductImage] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductInitialPrice, setNewProductInitialPrice] = useState("");
  const [newProductQuantity, setNewProductQuantity] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("");
  const [newProductCategoryId, setNewProductCategoryId] = useState("");
  const [disable,setDisable] = useState(false);

  const [editProductName, setEditProductName] = useState("");
  const [editProductContent, setEditProductContent] = useState("");
  const [editProductImage, setEditProductImage] = useState("");
  const [editProductPrice, setEditProductPrice] = useState("");
  const [editProductInitialPrice, setEditProductInitialPrice] = useState("");
  const [editProductQuantity, setEditProductQuantity] = useState("");
  const [editProductCategory, setEditProductCategory] = useState("");

  const [search, setSearch] = useState("");
  const [filterPrice, setFilterPrice] = useState("adminasc");
  const [filterInitialPrice, setFilterInititalPrice] = useState("adminasc");
  const [filterQuantity, setFilterQuantity] = useState("adminasc");
  const [filterCategory, setFilterCategory] = useState("adminasc");
  const [page, setPage] = useState(1);


  useEffect(() => {
    setDisable(newProductName !== "" &&
    newProductContent !== "" &&
    newProductImage !== "" &&
    newProductPrice !== "" &&
    newProductInitialPrice !== "" &&
    newProductQuantity !== "" &&
    newProductCategory !== "" &&
    newProductCategoryId !== ""
    )
  },[newProductName,
    newProductContent,
    newProductImage,
    newProductPrice,
    newProductInitialPrice,
    newProductQuantity,
    newProductCategory,
    newProductCategoryId
  ])

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
  }, [search, editModal]);

  useEffect(() => {
    try {
      axios
        .get(`https://quocson.fatcatweb.top/v2/product?page=${page}`)
        .then((res) => {
          setProducts(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [page]);

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

  const handleClickInitialPrice = () => {
    try {
      axios
        .get(
          `https://quocson.fatcatweb.top/product/all?search=${filterInitialPrice}&sortBy=initialPrice`
        )
        .then((res: any) => {
          setProducts(res.data);
          if (filterInitialPrice === "adminasc") {
            setFilterInititalPrice("admindesc");
          } else {
            setFilterInititalPrice("adminasc");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickQuantity = () => {
    try {
      axios
        .get(
          `https://quocson.fatcatweb.top/product/all?search=${filterQuantity}&sortBy=quantity`
        )
        .then((res: any) => {
          setProducts(res.data);
          if (filterQuantity === "adminasc") {
            setFilterQuantity("admindesc");
          } else {
            setFilterQuantity("adminasc");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickCategory = () => {
    try {
      axios
        .get(
          `https://quocson.fatcatweb.top/product/all?search=${filterCategory}&sortBy=category`
        )
        .then((res: any) => {
          setProducts(res.data);
          if (filterCategory === "adminasc") {
            setFilterCategory("admindesc");
          } else {
            setFilterCategory("adminasc");
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
        <Breadcrumb.Item>Products Management</Breadcrumb.Item>
      </Breadcrumb>
      <CheckAuth />
      <h1 className="mb-6 font-bold uppercase text-xl text-center">
        Products management
      </h1>
      <div className="flex justify-between">
        <Button
          className="mb-6"
          onClick={() => {
            setNewProductModal(!newProductModal);
          }}
        >
          Add new Product
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
            <Table.HeadCell className="text-end">
              <a className="cursor-pointer" onClick={handleClickInitialPrice}>
                <div className="flex gap-1 items-center justify-end">
                  {filterInitialPrice === "adminasc" ? (
                    <FaSortAmountDownAlt />
                  ) : (
                    <FaSortAmountUp />
                  )}
                  <p>Initital Price</p>
                </div>
              </a>
            </Table.HeadCell>
            <Table.HeadCell className="text-end">
              <a className="cursor-pointer" onClick={handleClickQuantity}>
                <div className="flex gap-1 items-center justify-end">
                  {filterQuantity === "adminasc" ? (
                    <FaSortAmountDownAlt />
                  ) : (
                    <FaSortAmountUp />
                  )}
                  <p>Quantity</p>
                </div>
              </a>
            </Table.HeadCell>
            <Table.HeadCell>
              <a className="cursor-pointer" onClick={handleClickCategory}>
                <div className="flex gap-1 items-center justify-end">
                  {filterCategory === "adminasc" ? (
                    <FaSortAmountDownAlt />
                  ) : (
                    <FaSortAmountUp />
                  )}
                  <p>Category</p>
                </div>
              </a>
            </Table.HeadCell>

            <Table.HeadCell>
              <span className="sr-only">Edit</span>
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
  
                        <img
                          className="h-10 w-10"
                          src={product.image}
                          alt={product.productName}
                        />
    
                      </Table.Cell>
                      <Table.Cell>
                     
                          {product.productName}
                   
                        
                        </Table.Cell>
                      <Table.Cell className="text-end">
                      {Intl.NumberFormat().format(product.price)}đ
                        
                      </Table.Cell>
                      <Table.Cell className="text-end">
                        {Intl.NumberFormat().format(product.initialPrice)}đ
                      </Table.Cell>
                      <Table.Cell className="text-end">
                        {product.quantity}
                      </Table.Cell>
                      <Table.Cell>{product.category}</Table.Cell>

                      <Table.Cell>
                        <a
                          className="font-medium cursor-pointer text-blue-600 hover:underline dark:text-blue-500"
                          onClick={() => {
                            setEditModal(!editModal);
                            try {
                              axios
                                .get(
                                  `https://quocson.fatcatweb.top/v2/product/${product.id}`
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
                  <Dialog.Panel className="w-full md:w-1/2 lg:w-8/12 flex flex-col items-center transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="my-6 text-lg font-medium leading-6 text-gray-900"
                    >
                      Edit Product
                    </Dialog.Title>

                    <div className="grid lg:grid-cols-2 items-center gap-5">
                      <div>
                        <div className="grid grid-cols-1 items-center align-center mx-3">
                          <img
                            src={productById[0]?.image}
                            className="w-full h-auto rounded-lg"
                            alt="..."
                          />
                          <div>
                            <div className="text-xs mb-3 flex">
                              <h5>Thương hiệu: </h5>
                              <a
                                href="#"
                                className="text-blue-600 underline ml-2"
                              >
                                {productById[0]?.brand}
                              </a>
                            </div>
                            <h3 className="text-lg md:text-2xl font-medium mb-3">
                              {productById[0]?.productName}
                            </h3>

                            <div className="bg-gray-100 font-bold rounded-md p-4 my-4 text-red-700 text-xl md:text-3xl">
                              <h2>
                                {Intl.NumberFormat().format(
                                  productById[0]?.price
                                )}{" "}
                                đ
                              </h2>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-100 rounded-md p-3 mx-3 mt-4">
                          <h2 className="font-bold text-sm md:text-base">
                            Mô tả sản phẩm:
                          </h2>
                          <div className="text-sm md:text-base text-justify">
                            {productById[0]?.content}
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="w-full mb-6">
                          <h1 className="text-center font-medium text-lg my-6">
                            New Information
                          </h1>
                          <div className="mb-3">
                            <div className="mb-2 block">
                              <Label htmlFor="small" value="Image" />
                            </div>
                            <Textarea
                              rows={4}
                              placeholder={productById[0]?.image}
                              value={editProductImage}
                              onChange={(e: any) =>
                                setEditProductImage(e.target.value)
                              }
                            />
                          </div>
                          <div className="mb-3">
                            <div className="mb-2 block">
                              <Label htmlFor="small" value="Product Name" />
                            </div>
                            <Textarea
                              rows={3}
                              placeholder={productById[0]?.productName}
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
                              placeholder={productById[0]?.price}
                              value={editProductPrice}
                              type="number"
                              onChange={(e) =>
                                setEditProductPrice(e.target.value)
                              }
                            />
                          </div>

                          <div className="mb-3">
                            <div className="mb-2 block">
                              <Label htmlFor="small" value="Initial Price" />
                            </div>
                            <TextInput
                              placeholder={productById[0]?.initialPrice}
                              value={editProductInitialPrice}
                              type="number"
                              onChange={(e) =>
                                setEditProductInitialPrice(e.target.value)
                              }
                            />
                          </div>

                          <div className="mb-3">
                            <div className="mb-2 block">
                              <Label htmlFor="small" value="Quantity" />
                            </div>
                            <TextInput
                              placeholder={productById[0]?.quantity}
                              value={editProductQuantity}
                              type="number"
                              onChange={(e) =>
                                setEditProductQuantity(e.target.value)
                              }
                            />
                          </div>

                          <div className="mb-3">
                            <div className="mb-2 block">
                              <Label htmlFor="small" value="Category" />
                            </div>
                            <select
                              value={editProductCategory}
                              className="border rounded-lg w-full bg-blue-100 border-blue-500 text-blue-900"
                              onChange={(e) =>
                                setEditProductCategory(e.target.value)
                              }
                            >
                              <option selected value={productById[0]?.category}>
                                Default
                              </option>
                              <option value="khoahoc">
                                4. Voucher Khoá học
                              </option>
                              <option value="nhahang">
                                5. Voucher khách sạn
                              </option>
                              <option value="dulich">6. Voucher Du lịch</option>
                              <option value="dochoi">8. Mẹ và bé</option>
                              <option value="sach">9. Tiki sách</option>
                              <option value="dienthoai">
                                10. Điện thoại & Máy tính bảng
                              </option>
                              <option value="lamdep">11. Làm Đẹp</option>
                              <option value="diengiadung">
                                12. Điện gia dụng
                              </option>
                              <option value="donu">13. Thời trang nữ</option>
                              <option value="donam">14. Thời trang nam</option>
                              <option value="giaynu">15. Giày dép nữ</option>
                            </select>
                          </div>

                          <div className="mb-3">
                            <div className="mb-2 block">
                              <Label htmlFor="small" value="Content" />
                            </div>
                            <Textarea
                              rows={6}
                              placeholder={productById[0]?.content}
                              value={editProductContent}
                              onChange={(e) =>
                                setEditProductContent(e.target.value)
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
                                    `https://quocson.fatcatweb.top/product/${productById[0]?.id}`,
                                    {
                                      image:
                                        editProductImage ||
                                        productById[0]?.image,
                                      productName:
                                        editProductName ||
                                        productById[0]?.productName,
                                      price:
                                        editProductPrice ||
                                        productById[0]?.price,
                                      initialPrice:
                                        editProductInitialPrice ||
                                        productById[0]?.initialPrice,
                                      quantity:
                                        editProductQuantity ||
                                        productById[0]?.quantity,
                                      category:
                                        editProductCategory ||
                                        productById[0]?.category,
                                      content:
                                        editProductContent ||
                                        productById[0]?.content,
                                      // categoryID:
                                      //   editProductCategoryId ||
                                      //   productById.categoryID.id,
                                    }
                                  )
                                  .then((res: any) => {
                                    if (res.data) {
                                      toast("Update product successfully", {
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
                                `https://quocson.fatcatweb.top/product/${productById.id}`
                              )
                              .then((res) => {
                                console.log(res.data);
                                setDeleteModal(!deleteModal);
                                setEditModal(!editModal);
                                toast("Delete product successfully", {
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
                        <h1>New Product</h1>
                      <p className="text-sm mt-2">(Vui lòng điền đầy đủ thông tin)</p>

                      </div>
                    </Dialog.Title>

                    <div className="w-full mb-6 mt-6">
                      <div className="mb-3">
                        <div className="mb-2 block">
                          <Label htmlFor="small" value="Image" />
                        </div>
                        <Textarea
                          rows={3}
                          value={newProductImage}
                          required={true}
                          color="info"
                          onChange={(e: any) => {
                            setNewProductImage(e.target.value);
                          }}
                        />
                      </div>
                      <div className="mb-3">
                        <div className="mb-2 block">
                          <Label htmlFor="small" value="Product Name" />
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
                          <Label htmlFor="small" value="Initial Price" />
                        </div>
                        <TextInput
                          type="number"
                          value={newProductInitialPrice}
                          required={true}
                          color="info"
                          onChange={(e: any) =>
                            setNewProductInitialPrice(e.target.value)
                          }
                        />
                      </div>

                      <div className="mb-3">
                        <div className="mb-2 block">
                          <Label htmlFor="small" value="Quantity" />
                        </div>
                        <TextInput
                          type="number"
                          value={newProductQuantity}
                          required={true}
                          color="info"
                          onChange={(e: any) =>
                            setNewProductQuantity(e.target.value)
                          }
                        />
                      </div>

                      <div className="mb-3">
                        <div className="mb-2 block">
                          <Label htmlFor="small" value="Category" />
                        </div>
                        {/* <TextInput
                          value={newProductCategory}
                          required={true}
                          color="info"
                          onChange={(e: any) =>
                            setNewProductCategory(e.target.value)
                          }
                        /> */}
                        <select
                          value={newProductCategory}
                          onChange={(e: any) =>
                            setNewProductCategory(e.target.value)
                          }
                          className="border rounded-lg w-full bg-blue-100 border-blue-500 text-blue-900"
                        >
                          <option value="khoahoc">4. Voucher Khoá học</option>
                          <option value="nhahang">5. Voucher khách sạn</option>
                          <option value="dulich">6. Voucher Du lịch</option>
                          <option value="dochoi">8. Mẹ và bé</option>
                          <option value="sach">9. Tiki sách</option>
                          <option value="dienthoai">
                            10. Điện thoại & Máy tính bảng
                          </option>
                          <option value="lamdep">11. Làm Đẹp</option>
                          <option value="diengiadung">12. Điện gia dụng</option>
                          <option value="donu">13. Thời trang nữ</option>
                          <option value="donam">14. Thời trang nam</option>
                          <option value="giaynu">15. Giày dép nữ</option>
                        </select>
                      </div>

                      <div className="mb-3">
                        <div className="mb-2 block">
                          <Label htmlFor="small" value="Content" />
                        </div>
                        <Textarea
                        rows={5}
                          value={newProductContent}
                          required={true}
                          color="info"
                          onChange={(e: any) =>
                            setNewProductContent(e.target.value)
                          }
                        />
                      </div>

                      <div className="mb-3">
                        <div className="mb-2 block">
                          <Label htmlFor="small" value="CategoryId (vui lòng chọn giống với Category)" />
                        </div>
                        <select
                          value={newProductCategoryId}
                          required={true}
                          className="border rounded-lg w-full bg-blue-100 border-blue-500 text-blue-900"
                          color="info"
                          onChange={(e: any) =>
                            setNewProductCategoryId(e.target.value)
                          }
                        >
                          <option value="4">4. Voucher Khoá học</option>
                          <option value="5">5. Voucher khách sạn</option>
                          <option value="6">6. Voucher Du lịch</option>
                          <option value="8">8. Mẹ và bé</option>
                          <option value="9">9. Tiki sách</option>
                          <option value="10">
                            10. Điện thoại & Máy tính bảng
                          </option>
                          <option value="11">11. Làm Đẹp</option>
                          <option value="12">12. Điện gia dụng</option>
                          <option value="13">13. Thời trang nữ</option>
                          <option value="14">14. Thời trang nam</option>
                          <option value="15">15. Giày dép nữ</option>
                        </select>
                      </div>

                      <div className="flex justify-evenly gap-5">
                        <Button
                        disabled={!disable}
                          onClick={() => {
                            try {
                              axios
                                .post(
                                  `https://quocson.fatcatweb.top/product/createNewProduct`,
                                  {
                                    image: newProductImage,
                                    productName: newProductName,
                                    price: Number(newProductPrice),
                                    initialPrice: Number(
                                      newProductInitialPrice
                                    ),
                                    quantity: Number(newProductQuantity),
                                    content: newProductContent,
                                    category: newProductCategory,
                                    categoryID: newProductCategoryId,
                                  }
                                )
                                .then((res: any) => {
                                  setNewProductModal(false);
                                  setNewProductCategory("");
                                  setNewProductCategoryId("");
                                  setNewProductContent("");
                                  setNewProductImage("");
                                  setNewProductInitialPrice("");
                                  setNewProductName("");
                                  setNewProductPrice("");
                                  setNewProductQuantity("");
                                  console.log(res.data);
                                  if (res.data) {
                                    toast("Create new product successfully", {
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
