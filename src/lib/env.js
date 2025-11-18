const mode = import.meta.env.MODE;
console.log("MODE:", mode);

let BASE_BE_URL;

if (mode === "development") {
    BASE_BE_URL = import.meta.env.VITE_BASE_BE_URL;
} else {
    BASE_BE_URL = "https://be-danang-sakai.onrender.com/api/v1";
}

export const ENV = {
    VITE_BASE_BE_URL: BASE_BE_URL,
};

export default ENV;
