import { Breadcrumb } from "flowbite-react";
import React, { ReactElement } from "react";
import { FaHome } from "react-icons/fa";
import Layout from "../components/Layout";
import LineChart from "../components/LineChart";

function Index() {
  return (
    <div>
      <Breadcrumb aria-label="Default breadcrumb example" className="my-6">
        <Breadcrumb.Item href="/" icon={FaHome}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item>Chart Management</Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex flex-col items-center my-6">
        <h1 className="font-bold uppercase text-lg mb-6">Sale Revenue Chart</h1>
        <LineChart />
      </div>
    </div>
  );
}

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <>{page}</>
    </Layout>
  );
};

export default Index;
