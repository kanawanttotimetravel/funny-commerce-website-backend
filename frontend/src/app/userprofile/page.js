"use client";
import Footer from '@/components/footer/footer'
import Header from '@/components/headercomponent/HeaderComponent'
import React, { useState } from "react";
import UserProfile from './UserProfile';
import PurchaseHistory from './PurchaseHistory';

function UserProFilePage() {
    const [user, setUser] = useState({
        firstName: "Nguyen Sinh",
        lastName: "Cung",
        phoneNumber: "0124531",
        email: "abc@gmail.com",
        country: "Viet Nam",
        city: "Ha Noi",
        street: "Xuan Thuy",
        avatar: "https://antimatter.vn/wp-content/uploads/2022/05/hinh-anh-bac-ho.jpg"
    });
  
    const handleSave = (updatedUser) => {
        setUser(updatedUser);
    };
  
    return (
        <div>
        <Header />
        <UserProfile user={user} onSave={handleSave} />
        <PurchaseHistory/>
        <Footer />
        </div>
    );
  }
  
  export default UserProFilePage;