import React from "react";
import AdminPanelLayout from "@/src/components/layouts/AdminPanelLayout";
import styles from "@/src/components/templates/p-admin/comments/table.module.css";
import Table from "@/src/components/templates/p-admin/comments/Table";
import connectToDB from "@/config/db";
import CommentModel from "@/models/Comment";

const page = async () => {
  await connectToDB();
  const comments = await CommentModel.find({})
    .sort({ _id: -1 })
    .populate("user")
    .populate("productID")
    .lean();

  return (
    <AdminPanelLayout>
      <main>
        {comments.length === 0 ? (
          <p className={styles.empty}>کامنتی وجود ندارد</p>
        ) : (
          <Table
            comments={JSON.parse(JSON.stringify(comments))}
            title="لیست کامنت‌ها"
          />
        )}
      </main>
    </AdminPanelLayout>
  );
};

export default page;
