import React, { FunctionComponent, useState } from "react";

export const Paginator: FunctionComponent = props => <></>;

// // type PaginatorProps = {
// //   paginationParams: PaginationParams;
// //   //event handlers
// //   onPaginationChange: PaginationParamsHandler;
// // };

// type PaginationActionsType = "first" | "prev" | "next" | "last";

// const Paginator: FunctionComponent<PaginatorProps> = ({
//   paginationParams,
//   onPaginationChange,
// }: PaginatorProps) => {
//   const { perPage, totalResults } = paginationParams;
//   let { currentPage } = paginationParams;
//   let totalPages =
//     totalResults && perPage
//       ? Math.ceil(paginationParams.totalResults / paginationParams.perPage)
//       : 0;
//   paginationParams.totalPages = totalPages;

//   const isFirst = currentPage == 1 || !totalPages;
//   const isLast = currentPage == totalPages || !totalPages;

//   const handlePaginationChange = (action: PaginationActionsType) => {
//     let nextPaginationParams = { ...paginationParams };
//     let nextCurrentPage;
//     switch (action) {
//       case "first":
//         if (isFirst) return;
//         nextCurrentPage = 1;
//         break;
//       case "prev":
//         if (isFirst) return;
//         nextCurrentPage = --currentPage;
//         break;
//       case "next":
//         if (isLast) return;
//         nextCurrentPage = ++currentPage;
//         break;
//       case "last":
//         if (isLast) return;
//         nextCurrentPage = totalPages;
//         break;
//     }
//     nextPaginationParams.currentPage = nextCurrentPage;

//     onPaginationChange ? onPaginationChange(nextPaginationParams) : null;
//   };
//   const disabledClassName: string = "disabled-page";

//   return (
//     <div className={"table-paginator"}>
//       <div className="paginator">
//         <div className="pagelinks">
//           <span
//             className={`btn ${isFirst ? disabledClassName : ""}`}
//             onClick={() => handlePaginationChange("first")}
//           >
//             <i className="fa fa-angle-double-left"></i>
//           </span>
//           <span
//             className={`btn ${isFirst ? disabledClassName : ""}`}
//             onClick={() => handlePaginationChange("prev")}
//           >
//             <i className="fa fa-angle-left"></i>
//           </span>
//           <span className="btn page-display">
//             {`${currentPage} of ${totalPages || '1'}`}
//           </span>
//           <span
//             className={`btn ${
//               isLast ? disabledClassName : ""
//             }`}
//             onClick={() => handlePaginationChange("next")}
//           >
//             <i className="fa fa-angle-right"></i>
//           </span>
//           <span
//             className={`btn ${
//               isLast ? disabledClassName : ""
//             }`}
//             onClick={() => handlePaginationChange("last")}
//           >
//             <i className="fa fa-angle-double-right"></i>
//           </span>
//         </div>
//         <div className="displaycount">
//           {paginationParams.totalResults} <em>Total Results</em>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Paginator;
