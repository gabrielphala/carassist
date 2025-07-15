import { useEffect, useState } from "react";
import EmployeeCard from "../../components/employee-card/EmployeeCard";
import GarageManager from "../../components/info/GarageManager";
import { postWithAuth } from "../../helpers/http";

export default () => {
  const [employees, setEmployees] = useState([]) as any;

  useEffect(() => {
    (async () => {
      const res = await postWithAuth('/users/get/employees', {});

      setEmployees(res.employees)
    })()
  }, [])

  return (
    <GarageManager>
      <div className="info__page-heading">
        <h1><i className="fa-solid fa-users margin--right-1"></i>Employees</h1>
        <p>Your colleages from your garage</p>
        <div className="info__page-heading__hr"></div>
      </div>

      <div className="info__pad">
        <div className="info__employees">
          {employees.map((item: any) => <EmployeeCard key={item.id} {...item} />)}
        </div>

        {/* <button className="btn btn--primary margin--top-2">Add new employee</button> */}
      </div>
    </GarageManager>
  )
}