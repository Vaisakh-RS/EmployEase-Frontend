export default function AppBar()
{
  return(
    <div className="nav bg-slate-100 p-4 h-28 flex items-center justify-center">
      <ul className="flex space-x-4 text-black">
        <li >
          <a href="/DepartmentForm" className="border-2 border-sky-500 p-3 rounded-md transition-colors hover:bg-sky-500">Department</a>
        </li>
        <li>
          <a href="EmployEase-Frontend/src/components/EmployeeForm" className="border-2 border-sky-500 p-3 rounded-md transition-colors hover:bg-sky-500">Employee</a>
        </li>
      </ul>
    </div>
  )
}