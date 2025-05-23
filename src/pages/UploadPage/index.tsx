import { useState, useRef } from "react";
import { Button, Card } from "@heroui/react";

export default function UploadPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
    setPreviewUrls(files.map(file => URL.createObjectURL(file)));
  };

  const handleRemove = (idx: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== idx);
    setSelectedFiles(newFiles);
    setPreviewUrls(newFiles.map(file => URL.createObjectURL(file)));
  };

  // Placeholder for future backend upload
  const handleUpload = () => {
    alert("Upload functionality coming soon!");
  };

  return (
    <main className="flex flex-col items-center justify-center px-4 py-8 w-full min-h-screen bg-background text-foreground">
      <Card className="w-full max-w-md p-6 flex flex-col gap-6 shadow-lg border border-foreground/10 bg-background/80">
        <h1 className="text-2xl font-bold mb-2 text-center">Upload Images</h1>
        <p className="text-sm text-muted-foreground text-center mb-4">Select one or more images to upload. Supported: JPG, PNG, GIF, WebP, HEIC, etc.</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
        <Button
          className="w-full py-3 text-base bg-foreground text-background hover:bg-background hover:text-foreground border border-foreground transition-all duration-300 rounded-lg"
          onClick={() => inputRef.current?.click()}
        >
          Choose Images
        </Button>
        {previewUrls.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-4">
            {previewUrls.map((url, idx) => (
              <div key={idx} className="relative group rounded overflow-hidden border border-foreground/10 bg-neutral-100 dark:bg-neutral-900 aspect-square flex items-center justify-center">
                <img
                  src={url}
                  alt={`preview-${idx}`}
                  className="object-cover w-full h-full"
                  loading="lazy"
                  draggable={false}
                  style={{ touchAction: "none" }}
                />
                <button
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-80 hover:opacity-100"
                  onClick={() => handleRemove(idx)}
                  aria-label="Remove image"
                  type="button"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        <Button
          className="w-full py-3 text-base mt-4 bg-accent text-accent-foreground rounded-lg disabled:opacity-60"
          onClick={handleUpload}
          disabled={selectedFiles.length === 0}
        >
          Upload
        </Button>
      </Card>
    </main>
  );
}
