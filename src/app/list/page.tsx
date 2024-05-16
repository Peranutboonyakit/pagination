"use client";
import classNames from "classnames";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ListPage() {
  //---------------------
  //  STATE
  //---------------------
  const router = usePathname();
  const { replace } = useRouter();
  const queryParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState<any>(
    Number(queryParams.get("page"))
  );
  const [totalPage, setTotalPage] = useState(10);

  //---------------------
  //  EFFECT
  //---------------------
  useEffect(() => {
    let params = new URLSearchParams(queryParams);
    params.set("page", currentPage.toString());
    replace(`${router}?${params.toString()}`);
  }, [currentPage]);

  //---------------------
  //  HANDLE
  //---------------------
  const onPageChange = (page: any, index: number) => {
    if (page === "...") {
      if (currentPage >= 1 && currentPage < 5) {
        setCurrentPage(currentPage + 5);
      } else if (currentPage === 5) {
        index < currentPage
          ? setCurrentPage(currentPage - 2)
          : setCurrentPage(currentPage + 2);
      } else if (currentPage > 5 && currentPage <= 10) {
        setCurrentPage(currentPage - 5);
      }
    } else {
      setCurrentPage(page);
    }
  };

  const pageNumber = () => {
    let AllPages = [];
    for (let i = 1; i <= totalPage; i++) {
      AllPages.push(i);
    }

    let result = [];

    if (currentPage < AllPages[AllPages.length - 6]) {
      AllPages.slice(0, 5).map((value) => result.push(value));
      result.push("...");
      result.push(AllPages.length);
    } else if (currentPage === AllPages[AllPages.length - 6]) {
      result.push(1);
      result.push("...");
      AllPages.slice(3, 6).map((value) => result.push(value));
      result.push("...");
      result.push(AllPages.length);
    } else if (
      currentPage > AllPages[AllPages.length - 6] &&
      currentPage < AllPages.length
    ) {
      result.push(1);
      result.push("...");
      AllPages.slice(AllPages[AllPages.length - 6], AllPages.length).map(
        (value) => result.push(value)
      );
    } else if (currentPage === AllPages.length) {
      result.push(1);
      result.push("...");
      AllPages.slice(AllPages[AllPages.length - 6], AllPages.length).map(
        (value) => result.push(value)
      );
    }

    return result;
  };
  //---------------------
  //  RENDER
  //---------------------
  return (
    <div className="h-screen w-screen flex items-center justify-center space-x-5">
      <div
        className={classNames("cursor-pointer", {
          "text-gray-200 cursor-not-allowed": currentPage === 1,
        })}
        onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
      >{`<`}</div>
      {pageNumber().map((p, index) => (
        <div
          key={index}
          className={classNames(
            "w-10 h-10 flex items-center justify-center cursor-pointer space-x-5",
            {
              "rounded-full bg-gray-300":
                queryParams.get("page") === p.toString(),
            },
            {
              "rounded-full hover:bg-gray-100 transition duration-300":
                queryParams.get("page") !== p.toString(),
            }
          )}
          onClick={() => onPageChange(p, index)}
        >
          {p}
        </div>
      ))}
      <div
        className={classNames("cursor-pointer", {
          "text-gray-300 cursor-not-allowed": currentPage === totalPage,
        })}
        onClick={() =>
          currentPage < totalPage && setCurrentPage(currentPage + 1)
        }
      >{`>`}</div>
    </div>
  );
}
