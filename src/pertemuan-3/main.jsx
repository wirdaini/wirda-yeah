import { createRoot } from "react-dom/client";
import TailwindCSS from "./TailwindCSS";
import UserForm from "./UserForm";
import './tailwind.css';


createRoot(document.getElementById("root")).render(
    <div>
        {/* Render Materi Latihan */}
        <TailwindCSS />
       
        {/* Render Tugas Utama */}
        <UserForm />
       
    </div>
);
