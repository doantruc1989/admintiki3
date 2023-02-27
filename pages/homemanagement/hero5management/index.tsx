import CheckAuth from '@/pages/components/CheckAuth';
import Layout from '@/pages/components/Layout';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import { Breadcrumb, Table, TextInput } from 'flowbite-react';
import React, { Fragment, ReactElement, useEffect, useState } from 'react'
import { FaEdit, FaHome } from 'react-icons/fa';
import { toast } from 'react-toastify';

function Index() {
  const [categories, setCategories] = useState([] as any);
  const [categoryByid, setCategoryByid] = useState([] as any);
  const [editModal, setEditModal] = useState(false);

  const [editCategory, setEditCategory] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editPath, setEditPath] = useState("");
  // const [editUserRole, setEditUserRole] = useState('');

  useEffect(() => {
    try {
      axios.get(`https://quocson.fatcatweb.top/homepage/bosuutap`).then((res) => {
        setCategories(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [editModal]);

  return (
    <div className='my-6'>
      <Breadcrumb aria-label="Default breadcrumb example" className="my-6">
        <Breadcrumb.Item href="/" icon={FaHome}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item href='/homemanagement'>Categories Management</Breadcrumb.Item>
        <Breadcrumb.Item>Bộ sưu tập Management</Breadcrumb.Item>
      </Breadcrumb>
      <CheckAuth />
      <h1 className="mb-6 font-bold uppercase text-xl text-center">
      Bộ sưu tập management
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
                      <Table.Cell>{category.name}</Table.Cell>
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
                                  `https://quocson.fatcatweb.top/homepage/bosuutap/${category.id}`
                                )
                                .then((res) => {
                                  setCategoryByid(res.data);
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
                          <Table.Cell>{categoryByid.name}</Table.Cell>
                          <Table.Cell>{categoryByid.image}</Table.Cell>
                          <Table.Cell>{categoryByid.path}</Table.Cell>
                          <Table.Cell>
                           
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
                                    .patch(
                                      `https://quocson.fatcatweb.top/homepage/bosuutap/${categoryByid.id}`,
                                      {
                                        name:
                                          editCategory || categoryByid.name,
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

      </div>
    </div>
  )
}

Index.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
          <>{page}</>
        </Layout>
    );
  };

export default Index