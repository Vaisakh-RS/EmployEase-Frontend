export default function AppBar()
{
  return(
    <div className="nav bg-black p-4">
      <ul className="text-white flex space-x-4">
        <li>
          <a href="EmployEase-Frontend/src/components/EmployeeForm">Employee</a>
        </li>
        <li>
          <a href="/DepartmentForm">Department</a>
        </li>
      </ul>
    </div>
  )
}