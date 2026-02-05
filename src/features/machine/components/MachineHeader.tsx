interface Props {
  activeTab: "machine" | "part";
  onChange: (tab: "machine" | "part") => void;
}

export default function MachineHeader({ activeTab, onChange }: Props) {
  return (
    <div className="machine-header">
      <div className="machine-tab-bar">
        <button
          className={`machine-tab ${activeTab === "machine" ? "active" : ""}`}
          onClick={() => onChange("machine")}
        >
          기계
        </button>
        <button
          className={`machine-tab ${activeTab === "part" ? "active" : ""}`}
          onClick={() => onChange("part")}
        >
          부품
        </button>
      </div>
    </div>
  );
}
