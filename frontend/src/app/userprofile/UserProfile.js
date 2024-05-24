/*
  Usage:
<UserProfile user={user} />
 */
"use client";
import React, { useState } from "react";
import UserProfileField from '@/components/userprofileComponents/UserProfileField';
import "./style.css";
import EditUserProfile from "./EditUserProfile";

const UserProfile = ({ user, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = (updatedUser) => {
        onSave(updatedUser);
        setIsEditing(false);
    };
    return (
        <div className="profile-card">
            {isEditing ? (
                <EditUserProfile user={user} onSave={handleSave} />
            ) : (
                <>
                    <div className="profile-header">
                        <img src={user.avatar} alt="Profile Avatar" className="avatar" />
                    </div>
                    <div className="profile-details">
                        <UserProfileField label="First Name" value={user.firstName} />
                        <UserProfileField label="Last Name" value={user.lastName} />
                        <UserProfileField label="Phone Number" value={user.phoneNumber} />
                        <UserProfileField label="Email" value={user.email} />
                        <UserProfileField label="Country / Region" value={user.country} />
                        <UserProfileField label="Town / City" value={user.city} />
                        <UserProfileField label="Street" value={user.street} />
                    </div>
                    <button className="edit-button" onClick={() => setIsEditing(true)}>Edit</button>
                </>
            )}
        </div>
    );
};

export default UserProfile;
