import { api } from "@/lib/axios";
import type { LoginSchema } from "@/schemas/auth.schema";

export const loginApi = async (data: LoginSchema) => {
  const res = await api.post("/api/auth/login", data);
  return res.data;
};

export const registerApi = async (formData: FormData) => {
  const res = await api.post("/api/auth/register", formData);
  return res.data;
};

export const verifyEmailApi = async (token: string) => {
  const res = await api.post(`/api/auth/verify-email/${token}`);
  return res.data;
};

export const resendVerificationEmailApi = async (email: string) => {
  const res = await api.post("/api/auth/resend-verification-email", { email });
  return res.data;
};

export const forgotPasswordApi = async (email: string) => {
  const res = await api.post(
    "/api/auth/forgot-password",
    { email },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return res.data;
};

// Đặt lại mật khẩu
export const resetPassword = async (
  token: string,
  data: { password: string; confirmPassword: string },
) => {
  const res = await api.post(`/api/auth/reset-password/${token}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

// refresh token
export const refreshTokenApi = async (refreshToken: string) => {
  const res = await api.post("/api/auth/refresh-token", { refreshToken });
  return res.data;
};

// Đăng xuất
export const logoutApi = async (refreshToken: string) => {
  const res = await api.post("/api/auth/logout", { refreshToken });
  return res.data;
};

// Đổi mật khẩu
export const changePasswordApi = async (data: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}) => {
  const res = await api.post("/api/auth/change-password", data);
  return res.data;
};

// profie
export const getProfile = async () => {
  const res = await api.get("/api/users/profile");
  return res.data.data;
};

// Cập nhật profile
export const updateProfileApi = async (data: FormData) => {
  const res = await api.patch("/api/users/profile", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log("Update profile response:", res.data);
  return res.data;
};

// Thay đổi ảnh đại diện
export const deleteProfilePictureApi = async () => {
  const res = await api.delete("/api/users/profile/picture");
  return res.data;
};

