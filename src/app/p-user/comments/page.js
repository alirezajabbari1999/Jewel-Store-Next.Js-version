import styles from "@/src/styles/p-user/comments.module.css";
import UserPanelLayout from "@/src/components/layouts/UserPanelLayout";
import DataTable from "@/src/components/templates/p-user/comments/DataTable";
import connectToDB from "@/config/db";
import CommentModel from "@/models/Comment";
import { authUser } from "@/utils/serverHelpers";

export default async function page() {
  // کل کامنت هایی که در دیتابیس با آیتم
  // user = ${userId}
  // وجود داره رو گرفتیم و تو یه ثابت ریختیم و دادیمش
  // به کامپوننت دیتا تیبل
  await connectToDB();
  const user = await authUser();
  const comments = await CommentModel.find({ user: user._id }, "-__v").populate(
    "productID",
    "name"
  );
  return (
    <UserPanelLayout>
      <main>
        {comments.length ? (
          <DataTable
            comments={JSON.parse(JSON.stringify(comments))}
            title="لیست کامنت‌ها"
          />
        ) : (
          <p className={styles.empty}>کامنتی وجود ندارد</p>
        )}
      </main>
    </UserPanelLayout>
  );
}
