import React, { useState } from "react";

export default function TBSBotModal() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: "user" | "bot"; text: string }>>([
    { role: "bot", text: "Hi! Tell me your Event Type, Date, and Budget" },
  ]);
  const [input, setInput] = useState("");

  function send() {
    if (!input.trim()) return;
    setMessages((m) => [...m, { role: "user", text: input }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          role: "bot",
          text:
            "Thanks! I’ll suggest photos and ideas based on your details. Save favorites to your wishlist.",
        },
      ]);
    }, 400);
  }

  return (
    <>
      <button
        aria-label="Open TBS Bot"
        className="fixed bottom-6 right-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 p-4 text-white shadow-lg"
        onClick={() => setOpen(true)}
      >
        🤖
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/30 p-2 sm:p-6">
          <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <h3 className="font-semibold">TBS Bot</h3>
              <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <div className="max-h-80 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                  <span
                    className={
                      "inline-block rounded-2xl px-3 py-2 " +
                      (m.role === "user"
                        ? "bg-pink-600 text-white"
                        : "bg-gray-100 text-gray-800")
                    }
                  >
                    {m.text}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex gap-2 border-t p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                className="flex-1 rounded border px-3 py-2"
                placeholder="Type your message..."
              />
              <button onClick={send} className="rounded bg-pink-600 px-4 py-2 font-semibold text-white">Send</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

