// © 2026 Abubakri Faaruq Adebowale (IbnAbubakri). All rights reserved.
// Faruqsuzay@gmail.com | +2349061345507

"use client"

import { Toast, ToastProvider, ToastViewport, ToastTitle, ToastDescription, ToastClose } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map((t) => (
        <Toast key={t.id} className={t.variant === "destructive" ? "border-destructive/30" : t.variant === "success" ? "border-success/30" : ""}>
          <div className="flex flex-col gap-1">
            {t.title && <ToastTitle>{t.title}</ToastTitle>}
            {t.description && <ToastDescription>{t.description}</ToastDescription>}
          </div>
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}
