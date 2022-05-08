import { Link, Outlet } from "react-router-dom";
import classes from "./Navigation.module.scss";

const Navigation = () => {
  return (
    <>
      <div className={classes["navigation-container"]}>
        <Link to={"/"}>TOP</Link>
        <Link to={"/jobs"}>JOB LIST</Link>
        <Link to={"/jobs/new"}>CREATE JOB</Link>
        <Link to={"/skills/new"}>CREATE SKILL</Link>
        <Link to={"/skills"}>SKILL STATISTICS</Link>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
