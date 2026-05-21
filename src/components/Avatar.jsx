// src/components/Avatar.jsx
export default function Avatar({ name, size = "md", imageUrl = null }) {
  const sizes = {
    sm: "w-6 h-6 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  const getInitials = (nama) => {
    if (!nama) return "?";
    const names = nama.split(" ");
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name}
        className={`${sizes[size]} rounded-full object-cover`}
      />
    );
  }

  return (
    <div className={`${sizes[size]} rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center font-bold text-white`}>
      {getInitials(name)}
    </div>
  );
}