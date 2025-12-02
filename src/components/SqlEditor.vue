<template>
  <div class="sql-editor-container">
    <div class="editor-toolbar">
      <div class="toolbar-left">
        <button @click="formatQuery" class="btn btn-secondary" title="Format Query">
          Format
        </button>
        <button @click="copyQuery" class="btn btn-secondary" title="Copy Query">
          Copy
        </button>
        <button @click="clearEditor" class="btn btn-secondary" title="Clear Editor">
          Clear
        </button>
      </div>
      <div class="toolbar-right">
        <button
          @click="$emit('execute')"
          class="btn btn-primary"
          :disabled="isExecuting"
          title="Execute Query (Ctrl+Enter)"
        >
          {{ isExecuting ? 'Executing...' : 'Execute' }}
        </button>
      </div>
    </div>
    <div ref="editorContainer" class="editor-wrapper"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import loader from '@monaco-editor/loader';
import { QueryFormatter } from '../utils/queryFormatter.js';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  isExecuting: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue', 'execute', 'copied', 'copy-error']);

const editorContainer = ref(null);
let editor = null;
let monaco = null;
let stopModelWatcher = null;
let contentChangeListener = null;
const commandDisposables = [];

onMounted(async () => {
  // Load Monaco Editor dynamically
  monaco = await loader.init();

  // Create editor instance
  editor = monaco.editor.create(editorContainer.value, {
    value: props.modelValue,
    language: 'sql',
    theme: 'vs',
    automaticLayout: true,
    fontSize: 14,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    wordWrap: 'on',
    lineNumbers: 'on',
    formatOnPaste: true,
    formatOnType: true,
    suggestOnTriggerCharacters: true,
    quickSuggestions: true,
    tabSize: 2
  });

  // Listen to editor content changes (store for cleanup)
  contentChangeListener = editor.onDidChangeModelContent(() => {
    const value = editor.getValue();
    emit('update:modelValue', value);
  });

  // Add keyboard shortcuts (store disposables for cleanup)
  const executeCommand = editor.addCommand(monaco.KeyMod.Ctrl | monaco.KeyCode.Enter, () => {
    emit('execute');
  });
  if (executeCommand) commandDisposables.push(executeCommand);

  const clearCommand = editor.addCommand(monaco.KeyMod.Ctrl | monaco.KeyCode.KeyK, () => {
    clearEditor();
  });
  if (clearCommand) commandDisposables.push(clearCommand);

  // Set up watcher after editor is created
  stopModelWatcher = watch(() => props.modelValue, (newValue) => {
    if (editor && editor.getValue() !== newValue) {
      editor.setValue(newValue);
    }
  });
});

onBeforeUnmount(() => {
  // Clean up watcher
  if (stopModelWatcher) {
    stopModelWatcher();
  }

  // Clean up Monaco editor listeners
  if (contentChangeListener) {
    contentChangeListener.dispose();
  }

  // Clean up command disposables
  commandDisposables.forEach(disposable => {
    if (disposable && typeof disposable.dispose === 'function') {
      disposable.dispose();
    }
  });

  // Dispose editor
  if (editor) {
    editor.dispose();
    editor = null;
  }
});

const formatQuery = () => {
  if (editor) {
    const currentValue = editor.getValue();
    const formatted = QueryFormatter.format(currentValue);
    editor.setValue(formatted);
    editor.getAction('editor.action.formatDocument').run();
  }
};

const copyQuery = () => {
  if (editor) {
    const value = editor.getValue();
    if (!value.trim()) {
      return;
    }
    navigator.clipboard.writeText(value).then(() => {
      emit('copied');
    }).catch(() => {
      emit('copy-error');
    });
  }
};

const clearEditor = () => {
  if (editor) {
    editor.setValue('');
    editor.focus();
  }
};

defineExpose({
  getValue: () => editor ? editor.getValue() : '',
  setValue: (value) => {
    if (editor) {
      editor.setValue(value);
      editor.focus();
    }
  },
  focus: () => {
    if (editor) {
      editor.focus();
    }
  }
});
</script>

<style scoped>
.sql-editor-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  background: white;
}

.editor-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
}

.toolbar-left,
.toolbar-right {
  display: flex;
  gap: 8px;
}

.btn {
  padding: 6px 12px;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}

.btn:hover:not(:disabled) {
  background: #f0f0f0;
  border-color: #b0b0b0;
}

.btn-primary {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.btn-primary:hover:not(:disabled) {
  background: #0056b3;
  border-color: #0056b3;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.editor-wrapper {
  flex: 1;
  min-height: 200px;
}
</style>
