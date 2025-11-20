import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMaterialsBySlugAPI } from "../../api/materialAPI";

const FILE_ICONS = {
    pdf: "fa-solid fa-file-pdf text-red-500",
    doc: "fa-solid fa-file-word text-blue-600",
    docx: "fa-solid fa-file-word text-blue-600",
    ppt: "fa-solid fa-file-powerpoint text-orange-500",
    pptx: "fa-solid fa-file-powerpoint text-orange-500",
    xls: "fa-solid fa-file-excel text-green-600",
    xlsx: "fa-solid fa-file-excel text-green-600",
    txt: "fa-solid fa-file-lines text-gray-600",
    zip: "fa-solid fa-file-zipper text-yellow-600",
    default: "fa-solid fa-file text-gray-500",
};

const ALLOWED_TYPES = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
    "text/plain",
    "application/zip",
];

export default function MaterialDetailPage() {
    const navigate = useNavigate();
    const { subjectSlug, topicSlug } = useParams();

    // Data states
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    // Upload modal states
    const [showUpload, setShowUpload] = useState(false);
    const [uploadTitle, setUploadTitle] = useState("");
    const [uploadFile, setUploadFile] = useState(null);
    const [uploadError, setUploadError] = useState("");
    const [uploadLoading, setUploadLoading] = useState(false);

    // Fetch materials
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await getMaterialsBySlugAPI(subjectSlug, topicSlug);
                setMaterials(res.data || []);
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        }
        fetchData();
    }, [subjectSlug, topicSlug]);

    // Filter materials
    const filtered = materials.filter((m) =>
        m.title.toLowerCase().includes(search.toLowerCase())
    );

    // Validate file
    const handleFileSelect = (file) => {
        setUploadError("");

        if (!file) return;

        if (!ALLOWED_TYPES.includes(file.type)) {
            setUploadError("❌ File không hợp lệ! Chỉ hỗ trợ PDF, DOCX, PPTX, XLSX, TXT, ZIP.");
            setUploadFile(null);
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            setUploadError("❌ File vượt quá dung lượng 10MB!");
            setUploadFile(null);
            return;
        }

        setUploadFile(file);
    };

    // Fake Upload Handler
    const handleUpload = async () => {
        if (!uploadTitle || !uploadFile) {
            setUploadError("❌ Vui lòng nhập tiêu đề và chọn file!");
            return;
        }

        setUploadLoading(true);

        const formData = new FormData();
        formData.append("title", uploadTitle);
        formData.append("file", uploadFile);
        formData.append("subjectSlug", subjectSlug);
        formData.append("topicSlug", topicSlug);

        console.log("=== UPLOAD FORM DATA ===");
        console.log("Title:", uploadTitle);
        console.log("File:", uploadFile);
        console.log("Subject:", subjectSlug);
        console.log("Topic:", topicSlug);

        // Giả lập upload delay
        setTimeout(() => {
            setUploadLoading(false);
            setShowUpload(false);
            setUploadTitle("");
            setUploadFile(null);
            setUploadError("");

            alert("🚀 Upload thành công (fake)! Bây giờ bạn chỉ cần gọi API thật vào đây.");
        }, 1500);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
                    <p className="text-gray-600 text-lg">Đang tải dữ liệu...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <i className="fa-solid fa-book text-white text-xl"></i>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                            Tài liệu học tập
                        </h1>
                    </div>
                    <p className="text-xl text-gray-600 font-medium capitalize">
                        {subjectSlug.replaceAll("-", " ")}
                    </p>
                </div>

                {/* Search */}
                <div className="max-w-2xl mx-auto mb-6">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <i className="fa-solid fa-magnifying-glass text-gray-400 text-lg"></i>
                        </div>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Tìm kiếm tài liệu theo tiêu đề..."
                            className="w-full pl-12 pr-4 py-4 text-gray-700 bg-white rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition shadow-sm"
                        />
                    </div>
                </div>

                {/* Upload Button */}
                <div className="max-w-2xl mx-auto mb-10 flex justify-end">
                    <button
                        onClick={() => setShowUpload(true)}
                        className="px-5 py-3 bg-green-600 text-white font-semibold rounded-xl shadow hover:bg-green-700 transition"
                    >
                        + Tải tài liệu lên
                    </button>
                </div>

                {/* List */}
                {filtered.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i className="fa-solid fa-folder-open text-gray-400 text-4xl"></i>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Không tìm thấy tài liệu</h3>
                        <p className="text-gray-500">Hãy thử từ khóa khác.</p>
                    </div>
                ) : (
                    <>
                        <p className="text-gray-600 mb-6">Tìm thấy <span className="font-semibold text-blue-600">{filtered.length}</span> tài liệu</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filtered.map((item) => {
                                const iconClass = FILE_ICONS[item.fileType] || FILE_ICONS.default;

                                return (
                                    <div key={item._id} className="group bg-white rounded-2xl shadow hover:shadow-xl border border-gray-100 hover:border-blue-200 transition overflow-hidden">
                                        {/* Header */}
                                        <div className="bg-gradient-to-br from-blue-50 to-white p-6 border-b border-gray-100">
                                            <div className="flex items-start gap-3">
                                                <div className="w-12 h-12 bg-white rounded-xl shadow flex items-center justify-center group-hover:scale-110 transition">
                                                    <i className={`${iconClass} text-2xl`}></i>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-1">{item.title}</h3>
                                                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-md uppercase">{item.fileType}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Body */}
                                        <div className="p-6">
                                            <div className="flex items-center gap-2 mb-6 pb-6 border-b border-gray-100">
                                                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                                                    <i className="fa-solid fa-user text-white text-xs"></i>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Người đăng</p>
                                                    <p className="text-sm font-medium text-gray-800">{item.createdBy.fullName}</p>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <a href={item.fileUrl} target="_blank" rel="noreferrer"
                                                    className="py-3 rounded-xl bg-blue-600 text-white font-semibold text-center hover:bg-blue-700 transition">
                                                    <i className="fa-solid fa-eye mr-2"></i>Xem trước
                                                </a>

                                                <a href={item.fileUrl} download
                                                    className="py-3 rounded-xl border-2 border-green-500 text-green-600 font-semibold text-center hover:bg-green-50 transition">
                                                    <i className="fa-solid fa-download mr-2"></i>Tải xuống
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>

            {/* Upload Modal */}
            {showUpload && (
                <div className="fixed inset-0 bg-black/70 bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">
                        <h2 className="text-2xl font-bold text-blue-700 mb-6">Upload tài liệu mới</h2>

                        {/* Title */}
                        <div className="mb-5">
                            <label className="block text-gray-600 font-medium mb-1">Tiêu đề</label>
                            <input
                                type="text"
                                value={uploadTitle}
                                onChange={(e) => setUploadTitle(e.target.value)}
                                className="w-full px-4 py-3 border rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                                placeholder="Nhập tiêu đề tài liệu..."
                            />
                        </div>

                        {/* File Upload */}
                        <div className="mb-6">
                            <label className="block text-gray-600 font-medium mb-2">Tải lên tài liệu</label>

                            {/* Hidden input */}
                            <input
                                type="file"
                                id="fileUploadInput"
                                onChange={(e) => handleFileSelect(e.target.files[0])}
                                className="hidden"
                            />

                            {/* Stylish Upload Button */}
                            <label
                                htmlFor="fileUploadInput"
                                className="
            flex flex-col items-center justify-center 
            w-full h-32 border-2 border-dashed border-blue-300 
            rounded-xl bg-blue-50 cursor-pointer
            hover:bg-blue-100 hover:border-blue-500
            transition-all duration-200
        "
                            >
                                <i className="fa-solid fa-cloud-arrow-up text-blue-600 text-3xl mb-2"></i>
                                <span className="text-blue-700 font-semibold">Nhấn để chọn file</span>
                                <span className="text-xs text-gray-500 mt-1">(Hỗ trợ PDF, DOCX, PPTX, ZIP... ≤ 10MB)</span>
                            </label>

                            {/* Show selected file */}
                            {uploadFile && (
                                <p className="mt-2 text-sm text-green-600">
                                    ✔ Đã chọn: <span className="font-medium">{uploadFile.name}</span>
                                </p>
                            )}

                            {/* Error */}
                            {uploadError && <p className="text-red-500 text-sm mt-2">{uploadError}</p>}
                        </div>


                        {/* Buttons */}
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowUpload(false)}
                                className="px-5 py-2.5 bg-gray-200 rounded-xl hover:bg-gray-300 transition"
                                disabled={uploadLoading}
                            >
                                Hủy
                            </button>

                            <button
                                onClick={handleUpload}
                                className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-60 flex items-center gap-2"
                                disabled={uploadLoading}
                            >
                                {uploadLoading && (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                )}
                                Tải lên
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
