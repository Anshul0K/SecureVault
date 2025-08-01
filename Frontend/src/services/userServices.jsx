// src/services/userServices.js
import axiosInstance from "./axiosInstance";

// GET all payslips for the logged-in user
export const getUserPayslips = async () => {
  const res = await axiosInstance.get("/api/payslips/my");
  return res.data;
};

// GET a specific payslip's download URL
export const downloadPayslipById = async (id) => {
  const res = await axiosInstance.get(`/api/payslips/download/${id}`);
  return res.data.downloadUrl;
};

export const submitUserReimbursement = async (formData) => {
  const response = await axiosInstance.post(
    "/api/reimbursements/submit",
    formData,
    // {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // }
  );
  return response.data;
};
