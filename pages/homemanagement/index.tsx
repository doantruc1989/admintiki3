import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { Breadcrumb, Button, Dropdown, Table, TextInput } from "flowbite-react";
import React, { Fragment, ReactElement, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import { FaHome, FaEdit } from "react-icons/fa";
import Link from "next/link";
import CheckAuth from "../components/CheckAuth";

function Index() {
  const [categories, setCategories] = useState([] as any);
  const [categoryByid, setCategoryByid] = useState([] as any);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [editCategory, setEditCategory] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editPath, setEditPath] = useState("");
  // const [editUserRole, setEditUserRole] = useState('');

  useEffect(() => {
    try {
      axios.get(`https://quocson.fatcatweb.top/listcategory`).then((res) => {
        setCategories(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  console.log(categoryByid);
  return (
    <div className="my-6">
      <Breadcrumb aria-label="Default breadcrumb example" className="my-6">
        <Breadcrumb.Item href="/" icon={FaHome}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item>Categories Management</Breadcrumb.Item>
      </Breadcrumb>
      <CheckAuth />
      <Dropdown label="Hero management" dismissOnClick={false}>
        <Dropdown.Item>
          <Link href={"/homemanagement/hero1management"}>
          Hero1
          </Link>
         </Dropdown.Item>
        <Dropdown.Item><Link href={"/homemanagement/hero2management"}>
          Hero2
          </Link></Dropdown.Item>
        <Dropdown.Item>
          <Link href={"/homemanagement/hero5management"}>
          Hero5
          </Link>
          </Dropdown.Item>
      </Dropdown>

      <h1 className="mb-6 font-bold uppercase text-xl text-center">
        Category management
      </h1>

      <div className="mx-auto">
        <Table hoverable={true}>
          <Table.Head>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Path</Table.HeadCell>

            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {categories
              ? categories.map((category: any) => {
                  return (
                    <Table.Row
                      key={category.id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {category.id}
                      </Table.Cell>
                      <Table.Cell>{category.category}</Table.Cell>
                      <Table.Cell>{category.image}</Table.Cell>
                      <Table.Cell>{category.path}</Table.Cell>

                      <Table.Cell>
                        <a
                          className="font-medium cursor-pointer text-blue-600 hover:underline dark:text-blue-500"
                          onClick={() => {
                            setEditModal(!editModal);
                            try {
                              axios
                                .get(
                                  `https://quocson.fatcatweb.top/category/${category.id}`
                                )
                                .then((res) => {
                                  setCategoryByid(res.data[0]);
                                });
                            } catch (error) {
                              console.log(error);
                            }
                          }}
                        >
                          <FaEdit className="text-xl"/>
                        </a>
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              : null}
          </Table.Body>
        </Table>
      </div>

      <div className="mx-auto w-full">
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
                  <Dialog.Panel className="w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Edit Category
                    </Dialog.Title>

                    <Table hoverable={true}>
                      <Table.Head>
                        <Table.HeadCell>ID</Table.HeadCell>
                        <Table.HeadCell>Category</Table.HeadCell>
                        <Table.HeadCell>Image</Table.HeadCell>
                        <Table.HeadCell>Path</Table.HeadCell>
                        <Table.HeadCell>
                          <span className="sr-only">Edit</span>
                        </Table.HeadCell>
                      </Table.Head>
                      <Table.Body className="divide-y">
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {categoryByid.id}
                          </Table.Cell>
                          <Table.Cell>{categoryByid.category}</Table.Cell>
                          <Table.Cell>{categoryByid.image}</Table.Cell>
                          <Table.Cell>{categoryByid.path}</Table.Cell>
                          <Table.Cell>
                            <div>
                              <a
                                className="font-medium cursor-pointer text-blue-600 hover:underline dark:text-blue-500"
                                onClick={() => {
                                  setDeleteModal(!deleteModal);
                                }}
                              >
                                Delete
                              </a>
                            </div>
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {categoryByid.id}
                          </Table.Cell>
                          <Table.Cell>
                            <TextInput
                              value={editCategory}
                              onChange={(e) => setEditCategory(e.target.value)}
                            />
                          </Table.Cell>
                          <Table.Cell>
                            <TextInput
                              value={editImage}
                              onChange={(e) => setEditImage(e.target.value)}
                            />
                          </Table.Cell>
                          <Table.Cell>
                            <TextInput
                              value={editPath}
                              onChange={(e) => setEditPath(e.target.value)}
                            />
                          </Table.Cell>
                          <Table.Cell>
                            <a
                              className="font-medium cursor-pointer text-blue-600 hover:underline dark:text-blue-500"
                              onClick={() => {
                                try {
                                  axios
                                    .post(
                                      `https://quocson.fatcatweb.top/category/${categoryByid.id}`,
                                      {
                                        category:
                                          editCategory || categoryByid.category,
                                        path: editPath || categoryByid.path,
                                        image: editImage || categoryByid.image,
                                      }
                                    )
                                    .then((res: any) => {
                                      if (res.data) {
                                        toast("Update category successfully", {
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
                            </a>
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>

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
                        Are you sure to delete this category?
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
                                `https://quocson.fatcatweb.top/category/${categoryByid.id}`
                              )
                              .then((res) => {
                                console.log(res.data);
                                setDeleteModal(!deleteModal);
                                setEditModal(!editModal);
                                toast("Delete category successfully", {
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
