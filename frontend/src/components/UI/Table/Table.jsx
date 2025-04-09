import React from "react";
import PropTypes from "prop-types";

const Table = ({ children, className }) => {
    return <table className={`min-w-full ${className}`}>{children}</table>;
};

Table.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

const TableHeader = ({ children, className }) => {
    return <thead className={className}>{children}</thead>;
};

TableHeader.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

const TableBody = ({ children, className }) => {
    return <tbody className={className}>{children}</tbody>;
};

TableBody.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

const TableRow = ({ children, className }) => {
    return <tr className={className}>{children}</tr>;
};

TableRow.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

const TableCell = ({ children, className }) => {
    return <td className={`whitespace-nowrap font-semibold p-3 ${className}`}>{children}</td>;
};

TableCell.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

const TableHeaderCell = ({ children, className }) => {
    return <th className={`p-3 font-bold tracking-tight ${className}`}>{children}</th>;
}

TableHeaderCell.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};


export { Table, TableHeader, TableBody, TableRow, TableCell, TableHeaderCell };
