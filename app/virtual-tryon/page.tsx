"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { useToast } from "@/lib/toast-context";
import LoadingSpinner from "@/components/LoadingSpinner";

const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_SIZE_MB = 10;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface UploadZoneProps {
  label: string;
  preview: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
  disabled?: boolean;
}

function UploadZone({ label, preview, file, onFileChange, disabled }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = useCallback((f: File): string | null => {
    if (!ACCEPTED_TYPES.includes(f.type)) {
      return `Please use JPG, PNG, or WebP. Got: ${f.type}`;
    }
    if (f.size > MAX_SIZE_BYTES) {
      return `File too large. Max ${MAX_SIZE_MB}MB.`;
    }
    return null;
  }, []);

  const handleFile = useCallback(
    (f: File | null) => {
      setError(null);
      if (!f) {
        onFileChange(null);
        return;
      }
      const err = validateFile(f);
      if (err) {
        setError(err);
        return;
      }
      onFileChange(f);
    },
    [onFileChange, validateFile]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const f = e.dataTransfer.files[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      handleFile(f ?? null);
      e.target.value = "";
    },
    [handleFile]
  );

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-warm-800 tracking-wide uppercase">{label}</p>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative min-h-[200px] rounded-lg border-2 border-dashed transition-all duration-200
          flex flex-col items-center justify-center overflow-hidden
          ${isDragging ? "border-gold-500 bg-gold-50/50" : "border-warm-300 bg-warm-50/50"}
          ${disabled ? "opacity-60 pointer-events-none" : "cursor-pointer hover:border-gold-400"}
        `}
      >
        <input
          type="file"
          accept={ACCEPTED_TYPES.join(",")}
          onChange={handleInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          disabled={disabled}
          aria-label={label}
        />
        {preview ? (
          <div className="relative w-full h-full min-h-[200px]">
            <Image
              src={preview}
              alt="Preview"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleFile(null);
              }}
              className="absolute top-2 right-2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              aria-label="Remove image"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {file && (
              <div className="absolute bottom-2 left-2 right-2 text-xs text-white/90 bg-black/50 rounded px-2 py-1 truncate">
                {file.name} ({formatFileSize(file.size)})
              </div>
            )}
          </div>
        ) : (
          <div className="p-6 text-center pointer-events-none">
            <svg className="w-12 h-12 mx-auto text-warm-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-warm-600 font-light text-sm">Drag & drop or click to browse</p>
            <p className="text-warm-400 text-xs mt-1">JPG, PNG, WebP · Max {MAX_SIZE_MB}MB</p>
          </div>
        )}
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

export default function VirtualTryOnPage() {
  const { showToast } = useToast();
  const [modelImage, setModelImage] = useState<File | null>(null);
  const [productImage, setProductImage] = useState<File | null>(null);
  const [modelPreview, setModelPreview] = useState<string>("");
  const [productPreview, setProductPreview] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string>("");

  const setModelWithPreview = useCallback((file: File | null) => {
    setModelImage(file);
    if (modelPreview) URL.revokeObjectURL(modelPreview);
    setModelPreview(file ? URL.createObjectURL(file) : "");
  }, [modelPreview]);

  const setProductWithPreview = useCallback((file: File | null) => {
    setProductImage(file);
    if (productPreview) URL.revokeObjectURL(productPreview);
    setProductPreview(file ? URL.createObjectURL(file) : "");
  }, [productPreview]);

  const canGenerate = modelImage && productImage && !isProcessing;

  const handleGenerate = async () => {
    if (!modelImage || !productImage) {
      showToast("Please upload both images first.", "error");
      return;
    }
    setIsProcessing(true);
    setResultImage("");
    try {
      const toBase64 = (f: File) =>
        new Promise<string>((resolve, reject) => {
          const r = new FileReader();
          r.onload = () => resolve(r.result as string);
          r.onerror = reject;
          r.readAsDataURL(f);
        });

      const [modelB64, productB64] = await Promise.all([
        toBase64(modelImage),
        toBase64(productImage),
      ]);

      const res = await fetch("/api/virtual-tryon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modelImage: modelB64, productImage: productB64 }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Generation failed");
      }

      if (data.success && data.image) {
        setResultImage(data.image);
        showToast("Virtual try-on generated successfully!", "success");
      } else {
        throw new Error(data.error || "No image returned");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      showToast(msg, "error");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setResultImage("");
    setModelWithPreview(null);
    setProductWithPreview(null);
  };

  const handleDownload = () => {
    if (!resultImage) return;
    const a = document.createElement("a");
    a.href = resultImage;
    a.download = `lola-drip-tryon-${Date.now()}.png`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-warm-50">
      {/* Header */}
      <div className="bg-white border-b border-warm-200 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold text-warm-900 mb-4 tracking-tight">
            Virtual Try-On
          </h1>
          <p className="text-warm-600 text-lg font-light tracking-wide max-w-2xl mx-auto">
            Upload an AI influencer image and a product image. Our AI will show you how the product looks on the model.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Upload zones */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <UploadZone
            label="Model / Influencer"
            preview={modelPreview}
            file={modelImage}
            onFileChange={setModelWithPreview}
            disabled={isProcessing}
          />
          <UploadZone
            label="Product / Clothing"
            preview={productPreview}
            file={productImage}
            onFileChange={setProductWithPreview}
            disabled={isProcessing}
          />
        </section>

        {/* Generate button */}
        <div className="flex justify-center mb-12">
          <button
            onClick={handleGenerate}
            disabled={!canGenerate}
            className={`
              px-10 py-4 rounded-sm font-medium tracking-widest uppercase transition-all duration-200
              min-h-[44px] min-w-[44px]
              ${canGenerate
                ? "bg-gold-500 text-white hover:bg-gold-600 active:scale-95 shadow-lg hover:shadow-xl"
                : "bg-warm-200 text-warm-400 cursor-not-allowed"
              }
            `}
          >
            {isProcessing ? (
              <span className="flex items-center gap-3">
                <LoadingSpinner size="sm" className="[&>div]:!border-warm-200 [&>div]:!border-t-white" />
                Generating...
              </span>
            ) : (
              "Generate"
            )}
          </button>
        </div>

        {/* Result section */}
        {resultImage && (
          <section className="space-y-4 animate-fade-in-up">
            <h2 className="text-xl font-serif font-semibold text-warm-900">Result</h2>
            <div className="relative aspect-[3/4] max-w-md mx-auto rounded-lg overflow-hidden border border-warm-200 bg-white shadow-lg">
              <Image
                src={resultImage}
                alt="Virtual try-on result"
                fill
                sizes="(max-width: 768px) 100vw, 448px"
                className="object-contain"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={handleDownload}
                className="px-6 py-3 rounded-sm border border-gold-500 text-gold-600 hover:bg-gold-50 font-medium transition-colors"
              >
                Download
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-3 rounded-sm border border-warm-300 text-warm-700 hover:bg-warm-100 font-medium transition-colors"
              >
                Try Another
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
