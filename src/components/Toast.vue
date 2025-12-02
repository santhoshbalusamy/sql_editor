<template>
  <TransitionGroup name="toast" tag="div" class="toast-container">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      :class="['toast', `toast-${toast.type}`]"
      role="alert"
      aria-live="polite"
    >
      <span class="toast-message">{{ toast.message }}</span>
      <button
        @click="removeToast(toast.id)"
        class="toast-close"
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  </TransitionGroup>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue';

const toasts = ref([]);
const timeouts = new Map(); // Store timeouts for cleanup
let toastIdCounter = 0;

const showToast = (message, type = 'info', duration = 3000) => {
  const id = toastIdCounter++;
  const toast = { id, message, type };
  toasts.value.push(toast);

  if (duration > 0) {
    const timeoutId = setTimeout(() => {
      removeToast(id);
      timeouts.delete(id);
    }, duration);
    timeouts.set(id, timeoutId);
  }

  return id;
};

const removeToast = (id) => {
  // Clear timeout if exists
  const timeoutId = timeouts.get(id);
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeouts.delete(id);
  }

  const index = toasts.value.findIndex(t => t.id === id);
  if (index > -1) {
    toasts.value.splice(index, 1);
  }
};

// Cleanup all timeouts on unmount
onBeforeUnmount(() => {
  timeouts.forEach(timeoutId => clearTimeout(timeoutId));
  timeouts.clear();
});

defineExpose({
  showToast,
  removeToast
});
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 8px;
  pointer-events: none;
}

.toast {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 300px;
  max-width: 500px;
  padding: 12px 16px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  pointer-events: auto;
  animation: slideIn 0.3s ease-out;
}

.toast-info {
  border-left: 4px solid #007bff;
}

.toast-success {
  border-left: 4px solid #28a745;
}

.toast-error {
  border-left: 4px solid #dc3545;
}

.toast-warning {
  border-left: 4px solid #ffc107;
}

.toast-message {
  flex: 1;
  font-size: 14px;
  color: #333;
}

.toast-close {
  background: none;
  border: none;
  font-size: 20px;
  color: #666;
  cursor: pointer;
  padding: 0;
  margin-left: 12px;
  line-height: 1;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}

.toast-close:hover {
  color: #333;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

@media (max-width: 768px) {
  .toast-container {
    left: 20px;
    right: 20px;
    top: 10px;
  }

  .toast {
    min-width: auto;
    max-width: none;
  }
}
</style>
