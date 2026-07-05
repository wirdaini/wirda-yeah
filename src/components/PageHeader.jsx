export default function PageHeader({ title, subtitle, breadcrumb }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-coffee-900 mb-1">{title}</h1>
      {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
      {breadcrumb && (
        <div className="flex items-center gap-2 text-sm text-muted mt-2">
          <span>Home</span>
          <span>/</span>
          <span className="text-coffee-700">{breadcrumb}</span>
        </div>
      )}
    </div>
  );
}