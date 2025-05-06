import { apiCall } from "@/utils/apiHelper";

const response = await apiCall.get("/events/all", {});
const Dashboard = () => {
  //display owned events
  return (
    <div>
      <h1 className="p-8 font-bold text-xl"> Events</h1>
      {/* preview list of event, link to event page */}
      <h1 className="p-8 font-bold text-xl"> Transactions</h1>
      {/* preview list of transaction, link to transaction page */}
    </div>
  );
};

export default Dashboard;
