"use client";

import { useState, useEffect, useRef } from "react";
import { ref, push, remove, onValue } from "firebase/database";
import { db } from "@/lib/firebase";
import { uploadToImageBB } from "@/lib/imagebb";
import { GuestBookEntry } from "@/types";
import Image from "next/image";
import { Upload, Trash2, Plus, X, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminGuestBookPage() {
  const [entries, setEntries] = useState<GuestBookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [caption, setCaption] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const gbRef = ref(db, "guestbook");
    const unsubscribe = onValue(gbRef, (snap) => {
      const data = snap.val();
      if (data) {
        const list: GuestBookEntry[] = Object.entries(data).map(([key, val]) => ({
          id: key,
          ...(val as Omit<GuestBookEntry, "id">),
        })).sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
        setEntries(list);
      } else {
        setEntries([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setUploadError("");
    setUploadSuccess(false);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    setUploadError("");
    setUploadSuccess(false);

    try {
      const { url, thumbnailUrl } = await uploadToImageBB(selectedFile);
      const gbRef = ref(db, "guestbook");
      await push(gbRef, {
        imageUrl: url,
        thumbnailUrl,
        caption: caption.trim() || null,
        uploadedAt: new Date().toISOString(),
        uploadedBy: "Admin",
      });
      setUploadSuccess(true);
      setCaption("");
      setPreviewUrl(null);
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error(err);
      setUploadError("Upload failed. Check your ImageBB API key in .env.local and try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleteId(id);
    try {
      await remove(ref(db, `guestbook/${id}`));
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Guest Book Management</h2>
        <p className="text-gray-500 text-sm mt-1">Upload handwritten review images from customers.</p>
      </div>

      {/* Upload Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <h3 className="font-semibold text-gray-900 mb-5 flex items-center gap-2">
          <Plus size={18} />
          Upload New Entry
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Drop zone */}
          <div>
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-xl overflow-hidden cursor-pointer hover:border-gray-400 transition-colors ${
                previewUrl ? "border-gray-400 h-64" : "border-gray-200 h-48 flex items-center justify-center"
              }`}
            >
              {previewUrl ? (
                <>
                  <Image src={previewUrl} alt="Preview" fill className="object-contain p-2" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewUrl(null);
                      setSelectedFile(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="absolute top-2 right-2 w-7 h-7 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </>
              ) : (
                <div className="text-center p-6">
                  <Upload className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-600">Click to select image</p>
                  <p className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP (max 32MB)</p>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Caption + upload button */}
          <div className="flex flex-col justify-between gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Caption (optional)
              </label>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                rows={4}
                placeholder="e.g. Thank you for the wonderful suit! — Customer Name"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none outline-none focus:ring-2 focus:ring-black/20 focus:border-black text-gray-900 bg-gray-50"
              />
            </div>

            <div className="space-y-3">
              <AnimatePresence>
                {uploadSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 px-4 py-3 rounded-xl text-sm"
                  >
                    <CheckCircle2 size={16} />
                    Image uploaded successfully!
                  </motion.div>
                )}
                {uploadError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 px-4 py-3 rounded-xl text-sm"
                  >
                    <AlertCircle size={16} />
                    {uploadError}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#111111] text-white font-semibold text-sm rounded-xl hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
              >
                {uploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                    Uploading to ImageBB...
                  </>
                ) : (
                  <>
                    <Upload size={16} />
                    Upload to Guest Book
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Entries list */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">
          Current Entries ({entries.length})
        </h3>

        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading...</div>
        ) : entries.length === 0 ? (
          <div className="text-center py-12 bg-white border border-gray-200 rounded-2xl">
            <p className="text-gray-400">No entries yet. Upload your first image above!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {entries.map((entry) => (
              <div key={entry.id} className="relative group bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="relative aspect-[3/4]">
                  <Image
                    src={entry.thumbnailUrl || entry.imageUrl}
                    alt={entry.caption || "Guest book entry"}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="p-2">
                  <p className="text-xs text-gray-400 truncate">
                    {new Date(entry.uploadedAt).toLocaleDateString()}
                  </p>
                  {entry.caption && (
                    <p className="text-xs text-gray-600 truncate mt-0.5">{entry.caption}</p>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(entry.id)}
                  disabled={deleteId === entry.id}
                  className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 disabled:opacity-50"
                >
                  {deleteId === entry.id ? (
                    <div className="w-3 h-3 border border-t-transparent border-white rounded-full animate-spin" />
                  ) : (
                    <Trash2 size={14} />
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
