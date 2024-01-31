import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Table.module.scss";
import inputStyles from "../styles/Input.module.scss";
import buttonStyle from "../styles/Button.module.scss";

export default function Home() {
  const [dataResponse, setdataResponse] = useState([]);
  const [globalError, setGlobalError] = useState(null);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [editableRows, setEditableRows] = useState({});
  const [editedData, setEditedData] = useState({});
  const [forceRefresh, setForceRefresh] = useState(false);

  useEffect(() => {
    async function getPageData() {
      const apiUrlEndpoint = `http://localhost:3000/api/getdata`;
      try {
        const response = await fetch(apiUrlEndpoint);
        if (!response.ok) {
          throw new Error(
            `Error fetching data: ${response.status} ${response.statusText}`
          );
        }
        const res = await response.json();
        setdataResponse(res.Employee);
      } catch (error) {
        setGlobalError(`Error fetching data: ${error.message}`);
      }
    }
    getPageData();
    setForceRefresh(false); 
  }, [forceRefresh]);

  const handleDelete = async (employeeNo) => {
    try {
      const apiUrlEndpoint = `http://localhost:3000/api/deletedata`;
      const response = await fetch(apiUrlEndpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ employeeNo }),
      });

      if (!response.ok) {
        throw new Error(
          `Error deleting employee: ${response.status} ${response.statusText}`
        );
      }

      setdataResponse((prevData) =>
        prevData.filter((employee) => employee.employeeNo !== employeeNo)
      );
      setGlobalError(null);
      setEditableRows({});
    } catch (error) {
      setGlobalError(`Error deleting employee: ${error.message}`);
    }
  };

  const handleUpdate = async (employeeNo, updatedData, acceptChanges = false) => {
    try {
      const apiUrlEndpoint = `http://localhost:3000/api/updatedata`;
      const response = await fetch(apiUrlEndpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employeeNo,
          updatedData,
          acceptChanges,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Error updating employee: ${response.status} ${response.statusText}`
        );
      }

      setdataResponse((prevData) =>
        prevData.map((employee) =>
          employee.employeeNo === employeeNo
            ? { ...employee, ...updatedData }
            : employee
        )
      );

      if (acceptChanges) {
        setEditableRows({});
        setEditedData({});
      }

      setGlobalError(null);
    } catch (error) {
      setGlobalError(`Error updating employee: ${error.message}`);
    }
  };

  const handleEditClick = (employee) => {
    setEditingEmployee(employee);
    setEditableRows((prevRows) => ({
      ...prevRows,
      [employee.employeeNo]: true,
    }));
    setEditedData({
      employeeName: employee.employeeName,
      salary: employee.salary,
      departmentNo: employee.departmentNo,
    });
  };

  const handleAcceptChanges = async (employeeNo) => {
    try {
      await handleUpdate(employeeNo, editedData, true);
      setForceRefresh(true); // Postavi `forceRefresh` kako bi se ponovno pokrenuo `useEffect`
    } catch (error) {
      setGlobalError(`Error accepting changes: ${error.message}`);
    }
  };


  return (
    <div className={styles.table_container}>
      <table>
        <thead className={styles.table_header}>
          <tr>
            <th>Redni broj</th>
            <th>Ime zaposlenika</th>
            <th>Plaća</th>
            <th>Odjel</th>
            <th>Zadnja promjena</th>
            <th>Akcija</th>
          </tr>
        </thead>
        <tbody className={styles.employee_row}>
          {dataResponse.length > 0 ? (
            dataResponse.map((employee) => {
              return (
                <tr key={employee.employeeNo}>
                  <td>{employee.employeeNo}</td>
                  <td>
                    {editableRows[employee.employeeNo] ? (
                      <input
                      type="text"
                      className={inputStyles.edit_input}
                      value={editedData.employeeName}
                      onChange={(e) =>
                        setEditedData((prevData) => ({
                          ...prevData,
                          employeeName: e.target.value,
                        }))
                      }
                      readOnly={!editableRows[employee.employeeNo]}
                    />
                    ) : (
                      employee.employeeName
                    )}
                  </td>
                  <td>
                    {editableRows[employee.employeeNo] ? (
                      <input
                      type="text"
                      className={inputStyles.edit_input}
                      value={editedData.salary}
                      onChange={(e) =>
                        setEditedData((prevData) => ({
                          ...prevData,
                          salary: e.target.value,
                        }))
                      }
                      readOnly={!editableRows[employee.employeeNo]}
                    />
                    ) : (
                      employee.salary
                    )}
                  </td>
                  <td>
                    {editableRows[employee.employeeNo] ? (
                     <input
                     type="text"
                     className={inputStyles.edit_input}
                     value={editedData.departmentNo}
                     onChange={(e) =>
                       setEditedData((prevData) => ({
                         ...prevData,
                         departmentNo: e.target.value,
                       }))
                     }
                     readOnly={!editableRows[employee.employeeNo]}
                   />
                    ) : (
                      employee.departmentNo
                    )}
                  </td>
                  <td>
                    {employee.lastModifyDate
                      ? new Date(employee.lastModifyDate).toLocaleString(
                          "hr-HR"
                        )
                      : " "}
                  </td>
                  <td className={styles.action_icon}>
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      onClick={() => handleDelete(employee.employeeNo)}
                      style={{ color: "rgb(255, 68, 68)" }}
                    />
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      onClick={() => handleEditClick(employee)}
                      style={{ color: "rgb(68, 151, 255)" }}
                    />
                    {editableRows[employee.employeeNo] && (
                      <button
                      className={buttonStyle.edit_button}
                        onClick={() => handleAcceptChanges(employee.employeeNo)}
                      >
                        Prihvati izmjene
                      </button>
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>Nema dostupnih podataka</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
