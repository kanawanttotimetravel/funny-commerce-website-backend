import React from 'react';

const UserProfileField = ({ label, value }) => {
  return (
    <p><strong>{label}:</strong> {value}</p>
  );
};

export default UserProfileField;