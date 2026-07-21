// Faruqsuzay@gmail.com | +2349061345507

"use client"

import { useEffect, useState } from "react"

export interface Toast {
  id: string
  title?: string
  description?: string
  variant?: "default" | "success" | "destructive"
}

type ToastAction = { type: "ADD_TOAST"; toast: Toast } | { type: "DISMISS_TOAST"; toastId: string }

let count = 0
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

interface State {
  toasts: Toast[]
}

const memoryState: State = { toasts: [] }
type Listener = (state: State) => void
const listeners: Listener[] = []

function dispatch(action: ToastAction) {
  switch (action.type) {
    case "ADD_TOAST":
      memoryState.toasts = [...memoryState.toasts, action.toast]
      break
    case "DISMISS_TOAST":
      memoryState.toasts = memoryState.toasts.filter((t) => t.id !== action.toastId)
      break
  }
  listeners.forEach((listener) => listener(memoryState))
}

export function toast(t: Omit<Toast, "id">) {
  const id = genId()
  dispatch({ type: "ADD_TOAST", toast: { ...t, id } })
  setTimeout(() => {
    dispatch({ type: "DISMISS_TOAST", toastId: id })
  }, 4000)
  return id
}

export function useToast() {
  const [state, setState] = useState<State>(memoryState)

  useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) listeners.splice(index, 1)
    }
  }, [])

  return {
    ...state,
    toast,
    dismiss: (toastId: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}
