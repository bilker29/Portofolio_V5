import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import Swal from "sweetalert2";
import {
  Plus,
  Trash2,
  Upload,
  FolderGit2,
  X,
  ImageIcon,
  ExternalLink,
  Github,
  Pencil,
} from "lucide-react";

const Card = ({ children, className = "" }) => (
  <div className={`relative group ${className}`}>
    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#38bdf8] via-[#2dd4bf] to-[#34d399] rounded-2xl blur opacity-10 group-hover:opacity-25 transition duration-500" />
    <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between overflow-hidden">
      <div className="space-y-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
          <FolderGit2 className="w-5 h-5 text-emerald-400" />
        </div>
      </div>
      {children}
    </div>
  </div>
);

const FormField = ({ label, children }) => (
  <div className="space-y-1.5">
    <label className="text-xs text-emerald-300/70 uppercase tracking-wider font-medium">
      {label}
    </label>
    {children}
  </div>
);

const Input = (props) => (
  <input
    {...props}
    className="w-full bg-[#041724] border border-white/10 rounded-xl px-4 py-2.5 text-gray-200 placeholder-gray-600 text-sm outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 transition-all"
  />
);

const SkeletonCard = () => (
  <div className="relative">
    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#38bdf8] via-[#2dd4bf] to-[#34d399] rounded-2xl blur opacity-10" />
    <div className="relative bg-white/5 border border-white/12 rounded-2xl p-4 flex flex-col gap-3">
      <div className="w-full aspect-[16/8] bg-white/5 animate-pulse rounded-xl" />
      <div className="h-4 bg-white/5 animate-pulse rounded-lg w-2/3" />
      <div className="h-3 bg-white/5 animate-pulse rounded-lg w-full" />
      <div className="h-3 bg-white/5 animate-pulse rounded-lg w-4/5" />
      <div className="flex gap-1.5 mt-1">
        <div className="h-5 w-16 bg-white/5 animate-pulse rounded-full" />
        <div className="h-5 w-12 bg-white/5 animate-pulse rounded-full" />
        <div className="h-5 w-20 bg-white/5 animate-pulse rounded-full" />
      </div>
      <div className="flex justify-between items-center pt-2 border-t border-white/8 mt-auto">
        <div className="flex gap-2">
          <div className="w-7 h-7 bg-white/5 animate-pulse rounded-lg" />
          <div className="w-7 h-7 bg-white/5 animate-pulse rounded-lg" />
        </div>
        <div className="flex gap-2">
          <div className="w-14 h-7 bg-white/5 animate-pulse rounded-lg" />
          <div className="w-16 h-7 bg-white/5 animate-pulse rounded-lg" />
        </div>
      </div>
    </div>
  </div>
);

const ProjectCard = ({ project, onDelete, onEdit }) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <Card>
      <div className="p-4 flex flex-col h-full">
        {project.Img && (
          <div className="w-full aspect-[16/8] rounded-xl mb-4 border border-white/8 overflow-hidden bg-white/5">
            {!imgLoaded && (
              <div className="w-full h-full animate-pulse bg-white/5" />
            )}
            <img
              src={project.Img}
              alt={project.Title}
              onLoad={() => setImgLoaded(true)}
              className={`w-full h-full object-cover transition-opacity duration-300 ${imgLoaded ? "opacity-100" : "opacity-0 absolute"}`}
            />
          </div>
        )}
        <h3 className="font-semibold text-white text-sm mb-1">
          {project.Title}
        </h3>
        {project.Description && (
          <p className="text-gray-400 text-xs mb-3 line-clamp-2 leading-relaxed">
            {project.Description}
          </p>
        )}
        {project.TechStack?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.TechStack.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-300 text-xs"
              >
                {t}
              </span>
            ))}
          </div>
        )}
        <div className="mt-auto flex items-center justify-between gap-2 pt-2 border-t border-white/8">
          <div className="flex gap-2">
            {project.Link && (
              <a
                href={project.Link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg border border-white/10 text-gray-500 hover:text-white hover:border-white/20 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.Github && (
              <a
                href={project.Github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg border border-white/10 text-gray-500 hover:text-white hover:border-white/20 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(project)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/10 text-xs transition-colors"
            >
              <Pencil className="w-3 h-3" /> Edit
            </button>
            <button
              onClick={() => onDelete(project.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 text-xs transition-colors"
            >
              <Trash2 className="w-3 h-3" /> Delete
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

const Modal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
    <div
      className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    />
    <div
      className="relative z-10 w-full max-w-2xl flex flex-col"
      style={{ maxHeight: "calc(100vh - 24px)" }}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#38bdf8] via-[#2dd4bf] to-[#34d399] rounded-2xl blur opacity-20 pointer-events-none" />
      <div className="relative bg-[#030f1b] border border-white/12 rounded-2xl flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/8 shrink-0">
          <h2 className="text-base font-semibold text-white">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  </div>
);

const ProjectForm = ({ initial, onSubmit, onCancel, submitLabel = "Save Project", uploading, }) => {
  const [form, setForm] = useState({
    Title: initial?.Title || "",
    Description: initial?.Description || "",
    TechStack: Array.isArray(initial?.TechStack) ? initial.TechStack.join(", ") : initial?.TechStack || "",
    Features: Array.isArray(initial?.Features) ? initial.Features.join(", ") : initial?.Features || "",
    Link: initial?.Link || "",
    Github: initial?.Github || "",
  });
  const [file, setFile] = useState(null);
  const [imgPreview, setImgPreview] = useState(initial?.Img || null);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setImgPreview(URL.createObjectURL(f));
  };

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit(form, file); }}
      className="p-5 sm:p-6 space-y-4"
    >
      <FormField label="Project Title *">
        <Input name="Title" value={form.Title} onChange={onChange} required placeholder="e.g. My Awesome App" />
      </FormField>

      <FormField label="Description *">
        <textarea
          name="Description"
          value={form.Description}
          onChange={onChange}
          required
          rows={3}
          className="w-full bg-[#041724] border border-white/10 rounded-xl px-4 py-2.5 text-gray-200 placeholder-gray-600 text-sm outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 transition-all resize-none"
          placeholder="A brief overview of the project..."
        />
      </FormField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Tech Stack (comma separated)">
          <Input name="TechStack" value={form.TechStack} onChange={onChange} placeholder="React, Node.js, Tailwind" />
        </FormField>
        <FormField label="Features (comma separated)">
          <Input name="Features" value={form.Features} onChange={onChange} placeholder="Authentication, Dark Mode" />
        </FormField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Live Demo URL">
          <Input name="Link" value={form.Link} onChange={onChange} placeholder="https://myproject.com" />
        </FormField>
        <FormField label="GitHub Repository URL">
          <Input name="Github" value={form.Github} onChange={onChange} placeholder="https://github.com/user/repo" />
        </FormField>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs text-emerald-300/70 uppercase tracking-wider font-medium">
          Project Cover Image
        </label>
        <label className="flex items-center gap-4 w-full bg-[#041724] border border-dashed border-white/15 rounded-xl px-4 py-4 cursor-pointer hover:border-emerald-500/40 hover:bg-white/4 transition-all">
          <input type="file" accept="image/*" className="hidden" onChange={onFileChange} />
          {imgPreview ? (
            <img src={imgPreview} alt="preview" className="w-16 h-12 object-cover rounded-lg shrink-0 border border-white/10" />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              <Upload className="w-5 h-5 text-emerald-400" />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-200 truncate">
              {file ? file.name : form.Img ? "Click to change image" : "Upload cover image"}
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, WebP up to 5MB</p>
          </div>
        </label>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 text-sm transition-colors"
        >
          Cancel
        </button>
        <button type="submit" disabled={uploading} className="relative group/s shrink-0">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0284c7] to-[#059669] rounded-xl opacity-60 blur group-hover/s:opacity-100 transition duration-300" />
          <div className="relative flex items-center gap-2 px-5 py-2 bg-[#030f1b] rounded-xl border border-white/10">
            {uploading ? (
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <Upload className="w-4 h-4 text-emerald-400" />
            )}
            <span className="text-sm text-gray-200">
              {uploading ? "Saving..." : submitLabel}
            </span>
          </div>
        </button>
      </div>
    </form>
  );
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Kustomisasi SweetAlert agar sesuai tema
  const showToast = (title, text, icon) => {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      background: "#030f1b",
      color: "#ffffff",
      confirmButtonColor: "#10b981",
      customClass: {
        popup: "border border-white/10 rounded-2xl backdrop-blur-xl",
      },
    });
  };

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching projects:", error);
    }

    const formattedData = (data || []).map((item) => ({
      id: item.id,
      Title: item.title || item.Title,
      Description: item.description || item.Description,
      Img: item.img || item.Img,
      TechStack: item.tech_stack || item.techstack || item.TechStack,
      Features: item.features || item.Features,
      Link: item.link || item.Link,
      Github: item.github || item.Github,
      created_at: item.created_at,
    }));

    setProjects(formattedData);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const uploadImage = async (f) => {
    const fileName = `${Date.now()}-${f.name}`;
    const { error } = await supabase.storage
      .from("project-images")
      .upload(fileName, f);

    if (error) throw error;

    const { data } = supabase.storage
      .from("project-images")
      .getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleCreate = async (form, file) => {
    try {
      setUploading(true);
      let imgUrl = "";

      if (file) {
        imgUrl = await uploadImage(file);
      }

      const { error } = await supabase.from("projects").insert({
        title: form.Title,
        description: form.Description,
        img: imgUrl,
        tech_stack: form.TechStack.split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        features: form.Features.split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        link: form.Link,
        github: form.Github,
      });

      if (error) throw error;

      setShowCreate(false);
      fetchProjects();
      showToast("Success!", "Project successfully created.", "success");
    } catch (err) {
      showToast("Error", `Gagal menyimpan project: ${err.message}`, "error");
      console.error("Create Error:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = async (form, file) => {
    try {
      setUploading(true);
      let imgUrl = editProject.Img || "";

      if (file) {
        imgUrl = await uploadImage(file);
      }

      const { error } = await supabase
        .from("projects")
        .update({
          title: form.Title,
          description: form.Description,
          img: imgUrl,
          tech_stack: form.TechStack.split(",")
            .map((s) => s.trim())
            .filter(Boolean),
          features: form.Features.split(",")
            .map((s) => s.trim())
            .filter(Boolean),
          link: form.Link,
          github: form.Github,
        })
        .eq("id", editProject.id);

      if (error) throw error;

      setEditProject(null);
      fetchProjects();
      showToast("Updated!", "Project successfully updated.", "success");
    } catch (err) {
      showToast("Error", `Gagal mengupdate project: ${err.message}`, "error");
      console.error("Update Error:", err);
    } finally {
      setUploading(false);
    }
  };

  const deleteProject = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this project!",
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
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
      fetchProjects();

      Swal.fire({
        title: "Deleted!",
        text: "Your project has been deleted.",
        icon: "success",
        background: "#030f1b",
        color: "#ffffff",
        confirmButtonColor: "#10b981",
        customClass: {
          popup: "border border-white/10 rounded-2xl",
        },
      });
    } catch (err) {
      showToast("Error", `Gagal menghapus project: ${err.message}`, "error");
      console.error("Delete Error:", err);
    }
  };

  return (
    <div className="space-y-6z ">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#38bdf8] via-[#2dd4bf] to-[#34d399] rounded-xl blur opacity-50" />
            <div className="relative w-9 h-9 bg-[#030f1b] rounded-xl border border-white/15 flex items-center justify-center">
              <FolderGit2 className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Projects
            </h1>
            <p className="text-gray-500 text-xs">
              {loading ? "Loading..." : `${projects.length} projects total`}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowCreate(true)}
          className="relative group shrink-0"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0284c7] to-[#059669] rounded-xl opacity-50 blur group-hover:opacity-80 transition duration-300" />
          <div className="relative flex items-center gap-2 px-4 py-2.5 bg-[#030f1b] rounded-xl border border-white/10">
            <Plus className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-gray-200">New Project</span>
          </div>
        </button>
      </div>

      {/* Create Modal */}
      {showCreate && (
        <Modal title="Add New Project" onClose={() => setShowCreate(false)}>
          <ProjectForm
            onSubmit={handleCreate}
            onCancel={() => setShowCreate(false)}
            submitLabel="Save Project"
            uploading={uploading}
          />
        </Modal>
      )}

      {/* Edit Modal */}
      {editProject && (
        <Modal title="Edit Project" onClose={() => setEditProject(null)}>
          <ProjectForm
            initial={editProject}
            onSubmit={handleEdit}
            onCancel={() => setEditProject(null)}
            submitLabel="Update Project"
            uploading={uploading}
          />
        </Modal>
      )}

      {/* Projects Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <Card>
          <div className="p-16 text-center">
            <FolderGit2 className="w-10 h-10 text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">
              No projects yet. Create your first one!
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onDelete={deleteProject}
              onEdit={setEditProject}
            />
          ))}
        </div>
      )}
    </div>
  );
}
