"use client";

import { useState } from "react";

export default function SeatDemo() {
  const [selected, setSelected] = useState(false);

  return (
    <section id="seat-demo" aria-labelledby="seat-demo-heading" className="mt-6 rounded-xl border border-line bg-card p-3 sm:p-4">
      <h3 id="seat-demo-heading" className="font-medium">Seat selection simulation</h3>
      <p className="mt-1 text-sm leading-relaxed text-soft">Tap A1 on passenger A’s map. Tap it again to release it.</p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {["Passenger A", "Passenger B"].map((passenger, index) => (
          <div key={passenger}>
            <h4 className="mb-2 text-sm font-medium">{passenger}</h4>
            <div className="grid grid-cols-2 gap-1.5">
              {["A1", "A2", "B1", "B2"].map((seat) => {
                const held = seat === "A1" && selected;
                const status = held ? (index === 0 ? "Selected" : "On hold") : "Available";
                const content = <><strong>{seat}</strong><span className="text-[11px]">{status}</span></>;
                const style = "flex min-h-12 flex-col items-center justify-center rounded-t-lg rounded-b border text-sm ";
                if (index === 0 && seat === "A1") {
                  return <button key={seat} type="button" aria-pressed={selected} onClick={() => setSelected(value => !value)} className={style + (held ? "border-pink-300 bg-pink-950 text-pink-100" : "border-accent bg-raised text-fg")}>{content}</button>;
                }
                return <div key={seat} className={style + (held ? "border-orange-300 bg-orange-950 text-orange-100" : "border-line text-muted")}>{content}</div>;
              })}
            </div>
          </div>
        ))}
      </div>
      <p role="status" className="sr-only">{selected ? "A1 selected by passenger A and on hold for passenger B." : "A1 is available for both passengers."}</p>
    </section>
  );
}
