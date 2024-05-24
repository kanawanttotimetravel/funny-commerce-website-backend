"use client";

import EditableField from '@/components/editablefield/EditableField';
import React, { useState } from 'react';

const EditUserProfile = ({ user, onSave }) => {
    const [formData, setFormData] = useState({ ...user });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form className="edit-profile-form" onSubmit={handleSubmit}>
            <EditableField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
            <EditableField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
            <EditableField label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            <EditableField label="Email" name="email" value={formData.email} onChange={handleChange} />
            <EditableField label="Country / Region" name="country" value={formData.country} onChange={handleChange} />
            <EditableField label="Town / City" name="city" value={formData.city} onChange={handleChange} />
            <EditableField label="Street" name="street" value={formData.street} onChange={handleChange} />
            <div className="save-button-container">
                <button type="submit" className="save-button">Save</button>
            </div>
        </form>
    );
};

export default EditUserProfile;
