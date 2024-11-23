import React from "react";
import AdminPanelLayout from "@/src/components/layouts/AdminPanelLayout";
import Box from "@/src/components/modules/infoBox/InfoBox";
import styles from "@/src/styles/p-admin/index.module.css";
import TicketModel from "@/models/Ticket";
import UserModel from "@/models/User";
import ProductModel from "@/models/Product";
import connectToDB from "@/config/db";
import SaleChart from "@/src/components/templates/p-admin/index/SaleChart";
import GrowthChart from "@/src/components/templates/p-admin/index/GrowthChart";

export default async function page() {
  connectToDB();
  const tickets = await TicketModel.find({}).lean();
  const users = await UserModel.find({}).lean();
  const products = await ProductModel.find({}).lean();

  return (
    <AdminPanelLayout>
      <main>
        <section className={styles.dashboard_contents}>
          <Box title="مجموع تیکت های دریافتی" value={tickets.length} />
          <Box title="مجموع محصولات سایت" value={products.length} />
          <Box title="مجموع سفارشات" value="333" />
          <Box title="مجموع کاربر های سایت" value={users.length} />
        </section>{" "}
        <div className={styles.dashboard_charts}>
          <section>
            <p>آمار فروش</p>
            <SaleChart />
          </section>
          <section>
            <p>نرخ رشد</p>
            <GrowthChart />
          </section>
        </div>
      </main>
    </AdminPanelLayout>
  );
}
