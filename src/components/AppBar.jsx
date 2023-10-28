export default function AppBar()
{
  return(
    <div className="nav bg-slate-100 p-4 h-28 flex items-center justify-between">
                <a href="/" className="p-3 rounded-xl transition-all text-white bg-black hover:bg-white hover:text-black hover:scale-105 duration-200 font-bold">HOME</a>
      <ul className="flex space-x-4 text-black">


        <li >
          <a href="/DepartmentForm" className="p-4 rounded-xl transition-all text-white bg-black hover:bg-white hover:text-black hover:scale-105 duration-200 font-bold">Department</a>
        </li>
        <li>
          <a href="/EmployeeForm" className="p-4 rounded-xl transition-all text-white bg-black hover:bg-white hover:text-black hover:scale-105 duration-200 font-bold">Employee</a>
        </li>
      </ul>
    <div/>
    </div>
  )
}