import { Link } from "react-router-dom";

import Navbars from "./Navbars/Navbars";
import TopPage from "./TopPage/TopPage";
import Sidebar from "./Sidebar/Sidebar";

function UseInterfacePage() {
  return (
    <div>
      <Navbars />
      <TopPage />
      {/* <Product state={state} /> */}
    </div>
  );
}

export default UseInterfacePage;
