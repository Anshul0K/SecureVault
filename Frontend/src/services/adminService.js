// src/services/adminService.js
import axiosInstance from "./axiosInstance";

export const getPendingReimbursementCount = async () => {
  const response = await axiosInstance.get("/api/reimbursements/count/pending");
  return response.data.count;
};

export const getPayslipMonthlyCount = async () => {
  const response = await axiosInstance.get("/api/payslips/monthly/count");
  return response.data.count; // returns just the number
};

export const getUserCount = async () => {
  const response = await axiosInstance.get("/api/users/count");
  return response.data.count;
};

export const getRecentLoginLogs = async () => {
  const response = await axiosInstance.get("/api/login-logs"); 
  return response.data.slice(-5).reverse();
};

