function QuickAction({ icon, label, color, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`${color} text-white rounded-lg p-6 hover:opacity-90 transition flex flex-col items-center justify-center gap-3 shadow-md`}
    >
      <span className="text-4xl">{icon}</span>
      <span className="font-semibold">{label}</span>
    </button>
  );
}

export default QuickAction;