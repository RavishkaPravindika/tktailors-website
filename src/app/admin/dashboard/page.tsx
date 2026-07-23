"use client";

import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { MessageSquare, BookOpen, ArrowRight, Users, Eye } from "lucide-react";

export default function AdminDashboard() {
  const [messageCount, setMessageCount] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);
  const [guestbookCount, setGuestbookCount] = useState(0);

  useEffect(() => {
    const messagesRef = ref(db, "messages");
    onValue(messagesRef, (snap) => {
      const data = snap.val();
      if (data) {
        const msgs = Object.values(data) as { read?: boolean }[];
        setMessageCount(msgs.length);
        setUnreadCount(msgs.filter((m) => !m.read).length);
      }
    });

    const gbRef = ref(db, "guestbook");
    onValue(gbRef, (snap) => {
      const data = snap.val();
      setGuestbookCount(data ? Object.keys(data).length : 0);
    });
  }, []);

  const stats = [
    {
      label: "Total Messages",
      value: messageCount,
      icon: MessageSquare,
      href: "/admin/messages",
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Unread Messages",
      value: unreadCount,
      icon: Eye,
      href: "/admin/messages",
      color: "bg-orange-50 text-orange-600",
    },
    {
      label: "Guest Book Entries",
      value: guestbookCount,
      icon: BookOpen,
      href: "/admin/guest-book",
      color: "bg-purple-50 text-purple-600",
    },
  ];

  const quickLinks = [
    { href: "/admin/guest-book", label: "Upload Guest Book Images", icon: BookOpen, description: "Add new handwritten review images" },
    { href: "/admin/messages", label: "View Messages", icon: MessageSquare, description: "Read contact form submissions" },
    { href: "/admin/settings", label: "Update Settings", icon: Users, description: "Manage contact information" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-500 text-sm mt-1">Welcome back to the T.K. Custom Tailors admin panel.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all duration-200 group"
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${stat.color}`}>
                <Icon size={20} />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500 flex items-center gap-1 group-hover:text-gray-900 transition-colors">
                {stat.label}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-900 hover:shadow-md transition-all duration-200 group flex flex-col gap-3"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-all duration-200">
                  <Icon size={18} className="text-gray-600 group-hover:text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm mb-1 flex items-center gap-1">
                    {link.label}
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </p>
                  <p className="text-xs text-gray-500">{link.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Info card */}
      <div className="bg-[#111111] rounded-2xl p-6 text-white">
        <h3 className="font-serif text-lg font-semibold mb-2">How the Guest Book Works</h3>
        <div className="space-y-2 text-sm text-white/60">
          <p>1. Go to <strong className="text-white">Guest Book</strong> → Upload a scanned handwritten review image</p>
          <p>2. The image is uploaded to <strong className="text-white">ImageBB</strong> (free cloud hosting)</p>
          <p>3. The image URL is saved to <strong className="text-white">Firebase Realtime Database</strong></p>
          <p>4. The public Guest Book page <strong className="text-white">automatically updates</strong> — no coding required!</p>
        </div>
      </div>
    </div>
  );
}
