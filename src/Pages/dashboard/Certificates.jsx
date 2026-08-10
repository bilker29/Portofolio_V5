import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import Swal from "sweetalert2";
import { Award, Upload, Trash2, ImageIcon, Plus } from "lucide-react";

const Card = ({ children, className = "" }) => (
  <div className={`relative group ${className}`}>
    <div className="relative bg-white/90 border border-slate-200/90 rounded-2xl h-full shadow-md">
      {children}
    </div>
  </div>
);

const SkeletonCard = () => (
  <div className="relative">
    <div className="relative bg-white/80 border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="w-full aspect-[16/11.5] bg-slate-100 animate-pulse" />
    </div>
  </div>
);

const CertCard = ({ cert, onDelete }) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="relative group">
      <div className="relative bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
        {/* Skeleton shown until image loads */}
        {!imgLoaded && (
          <div className="w-full aspect-[16/11.5] bg-slate-100 animate-pulse" />
        )}
        <img
          src={cert.Img}
          alt="Certificate"
          onLoad={() => setImgLoaded(true)}
          className={`w-full aspect-[16/11.5] object-cover group-hover:scale-105 transition-transform duration-500 ${imgLoaded ? "block" : "hidden"}`}
        />
        {imgLoaded && (
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
            <button
              onClick={() => onDelete(cert.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs w-full justify-center hover:bg-red-700 transition-colors font-bold shadow-md"
            >
              <Trash2 className="w-3 h-3" /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function Certificates() {
  const [certs, setCerts] = useState([]);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(true);

  // Kustomisasi SweetAlert agar sesuai tema
  const showToast = (title, text, icon) => {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      background: "#ffffff",
      color: "#0f172a",
      confirmButtonColor: "#059669",
      customClass: {
        popup: "border border-slate-200 rounded-2xl shadow-xl",
      },
    });
  };

  const fetchCerts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("certificates")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Error fetching certificates:", error);
    }

    const formattedData = (data || []).map((item) => ({
      id: item.id,
      Img: item.img || item.Img,
      created_at: item.created_at,
    }));

    setCerts(formattedData);
    setLoading(false);
  };

  useEffect(() => {
    fetchCerts();
  }, []);

  const handleFile = (f) => {
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const uploadImage = async () => {
    if (!file) return;
    try {
      setUploading(true);
      const fileName = `cert-${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("certificate-images")
        .upload(fileName, file);
      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("certificate-images")
        .getPublicUrl(fileName);

      const { error: dbError } = await supabase
        .from("certificates")
        .insert({ img: data.publicUrl });
      if (dbError) throw dbError;

      setFile(null);
      setPreview(null);
      fetchCerts();
      showToast("Uploaded!", "Certificate uploaded successfully.", "success");
    } catch (err) {
      showToast(
        "Error",
        `Gagal mengupload sertifikat: ${err.message}`,
        "error",
      );
      console.error("Upload Error:", err);
    } finally {
      setUploading(false);
    }
  };

  const deleteCert = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this certificate!",
      icon: "warning",
      showCancelButton: true,
      background: "#030f1b",
      color: "#ffffff",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#38bdf8",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        popup: "border border-white/10 rounded-2xl",
      },
    });

    if (!result.isConfirmed) return;

    try {
      const { error } = await supabase
        .from("certificates")
        .delete()
        .eq("id", id);
      if (error) throw error;
      fetchCerts();

      Swal.fire({
        title: "Deleted!",
        text: "Your certificate has been deleted.",
        icon: "success",
        background: "#030f1b",
        color: "#ffffff",
        confirmButtonColor: "#10b981",
        customClass: {
          popup: "border border-white/10 rounded-2xl",
        },
      });
    } catch (err) {
      showToast("Error", `Gagal menghapus sertifikat: ${err.message}`, "error");
      console.error("Delete Error:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#38bdf8] via-[#2dd4bf] to-[#34d399] rounded-xl blur opacity-50" />
          <div className="relative w-9 h-9 bg-[#030f1b] rounded-xl border border-white/15 flex items-center justify-center">
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            Certificates
          </h1>
          <p className="text-gray-500 text-xs">
            {loading ? "Loading..." : `${certs.length} certificates total`}
          </p>
        </div>
      </div>

      {/* Upload Card */}
      <Card>
        <div className="p-5 sm:p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-emerald-400" /> Upload Certificate
          </h2>

          <label
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              handleFile(e.dataTransfer.files[0]);
            }}
            className={`flex flex-col items-center justify-center w-full min-h-[160px] rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 ${
              dragOver
                ? "border-emerald-400/60 bg-emerald-500/10"
                : "border-white/12 bg-white/4 hover:border-emerald-500/35 hover:bg-white/7"
            }`}
          >
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="max-h-40 object-contain rounded-lg p-2"
              />
            ) : (
              <div className="text-center space-y-2 p-6">
                <div className="w-11 h-11 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto">
                  <ImageIcon className="w-5 h-5 text-emerald-400" />
                </div>
                <p className="text-sm text-gray-300">
                  Drag & drop or click to upload
                </p>
                <p className="text-xs text-gray-600">
                  PNG, JPG, WEBP supported
                </p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFile(e.target.files[0])}
              className="hidden"
            />
          </label>

          {file && (
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <p className="text-xs text-gray-400 truncate flex-1">
                {file.name}
              </p>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => {
                    setFile(null);
                    setPreview(null);
                  }}
                  className="px-3 py-1.5 rounded-xl border border-white/10 text-gray-500 hover:text-white text-xs transition-colors"
                >
                  Clear
                </button>
                <button
                  onClick={uploadImage}
                  disabled={uploading}
                  className="relative group/u"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0284c7] to-[#059669] rounded-xl opacity-60 blur group-hover/u:opacity-100 transition duration-300" />
                  <div className="relative flex items-center gap-2 px-4 py-1.5 bg-[#030f1b] rounded-xl border border-white/10">
                    {uploading ? (
                      <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Upload className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                    <span className="text-xs text-gray-200">
                      {uploading ? "Uploading..." : "Upload"}
                    </span>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : certs.length === 0 ? (
        <Card>
          <div className="p-16 text-center">
            <Award className="w-10 h-10 text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No certificates yet.</p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {certs.map((cert) => (
            <CertCard key={cert.id} cert={cert} onDelete={deleteCert} />
          ))}
        </div>
      )}
    </div>
  );
}
