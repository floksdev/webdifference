"use client";

import { useEffect, useRef, useState, DragEvent } from "react";

type ClientDocumentsFormProps = {
  pendingFiles: File[];
  onFilesChange: (files: File[]) => void;
};

export function ClientDocumentsForm({
  pendingFiles,
  onFilesChange,
}: ClientDocumentsFormProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrls, setPreviewUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    const urls: Record<string, string> = {};
    pendingFiles.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const key = `${file.name}-${file.size}-${file.lastModified}`;
        urls[key] = URL.createObjectURL(file);
      }
    });
    setPreviewUrls(urls);

    return () => {
      Object.values(urls).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [pendingFiles]);

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

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFilesChange([...pendingFiles, ...files]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onFilesChange([...pendingFiles, ...files]);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    const newFiles = pendingFiles.filter((_, i) => i !== index);
    onFilesChange(newFiles);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-white">Documents (optionnel)</h3>

      {/* Zone de drag & drop */}
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`rounded-lg border-2 border-dashed p-4 text-center transition ${
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
          id="file-input-form"
        />
        <label
          htmlFor="file-input-form"
          className="cursor-pointer"
        >
          <div className="space-y-1">
            <p className="text-xs text-white/80">
              Glissez-déposez des fichiers ici ou{" "}
              <span className="text-[#71DDAE] underline">cliquez pour sélectionner</span>
            </p>
            <p className="text-xs text-white/60">
              PDF, Word, Excel, Images (max 10MB par fichier)
            </p>
          </div>
        </label>
      </div>

      {/* Liste des fichiers en attente */}
      {pendingFiles.length > 0 && (
        <div className="space-y-2">
          {pendingFiles.map((file, index) => {
            const ext = file.name.split(".").pop()?.toUpperCase() || "FICHIER";
            const isImage = file.type.startsWith("image/");
            const key = `${file.name}-${file.size}-${file.lastModified}`;
            return (
              <div
                key={index}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-2.5"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="relative h-10 w-10 overflow-hidden rounded-lg border border-white/10 bg-white/10 flex items-center justify-center text-[10px] font-semibold uppercase text-white/70">
                    {isImage ? (
                      <img
                        src={previewUrls[key]}
                        alt={file.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span>{ext}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-white/90 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-white/60">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="rounded-lg border border-red-300 bg-red-50 px-2 py-1 text-xs font-medium text-red-600 transition hover:bg-red-100"
                >
                  Retirer
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

