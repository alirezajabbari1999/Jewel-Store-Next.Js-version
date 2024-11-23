import styles from "./parsAccessory.module.css";
import { Container, Row, Col } from "react-bootstrap";
import ParsAccessoryPart from "./ParsAccessoryPart";
import Link from "next/link";

export default function ParsAccessory() {
  return (
    <Container className="container-custom">
      <div className={styles.parsAccessoryContainer} data-aos="fade-up">
        <h2 className={styles.title}>دسته بندی های پارس اکسسوری</h2>

        <div className={styles.boxesContainer}>
          <Row className={styles.row}>
            <Col lg={3} sm={6} xs={12}>
              <ParsAccessoryPart />
            </Col>
            <Col lg={3} sm={6} xs={12}>
              <ParsAccessoryPart />
            </Col>
            <Col lg={3} sm={6} xs={12}>
              <ParsAccessoryPart />
            </Col>
            <Col lg={3} sm={6} xs={12}>
              <ParsAccessoryPart />
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  );
}
