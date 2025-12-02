<template>
  <div class="app-container">
    <header class="app-header">
      <h1>SQL Query Application</h1>
      <p class="subtitle">Execute SQL queries and view results</p>
    </header>

    <div class="main-layout">
      <!-- Sidebar -->
      <aside class="sidebar" :class="{ collapsed: sidebarCollapsed }" role="complementary" aria-label="Query management sidebar">
        <div class="sidebar-header">
          <button
            @click="sidebarCollapsed = !sidebarCollapsed"
            class="collapse-btn"
            :aria-label="sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
            :aria-expanded="!sidebarCollapsed"
          >
            {{ sidebarCollapsed ? '→' : '←' }}
          </button>
        </div>

        <div v-if="!sidebarCollapsed" class="sidebar-content">
          <div class="sidebar-tabs">
            <button
              @click="activeTab = 'templates'"
              :class="{ active: activeTab === 'templates' }"
              class="tab-btn"
              :aria-selected="activeTab === 'templates'"
              role="tab"
              aria-controls="templates-panel"
            >
              Templates
            </button>
            <button
              @click="activeTab = 'history'"
              :class="{ active: activeTab === 'history' }"
              class="tab-btn"
              :aria-selected="activeTab === 'history'"
              role="tab"
              aria-controls="history-panel"
            >
              History
            </button>
            <button
              @click="activeTab = 'favorites'"
              :class="{ active: activeTab === 'favorites' }"
              class="tab-btn"
              :aria-selected="activeTab === 'favorites'"
              role="tab"
              aria-controls="favorites-panel"
            >
              Favorites
            </button>
          </div>

          <div class="sidebar-panel" role="tabpanel">
            <QueryTemplates
              v-if="activeTab === 'templates'"
              id="templates-panel"
              @load-query="loadQuery"
            />
            <QueryHistory
              v-if="activeTab === 'history'"
              id="history-panel"
              :history="queryHistory"
              @load-query="loadQuery"
              @history-cleared="loadHistory"
            />
            <QueryFavorites
              v-if="activeTab === 'favorites'"
              id="favorites-panel"
              :favorites="favorites"
              :current-query="currentQuery"
              @load-query="loadQuery"
              @favorites-updated="loadFavorites"
            />
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="main-content" role="main">
        <div class="editor-section">
          <SqlEditor
            v-model="currentQuery"
            :is-executing="isExecuting"
            @execute="executeQuery"
            @copied="() => toastRef?.showToast('Query copied to clipboard', 'success')"
            @copy-error="() => toastRef?.showToast('Failed to copy query', 'error')"
            ref="sqlEditorRef"
          />
        </div>

        <div class="results-section">
          <QueryResults
            :data="queryResults"
            :is-loading="isExecuting"
            :row-count="resultRowCount"
            :execution-time="executionTime"
          />
        </div>
      </main>
    </div>

    <!-- Toast Notifications -->
    <Toast ref="toastRef" />
  </div>
</template>

<script setup>
import { ref, onMounted, defineAsyncComponent } from 'vue';
import SqlEditor from './components/SqlEditor.vue';
import QueryResults from './components/QueryResults.vue';
import Toast from './components/Toast.vue';
import { QueryService } from './services/queryService.js';
import { StorageService } from './services/storageService.js';

// Lazy load sidebar components for better performance
const QueryHistory = defineAsyncComponent(() => import('./components/QueryHistory.vue'));
const QueryTemplates = defineAsyncComponent(() => import('./components/QueryTemplates.vue'));
const QueryFavorites = defineAsyncComponent(() => import('./components/QueryFavorites.vue'));

const currentQuery = ref('');
const queryResults = ref([]);
const isExecuting = ref(false);
const resultRowCount = ref(null);
const executionTime = ref(null);
const queryHistory = ref([]);
const favorites = ref([]);
const sidebarCollapsed = ref(false);
const activeTab = ref('templates');
const sqlEditorRef = ref(null);
const toastRef = ref(null);

const loadHistory = () => {
  queryHistory.value = StorageService.getQueryHistory();
};

const loadFavorites = () => {
  favorites.value = StorageService.getFavorites();
};

const loadQuery = (query) => {
  currentQuery.value = query;
  if (sqlEditorRef.value) {
    sqlEditorRef.value.setValue(query);
    sqlEditorRef.value.focus();
  }
};

const executeQuery = async () => {
  if (!currentQuery.value.trim()) {
    toastRef.value?.showToast('Please enter a SQL query', 'warning');
    return;
  }

  isExecuting.value = true;
  queryResults.value = [];
  resultRowCount.value = null;
  executionTime.value = null;

  try {
    const result = await QueryService.executeQuery(currentQuery.value);
    queryResults.value = result.result;
    resultRowCount.value = result.rowCount;
    executionTime.value = result.executionTime;

    // Save to history
    StorageService.saveToHistory(currentQuery.value, result);
    loadHistory();

    toastRef.value?.showToast(
      `Query executed successfully. ${result.rowCount} row${result.rowCount !== 1 ? 's' : ''} returned.`,
      'success'
    );
  } catch (error) {
    console.error('Query execution error:', error);
    toastRef.value?.showToast(
      `Error executing query: ${error.message}`,
      'error',
      5000
    );
  } finally {
    isExecuting.value = false;
  }
};

onMounted(() => {
  loadHistory();
  loadFavorites();
});
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.app-header {
  padding: 20px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.app-header h1 {
  margin: 0 0 4px 0;
  font-size: 24px;
  font-weight: 600;
}

.subtitle {
  margin: 0;
  font-size: 14px;
  opacity: 0.9;
}

.main-layout {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.sidebar {
  width: 320px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e0e0e0;
  background: #f8f9fa;
  transition: width 0.3s;
  overflow: hidden;
}

.sidebar.collapsed {
  width: 50px;
}

.sidebar-header {
  padding: 8px;
  border-bottom: 1px solid #e0e0e0;
  background: white;
}

.collapse-btn {
  width: 100%;
  padding: 8px;
  border: none;
  background: #f0f0f0;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.2s;
}

.collapse-btn:hover {
  background: #e0e0e0;
}

.sidebar-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.sidebar-tabs {
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  background: white;
}

.tab-btn {
  flex: 1;
  padding: 10px;
  border: none;
  background: white;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  color: #666;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}

.tab-btn:hover {
  background: #f8f9fa;
}

.tab-btn.active {
  color: #007bff;
  border-bottom-color: #007bff;
}

.sidebar-panel {
  flex: 1;
  overflow: hidden;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #f5f5f5;
}

.editor-section {
  flex: 0 0 40%;
  min-height: 0;
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.results-section {
  flex: 0 0 60%;
  min-height: 0;
  padding: 0 16px 16px 16px;
  display: flex;
  flex-direction: column;
}

@media (max-width: 768px) {
  .sidebar {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  }

  .sidebar.collapsed {
    width: 0;
    overflow: hidden;
  }

  .editor-section {
    flex: 0 0 50%;
  }

  .results-section {
    flex: 0 0 50%;
  }
}
</style>
