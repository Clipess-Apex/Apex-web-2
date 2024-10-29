import React, { useState, useEffect } from "react";
import "../../../styles/workPlan/Table.css";
import "react-toastify/dist/ReactToastify.css";
import { ReactComponent as DeleteIcon } from "../../../icons/workPlan/Delete.svg";
import { ReactComponent as EditIcon } from "../../../icons/workPlan/Edit.svg";
import DeletePopup from "./DeletePopup";
import AssignPopup from "../Tasks/AssignPopup";
import UpdateTaskStatusPopup from "../Tasks/UpdateTaskStatusPopup";
import UpdateProjectStatusPopup from "../Projects/UpdateProjectStatus";
import EditTeamModal from "../Teams/EditTeamModal";


interface Column {
  key: string;
  header: string;
}

interface RowData {
  [key: string]: any;
}

interface Props {
  columns: Column[];
  data: RowData[];
  tableName: string;
  BodyData: any;
}

const Table: React.FC<Props> = ({ columns, data, tableName, BodyData }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openAssignPopup, setOpenAssignPopup] = useState(false);
  const [DataIndex, setDataIndex] = useState<any>(null);
  const [openUpdateTaskStatus, setOpenUpdateTaskStatus] = useState(false);
  const [openUpdateProjectStatus, setOpenUpdateProjectStatus] = useState(false);

  function handleOpenDialog(DataI: any) {
    setOpenDialog(true);
    setDataIndex(DataI);
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

 

  const handleAssignOpen = (row: any) => {
    setDataIndex(row);
    setOpenAssignPopup(true);
  };

  const handleAssignClose = () => {
    setOpenAssignPopup(false);
  };

  const handleUpdateTaskStatusOpen = (row: any) => {
    if (tableName == "EmployeeTask") {
      setDataIndex(row);
      setOpenUpdateTaskStatus(true);
    }
  };

  const handleUpdateTaskStatusClose = () => {
    setOpenUpdateTaskStatus(false);
  };

  const handleUpdateProjectStatusOpen = (row: any) => {
    setDataIndex(row);
    setOpenUpdateProjectStatus(true);
  };

  const handleUpdateProjectStatusClose = () => {
    setOpenUpdateProjectStatus(false);
  };

  const formatDate = (datetime: string): string => {
    if (datetime != null) {
      const date = new Date(datetime);
      return date.toLocaleDateString("en-CA"); // 'en-CA' gives YYYY-MM-DD format
    } else {
      return "N/A";
    }
  };

  return (
    <>
    <div className="workplan-header">
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => {
                if (column.key === "assigned") {
                  if (row[column.key] == true) {
                    return (
                      <td key={column.key}>
                        <button
                          style={{
                            background: "#40A737",
                            color: "#fff",
                            width: "20px",
                            height: "20px",
                            border: "none",
                            borderRadius: "20px",
                            fontSize: "18px",
                            textAlign: "center",
                            alignContent: "center",
                            alignItems: "center",
                          }}
                        >
                          -
                        </button>
                      </td>
                    );
                  } else {
                    return (
                      <td key={column.key}>
                        <button
                          style={{
                            background: "#0764E6",
                            color: "#fff",
                            width: "20px",
                            height: "20px",
                            border: "none",
                            borderRadius: "20px",
                            fontSize: "16px",
                            textAlign: "center",
                          }}
                          onClick={() => handleAssignOpen(row)}
                        >
                          +
                        </button>
                      </td>
                    );
                  }
                }

                if (
                  column.key === "startDate" ||
                  column.key === "endDate" ||
                  column.key === "createdDate" ||
                  column.key === "updatedDate" ||
                  column.key === "assignedDate"
                ) {
                  return (
                    <td key={column.key}>
                      <span>{formatDate(row[column.key])}</span>
                    </td>
                  );
                }

                if (column.key === "projectStatusId") {
                  switch (row[column.key]) {
                    case 1:
                      return (
                        <td key={column.key}>
                          <button
                            style={{
                              background: "rgba(54, 122, 255, 0.15)",
                              color: "#367AFF",
                              border: "none",
                              borderRadius: "6px",
                              width: "107px",
                              height: "36px",
                              fontSize: "14px",
                            }}
                            onClick={() => handleUpdateProjectStatusOpen(row)}
                          >
                            To-Do
                          </button>
                        </td>
                      );
                    case 2:
                      return (
                        <td key={column.key}>
                          <button
                            style={{
                              background: "rgba(247, 102, 128, 0.15)",
                              color: "#E44C67",
                              border: "none",
                              borderRadius: "6px",
                              width: "107px",
                              height: "36px",
                              fontSize: "14px",
                            }}
                            onClick={() => handleUpdateProjectStatusOpen(row)}
                          >
                            In Progress
                          </button>
                        </td>
                      );
                    case 3:
                      return (
                        <td key={column.key}>
                          <button
                            style={{
                              background: "rgba(0, 167, 167, 0.15)",
                              color: "#00A7A7",
                              border: "none",
                              borderRadius: "6px",
                              width: "107px",
                              height: "36px",
                              fontSize: "14px",
                            }}
                          >
                            Done
                          </button>
                        </td>
                      );
                    default:
                      return (
                        <td key={column.key}>
                          <button>To-Do</button>
                        </td>
                      );
                  }
                }
                if (column.key === "taskStatusId") {
                  switch (row[column.key]) {
                    case 1:
                      return (
                        <td key={column.key}>
                          <button
                            style={{
                              background: "rgba(54, 122, 255, 0.15)",
                              color: "#367AFF",
                              border: "none",
                              borderRadius: "6px",
                              width: "107px",
                              height: "36px",
                              fontSize: "14px",
                            }}
                            onClick={() => handleUpdateTaskStatusOpen(row)}
                          >
                            To-Do
                          </button>
                        </td>
                      );
                    case 2:
                      return (
                        <td key={column.key}>
                          <button
                            style={{
                              background: "rgba(247, 102, 128, 0.15)",
                              color: "#E44C67",
                              border: "none",
                              borderRadius: "6px",
                              width: "107px",
                              height: "36px",
                              fontSize: "14px",
                            }}
                            onClick={() => handleUpdateTaskStatusOpen(row)}
                          >
                            Processing
                          </button>
                        </td>
                      );
                    case 3:
                      return (
                        <td key={column.key}>
                          <button
                            style={{
                              background: "rgba(0, 167, 167, 0.15)",
                              color: "#00A7A7",
                              border: "none",
                              borderRadius: "6px",
                              width: "107px",
                              height: "36px",
                              fontSize: "14px",
                            }}
                          >
                            Done
                          </button>
                        </td>
                      );
                    default:
                      return (
                        <td key={column.key}>
                          <button>Default</button>
                        </td>
                      );
                  }
                }
                if (column.key === "edit") {
                  if (row[column.key] === "true") {
                    return (
                      <td key={column.key}>
                        <div className="center-content">
                        
                        </div>
                      </td>
                    );
                  }
                }

                if (column.key === "delete" || column.key==="edit") {
                  if (row[column.key] === "true") {
                    return (
                      <td key={column.key}>
                        <div className="center-content">
                        
                        <div className="deleteIcon">
                        <button
                          className="deleteButton"
                          onClick={() => handleOpenDialog(row)}
                        >
                          <DeleteIcon />
                        </button>
                        <DeletePopup
                          open={openDialog}
                          onClose={handleCloseDialog}
                          BodyData={DataIndex}
                          tableName={tableName}
                        />
                        </div>
                        </div>
                      </td>
                    );
                  }
                }

                if (column.key === "selectedEmployees") {
                  return (
                    <td key={column.key}>
                      <ul className="no-style">
                        {row.selectedEmployees.map(
                          (employee: string, idx: number) => (
                            <li key={idx}>{employee} <br/></li>
                            
                          )
                        )}
                      </ul>
                    </td>
                  );
                }
                return <td key={column.key}>{row[column.key]}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {openAssignPopup && (
        <AssignPopup
          open={openAssignPopup}
          onClose={handleAssignClose}
          BodyData={DataIndex}
        />
      )}

      {openUpdateTaskStatus && (
        <UpdateTaskStatusPopup
          open={openUpdateTaskStatus}
          onClose={handleUpdateTaskStatusClose}
          BodyData={DataIndex}
        />
      )}

      {openUpdateProjectStatus && (
        <UpdateProjectStatusPopup
          open={openUpdateProjectStatus}
          onClose={handleUpdateProjectStatusClose}
          BodyData={DataIndex}
        />
      )}
      </div>
    </>
  );
};

export default Table;
