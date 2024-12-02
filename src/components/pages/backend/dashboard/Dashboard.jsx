import Footer from "../partials/Footer";
import Header from "../partials/Header";
import SideNavigation from "../partials/SideNavigation";
import DashboardCard from "./DashboardCard";
import DashboardAccordion from "./DashboardAccordion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { menus } from "../menu-data";

const Dashboard = () => {
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
                    <DashboardCard title="Chicken Joy" filterby="Chickenjoy" />
                    <DashboardCard title="Value Meal" filterby="Value Meal" />
                    <DashboardCard title="Burger" filterby="Burger" />
                    <DashboardCard
                      title="Burger Steak"
                      filterby="Burger Steak"
                    />
                    <DashboardCard title="Spaghetti" filterby="Spaghetti" />
                    <DashboardCard title="Palabok" filterby="Palabok" />
                    <DashboardCard title="Sides" filterby="Sides" />
                    <DashboardCard title="Desserts" filterby="Desserts" />
                  </div>

                  <div className="chart mt-10">
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
                  </div>
                </div>
                <div className="sidebar overflow-auto custom-scroll h-[calc(100vh-200px)]">
                  <DashboardAccordion
                    title="Chicken Joy"
                    filterby="Chickenjoy"
                  />
                  <DashboardAccordion
                    title="Value Meal"
                    filterby="Value Meal"
                  />
                  <DashboardAccordion title="Burger" filterby="Burger" />
                  <DashboardAccordion
                    title="Burger Steak"
                    filterby="Burger Steak"
                  />

                  <DashboardAccordion title="Spaghetti" filterby="Spaghetti" />
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
