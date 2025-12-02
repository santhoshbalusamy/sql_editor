<template>
  <div class="query-history-container">
    <div class="history-header">
      <h3>Query History</h3>
      <div class="header-actions">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Search history..."
          class="search-input"
          aria-label="Search query history"
        />
        <button
          @click="clearHistory"
          class="btn btn-danger"
          title="Clear History"
          aria-label="Clear all query history"
        >
          Clear
        </button>
      </div>
    </div>

    <div v-if="filteredHistory.length === 0" class="empty-state" role="status" aria-live="polite">
      <p>{{ searchTerm ? 'No queries match your search' : 'No query history yet' }}</p>
    </div>

    <div v-else class="history-list" role="list">
      <div
        v-for="item in filteredHistory"
        :key="item.timestamp"
        class="history-item"
        role="listitem"
        @click="loadQuery(item.query)"
        tabindex="0"
        @keyup.enter="loadQuery(item.query)"
        :aria-label="`Load query: ${truncateQuery(item.query)}`"
      >
        <div class="history-query">
          <code>{{ truncateQuery(item.query) }}</code>
        </div>
        <div class="history-meta">
          <span class="meta-item">{{ formatTime(item.timestamp) }}</span>
          <span class="meta-item">{{ item.rowCount }} rows</span>
          <span class="meta-item">{{ item.executionTime }}ms</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { StorageService } from '../services/storageService.js';

const props = defineProps({
  history: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['load-query', 'history-cleared']);

const searchTerm = ref('');

// Memoize lowercase search term for better performance
const searchTermLower = computed(() => searchTerm.value.toLowerCase());

const filteredHistory = computed(() => {
  if (!searchTerm.value) return props.history;

  const term = searchTermLower.value;
  return props.history.filter(item =>
    item.query.toLowerCase().includes(term)
  );
});

const truncateQuery = (query) => {
  const maxLength = 80;
  if (query.length <= maxLength) return query;
  return query.substring(0, maxLength) + '...';
};

const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString();
};

const loadQuery = (query) => {
  emit('load-query', query);
};

const clearHistory = () => {
  if (confirm('Are you sure you want to clear all query history?')) {
    StorageService.clearHistory();
    emit('history-cleared');
  }
};
</script>

<style scoped>
.query-history-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.history-header {
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
  background: #f8f9fa;
}

.history-header h3 {
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.search-input {
  flex: 1;
  padding: 6px 10px;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  font-size: 13px;
}

.search-input:focus {
  outline: none;
  border-color: #007bff;
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

.btn-danger {
  background: #dc3545;
  color: white;
  border-color: #dc3545;
}

.btn-danger:hover {
  background: #c82333;
  border-color: #bd2130;
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #666;
  font-size: 14px;
}

.history-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

.history-item {
  padding: 12px;
  margin-bottom: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  background: white;
}

.history-item:hover {
  background: #f8f9fa;
  border-color: #007bff;
  box-shadow: 0 2px 4px rgba(0, 123, 255, 0.1);
}

.history-query {
  margin-bottom: 8px;
}

.history-query code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 12px;
  color: #333;
  background: #f5f5f5;
  padding: 4px 6px;
  border-radius: 3px;
  display: block;
  white-space: pre-wrap;
  word-break: break-word;
}

.history-meta {
  display: flex;
  gap: 12px;
  font-size: 11px;
  color: #666;
}

.meta-item {
  display: inline-block;
}
</style>
