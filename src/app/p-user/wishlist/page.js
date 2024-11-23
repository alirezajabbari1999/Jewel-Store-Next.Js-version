import UserPanelLayout from "@/src/components/layouts/UserPanelLayout";
import styles from "@/src/styles/p-user/wishlist.module.css";
import Product from "@/src/components/templates/p-user/wishlist/Product";
import connectToDB from "@/config/db";
import { authUser } from "@/utils/serverHelpers";
import WishlistModel from "@/models/Wishlist";

const page = async () => {
  connectToDB();
  const user = await authUser();
  const wishlist = await WishlistModel.find({ user: user._id }).populate(
    "product"
  );

  return (
    <UserPanelLayout>
      <main>
        <h1 className={styles.title}>
          <span>علاقه مندی ها</span>
        </h1>
        <div className={styles.container}>
          {wishlist.length &&
            wishlist.map((wish) => (
              <Product
                key={wish._id}
                productID={String(wish.product._id)}
                name={wish.product.name}
                price={wish.product.price}
                score={wish.product.score}
                image={wish.product.img}
              />
            ))}
        </div>

        {wishlist.length === 0 && (
          <p className={styles.empty}>محصولی وجود ندارد</p>
        )}
      </main>
    </UserPanelLayout>
  );
};

export default page;
