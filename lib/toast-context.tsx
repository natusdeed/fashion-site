"use client";

import { createContext, useContext, useState, useCallback } from "react";
import ToastContainer, { Toast } from "@/components/Toast";

interface ToastContextType {
  showToast: (message: string, type?: "success" | "error" | "info", duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    (message: string, type: "success" | "error" | "info" = "info", duration = 3000) => {
      const id = Math.random().toString(36).substring(7);
      setToasts((prev) => [...prev, { id, message, type, duration }]);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
