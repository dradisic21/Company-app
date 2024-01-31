// components/EditEmployee.js
import React, { useState } from 'react';

const EditEmployee = ({ employee, onUpdate }) => {
  const [updatedName, setUpdatedName] = useState(employee.employeeName);
  const [updatedSalary, setUpdatedSalary] = useState(employee.salary);
  const [updatedDepartmentNo, setUpdatedDepartmentNo] = useState(employee.departmentNo);

  const handleUpdate = () => {
    // Ovdje možete implementirati logiku za ažuriranje podataka
    const updatedData = {
      employeeName: updatedName,
      salary: updatedSalary,
      departmentNo: updatedDepartmentNo,
    };
    onUpdate(employee.employeeNo, updatedData);
  };

  return (
    <div>
      <h3>Uredi zaposlenika</h3>
      <label>
        Ime zaposlenika:
        <input type="text" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
      </label>
      <br />
      <label>
        Plaća:
        <input type="text" value={updatedSalary} onChange={(e) => setUpdatedSalary(e.target.value)} />
      </label>
      <br />
      <label>
        Odjel:
        <input type="text" value={updatedDepartmentNo} onChange={(e) => setUpdatedDepartmentNo(e.target.value)} />
      </label>
      <br />
      <button onClick={handleUpdate}>Ažuriraj</button>
    </div>
  );
};

export default EditEmployee;
