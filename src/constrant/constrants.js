// --- HELPER: Tạo slug tiếng Việt ---
export const toSlug = (str) => {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[đĐ]/g, "d")
        .replace(/[^a-z0-9\s]/g, "")
        .trim()
        .replace(/\s+/g, "-");
};

// Helper tạo topic có icon
export const createTopic = (name, description, icon = "fa-solid fa-book") => ({
    name,
    slug: toSlug(name),
    description,
    icon, // <--- ICON HERE
});

// -------------------------------------------------------

export const GROUP_NATURAL = "KHOI_TU_NHIEN";
export const GROUP_SOCIAL = "KHOI_XA_HOI";

export const SUBJECT_DATA = [
    { name: "Toán học", slug: "toan-hoc", group: GROUP_NATURAL },
    { name: "Vật lý", slug: "vat-ly", group: GROUP_NATURAL },
    { name: "Hóa học", slug: "hoa-hoc", group: GROUP_NATURAL },
    { name: "Sinh học", slug: "sinh-hoc", group: GROUP_NATURAL },
    { name: "Tin học", slug: "tin-hoc", group: GROUP_NATURAL },

    { name: "Ngữ văn", slug: "ngu-van", group: GROUP_SOCIAL },
    { name: "Lịch sử", slug: "lich-su", group: GROUP_SOCIAL },
    { name: "Địa lý", slug: "dia-ly", group: GROUP_SOCIAL },
    { name: "Giáo dục công dân", slug: "gdcd", group: GROUP_SOCIAL },
    { name: "Ngoại ngữ", slug: "ngoai-ngu", group: GROUP_SOCIAL },
];

export const VALID_SUBJECT_NAMES = SUBJECT_DATA.map((s) => s.name);

// --------------------------------------------
// ICONS CHO CÁC LOẠI TOPIC
// --------------------------------------------
const ICON_MATH = "fa-solid fa-square-root-variable";
const ICON_GEOMETRY = "fa-solid fa-drafting-compass";
const ICON_CHART = "fa-solid fa-chart-line";
const ICON_LOGIC = "fa-solid fa-brain";
const ICON_PROB = "fa-solid fa-shapes";

const ICON_PHYS = "fa-solid fa-atom";
const ICON_CHEM = "fa-solid fa-flask";
const ICON_BIO = "fa-solid fa-dna";
const ICON_HISTORY = "fa-solid fa-landmark";
const ICON_GEOGRAPHY = "fa-solid fa-globe";
const ICON_LITERATURE = "fa-solid fa-feather";
const ICON_CITIZEN = "fa-solid fa-scale-balanced";
const ICON_ENGLISH = "fa-solid fa-language";
const ICON_IT = "fa-solid fa-code";

// --------------------------------------------
// COMMON EXAM TOPICS
// --------------------------------------------
export const COMMON_EXAM_TOPICS = [
    createTopic("Đề thi Giữa Học kỳ 1", "Tổng hợp đề thi giữa kỳ.", "fa-solid fa-file-pen"),
    createTopic("Đề thi Cuối Học kỳ 1", "Tổng hợp đề thi cuối kỳ.", "fa-solid fa-file-pen"),
    createTopic("Đề thi Giữa Học kỳ 2", "Tổng hợp đề thi giữa kỳ 2.", "fa-solid fa-file-pen"),
    createTopic("Đề thi Cuối Học kỳ 2", "Tổng hợp đề thi cuối kỳ 2.", "fa-solid fa-file-pen"),
    createTopic("Đề thi Thử Tốt nghiệp THPT", "Ôn thi THPT Quốc gia.", "fa-solid fa-award"),
    createTopic("Đề thi Học sinh giỏi & Olympic", "Olympic, 30/4.", "fa-solid fa-trophy"),
];

// --------------------------------------------
// TOPIC DATA
// --------------------------------------------
export const TOPIC_DATA = {
    "toan-hoc": [
        createTopic("Đại số & Bất đẳng thức", "Mệnh đề, tập hợp…", ICON_MATH),
        createTopic("Vectơ & Hình học phẳng", "Hệ trục tọa độ…", ICON_GEOMETRY),
        createTopic("Lượng giác & Dãy số", "Lượng giác…", ICON_CHART),
        createTopic("Tổ hợp - Xác suất", "Xác suất…", ICON_PROB),
        createTopic("Đạo hàm & Vi phân", "Ứng dụng đạo hàm…", ICON_MATH),
        createTopic("Hàm số & Đồ thị", "Khảo sát đồ thị…", ICON_CHART),
        createTopic("Mũ - Logarit - Tích phân", "Logarit, tích phân…", ICON_MATH),
        createTopic("Hình học không gian & Oxyz", "Oxyz…", ICON_GEOMETRY),
        createTopic("Số phức", "Số phức…", ICON_LOGIC),
        ...COMMON_EXAM_TOPICS,
    ],

    "vat-ly": [
        createTopic("Cơ học", "Chuyển động, Newton…", ICON_PHYS),
        createTopic("Năng lượng & Động lượng", "Công, công suất…", ICON_PHYS),
        createTopic("Nhiệt học", "Nhiệt động lực học…", ICON_PHYS),
        createTopic("Điện tích & Điện trường", "Culong…", ICON_PHYS),
        createTopic("Từ trường & Cảm ứng", "Lực từ…", ICON_PHYS),
        createTopic("Quang hình học", "Thấu kính…", ICON_PHYS),
        ...COMMON_EXAM_TOPICS,
    ],

    "hoa-hoc": [
        createTopic("Hóa đại cương", "Nguyên tử…", ICON_CHEM),
        createTopic("Halogen - Oxi - Lưu huỳnh", "Phi kim…", ICON_CHEM),
        createTopic("Điện li & Nitơ", "Dung dịch…", ICON_CHEM),
        createTopic("Hóa hữu cơ", "Hydrocacbon…", ICON_CHEM),
        ...COMMON_EXAM_TOPICS,
    ],

    "sinh-hoc": [
        createTopic("Sinh học tế bào", "Cấu trúc tế bào…", ICON_BIO),
        createTopic("Virus & Vi sinh vật", "Sinh trưởng…", ICON_BIO),
        createTopic("Di truyền & Biến dị", "Cơ chế di truyền…", ICON_BIO),
        createTopic("Tiến hóa & Sinh thái", "Quần thể…", ICON_BIO),
        ...COMMON_EXAM_TOPICS,
    ],

    "ngu-van": [
        createTopic("Văn học dân gian", "Sử thi, ca dao…", ICON_LITERATURE),
        createTopic("Văn học trung đại", "Kiều, thơ Đường…", ICON_LITERATURE),
        createTopic("Thơ Mới & 1930-45", "Xuân Diệu…", ICON_LITERATURE),
        createTopic("Văn học hiện đại", "Việt Bắc, Đất Nước…", ICON_LITERATURE),
        ...COMMON_EXAM_TOPICS,
    ],

    "lich-su": [
        createTopic("Lịch sử thế giới", "Cổ - Trung đại…", ICON_HISTORY),
        createTopic("Lịch sử Việt Nam", "Các triều đại…", ICON_HISTORY),
        createTopic("Cận đại & Hiện đại", "CMTS, CT thế giới…", ICON_HISTORY),
        ...COMMON_EXAM_TOPICS,
    ],

    "dia-ly": [
        createTopic("Địa lý đại cương", "Bản đồ, khí hậu…", ICON_GEOGRAPHY),
        createTopic("Địa lý Việt Nam", "Địa hình, khí hậu…", ICON_GEOGRAPHY),
        createTopic("Địa lý kinh tế", "Các vùng kinh tế…", ICON_GEOGRAPHY),
        ...COMMON_EXAM_TOPICS,
    ],

    "gdcd": [
        createTopic("Triết học & Đạo đức", "Phạm trù, đạo đức…", ICON_CITIZEN),
        createTopic("Kinh tế & Chính trị", "Thị trường…", ICON_CITIZEN),
        createTopic("Pháp luật & Đời sống", "Quyền công dân…", ICON_CITIZEN),
        ...COMMON_EXAM_TOPICS,
    ],

    "ngoai-ngu": [
        createTopic("Ngữ pháp cơ bản", "Thì, mạo từ…", ICON_ENGLISH),
        createTopic("Ngữ pháp nâng cao", "Đảo ngữ…", ICON_ENGLISH),
        createTopic("Từ vựng chủ đề", "Unit theo SGK…", ICON_ENGLISH),
        createTopic("Kỹ năng 4 Skills", "Nghe – Nói – Đọc – Viết…", ICON_ENGLISH),
        ...COMMON_EXAM_TOPICS,
    ],

    "tin-hoc": [
        createTopic("Tin học văn phòng", "Word, Excel…", ICON_IT),
        createTopic("Lập trình C++ / Pascal", "Mảng, xâu…", ICON_IT),
        createTopic("Python & Thuật toán", "Giải thuật…", ICON_IT),
        createTopic("Cơ sở dữ liệu & SQL", "Access, SQL…", ICON_IT),
        ...COMMON_EXAM_TOPICS,
    ],
};
