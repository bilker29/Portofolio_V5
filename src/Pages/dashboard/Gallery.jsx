import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import Swal from "sweetalert2";
import {
  Camera,
  Video,
  Upload,
  Trash2,
  Plus,
  Pencil,
  X,
  Tag,
  Calendar,
  Sparkles,
  Play,
} from "lucide-react";

const Card = ({ children, className = "" }) => (
  <div className={`relative group ${className}`}>
    <div className="relative bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      {children}
    </div>
  </div>
);

const FormField = ({ label, children }) => (
  <div className="space-y-1.5">
    <label className="text-xs text-slate-600 uppercase tracking-wider font-bold">
      {label}
    </label>
    {children}
  </div>
);

const Input = (props) => (
  <input
    {...props}
    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-800 placeholder-slate-400 text-sm outline-none focus:border-sky-500 focus:bg-white focus:ring-1 focus:ring-sky-500/20 transition-all font-medium"
  />
);

const Select = (props) => (
  <select
    {...props}
    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-800 text-sm outline-none focus:border-sky-500 focus:bg-white focus:ring-1 focus:ring-sky-500/20 transition-all font-medium"
  />
);

const SkeletonCard = () => (
  <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col gap-3 shadow-sm">
    <div className="w-full aspect-video bg-slate-100 animate-pulse rounded-xl" />
    <div className="h-4 bg-slate-100 animate-pulse rounded-lg w-2/3" />
    <div className="h-3 bg-slate-100 animate-pulse rounded-lg w-full" />
    <div className="flex gap-2 pt-2">
      <div className="h-7 w-16 bg-slate-100 animate-pulse rounded-lg" />
      <div className="h-7 w-16 bg-slate-100 animate-pulse rounded-lg" />
    </div>
  </div>
);

const Modal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
    <div
      className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
      onClick={onClose}
    />
    <div
      className="relative z-10 w-full max-w-2xl flex flex-col"
      style={{ maxHeight: "calc(100vh - 24px)" }}
    >
      <div className="relative bg-white border border-slate-200 shadow-2xl rounded-2xl flex flex-col overflow-hidden text-slate-800">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 shrink-0 bg-slate-50">
          <h2 className="text-base font-bold text-slate-800">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 p-4 bg-white">{children}</div>
      </div>
    </div>
  </div>
);

const GalleryForm = ({
  initial,
  onSubmit,
  onCancel,
  submitLabel = "Save Item",
  uploading,
}) => {
  const [form, setForm] = useState({
    title: initial?.title || "",
    subtitle: initial?.subtitle || "",
    type: initial?.type || "photo",
    aspect: initial?.aspect || "landscape",
    date: initial?.date || new Date().getFullYear().toString(),
    tag: initial?.tag || "Event",
    src: initial?.src || "",
    poster: initial?.poster || "",
    caption: initial?.caption || "",
    row: initial?.row || "top",
  });
  const [file, setFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(initial?.src || null);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setMediaPreview(URL.createObjectURL(f));
    if (f.type.startsWith("video/")) {
      setForm((prev) => ({ ...prev, type: "video" }));
    } else if (f.type.startsWith("image/")) {
      setForm((prev) => ({ ...prev, type: "photo" }));
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form, file);
      }}
      className="p-2 sm:p-4 space-y-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Title *">
          <Input
            name="title"
            value={form.title}
            onChange={onChange}
            required
            placeholder="e.g. Karate Championship 2024"
          />
        </FormField>
        <FormField label="Subtitle">
          <Input
            name="subtitle"
            value={form.subtitle}
            onChange={onChange}
            placeholder="e.g. Prestasi & Pertandingan"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <FormField label="Type">
          <Select name="type" value={form.type} onChange={onChange}>
            <option value="photo">Photo 📷</option>
            <option value="video">Video 🎥</option>
          </Select>
        </FormField>
        <FormField label="Aspect Ratio">
          <Select name="aspect" value={form.aspect} onChange={onChange}>
            <option value="landscape">Landscape (Horizontal)</option>
            <option value="portrait">Portrait (Vertical)</option>
          </Select>
        </FormField>
        <FormField label="Tag / Category">
          <Input
            name="tag"
            value={form.tag}
            onChange={onChange}
            placeholder="e.g. Workshop"
          />
        </FormField>
        <FormField label="Year / Date">
          <Input
            name="date"
            value={form.date}
            onChange={onChange}
            placeholder="2024"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Display Row">
          <Select name="row" value={form.row} onChange={onChange}>
            <option value="top">Top Row (Marquee Left)</option>
            <option value="bottom">Bottom Row (Marquee Right)</option>
          </Select>
        </FormField>
        <FormField label="External Media URL (Optional)">
          <Input
            name="src"
            value={form.src}
            onChange={onChange}
            placeholder="https://..."
          />
        </FormField>
      </div>

      <FormField label="Caption / Description">
        <textarea
          name="caption"
          value={form.caption}
          onChange={onChange}
          rows={2}
          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-800 placeholder-slate-400 text-sm outline-none focus:border-sky-500 focus:bg-white focus:ring-1 focus:ring-sky-500/20 transition-all resize-none font-medium"
          placeholder="Momen kebersamaan dalam acara kampus..."
        />
      </FormField>

      <div className="space-y-1.5">
        <label className="text-xs text-slate-600 uppercase tracking-wider font-bold">
          Upload File (Foto / Video)
        </label>
        <label className="flex items-center gap-4 w-full bg-slate-50 border border-dashed border-slate-300 rounded-xl px-4 py-4 cursor-pointer hover:border-sky-500 hover:bg-sky-50/50 transition-all">
          <input
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={onFileChange}
          />
          {mediaPreview ? (
            form.type === "video" ? (
              <div className="w-16 h-12 rounded-lg bg-slate-900 flex items-center justify-center shrink-0 border border-slate-200">
                <Play className="w-6 h-6 text-sky-400 fill-sky-400" />
              </div>
            ) : (
              <img
                src={mediaPreview}
                alt="preview"
                className="w-16 h-12 object-cover rounded-lg shrink-0 border border-slate-200"
              />
            )
          ) : (
            <div className="w-12 h-12 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center shrink-0">
              <Upload className="w-5 h-5 text-sky-600" />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-slate-800 truncate">
              {file
                ? file.name
                : form.src
                ? "Click to change uploaded file"
                : "Upload foto atau video gallery"}
            </p>
            <p className="text-xs text-slate-500">
              Mendukung Gambar (PNG, JPG, WebP) & Video (MP4, WebM)
            </p>
          </div>
        </label>
      </div>

      <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 text-sm font-semibold transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={uploading}
          className="px-5 py-2 bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-700 hover:to-emerald-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-2 text-sm"
        >
          {uploading ? (
            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          ) : (
            <Upload className="w-4 h-4" />
          )}
          <span>{uploading ? "Saving..." : submitLabel}</span>
        </button>
      </div>
    </form>
  );
};

export default function GalleryManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [uploading, setUploading] = useState(false);

  const showToast = (title, text, icon) => {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonColor: "#0284c7",
    });
  };

  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("gallery_items")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching gallery items:", error);
    }
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const uploadMedia = async (f) => {
    const fileName = `${Date.now()}-${f.name.replace(/\s+/g, "-")}`;
    const { error } = await supabase.storage
      .from("gallery-media")
      .upload(fileName, f);

    if (error) {
      // Fallback try project-images bucket if gallery-media bucket isn't created yet
      const { error: err2 } = await supabase.storage
        .from("project-images")
        .upload(fileName, f);
      if (err2) throw error;
      const { data: pubData } = supabase.storage
        .from("project-images")
        .getPublicUrl(fileName);
      return pubData.publicUrl;
    }

    const { data } = supabase.storage
      .from("gallery-media")
      .getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleCreate = async (form, file) => {
    try {
      setUploading(true);
      let mediaUrl = form.src || "";

      if (file) {
        mediaUrl = await uploadMedia(file);
      }

      if (!mediaUrl) {
        showToast(
          "Peringatan",
          "Harap upload file foto/video atau isi URL media",
          "warning"
        );
        setUploading(false);
        return;
      }

      const { error } = await supabase.from("gallery_items").insert({
        title: form.title,
        subtitle: form.subtitle,
        type: form.type,
        aspect: form.aspect,
        date: form.date,
        tag: form.tag,
        src: mediaUrl,
        poster: form.poster,
        caption: form.caption,
        row: form.row,
      });

      if (error) throw error;

      setShowCreate(false);
      fetchItems();
      showToast("Berhasil!", "Item gallery berhasil ditambahkan.", "success");
    } catch (err) {
      showToast("Error", `Gagal menyimpan gallery: ${err.message}`, "error");
      console.error("Create Gallery Error:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = async (form, file) => {
    try {
      setUploading(true);
      let mediaUrl = form.src || editItem.src || "";

      if (file) {
        mediaUrl = await uploadMedia(file);
      }

      const { error } = await supabase
        .from("gallery_items")
        .update({
          title: form.title,
          subtitle: form.subtitle,
          type: form.type,
          aspect: form.aspect,
          date: form.date,
          tag: form.tag,
          src: mediaUrl,
          poster: form.poster,
          caption: form.caption,
          row: form.row,
        })
        .eq("id", editItem.id);

      if (error) throw error;

      setEditItem(null);
      fetchItems();
      showToast("Diperbarui!", "Item gallery berhasil diperbarui.", "success");
    } catch (err) {
      showToast("Error", `Gagal mengupdate gallery: ${err.message}`, "error");
    } finally {
      setUploading(false);
    }
  };

  const deleteItem = async (id) => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Item gallery ini akan dihapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Ya, hapus!",
    });

    if (!result.isConfirmed) return;

    try {
      const { error } = await supabase
        .from("gallery_items")
        .delete()
        .eq("id", id);
      if (error) throw error;
      fetchItems();
      showToast("Terhapus!", "Item gallery telah dihapus.", "success");
    } catch (err) {
      showToast("Error", `Gagal menghapus item: ${err.message}`, "error");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-sky-600" />
            <h1 className="text-2xl font-black text-slate-800">
              Gallery Management
            </h1>
          </div>
          <p className="text-slate-500 text-sm mt-0.5">
            Kelola foto & video dokumentasi yang tampil pada halaman Activity Gallery.
          </p>
        </div>

        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-700 hover:to-emerald-700 text-white font-bold text-sm shadow-md transition-all active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Media</span>
        </button>
      </div>

      {/* Grid of items */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto">
            <Camera className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-800 text-lg">
            Belum ada media gallery di Supabase
          </h3>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            Klik tombol "Tambah Media" di atas untuk menambahkan foto atau video baru ke dokumentasi portofolio Anda.
          </p>
          <button
            onClick={() => setShowCreate(true)}
            className="px-4 py-2 bg-sky-600 text-white text-sm font-bold rounded-xl inline-flex items-center gap-2 hover:bg-sky-700 transition-colors"
          >
            <Plus className="w-4 h-4" /> Tambah Media Sekarang
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <Card key={item.id}>
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 mb-3 border border-slate-100">
                {item.type === "video" ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <video
                      src={item.src}
                      poster={item.poster}
                      muted
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute w-10 h-10 rounded-full bg-sky-600/90 text-white flex items-center justify-center shadow-lg">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>
                ) : (
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-black text-slate-800 shadow-sm border border-slate-200">
                  {item.type === "video" ? (
                    <Video className="w-3 h-3 text-sky-600" />
                  ) : (
                    <Camera className="w-3 h-3 text-emerald-600" />
                  )}
                  <span>{item.tag || "Gallery"}</span>
                </div>
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-slate-900/80 text-white text-[10px] font-bold">
                  Row: {item.row || "top"}
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="font-bold text-slate-800 text-sm line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium line-clamp-1">
                  {item.subtitle}
                </p>
                {item.caption && (
                  <p className="text-[11px] text-slate-400 italic line-clamp-2 mt-1">
                    "{item.caption}"
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between gap-2 pt-3 mt-3 border-t border-slate-100">
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {item.date}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setEditItem(item)}
                    className="p-1.5 rounded-lg border border-sky-200 text-sky-600 hover:bg-sky-50 transition-colors"
                    title="Edit Item"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete Item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal Tambah Media */}
      {showCreate && (
        <Modal title="Tambah Media Gallery" onClose={() => setShowCreate(false)}>
          <GalleryForm
            onSubmit={handleCreate}
            onCancel={() => setShowCreate(false)}
            submitLabel="Simpan Media"
            uploading={uploading}
          />
        </Modal>
      )}

      {/* Modal Edit Media */}
      {editItem && (
        <Modal title="Edit Media Gallery" onClose={() => setEditItem(null)}>
          <GalleryForm
            initial={editItem}
            onSubmit={handleEdit}
            onCancel={() => setEditItem(null)}
            submitLabel="Update Media"
            uploading={uploading}
          />
        </Modal>
      )}
    </div>
  );
}
