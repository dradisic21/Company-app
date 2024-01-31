import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Table.module.scss";

export default function Home() {
  const [dataResponse, setdataResponse] = useState([]);
  const [deletedError, setDeletedError] = useState(false);

  useEffect(() => {
    async function getPageData() {
      const apiUrlEndpoint = `http://localhost:3000/api/getdata`;
      const response = await fetch(apiUrlEndpoint);
      const res = await response.json();
      setdataResponse(res.Employee);
    }
    getPageData();
  }, []);


  const handleDelete = async (employeeNo) => {
    try {
      const apiUrlEndpoint = `http://localhost:3000/api/deletedata`;
      const response = await fetch(apiUrlEndpoint, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ employeeNo }),
      });

      if (response.ok) {
        setdataResponse((prevData) => prevData.filter((employee) => employee.employeeNo !== employeeNo));
        setDeletedError(false); 
      } else {
        setDeletedError(true); 
      }
    } catch (error) {
      console.error(error.message);
      setDeletedError(true); 
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
                  <td>{employee.employeeName}</td>
                  <td>{employee.salary}</td>
                  <td>{employee.departmentNo}</td>
                  <td>{employee.lastModifyDate ? new Date(employee.lastModifyDate).toLocaleString('hr-HR') : " "}</td>
                  <td className={styles.action_icon}>
                  <FontAwesomeIcon
                      icon={faTrashCan}
                      onClick={() => handleDelete(employee.employeeNo)} />
                    <FontAwesomeIcon icon={faPenToSquare} />
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
