import { TOPIC_DATA } from "../../constrant/constrants";
import { useNavigate } from "react-router-dom";

function ExamSection({ subject }) {
  const { name, slug } = subject;
  const topics = TOPIC_DATA[slug] || [];

  const navigate = useNavigate();

  return (
    <div className="p-8">
      <h1 className="text-center text-4xl font-bold text-blue-600 mb-6">
        Đề thi · {name}
      </h1>

      <h2 className="text-center text-2xl font-semibold text-blue-700 mb-10 flex items-center justify-center gap-3">
        <i className="fa-solid fa-file-pen text-green-600"></i>
        Kho đề thi & Kiểm tra
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {topics.map((topic, i) => (
          <div
            key={i}
            className="bg-white shadow-md border border-gray-200 rounded-xl p-6 hover:shadow-xl transition"
          >
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              <i className={`${topic.icon} text-blue-600 text-xl`}></i> {topic.name}
            </h3>

            <p className="text-gray-600 text-sm mb-4">{topic.description}</p>

            <button
              className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
              onClick={() => navigate(`/material/${slug}/${topic.slug}`)}
            >
              Xem đề thi
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExamSection;
