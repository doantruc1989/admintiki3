import React, { useState } from "react";

function Pagi(props:any) {
    const {page, onPageChange, totalPage} = props;
  return (
    <div className="flex justify-center">
      <nav aria-label="Page navigation example">
        <ul className="list-style-none flex">
          <li>
            <a 
            onClick={() => {
                if(page <=1) {
                  onPageChange(1)
                } else onPageChange(page -1)
            }}
            className="relative cursor-pointer block rounded-full bg-transparent py-1.5 px-3 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white">
              Previous
            </a>
          </li>
          
          <li>
            <a
            onClick={() => {onPageChange(1)}}
              className="relative cursor-pointer block rounded-full bg-transparent py-1.5 px-3 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
          
            >
              1
            </a>
          </li>
          <li aria-current="page">
            <a
              className="relative cursor-pointer block rounded-full bg-transparent py-1.5 px-3 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
              onClick={() => {onPageChange(2)}}
            >
              2
            </a>
          </li>
          <li>
            <a
              className="relative block cursor-pointer rounded-full bg-transparent py-1.5 px-3 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
              onClick={() => {onPageChange(3)}}
            >
              3
            </a>
          </li>
          <li>
            <a
              className="relative block cursor-pointer rounded-full bg-transparent py-1.5 px-3 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
              onClick={() => {onPageChange(4)}}
            >
              4
            </a>
          </li>
          <li>
            <a
              className="relative block cursor-pointer rounded-full bg-transparent py-1.5 px-3 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
              onClick={() => {onPageChange(5)}}
            >
              5
            </a>
          </li>
          <li>
            <a
              className="relative block cursor-pointer rounded-full bg-transparent py-1.5 px-3 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
              onClick={() => {onPageChange(6)}}
            >
              6
            </a>
          </li>
          <li>
            <a
              className="relative block cursor-pointer rounded-full bg-transparent py-1.5 px-3 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
              onClick={() => {onPageChange(7)}}
            >
              7
            </a>
          </li>
          <li>
            <a
              className="relative block cursor-pointer rounded-full bg-transparent py-1.5 px-3 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
              onClick={() => {onPageChange(8)}}
            >
              8
            </a>
          </li>
          <li>
            <a
              className="relative block cursor-pointer rounded-full bg-transparent py-1.5 px-3 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
              onClick={() => {onPageChange(9)}}
            >
              9
            </a>
          </li>
          <li>
            <a
              className="relative block cursor-pointer rounded-full bg-transparent py-1.5 px-3 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
              onClick={() => {onPageChange(page +1)}}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagi;
