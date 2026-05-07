export default function PageHeader({ title, subtitle, breadcrumb }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">{title}</h1>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      {breadcrumb && (
        <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
          <span>Home</span>
          <span>/</span>
          <span className="text-gray-600">{breadcrumb}</span>
        </div>
      )}
    </div>
  );
}