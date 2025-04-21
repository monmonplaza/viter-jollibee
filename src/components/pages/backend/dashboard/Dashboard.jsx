import useQueryData from "@/components/custom-hook/useQueryData";
import { ver } from "@/components/helpers/functions-general";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Footer from "../partials/Footer";
import Header from "../partials/Header";
import SideNavigation from "../partials/SideNavigation";
import DashboardAccordion from "./DashboardAccordion";
import DashboardCard from "./DashboardCard";

const Dashboard = () => {
  const {
    isLoading,
    isFetching,
    error,
    data: result,
  } = useQueryData(
    `/${ver}/category`, // endpoint
    "get", // method
    "category" // key
  );

  return (
    <>
      <section className="layout-main ">
        <div className="layout-division ">
          <SideNavigation menu="dashboard" />
          <main>
            <Header title="Dashboard" subtitle="Welcome to Jollibee" />
            <div className="p-8">
              <div className="grid grid-cols-[1fr_400px] gap-5">
                <div className="stats">
                  <div className="grid grid-cols-4 gap-5">
                    {!isLoading &&
                      result?.data.map((item, key) => (
                        <DashboardCard
                          title={item.category_title}
                          filterby={item.category_title}
                          key={key}
                        />
                      ))}
                  </div>

                  {/* <div className="chart mt-10">
                    <h3>Menu Prices</h3>
                    <ResponsiveContainer width={"100%"} height={300}>
                      <LineChart data={menus}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="menu_title"
                          padding={{ left: 30, right: 30 }}
                        />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <LineChart
                          type="monotone"
                          dataKey="menu_price"
                          stroke="red"
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div> */}
                </div>
                <div className="sidebar overflow-auto custom-scroll h-[calc(100vh-200px)] scroll-gutter">
                  {!isLoading &&
                    result?.data.map((item, key) => (
                      <DashboardAccordion
                        title={item.category_title}
                        filterby={item.category_title}
                        key={key}
                      />
                    ))}
                </div>
              </div>
            </div>
            <Footer />
          </main>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
