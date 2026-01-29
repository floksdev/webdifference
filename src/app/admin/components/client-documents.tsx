"use client";

import { useState, useRef, DragEvent } from "react";
import { supabaseClient, isSupabaseConfigured } from "@/lib/supabase-client";

type Document = {
  id: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  documentType: string;
  createdAt: string;
};

type ClientDocumentsProps = {
  clientId: string;
  clientName: string;
  documents: Document[];
  onDocumentsUpdate: () => void;
};

export function ClientDocuments({
  clientId,
  clientName,
  documents,
  onDocumentsUpdate,
}: ClientDocumentsProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      await uploadFiles(files);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      await uploadFiles(files);
    }
  };

  const uploadFiles = async (files: File[]) => {
    if (!isSupabaseConfigured) {
      alert("Supabase n'est pas configuré. Impossible d'uploader les fichiers.\n\nVérifiez que NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY sont définis dans votre fichier .env.local");
      return;
    }

    setUploading(true);

    try {
      const uploadPromises = files.map(async (file) => {
        const fileId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
        setUploadProgress((prev) => ({ ...prev, [file.name]: 0 }));

        // Déterminer le type de document
        let documentType = "OTHER";
        const fileName = file.name.toLowerCase();
        if (fileName.includes("devis") || fileName.includes("quote")) {
          documentType = "QUOTE";
        } else if (fileName.includes("facture") || fileName.includes("invoice")) {
          documentType = "INVOICE";
        } else if (fileName.includes("contrat") || fileName.includes("contract")) {
          documentType = "CONTRACT";
        }

        // Upload vers Supabase Storage via API route (bypass RLS)
        const uploadFormData = new FormData();
        uploadFormData.append("file", file);
        uploadFormData.append("clientId", clientId);

        const uploadResponse = await fetch("/api/admin/clients/documents/upload", {
          method: "POST",
          body: uploadFormData,
        });

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          throw new Error(errorData.error || "Erreur lors de l'upload vers Supabase");
        }

        const { fileUrl: publicUrl } = await uploadResponse.json();

        if (!publicUrl) {
          throw new Error("Impossible d'obtenir l'URL publique du fichier");
        }

        // Enregistrer dans la base de données
        const response = await fetch("/api/admin/clients/documents", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clientId,
            fileName: file.name,
            fileUrl: publicUrl,
            fileType: file.type || "application/pdf",
            fileSize: file.size,
            documentType,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Erreur API:", errorText);
          throw new Error(`Erreur lors de l'enregistrement du document: ${response.status} ${errorText}`);
        }

        setUploadProgress((prev) => ({ ...prev, [file.name]: 100 }));
        return response.json();
      });

      await Promise.all(uploadPromises);
      onDocumentsUpdate();
    } catch (error) {
      console.error("Erreur lors de l'upload:", error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Erreur inconnue lors de l'upload des fichiers";
      alert(`Erreur lors de l'upload des fichiers: ${errorMessage}\n\nVérifiez la console pour plus de détails.`);
    } finally {
      setUploading(false);
      setUploadProgress({});
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDelete = async (documentId: string, fileName: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${fileName}" ?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/clients/documents/${documentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression");
      }

      onDocumentsUpdate();
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la suppression du document.");
    }
  };

  const isImageFile = (fileType: string, fileName: string) => {
    if (fileType?.startsWith("image/")) return true;
    const ext = fileName.split(".").pop()?.toLowerCase();
    return ["jpg", "jpeg", "png", "gif", "webp"].includes(ext ?? "");
  };

  const getFileExtension = (fileName: string) => {
    const ext = fileName.split(".").pop();
    return ext ? ext.toUpperCase() : "FICHIER";
  };

  const getDocumentLabel = (documentType: string) => {
    if (documentType === "QUOTE") return "Devis";
    if (documentType === "INVOICE") return "Facture";
    if (documentType === "CONTRACT") return "Contrat";
    return "Document";
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-white">Documents</h3>

      {/* Zone de drag & drop */}
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`rounded-lg border-2 border-dashed p-6 text-center transition ${
          isDragging
            ? "border-[#71DDAE] bg-[#71DDAE]/10"
            : "border-white/20 bg-white/5 hover:border-white/40"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
          onChange={handleFileSelect}
          className="hidden"
          id={`file-input-${clientId}`}
        />
        <label
          htmlFor={`file-input-${clientId}`}
          className="cursor-pointer"
        >
          <div className="space-y-2">
            <p className="text-sm text-white/80">
              Glissez-déposez des fichiers ici ou{" "}
              <span className="text-[#71DDAE] underline">cliquez pour sélectionner</span>
            </p>
            <p className="text-xs text-white/60">
              PDF, Word, Excel, Images (max 10MB par fichier)
            </p>
          </div>
        </label>
      </div>

      {/* Liste des fichiers en cours d'upload */}
      {uploading && Object.keys(uploadProgress).length > 0 && (
        <div className="space-y-2">
          {Object.entries(uploadProgress).map(([fileName, progress]) => (
            <div key={fileName} className="rounded-lg border border-white/10 bg-white/5 p-2">
              <div className="flex items-center justify-between text-xs text-white/80 mb-1">
                <span>{fileName}</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#71DDAE] transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Liste des documents */}
      {documents.length > 0 && (
        <div className="grid gap-3">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="relative h-12 w-12 overflow-hidden rounded-lg border border-white/10 bg-white/10 flex items-center justify-center text-[10px] font-semibold uppercase text-white/70">
                  {isImageFile(doc.fileType, doc.fileName) ? (
                    <img
                      src={doc.fileUrl}
                      alt={doc.fileName}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <span>{getFileExtension(doc.fileName)}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-white/90 hover:text-white truncate"
                    >
                      {doc.fileName}
                    </a>
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-white/70">
                      {getDocumentLabel(doc.documentType)}
                    </span>
                  </div>
                  <p className="text-xs text-white/60">
                    {(doc.fileSize / 1024).toFixed(1)} KB •{" "}
                    {new Date(doc.createdAt).toLocaleDateString("fr-FR")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-white/80 transition hover:bg-white/10"
                >
                  Ouvrir
                </a>
                <button
                  onClick={() => handleDelete(doc.id, doc.fileName)}
                  className="rounded-lg border border-red-300 bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600 transition hover:bg-red-100"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

