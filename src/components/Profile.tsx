import { Button } from "antd";
import React from "react";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";

const Profile: React.FC = () => {
  const { logout } = useApp();
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center py-20">
      <div className="bg-white p-12 rounded-3xl shadow-xl w-full max-w-lg border border-gray-100 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <UserOutlined className="text-4xl text-gray-400" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Profile</h1>
        <p className="text-gray-500 mb-8">Welcome back, User!</p>

        <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left space-y-4">
            <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Username</span>
                <span className="font-semibold text-gray-800">user123</span>
            </div>
             <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Email</span>
                <span className="font-semibold text-gray-800">user@example.com</span>
            </div>
             <div className="flex justify-between">
                <span className="text-gray-500">Member Since</span>
                <span className="font-semibold text-gray-800">Jan 2024</span>
            </div>
        </div>

        <Button
          danger
          size="large"
          icon={<LogoutOutlined />}
          className="h-12 px-8 rounded-xl font-medium"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Profile;
