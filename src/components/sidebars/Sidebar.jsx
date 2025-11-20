import { useState } from "react";
import GroupItem from "./GroupItem";
import { SUBJECT_DATA, GROUP_NATURAL, GROUP_SOCIAL } from "../../constrant/constrants";

// Icon mapping giữ nguyên style cũ
const SUBJECT_ICONS = {
  "Toán học": { icon: "fa-solid fa-square-root-variable", color: "text-indigo-500" },
  "Vật lý": { icon: "fa-solid fa-bolt", color: "text-yellow-500" },
  "Hóa học": { icon: "fa-solid fa-flask", color: "text-green-500" },
  "Sinh học": { icon: "fa-solid fa-leaf", color: "text-emerald-500" },
  "Tin học": { icon: "fa-solid fa-computer", color: "text-blue-500" },

  "Ngữ văn": { icon: "fa-solid fa-book", color: "text-rose-500" },
  "Lịch sử": { icon: "fa-solid fa-landmark", color: "text-amber-700" },
  "Địa lý": { icon: "fa-solid fa-globe-asia", color: "text-teal-500" },
  "Giáo dục công dân": { icon: "fa-solid fa-scale-balanced", color: "text-purple-500" },
  "Ngoại ngữ": { icon: "fa-solid fa-language", color: "text-orange-500" },
};

function Sidebar({ onSelect }) {
  const [openGroup, setOpenGroup] = useState(null);
  const [openSubject, setOpenSubject] = useState(null);

  const data = {
    "Khối tự nhiên": SUBJECT_DATA.filter(s => s.group === GROUP_NATURAL).map(s => ({
      ...s,
      ...SUBJECT_ICONS[s.name]
    })),
    "Khối xã hội": SUBJECT_DATA.filter(s => s.group === GROUP_SOCIAL).map(s => ({
      ...s,
      ...SUBJECT_ICONS[s.name]
    })),
  };

  return (
    <aside className="w-64 bg-white p-4 border-r border-gray-200 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
        <i className="fa-solid fa-layer-group text-indigo-500"></i>
        Danh mục môn học
      </h2>

      <ul className="space-y-2">
        {Object.keys(data).map((group) => (
          <GroupItem
            key={group}
            group={group}
            subjects={data[group]}
            openGroup={openGroup}
            setOpenGroup={setOpenGroup}
            openSubject={openSubject}
            setOpenSubject={setOpenSubject}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
