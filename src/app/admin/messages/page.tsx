"use client";

import { useEffect, useState } from "react";
import { ref, onValue, update, remove } from "firebase/database";
import { db } from "@/lib/firebase";
import { ContactMessage } from "@/types";
import { Trash2, Mail, Phone, Check } from "lucide-react";
import { formatDateTime } from "@/lib/utils";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ContactMessage | null>(null);

  useEffect(() => {
    const msgRef = ref(db, "messages");
    const unsubscribe = onValue(msgRef, (snap) => {
      const data = snap.val();
      if (data) {
        const list: ContactMessage[] = Object.entries(data).map(([key, val]) => ({
          id: key,
          ...(val as Omit<ContactMessage, "id">),
        })).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setMessages(list);
      } else {
        setMessages([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const markRead = async (id: string) => {
    await update(ref(db, `messages/${id}`), { read: true });
  };

  const deleteMsg = async (id: string) => {
    await remove(ref(db, `messages/${id}`));
    if (selected?.id === id) setSelected(null);
  };

  const openMessage = async (msg: ContactMessage) => {
    setSelected(msg);
    if (!msg.read) await markRead(msg.id);
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Messages</h2>
          <p className="text-gray-500 text-sm mt-1">
            {messages.length} total · {unreadCount} unread
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading messages...</div>
      ) : messages.length === 0 ? (
        <div className="text-center py-16 bg-white border border-gray-200 rounded-2xl">
          <Mail className="w-12 h-12 text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400">No messages yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Message list */}
          <div className="lg:col-span-2 space-y-2">
            {messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => openMessage(msg)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                  selected?.id === msg.id
                    ? "bg-gray-900 border-gray-900 text-white"
                    : "bg-white border-gray-200 hover:border-gray-400"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {!msg.read && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                      )}
                      <p className={`font-semibold text-sm truncate ${selected?.id === msg.id ? "text-white" : "text-gray-900"}`}>
                        {msg.name}
                      </p>
                    </div>
                    <p className={`text-xs truncate mt-0.5 ${selected?.id === msg.id ? "text-white/60" : "text-gray-500"}`}>
                      {msg.subject}
                    </p>
                  </div>
                  <p className={`text-[10px] flex-shrink-0 ${selected?.id === msg.id ? "text-white/40" : "text-gray-400"}`}>
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Message detail */}
          <div className="lg:col-span-3">
            {selected ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-6 h-full">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{selected.subject}</h3>
                    <p className="text-sm text-gray-500 mt-1">{formatDateTime(selected.createdAt)}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => markRead(selected.id)}
                      className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                      title="Mark as read"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={() => deleteMsg(selected.id)}
                      className="w-9 h-9 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-500 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Sender info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  <div className="bg-gray-50 rounded-xl px-4 py-3">
                    <p className="text-xs text-gray-400 mb-0.5">From</p>
                    <p className="text-sm font-semibold text-gray-900">{selected.name}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl px-4 py-3">
                    <p className="text-xs text-gray-400 mb-0.5 flex items-center gap-1"><Mail size={10} /> Email</p>
                    <a href={`mailto:${selected.email}`} className="text-sm font-medium text-blue-600 hover:underline truncate block">
                      {selected.email}
                    </a>
                  </div>
                  {selected.phone && (
                    <div className="bg-gray-50 rounded-xl px-4 py-3">
                      <p className="text-xs text-gray-400 mb-0.5 flex items-center gap-1"><Phone size={10} /> Phone</p>
                      <a href={`tel:${selected.phone}`} className="text-sm font-medium text-gray-900 hover:text-gray-700">
                        {selected.phone}
                      </a>
                    </div>
                  )}
                </div>

                {/* Message */}
                <div className="bg-gray-50 rounded-xl p-5">
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                </div>

                <div className="mt-4 flex gap-3">
                  <a
                    href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-700 transition-colors"
                  >
                    <Mail size={15} />
                    Reply via Email
                  </a>
                  {selected.phone && (
                    <a
                      href={`https://wa.me/${selected.phone.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
                    >
                      <Phone size={15} />
                      WhatsApp
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-2xl p-6 h-full flex items-center justify-center">
                <div className="text-center">
                  <Mail className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm">Select a message to read</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
