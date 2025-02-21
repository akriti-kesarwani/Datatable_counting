import React, { useState } from "react";

const UserTable = () => {
  const userData = [
    { id: 1, name: "Akriti", email: "akriti@example.com", age: 25, registrationDate: "2023-01-15" },
    { id: 2, name: "Boby", email: "boby@example.com", age: 30, registrationDate: "2022-11-10" },
    { id: 3, name: "Charlie", email: "charlie@example.com", age: 22, registrationDate: "2023-05-05" },
    { id: 4, name: "David", email: "david@example.com", age: 27, registrationDate: "2023-06-20" },
    { id: 5, name: "Emma", email: "emma@example.com", age: 35, registrationDate: "2021-09-15" },
    { id: 6, name: "Frank", email: "frank@example.com", age: 29, registrationDate: "2022-03-25" },
    { id: 7, name: "Grace", email: "grace@example.com", age: 26, registrationDate: "2023-04-01" },
    { id: 8, name: "Henry", email: "henry@example.com", age: 28, registrationDate: "2022-12-30" },
    { id: 9, name: "Ivy", email: "ivy@example.com", age: 23, registrationDate: "2023-07-18" },
    { id: 10, name: "Jack", email: "jack@example.com", age: 32, registrationDate: "2021-10-05" }
  ];

  const [users] = useState(userData); // Store user data
  const [search, setSearch] = useState(""); // Search filter
  const [sortColumn, setSortColumn] = useState("name"); // Sorting column
  const [sortOrder, setSortOrder] = useState("asc"); // Sorting order
  const [page, setPage] = useState(1); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page

  // Handle Sorting
  const handleSort = (column) => {
    const newOrder = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(newOrder);
  };

  // Filter and Sort Data
  const filteredAndSortedUsers = users
    .filter((user) => user.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortColumn === "age") {
        return sortOrder === "asc" ? a.age - b.age : b.age - a.age;
      } else {
        return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }
    });

  // Pagination
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedUsers = filteredAndSortedUsers.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <table border="1" width="100%">
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>
              Name {sortColumn === "name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th>Email</th>
            <th onClick={() => handleSort("age")}>
              Age {sortColumn === "age" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th>Registration Date</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>{user.registrationDate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span> Page {page} </span>
        <button disabled={startIndex + rowsPerPage >= filteredAndSortedUsers.length} onClick={() => setPage(page + 1)}>Next</button>
        <select value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))}>
          <option value={5}>5 rows</option>
          <option value={10}>10 rows</option>
          <option value={20}>20 rows</option>
        </select>
      </div>
    </div>
  );
};

export default UserTable;