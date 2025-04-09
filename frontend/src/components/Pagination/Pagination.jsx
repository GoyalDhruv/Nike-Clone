import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

function Pagination({ currentPage, totalPages, onPageChange, limit = 5 }) {
    const pageNumbers = useMemo(() => {
        const halfLimit = Math.floor(limit / 2);
        let start = Math.max(1, currentPage - halfLimit);
        let end = start + limit - 1;

        if (end > totalPages) {
            end = totalPages;
            start = Math.max(1, end - limit + 1);
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }, [currentPage, totalPages, limit]);

    return (
        <div className="flex justify-center items-center gap-2">
            {/* Prev Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-2 text-sm rounded-full font-semibold hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ArrowLeftIcon className="h-4 w-4" />
                Prevoius
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-2">
                {pageNumbers.map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`w-9 h-9 rounded-full text-sm flex items-center justify-center  transition-colors font-semibold
                            ${currentPage === page
                                ? "bg-black text-white border-black"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                            }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3 py-2 text-sm rounded-full  font-semibold hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <span>Next</span>
                <ArrowRightIcon className="h-4 w-4" />
            </button>
        </div>
    );
}

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    limit: PropTypes.number,
};

export default Pagination;
