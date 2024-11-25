import React from "react";
import AdminPanelLayout from "@/src/components/layouts/AdminPanelLayout";
import styles from "@/src/components/templates/p-admin/products/table.module.css";
import Table from "@/src/components/templates/p-admin/products/Table";
import connectToDB from "@/config/db";
import ProductModel from "@/models/Product";
import AddProduct from "@/src/components/templates/p-admin/products/AddProduct";

const page = async () => {
  await connectToDB();
  const products = await ProductModel.find({}).sort({ _id: -1 });

  return (
    <AdminPanelLayout>
      <main>
        <AddProduct />
        
        {products.length === 0 ? (
          <p className={styles.empty}>محصولی وجود ندارد</p>
        ) : (
          <Table
            products={JSON.parse(JSON.stringify(products))}
            title="لیست محصولات"
          />
        )}
      </main>
    </AdminPanelLayout>
  );
};

export default page;
