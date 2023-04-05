import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";

const Unauthorized = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="content">
        <div>
          <h1>Unauthorized</h1>
        </div>
      </div>
    </>
  );
};

export default Unauthorized;
