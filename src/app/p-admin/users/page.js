import AdminPanelLayout from "@/src/components/layouts/AdminPanelLayout";
import userModel from "@/models/User";
import Table from "@/src/components/templates/p-admin/users/Table";
import connectToDB from "@/config/db";

export default async function page() {
  await connectToDB();
  const users = await userModel.find({}).lean();

  return (
    <AdminPanelLayout>
      {users.lenght === 0 ? (
        <p className={styles.empty}>کاربری وجود ندارد</p>
      ) : (
        <Table users={JSON.parse(JSON.stringify(users))} title={"کاربران"} />
      )}
    </AdminPanelLayout>
  );
}
