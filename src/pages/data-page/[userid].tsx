//@ts-nocheck
import React, { useEffect, useState } from "react";
import BoxLayout from "~/components/BoxLayout";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

const DataPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [currentpageset, setcurrentpageset] = useState(1);
  const [maxpageset, setmaxpageset] = useState(1);
  const { userid } = router.query;

  const newdata = api.dataRouter.getData.useQuery({
    userid,
    page: currentPage,
  });
  console.log("the newdata", newdata);

  const { data: theData, refetch } = api.dataRouter.getData.useQuery({
    userid,
    page: currentPage,
  });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login-page");
    }
  }, []);

  const getPageNumbers = (offset: number, totalPages: number): number[] => {
    const pageSize = 5;
    const startPage = (offset - 1) * pageSize + 1;
    const endPage = Math.min(startPage + pageSize - 1, totalPages);
    const pageNumbers = [];

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  useEffect(() => {
    if (theData) {
      setTotalPages(Math.ceil(theData.totalCategories / 6));
      setmaxpageset(Math.ceil(Math.ceil(theData.totalCategories / 6) / 6));
    }
  }, [theData]);

  useEffect(() => {
    if (theData?.totalCategories) {
      const totalPages = Math.ceil(theData.totalCategories / 6);
      const nextPageNumbers = getPageNumbers(currentpageset, totalPages);
      setPageNumbers(nextPageNumbers);
    }
  }, [theData, currentpageset]);

  console.log("the maxpage set", maxpageset);
  const { mutate } = api.dataRouter.updateData.useMutation({
    onSuccess: (dataObj) => {
      if (dataObj) {
        refetch();
      }
    },
    onError: (e) => {
      console.log("the error ", e);
    },
  });
  const handleCheckboxChange = async (
    checkvalue: boolean,
    userid: string,
    name: string,
  ) => {
    const newCheckvalue = !checkvalue;
    await mutate({ checkvalue: newCheckvalue, userid, name });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <BoxLayout>
        <h1 className="mb-5 text-center text-3xl font-bold text-black">
          Please mark your interest
        </h1>

        <h3 className="mb-8 text-center text-sm text-black">
          We will keep you notified
        </h3>

        <h2 className="mb-4  text-black">My Saved Interest !</h2>

        <div className="mb-4">
          <ul>
            {theData?.categories?.map((item, index: number) => (
              <li key={index}>
                <input
                  type="checkbox"
                  checked={item.active}
                  onChange={() =>
                    handleCheckboxChange(item.active, userid, item.name)
                  }
                  style={{
                    accentColor: item.active ? "black" : "",
                    backgroundColor: "gray",
                  }}
                />
                &emsp;<label className="mt-2">{item.name}</label>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 flex justify-center">
          <button
            className="mr-2 rounded bg-gray-200 px-2 py-1"
            onClick={() => setcurrentpageset((prev) => prev - 1)}
            disabled={currentpageset === 1}
          >
            {"<<"}
          </button>
          <button
            className="mr-2 rounded bg-gray-200 px-2 py-1"
            onClick={() => handlePageChange(currentPage - 1)}
            // handleNextPage
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
          {/* {Array.from({ length: Math.min(totalPages, 5) }).map((_, index) => (
            <button
              key={index}
              className={`mx-1 rounded px-2 py-1 ${
                currentPage === index + 1
                  ? "bg-gray-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))} */}
          {pageNumbers.map((pageNum) => (
            <button
              key={pageNum}
              className={`mx-2 rounded bg-gray-200 px-4 py-2 ${
                currentPage === pageNum
                  ? "bg-gray-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setCurrentPage(pageNum)}
            >
              {pageNum}
            </button>
          ))}
          <button
            className="mr-2 rounded bg-gray-200 px-2 py-1"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
          <button
            className="ml-2 rounded bg-gray-200 px-2 py-1"
            onClick={() => setcurrentpageset((prev) => prev + 1)}
            disabled={currentpageset === maxpageset}
          >
            {">>"}
          </button>
        </div>
      </BoxLayout>
    </>
  );
};

export default DataPage;
