import { useState } from "react";

interface Props {
  children: React.ReactNode;
}

export default function TheorySection({ children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={`section-body ${open ? "open" : ""}`}>
        {children}
      </div>

      <button
        className="section-toggle"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "접기 ▲" : "펼치기 ▼"}
      </button>
    </>
  );
}
