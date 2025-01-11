import React from "react";
import Nav from "../composants/molecule/nav";
import ReadingModal from "../composants/molecule/ReadingModal";
import InProgressBooksTable from "../composants/molecule/InProgressBooksTable";
import InFinishedBooksTable from "../composants/molecule/InFinishedBooksTable";

export const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <Nav />
      </header>

      <main className="flex-grow flex justify-center bg-white p-10">
        <div className="w-full justify-start max-w-7xl flex flex-col gap-5">
          <div className="flex w-full gap-5">
            <div className="h-[300px] bg-gray-50 flex justify-center items-center rounded-lg border-2 p-5">
              <ReadingModal />
            </div>
            <InProgressBooksTable />
          </div>
          <InFinishedBooksTable />
        </div>
      </main>
    </div>
  );
};
