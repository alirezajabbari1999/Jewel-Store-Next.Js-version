import styles from "@/src/styles/p-admin/discounts.module.css";
import Table from "@/src/components/templates/p-admin/discounts/Table";
import Layout from "@/src/components/layouts/AdminPanelLayout";
import connectToDB from "@/config/db";
import DiscountModel from "@/models/Discount";
import AddDiscount from "@/src/components/templates/p-admin/discounts/AddDiscount";

const Discounts = async () => {
  await connectToDB();
  const discounts = await DiscountModel.find({}).sort({ _id: -1 }).limit(50).lean();

  return (
    <Layout>
      <main>
        <AddDiscount />

        {discounts.length === 0 ? (
          <p className={styles.empty}>کد تخفیفی وجود ندارد</p>
        ) : (
          <Table
            discounts={JSON.parse(JSON.stringify(discounts))}
            title="لیست تخفیفات"
          />
        )}
      </main>
    </Layout>
  );
};

export default Discounts;
