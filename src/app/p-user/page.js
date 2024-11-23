import Layout from "@/src/components/layouts/UserPanelLayout";
import styles from "@/src/styles/p-user/index.module.css";
import Box from "@/src/components/modules/infoBox/InfoBox";
import Tickets from "@/src/components/templates/p-user/index/Tickets";
import Orders from "@/src/components/templates/p-user/index/Orders";
import { authUser } from "@/utils/serverHelpers";
import ticketsModel from "@/models/Ticket";
import commentsModel from "@/models/Comment";
import wishlistModel from "@/models/Wishlist";

const page = async () => {
  const user = await authUser();
  const tickets = await ticketsModel
    .find({ user: user?._id })
    .populate("department", "title")
    .limit(2)
    .sort({ _id: -1 }) // باعث میشه که اطلاعات از آخر به اول رندر شن یعنی اول تیکت های آخیر نمایش داده میشه بعد تیکت های قدیمی
    .lean();

  const allTickets = await ticketsModel.find({ user: user?._id });
  const allComments = await commentsModel.find({ user: user?._id });
  const allWishlist = await wishlistModel.find({ user: user?._id });

  return (
    <Layout>
      <main>
        <section className={styles.boxes}>
          <Box title="مجموع تیکت ها " value={allTickets.length} />
          <Box title="مجموع کامنت  ها " value={allComments.length} />
          <Box title="مجموع سفارشات" value="2" />
          <Box title="مجموع علاقه مندی ها" value={allWishlist.length} />
        </section>
        <section className={styles.contents}>
          <Tickets tickets={JSON.parse(JSON.stringify(tickets))} />
          <Orders />
        </section>
      </main>
    </Layout>
  );
};

export default page;
