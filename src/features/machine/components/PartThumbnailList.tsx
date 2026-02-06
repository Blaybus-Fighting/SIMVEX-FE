import "./machine.css";

export default function PartThumbnailList() {
  return (
    <div className="thumbnail-grid">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className={`thumb ${i === 0 ? "selected" : ""}`} />
      ))}
    </div>
  );
}
