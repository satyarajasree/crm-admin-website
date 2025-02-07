import React, { useState, useEffect } from "react";
import Tree from "react-d3-tree";

const ListEmployees = () => {
  const [treeData, setTreeData] = useState(null);

  useEffect(() => {
    // Fetch employee hierarchy data from API
    fetch("http://localhost:8080/main/admin/list-employee")
      .then((response) => response.json())
      .then((data) => {
        setTreeData(formatTreeData(data));
      })
      .catch((error) => console.error("Error fetching tree data:", error));
  }, []);

  // Function to transform API JSON to tree format
  const formatTreeData = (data) => {
    return {
      name: data.fullName,
      attributes: { Designation: data.designation },
      children: data.subordinates ? data.subordinates.map(formatTreeData) : [],
    };
  };

  if (!treeData) return <p>Loading Employee Tree...</p>;

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Tree data={treeData} orientation="vertical" />
    </div>
  );
};

export default ListEmployees;
