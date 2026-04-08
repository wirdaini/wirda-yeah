export default function InputField({ label, type, name, value, onChange, placeholder }) {
    return (
        <div className="mb-5 text-left group">
            <label className="block text-blue-400 font-bold mb-1 text-xs uppercase tracking-widest transition-colors group-focus-within:text-blue-600">
                {label}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full p-3 border-2 border-blue-100 rounded-xl outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all bg-slate-50 font-medium shadow-inner"
            />
        </div>
    );
}
