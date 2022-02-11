import Sidebar from "./Sidebar";
import { useHistory } from "react-router-dom";
function Dashboard() {
   //Handling Authorisation
   const redirect = useHistory();   
   !localStorage.getItem('token') ? redirect.push("/login")   : ''
  return (
    <Sidebar />
  );
}

export default Dashboard; 