interface MenuItemProps {
  label: string;
  onClick: () => void;
  danger?: boolean;
}
  const MenuItem = ({ label, onClick, danger }: MenuItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2 text-sm transition hover:bg-brand-border ${
        danger ? "text-red-500 hover:bg-red-500/10" : "text-white"
      }`}
    >
      {label}
    </button>
  );
};

export default MenuItem;