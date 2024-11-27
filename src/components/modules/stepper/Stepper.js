import Link from "next/link";
import styles from "./stepper.module.css";
import { FaArrowLeftLong } from "react-icons/fa6";

const Stepper = ({ step }) => {
  return (

      <div className={styles.stepper}>
        {step == "complate" ? (
          <Link
            className={step == "complate" && styles.activeStep}
            href={"/complate"}
          >
            تکمیل سفارش
          </Link>
        ) : (
          <p className={styles.text}> تکمیل سفارش</p>
        )}
        <FaArrowLeftLong />

        {step === "checkout" || step === "complate" ? (
          <Link
            className={step == "checkout" && styles.activeStep}
            href={"/checkout"}
          >
            پرداخت
          </Link>
        ) : (
          <p className={styles.text}>پرداخت</p>
        )}

        <FaArrowLeftLong />

        <Link className={step == "cart" && styles.activeStep} href={"/checkout"}>
          سبد خرید
        </Link>
      </div>
  );
};

export default Stepper;
