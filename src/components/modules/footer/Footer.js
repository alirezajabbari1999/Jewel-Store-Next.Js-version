import styles from "./footer.module.css";
import { IoIosArrowUp } from "react-icons/io";
import logo from "@/public/images/logo.png";
import etemadImg from "@/public/Images/enamad.png";
import samandehi from "@/public/Images/samandehi.png";
import etehadieh from "@/public/Images/1e5dab5a.png";
import Image from "next/image";
import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <Container className="container-custom">
      <div className={styles.footerContainer} data-aos="fade-up">
        <div className={styles.firstRow}>
          <Image src={logo} alt="logo" className={styles.logo}/>
          <a href="#"className={styles.backToTopBtn} >
            بازگشت به بالا <IoIosArrowUp />
          </a>
        </div>

        <div className={styles.secondRow}>
          <span className={styles.titleBox}>
            <span className={styles.title}>شماره تماس:</span> 061-535-10225
          </span>
          <span className={styles.titleBox}>
            <span className={styles.title}>آدرس ایمیل:</span> info@parskala.com
          </span>
          <span className={styles.titleBox}>هفت روز هفته ، 24 ساعت شبانه‌روز پاسخگوی شما هستیم.</span>
        </div>

        <div className={styles.thirdRow}>
          <div className={styles.aboutStore}>
            <h4 className={styles.aboutStoreH5}>درباره فروشگاه اینترنتی طلا و جواهرات</h4>
            <p className={styles.aboutStoreP}>
              پارس کالا، ویترین آنلاین طلا و جواهر کشور است که با هدف توسعه و
              تحول صنعت طلا و جواهر فعالیت خود را آغاز کرده است . هموطنان عزیز
              میتوانند در هر لحظه از شبانه روز از فروشگاههای معتبر طلا و جواهر
              ایران دیدن فرمایند و با بررسی ، مقایسه و انتخاب محصول مورد نظر خود
              ، لذت یک انتخاب هوشمندانه را تجربه کنند.تولید کنندگان و فروشندگان
              طلا و جواهر نیز میتوانند با ثبت نام در سایت و درخواست ایجاد
              فروشگاه در کوتاه ترین زمان ممکن ، فروشگاه اینترنتی به نام خود
              افتتاح نمایند و با ثبت کالا و محصولات در فروشگاه خود، تجربه جدیدی
              از معرفی و فروش محصولاتشان را در حوزه تجارت الکترونیک تجربه
              نمایند. کالاهای قابل ارائه در سایت شامل انواع مصنوعات طلا و جواهر
              با عیار 18 است.
            </p>
          </div>

          <div className={styles.footerImages}>
            <Image src={etemadImg} alt="footer images" className={styles.image}/>
            <Image src={samandehi} alt="footer images" className={styles.image}/>
            <Image src={etehadieh} alt="footer images" className={styles.image}/>
          </div>
        </div>

        <div className={styles.fourthRow}>
          <div className={styles.copyRight}>
            <span>
              استفاده از مطالب اینترنتی پارس کالا فقط برای مقاصد غیرتجاری و با
              ذکر منبع بلامانع است. کلیه حقوق این سایت متعلق به پارس کالا
              می‌باشد
            </span>
          </div>
        </div>
      </div>
    </Container>
  );
}
