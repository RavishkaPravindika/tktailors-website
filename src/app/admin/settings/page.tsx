"use client";

import { useState, useEffect } from "react";
import { ref, set, onValue } from "firebase/database";
import { db } from "@/lib/firebase";
import { Save, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Settings {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  businessHoursWeekday: string;
  businessHoursSaturday: string;
  businessHoursSunday: string;
  mapEmbedUrl: string;
}

const defaultSettings: Settings = {
  phone: "+94 XX XXX XXXX",
  whatsapp: "+94 XX XXX XXXX",
  email: "info@tktailors.lk",
  address: "T.K. Tailors, Main Street, Sri Lanka",
  businessHoursWeekday: "8:00 AM – 6:00 PM",
  businessHoursSaturday: "8:00 AM – 4:00 PM",
  businessHoursSunday: "Closed",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=...",
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const settingsRef = ref(db, "contact");
    onValue(settingsRef, (snap) => {
      const data = snap.val();
      if (data) {
        setSettings({
          phone: data.phone || defaultSettings.phone,
          whatsapp: data.whatsapp || defaultSettings.whatsapp,
          email: data.email || defaultSettings.email,
          address: data.address || defaultSettings.address,
          businessHoursWeekday: data.businessHours?.weekdays || defaultSettings.businessHoursWeekday,
          businessHoursSaturday: data.businessHours?.saturday || defaultSettings.businessHoursSaturday,
          businessHoursSunday: data.businessHours?.sunday || defaultSettings.businessHoursSunday,
          mapEmbedUrl: data.mapEmbedUrl || defaultSettings.mapEmbedUrl,
        });
      }
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await set(ref(db, "contact"), {
        phone: settings.phone,
        whatsapp: settings.whatsapp,
        email: settings.email,
        address: settings.address,
        businessHours: {
          weekdays: settings.businessHoursWeekday,
          saturday: settings.businessHoursSaturday,
          sunday: settings.businessHoursSunday,
        },
        mapEmbedUrl: settings.mapEmbedUrl,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/20 focus:border-black text-gray-900 bg-gray-50 transition-all";

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Website Settings</h2>
        <p className="text-gray-500 text-sm mt-1">Update your contact information displayed on the website.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-5">
        <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-3">Contact Information</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Phone</label>
            <input
              type="text"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">WhatsApp</label>
            <input
              type="text"
              value={settings.whatsapp}
              onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Email</label>
          <input
            type="email"
            value={settings.email}
            onChange={(e) => setSettings({ ...settings, email: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Address</label>
          <textarea
            value={settings.address}
            onChange={(e) => setSettings({ ...settings, address: e.target.value })}
            rows={2}
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-5">
        <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-3">Business Hours</h3>

        <div className="space-y-4">
          {[
            { label: "Monday – Friday", key: "businessHoursWeekday" },
            { label: "Saturday", key: "businessHoursSaturday" },
            { label: "Sunday", key: "businessHoursSunday" },
          ].map((item) => (
            <div key={item.key} className="flex items-center gap-4">
              <span className="text-sm text-gray-600 w-36 flex-shrink-0">{item.label}</span>
              <input
                type="text"
                value={settings[item.key as keyof Settings]}
                onChange={(e) => setSettings({ ...settings, [item.key]: e.target.value })}
                className={inputClass}
                placeholder="e.g. 8:00 AM – 6:00 PM or Closed"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-3">
        <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-3">Google Maps Embed URL</h3>
        <textarea
          value={settings.mapEmbedUrl}
          onChange={(e) => setSettings({ ...settings, mapEmbedUrl: e.target.value })}
          rows={3}
          className={`${inputClass} resize-none font-mono text-xs`}
          placeholder="Paste your Google Maps embed URL here"
        />
        <p className="text-xs text-gray-400">Get this from Google Maps → Share → Embed a map → Copy the src URL.</p>
      </div>

      {/* Save button */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold text-sm hover:bg-gray-700 disabled:opacity-50 transition-all duration-200"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save size={16} />
              Save Changes
            </>
          )}
        </button>

        <AnimatePresence>
          {saved && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-green-600 text-sm"
            >
              <CheckCircle2 size={16} />
              Settings saved!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
