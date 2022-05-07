import { Link, Outlet } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <div>
        <Link to={"/"}>TOP</Link>
        <Link to={"/jobs"}>JOB LIST</Link>
        <Link to={"/jobs/new"}>CREATE JOB</Link>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
