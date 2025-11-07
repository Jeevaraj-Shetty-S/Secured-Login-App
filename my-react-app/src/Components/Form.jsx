import { useState } from 'react'
function Form() {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [email,setEmail] = useState("");
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
 
  // Function to add an employee
  const addEmployee = () => {
    if (name.trim() === "" || department.trim() === "") {
      alert("Please fill in all fields");
      return;
    }
    setEmployees([...employees, { name, department,email }]);
    setName("");
    setDepartment("");
  };
 
  // Filter employees (search)
  const filtered = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );
  

  return (
    <div className="App">
      {/* <h1>Employee Details</h1> */}
 
      {/* Form Section */}
      <div className="form">
        <input
          type="text"
          placeholder="Enter employee name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Enter Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <button onClick={addEmployee}>Add Employee</button>
      </div>
 
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search employee..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
 
      {/* Table Section */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((emp, index) => (
            <tr key={index}>
              <td>{emp.name}</td>
              <td>{emp.department}</td>
              <td>{emp.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Form



