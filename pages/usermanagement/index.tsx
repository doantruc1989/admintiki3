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
import React, { Fragment, ReactElement, useEffect, useState } from "react";
import {
  FaHome,
  FaEdit,
  FaRegTrashAlt,
  FaSortAmountDownAlt,
  FaSortAmountUp,
} from "react-icons/fa";
import { toast } from "react-toastify";
import CheckAuth from "../components/CheckAuth";
import Layout from "../components/Layout";

function Index() {
  const [users, setUsers] = useState([] as any);
  const [userById, setUserById] = useState([] as any);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [newUserModal, setNewUserModal] = useState(false);
  const [validMatch, setValidMatch] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUsername, setNewusername] = useState("");
  const [newUserImage, setNewUserImage] = useState("");
  const [newUserRole, setNewUserRole] = useState("");
  const [newUserPassword, setNewuserPassword] = useState("");

  const [editUserEmail, setEditUserEmail] = useState("");
  const [editUserUsername, setEditUserUsername] = useState("");
  const [editUserImage, setEditUserImage] = useState("");
  const [editUserRole, setEditUserRole] = useState("");
  const [page, setPage] = useState(1);

  const [filterRole, setFilterRole] = useState("adminasc");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setValidMatch(
      newUserPassword !== "" && newUsername !== "" && newUserEmail !== ""
    );
  }, [newUserPassword, newUsername, newUserEmail]);

  useEffect(() => {
    try {
      axios
        .get(
          `https://quocson.fatcatweb.top/users/search?search=searchall&sortBy=${search}`
        )
        .then((res: any) => {
          setUsers(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [search, editModal]);

  const handleClickRole = () => {
    try {
      axios
        .get(
          `https://quocson.fatcatweb.top/users/search?search=${filterRole}&sortBy=role`
        )
        .then((res: any) => {
          setUsers(res.data);
          if (filterRole === "adminasc") {
            setFilterRole("admindesc");
          } else {
            setFilterRole("adminasc");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      axios
        .get(`https://quocson.fatcatweb.top/users?page=${page}`)
        .then((res) => {
          setUsers(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [page, editModal]);

  return (
    <div className="my-6">
      <Breadcrumb aria-label="Default breadcrumb example" className="my-6">
        <Breadcrumb.Item href="/" icon={FaHome}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item>Users Management</Breadcrumb.Item>
      </Breadcrumb>
      <CheckAuth />
      <h1 className="mb-6 font-bold uppercase text-xl text-center">
        Users management
      </h1>
      <div className="flex justify-between">
        <Button
          className="mb-6"
          onClick={() => {
            setNewUserModal(!newUserModal);
          }}
        >
          Add new User
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
                placeholder="by name, email, role..."
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
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Username</Table.HeadCell>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>
              <a className="cursor-pointer" onClick={handleClickRole}>
                <div className="flex gap-1 items-center justify-end">
                  {filterRole === "adminasc" ? (
                    <FaSortAmountDownAlt />
                  ) : (
                    <FaSortAmountUp />
                  )}
                  <p>Role</p>
                </div>
              </a>
            </Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {users
              ? users.map((user: any) => {
                  return (
                    <Table.Row
                      key={user.id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {user.email}
                      </Table.Cell>
                      <Table.Cell>{user.username}</Table.Cell>
                      <Table.Cell>
                        <img
                          className="h-10 w-10"
                          src={
                            user.image ||
                            "https://nhungdieuthuvi.com/wp-content/uploads/2021/08/avartar-vit-vang-psyduck.jpg"
                          }
                          alt={user.username}
                        />
                      </Table.Cell>
                      <Table.Cell>{user.role}</Table.Cell>
                      <Table.Cell>
                        <a
                          className="font-medium cursor-pointer text-blue-600 hover:underline dark:text-blue-500"
                          onClick={() => {
                            setEditModal(!editModal);
                            try {
                              axios
                                .get(
                                  `https://quocson.fatcatweb.top/users/${user.id}`
                                )
                                .then((res) => {
                                  setUserById(res.data);
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
        <Pagination
          currentPage={page}
          totalPages={8}
          onPageChange={() => {
            if (page < 8) {
              setPage(page + 1);
            } else {
              setPage(1);
            }
          }}
        />
      </div>

      <div className="mx-auto w-full">
        {/* edit User */}
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
                      Edit User
                    </Dialog.Title>

                    <div className="grid lg:grid-cols-2 items-center gap-5">
                      <div>
                        <div className="grid grid-cols-1 items-center align-center mx-3">
                          <img
                            src={userById.image}
                            className="w-1/2 h-auto rounded-lg mx-auto"
                            alt="..."
                          />
                          <div className="my-6">
                            <div className="text-md mb-6 flex flex-col items-center ">
                              <h5 className="font-medium">Image: </h5>
                              <p className="text-center">{userById.image}</p>
                            </div>

                            <div className="text-md mb-6 flex flex-col items-center">
                              <h5 className="font-medium">Email: </h5>
                              <p className="text-center">{userById.email}</p>
                            </div>

                            <div className="text-md mb-6 flex flex-col items-center">
                              <h5 className="font-medium">Username: </h5>
                              <p className="text-center">{userById.username}</p>
                            </div>

                            <div className="text-md mb-6 flex flex-col items-center">
                              <h5 className="font-medium">Role: </h5>
                              <p className="text-center">{userById.role}</p>
                            </div>
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
                            rows={3}
                            placeholder={userById.image}
                              value={editUserImage}
                              onChange={(e) => setEditUserImage(e.target.value)}
                            />
                          </div>
                          <div className="mb-3">
                            <div className="mb-2 block">
                              <Label htmlFor="small" value="Email" />
                            </div>
                            <TextInput
                            placeholder={userById.email}
                              value={editUserEmail}
                              onChange={(e) => setEditUserEmail(e.target.value)}
                            />
                          </div>

                          <div className="mb-3">
                            <div className="mb-2 block">
                              <Label htmlFor="small" value="User name" />
                            </div>
                            <TextInput
                            placeholder={userById.username}
                              value={editUserUsername}
                              onChange={(e) =>
                                setEditUserUsername(e.target.value)
                              }
                            />
                          </div>

                          <div className="mb-3">
                            <div className="mb-2 block">
                              <Label htmlFor="small" value="Role" />
                            </div>
                            <select
                              value={editUserRole}
                              onChange={(e: any) =>
                                setEditUserRole(e.target.value)
                              }
                              className="border rounded-lg w-full bg-gray-100 border-gray-300 text-black"
                            >
                              <option selected value={userById.role}>Default</option>
                              <option value="user">user</option>
                              <option value="admin">admin</option>
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
                                    `https://quocson.fatcatweb.top/users/${userById.id}`,
                                    {
                                      image: editUserImage || userById.image,
                                      email: editUserEmail || userById.email,
                                      username:
                                        editUserUsername || userById.username,
                                      role: editUserRole || userById.role,
                                    }
                                  )
                                  .then((res: any) => {
                                    if (res.data) {
                                      toast("Update user successfully", {
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
                                `https://quocson.fatcatweb.top/users/${userById.id}`
                              )
                              .then((res) => {
                                console.log(res.data);
                                setDeleteModal(!deleteModal);
                                setEditModal(!editModal);
                                toast("Delete successfully", {
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

        {/* new User */}
        <Transition appear show={newUserModal} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setNewUserModal(!newUserModal)}
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
                  <Dialog.Panel className="w-full md:w-1/2 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-center text-lg font-medium leading-6 text-gray-900"
                    >
                      New User
                    </Dialog.Title>

                    <div className="w-full my-6">
                      <div className="mb-3">
                        <div className="mb-2 block">
                          <Label htmlFor="small" value="Email:" />
                        </div>
                        <TextInput
                          required={true}
                          value={newUserEmail}
                          onChange={(e) => setNewUserEmail(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <div className="mb-2 block">
                          <Label htmlFor="small" value="User name:" />
                        </div>
                        <TextInput
                          required={true}
                          value={newUsername}
                          onChange={(e) => setNewusername(e.target.value)}
                        />
                      </div>

                      <div className="mb-3">
                        <div className="mb-2 block">
                          <Label htmlFor="small" value="Image:" />
                        </div>
                        <Textarea
                        rows={3}
                          value={newUserImage}
                          onChange={(e) => setNewUserImage(e.target.value)}
                        />
                      </div>

                      <div className="mb-3">
                        <div className="mb-2 block">
                          <Label htmlFor="small" value="Password:" />
                        </div>
                        <TextInput
                          required={true}
                     
                          value={newUserPassword}
                          onChange={(e) => setNewuserPassword(e.target.value)}
                        />
                      </div>

                      <div className="mb-3">
                        <div className="mb-2 block">
                          <Label htmlFor="small" value="Role" />
                        </div>
                        <select
                          required={true}
                          value={newUserRole}
                          onChange={(e: any) => setNewUserRole(e.target.value)}
                          className="border rounded-lg w-full bg-gray-100 border-gray-300 text-black"
                        >
                          <option selected value="user">user</option>
                          <option value="admin">admin</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-evenly gap-5">
                      <Button
                        className="font-medium  text-blue-600 dark:text-blue-500 mt-6"
                        disabled={!validMatch}
                        onClick={() => {
                          try {
                            axios
                              .post(
                                `https://quocson.fatcatweb.top/auth/signup`,
                                {
                                  email: newUserEmail,
                                  username: newUsername,
                                  password: newUserPassword,
                                  image: newUserImage || "https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png?20170128014309",
                                  role: newUserRole || "user",
                                }
                              )
                              .then((res: any) => {
                                setNewUserEmail("");
                                setNewUserImage("");
                                setNewUserRole("");
                                setNewuserPassword("");
                                setNewusername("");
                                setNewUserModal(false);

                                if (res.data?.accessToken) {
                                  toast("Create new user successfully", {
                                    position: toast.POSITION.TOP_RIGHT,
                                    type: toast.TYPE.SUCCESS,
                                    className: "toast-message",
                                  });
                                }
                              });
                          } catch (error: any) {
                            if (error) {
                              toast(
                                `${error?.response.data.messenger}. Please try again`,
                                {
                                  position: toast.POSITION.TOP_RIGHT,
                                  type: toast.TYPE.ERROR,
                                  className: "toast-message",
                                }
                              );
                            }
                          }
                        }}
                      >
                        Add
                      </Button>
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
