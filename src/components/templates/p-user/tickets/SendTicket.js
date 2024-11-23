"use client";
import React, { useState, useEffect } from "react";
import styles from "./sendTicket.module.css";
import Link from "next/link";
import { IoIosSend } from "react-icons/io";
import swal from "sweetalert";

export default function page() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [departments, setDepartments] = useState([]);
  const [subDepartments, setSubDepartments] = useState([]);
  const [priority, setPriority] = useState(-1);
  const [selectedDepartment, setSelectedDepartment] = useState(-1);
  const [selectedSubDepartment, setSelectedSubDepartment] = useState(-1);

  useEffect(() => {
    // دریافت کل دپارتمان ها
    const getDepartments = async () => {
      const res = await fetch("/api/department");
      const data = await res.json();
      setDepartments([...data]);
    };

    // دریافت کل ساب دپارتمان ها
    const getSubDepartments = async () => {
      const res = await fetch("/api/department/sub");
      const data = await res.json();
      setSubDepartments([...data]);
    };

    getDepartments();
    getSubDepartments();
  }, []);

  // فیلتر کردن
  // subDepartments
  // بر اساس دپارتمان انتخاب‌شده
  const filteredSubDepartments = subDepartments.filter(
    (sub) => sub.department === selectedDepartment
  );

  const sendTicket = async () => {
    if (priority == -1) {
      swal({
        title: "لطفا سطح اولویت تیکت را تعیین کنید",
        icon: "warning",
        buttons: "متوجه شدم",
      });
    }
    if (!title.trim()) {
      swal({
        title: "لطفا عنوان تیکت را تعیین کنید",
        icon: "warning",
        buttons: "متوجه شدم",
      });
    }
    if (!body.trim()) {
      swal({
        title: "لطفا متن تیکت را تعیین کنید",
        icon: "warning",
        buttons: "متوجه شدم",
      });
    }
    if (selectedDepartment == -1) {
      swal({
        title: "لطفا دپارتمان را تعیین کنید",
        icon: "warning",
        buttons: "متوجه شدم",
      });
    }
    if (selectedSubDepartment == -1) {
      swal({
        title: "لطفا نوع تیکت را تعیین کنید",
        icon: "warning",
        buttons: "متوجه شدم",
      });
    }

    const ticket = {
      title,
      body,
      department: selectedDepartment,
      subDepartment: selectedSubDepartment,
      priority,
    };
    const res = await fetch("/api/ticket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticket),
    });

    if (res.status === 201) {
      swal({
        title: "تیکت با موفقیت ارسال شد",
        icon: "success",
        buttons: "متوجه شدم",
      });
      setTitle(""),
        setBody(""),
        setDepartments([]),
        setSubDepartments([]),
        setPriority(-1);
      location.replace("/p-user/tickets");
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>
        <span>ارسال تیکت جدید</span>
        <Link href="/p-user/tickets"> همه تیکت ها</Link>
      </h1>

      <div className={styles.content}>
        <div className={styles.group}>
          <label>دپارتمان را انتخاب کنید:</label>

          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value={-1}>لطفا یک دپارتمان را انتخاب نمایید.</option>
            {/* روی کل دپارتمان ها مپ زدم و به ازای هر یک یدونه آیتم آپشن رندر کردم */}
            {departments.map((department) => (
              <option key={department._id} value={department._id}>
                {department.title}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.group}>
          <label>نوع تیکت را انتخاب کنید:</label>
          <select
            value={selectedSubDepartment}
            onChange={(e) => setSelectedSubDepartment(e.target.value)}
          >
            <option value={-1}>لطفا یک مورد را انتخاب نمایید.</option>
            {/* روی ساب منو هایی که براساس دپارتمان انتخابی فیلتر شدن مپ زدم */}
            {filteredSubDepartments.map((subDepartment) => (
              <option key={subDepartment._id} value={subDepartment._id}>
                {subDepartment.title}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.group}>
          <label>عنوان تیکت را وارد کنید:</label>
          <input
            placeholder="عنوان..."
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.group}>
          <label>سطح اولویت تیکت را انتخاب کنید:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value={-1}>لطفا یک مورد را انتخاب نمایید.</option>
            <option value="1">کم</option>
            <option value="2">متوسط</option>
            <option value="3">بالا</option>
          </select>
        </div>
      </div>
      <div className={styles.group}>
        <label>محتوای تیکت را وارد نمایید:</label>
        <textarea
          rows={10}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </div>
      <div className={styles.uploader}>
        <span>حداکثر اندازه: 6 مگابایت</span>
        <span>فرمت‌های مجاز: jpg, png.jpeg, rar, zip</span>
        <input type="file" />
      </div>

      <button className={styles.btn} onClick={sendTicket}>
        <IoIosSend />
        ارسال تیکت
      </button>
    </main>
  );
}
