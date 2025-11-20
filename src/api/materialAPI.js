import { axiosInstance } from "../lib/axios";

export const getMaterialsBySlugAPI = async (subjectSlug, topicSlug) => {
    try {
        const res = await axiosInstance.get(`/material/${subjectSlug}/${topicSlug}`);
        return res.data;
    } catch (err) {
        console.error("Lỗi lấy tài liệu:", err);
        throw err.response?.data || err;
    }
};
