// "use client";
// import { useState, useEffect } from "react";
// import styles from "./table.module.css";
// import { Container, Row, Col } from "react-bootstrap";
// import Product from "./Product";
// import Link from "next/link";
// import { FaStore } from "react-icons/fa";
// import { PiSmileySad } from "react-icons/pi";

// export default function Table() {
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     const localCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(localCart);
//   }, []);

//   // محاسبه مجموع قیمت محصولات
//   const totalPrice = cart.reduce(
//     (total, item) => total + item.price * item.count,
//     0
//   );

//   // ذخیره داده‌ها در localStorage هر بار که cart تغییر کند
//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   // تابع افزایش تعداد
//   const increaseCount = (id) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.id === id ? { ...item, count: item.count + 1 } : item
//       )
//     );
//   };

//   // تابع کاهش تعداد
//   const decreaseCount = (id) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.id === id && item.count > 1
//           ? { ...item, count: item.count - 1 }
//           : item
//       )
//     );
//   };

//   // تابع حذف محصول
//   const removeProduct = (id) => {
//     setCart((prevCart) => prevCart.filter((item) => item.id !== id));
//   };

//   return (
//     <Container>
//       {cart.length <= 0 ? (
//         <div className={styles.emptyBasket}>
//           <PiSmileySad className={styles.sadIcon} />
//           <p className={styles.emptyMessage}>
//             سبد شما خالیه برای مشاهده محصولات بیشتر به صفحات زیر بروید
//           </p>

//           <div className={styles.links}>
//             <Link href="/">صفحه اصلی</Link>
//             <Link href="/wishlist">علاقمندی های من</Link>
//           </div>

//           <div className={styles.btnBox}>
//             <Link href="/shop" className={styles.shopLink}>
//               <FaStore />
//               <span>بازگشت به فروشگاه</span>
//             </Link>
//           </div>
//         </div>
//       ) : (
//         <div className={styles.table}>
//           <Row>
//             <Col md={8}>
//               <div className={styles.productBox}>
//                 {cart.map((item) => (
//                   <Product
//                     key={item.id}
//                     {...item}
//                     onIncrease={() => increaseCount(item.id)}
//                     onDecrease={() => decreaseCount(item.id)}
//                     onRemove={() => removeProduct(item.id)}
//                   />
//                 ))}
//               </div>
//             </Col>

//             <Col md={4}>
//               <div className={styles.totalSection}>
//                 <div className={styles.addressBox}>
//                   <div className={styles.title}>حمل و نقل</div>
//                   <div className={styles.addressInputes}>
//                     <input
//                       type="text"
//                       placeholder="استان"
//                       className={styles.addressInput}
//                     />
//                     <input
//                       type="text"
//                       placeholder="شهر"
//                       className={styles.addressInput}
//                     />
//                     <input
//                       type="text"
//                       placeholder="کدپستی"
//                       className={styles.addressInput}
//                     />
//                   </div>
//                 </div>

//                 <div className={styles.discountsBox}>
//                   <input
//                     type="text"
//                     placeholder="کد تخفیف"
//                     className={styles.discountInput}
//                   />
//                   <button className={styles.discountBtn}>اعمال کد تخفیف</button>
//                 </div>

//                 <div className={styles.totalBox}>
//                   <div className={styles.total}>
//                     <p>مجموع</p>
//                     <p>
//                       {totalPrice.toLocaleString()}{" "}
//                       <span className={styles.toman}>تومان</span>
//                     </p>
//                   </div>
//                   <button className={styles.paymentBtn}>
//                     ادامه جهت تسویه حساب
//                   </button>
//                 </div>
//               </div>
//             </Col>
//           </Row>
//         </div>
//       )}
//     </Container>
//   );
// }



"use client";
import { useState, useEffect } from "react";
import styles from "./table.module.css";
import { Container, Row, Col } from "react-bootstrap";
import Product from "./Product";
import Link from "next/link";
import { FaStore } from "react-icons/fa";
import { PiSmileySad } from "react-icons/pi";

export default function Table() {
  const [cart, setCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false); // وضعیت برای جلوگیری از ذخیره اولیه

  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(localCart);
    setIsLoaded(true); // وضعیت بارگذاری را تنظیم کنید
  }, []);

  // محاسبه مجموع قیمت محصولات
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.count,
    0
  );

  // ذخیره داده‌ها در localStorage تنها زمانی که cart تغییر کند و داده‌ها از localStorage بارگذاری شده باشند
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  // تابع افزایش تعداد
  const increaseCount = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  // تابع کاهش تعداد
  const decreaseCount = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.count > 1
          ? { ...item, count: item.count - 1 }
          : item
      )
    );
  };

  // تابع حذف محصول
  const removeProduct = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <Container>
      {cart.length <= 0 ? (
        <div className={styles.emptyBasket}>
          <PiSmileySad className={styles.sadIcon} />
          <p className={styles.emptyMessage}>
            سبد شما خالیه برای مشاهده محصولات بیشتر به صفحات زیر بروید
          </p>

          <div className={styles.links}>
            <Link href="/">صفحه اصلی</Link>
            <Link href="/wishlist">علاقمندی های من</Link>
          </div>

          <div className={styles.btnBox}>
            <Link href="/shop" className={styles.shopLink}>
              <FaStore />
              <span>بازگشت به فروشگاه</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.table}>
          <Row>
            <Col md={8}>
              <div className={styles.productBox}>
                {cart.map((item) => (
                  <Product
                    key={item.id}
                    {...item}
                    onIncrease={() => increaseCount(item.id)}
                    onDecrease={() => decreaseCount(item.id)}
                    onRemove={() => removeProduct(item.id)}
                  />
                ))}
              </div>
            </Col>

            <Col md={4}>
              <div className={styles.totalSection}>
                <div className={styles.addressBox}>
                  <div className={styles.title}>حمل و نقل</div>
                  <div className={styles.addressInputes}>
                    <input
                      type="text"
                      placeholder="استان"
                      className={styles.addressInput}
                    />
                    <input
                      type="text"
                      placeholder="شهر"
                      className={styles.addressInput}
                    />
                    <input
                      type="text"
                      placeholder="کدپستی"
                      className={styles.addressInput}
                    />
                  </div>
                </div>

                <div className={styles.discountsBox}>
                  <input
                    type="text"
                    placeholder="کد تخفیف"
                    className={styles.discountInput}
                  />
                  <button className={styles.discountBtn}>اعمال کد تخفیف</button>
                </div>

                <div className={styles.totalBox}>
                  <div className={styles.total}>
                    <p>مجموع</p>
                    <p>
                      {totalPrice.toLocaleString()}{" "}
                      <span className={styles.toman}>تومان</span>
                    </p>
                  </div>
                  <button className={styles.paymentBtn}>
                    ادامه جهت تسویه حساب
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Container>
  );
}
