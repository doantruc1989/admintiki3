import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import {
  Breadcrumb,
  Button,
  Label,
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
import Pagi from "../components/Pagi";

function Index() {
  const [nestedReviews, setNestedReviews] = useState([] as any);
  const [nestedReviewId, setNestedReviewId] = useState([] as any);
  const [reviews, setReviews] = useState([] as any);

  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [editNestedComment, setEditNestedComment] = useState("");
  const [editNestedReview, setEditNestedReview] = useState(
    nestedReviewId[0]?.product?.id
  );

  const [newReviewModal, setNewReviewModal] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [newReviewId, setNewReviewId] = useState(5);

  const [filterReview, setFilterReview] = useState('adminasc')
  const [search, setSearch] = useState('');

  useEffect(() => {
    try {
      axios.get(`https://quocson.fatcatweb.top/v2/nestedreview?page=${page}`).then((res) => {
        setNestedReviews(res.data[0]);
        setTotalPage(res.data[1]);
      });
    } catch (error) {
      console.log(error);
    }
  }, [page, editModal]);

  useEffect(() => {
    try {
      axios
        .get(
          `https://quocson.fatcatweb.top/v2/searchnestedreview?search=searchall&sortBy=${search}`
        )
        .then((res: any) => {
          setNestedReviews(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [search]);

  useEffect(() => {
    try {
      axios.get(`https://quocson.fatcatweb.top/v2/allreview`).then((res: any) => {
        setReviews(res.data);
      });
    } catch (error) {
      console.log(error);
    };
  }, [newReviewModal, editModal]);

  const handlePageChange =(newPage :number) => {
    setPage(newPage)
  }

  const handleClickFilterReview = () => {
    try {
      axios
        .get(
          `https://quocson.fatcatweb.top/v2/searchnestedreview?search=${filterReview}&sortBy=comment`
        )
        .then((res: any) => {
          setReviews(res.data);
          if (filterReview === "adminasc") {
            setFilterReview("admindesc");
          } else {
            setFilterReview("adminasc");
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="my-6">
      <Breadcrumb aria-label="Default breadcrumb example" className="my-6">
        <Breadcrumb.Item href="/" icon={FaHome}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item>Nested Review Management</Breadcrumb.Item>
      </Breadcrumb>
      <CheckAuth />
      <h1 className="mb-6 font-bold uppercase text-xl text-center">
      Nested Review management
      </h1>
      <div className="flex justify-between">
        <Button
          className="mb-6"
          onClick={() => {
            setNewReviewModal(!newReviewModal);
          }}
        >
          Add new Nested Review
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
                placeholder="by id, reviewId.."
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
            <Table.HeadCell>Comment</Table.HeadCell>
            <Table.HeadCell>
            <a className="cursor-pointer" onClick={handleClickFilterReview}>
                <div className="flex gap-1 items-center justify-end">
                  {filterReview === "adminasc" ? (
                    <FaSortAmountDownAlt />
                  ) : (
                    <FaSortAmountUp />
                  )}
                  <p>ReviewId</p>
                </div>
              </a>
              </Table.HeadCell>

            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {nestedReviews
              ? nestedReviews.map((nested: any) => {
                  return (
                    <Table.Row
                      key={nested.id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell>{nested.id}</Table.Cell>
                      <Table.Cell>{nested.comment}</Table.Cell>
                      <Table.Cell className="text-end">
                        {nested.review?.id}
                      </Table.Cell>

                      <Table.Cell>
                        <a
                          className="font-medium cursor-pointer text-blue-600 hover:underline dark:text-blue-500"
                          onClick={() => {
                            setEditModal(!editModal);
                            try {
                              axios
                                .get(
                                  `https://quocson.fatcatweb.top/v2/nestedreview/${nested.id}`
                                )
                                .then((res) => {
                                  setNestedReviewId(res.data);
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
        <Pagi page={page} onPageChange={handlePageChange} totalPage={totalPage}/>
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
                      Edit Nested Review
                    </Dialog.Title>
                    <div className="w-full mb-6">
                      <div className="mb-3">
                        <div className="mb-2 block">
                          <Label htmlFor="small" value="Comment" />
                        </div>
                        <Textarea
                          rows={4}
                          placeholder={nestedReviewId[0]?.comment}
                          value={editNestedComment}
                          onChange={(e: any) =>
                            setEditNestedComment(e.target.value)
                          }
                        />
                      </div>

                      <div className="mb-3">
                        <div className="mb-2 block">
                          <Label htmlFor="small" value="ProductId" />
                        </div>
                        <select
                          value={editNestedReview}
                          className="border rounded-lg w-full bg-blue-100 border-blue-500 text-blue-900"
                          onChange={(e: any) => setEditNestedReview(e.target.value)}
                        >
                            <option
                            value={nestedReviewId[0]?.review?.id}
                            >
                            {'default: '+ nestedReviewId[0]?.review?.id}
                          </option>
                          {reviews
                            ? reviews.map((review: any) => {
                                return (
                                  <option
                                    selected
                                    key={review.id}
                                    value={review.id}
                                  >
                                    {review.id + ' ' + review.comment.substring(0,30)}
                                  </option>
                                );
                              })
                            : null}
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
                                `https://quocson.fatcatweb.top/v2/nestedreview/${nestedReviewId[0]?.id}`,
                                {
                                  comment:
                                  editNestedComment || nestedReviewId[0]?.comment,
                                  review:
                                    editNestedReview ||
                                    nestedReviewId[0]?.review?.id,
                                }
                              )
                              .then((res: any) => {
                                if (res.data) {
                                  toast("Update review successfully", {
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
                        Are you sure to delete this review?
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
                                `https://quocson.fatcatweb.top/v2/nestedreview/${nestedReviewId[0]?.id}`
                              )
                              .then((res) => {
                                console.log(res.data);
                                setDeleteModal(!deleteModal);
                                setEditModal(!editModal);
                                toast("Delete review successfully", {
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
        <Transition appear show={newReviewModal} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setNewReviewModal(!newReviewModal)}
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
                        <h1>New Review</h1>
                      </div>
                    </Dialog.Title>

                    <div className="w-full mb-6 mt-6">
                      <div className="mb-3">
                        <div className="mb-2 block">
                          <Label htmlFor="small" value="Comment" />
                        </div>
                        <Textarea
                          rows={3}
                          value={newComment}
                          required={true}
                          color="info"
                          onChange={(e: any) => {
                            setNewComment(e.target.value);
                          }}
                        />
                      </div>

                      <div className="mb-3">
                        <div className="mb-2 block">
                          <Label htmlFor="small" value="ProductId" />
                        </div>
                        <select
                          value={newReviewId}
                          className="border rounded-lg w-full bg-blue-100 border-blue-500 text-blue-900"
                          onChange={(e: any) => setNewReviewId(e.target.value)}
                        >
                            <option
                            value={0}
                            >
                            Please choose ProductId
                          </option>
                          {reviews
                            ? reviews.map((item: any) => {
                                return (
                                  <option
                                    selected
                                    key={item.id}
                                    value={item.id}
                                  >
                                    {item.id + ' ' + item.comment.substring(0,80)}
                                  </option>
                                );
                              })
                            : null}
                        </select>
                      </div>

                 

                      <div className="flex justify-evenly gap-5">
                        <Button
                          // disabled={!disable}
                          onClick={() => {
                            try {
                              axios
                                .post(
                                  `https://quocson.fatcatweb.top/v2/product/guestcomment/${newReviewId}`,
                                  {
                                    comment: newComment,
                      review: newReviewId
                                  }
                                )
                                .then((res: any) => {
                                  setNewReviewModal(false);

                                  console.log(res.data);
                                  if (res.data) {
                                    toast("Create new review successfully", {
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
