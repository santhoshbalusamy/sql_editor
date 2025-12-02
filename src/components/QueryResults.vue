<template>
  <div class="query-results-container">
    <div class="results-header">
      <div class="results-info">
        <span v-if="rowCount !== null" class="info-item">
          {{ rowCount }} row{{ rowCount !== 1 ? 's' : '' }}
        </span>
        <span v-if="executionTime !== null" class="info-item">
          Executed in {{ executionTime }}ms
        </span>
      </div>
      <div class="results-actions">
        <input
          v-if="props.data.length > 0"
          v-model="searchInput"
          type="text"
          placeholder="Search results..."
          class="search-input"
          aria-label="Search results"
        />
        <button
          v-if="props.data.length > 0"
          @click="exportCSV"
          class="btn btn-secondary"
          :disabled="filteredData.length === 0"
          title="Export as CSV"
        >
          Export CSV
        </button>
        <button
          v-if="props.data.length > 0"
          @click="exportJSON"
          class="btn btn-secondary"
          :disabled="filteredData.length === 0"
          title="Export as JSON"
        >
          Export JSON
        </button>
      </div>
    </div>

    <div v-if="isLoading" class="loading-state">
      <div class="spinner"></div>
      <p>Executing query...</p>
    </div>

    <div v-else-if="props.data.length === 0" class="empty-state">
      <p>No results to display</p>
    </div>

    <div v-else class="results-content">
      <div class="table-wrapper">
        <table class="results-table">
          <thead>
            <tr>
              <th
                v-for="column in columns"
                :key="column"
                @click="sortBy(column)"
                :class="{ 'sortable': true, 'sorted-asc': sortColumn === column && sortDirection === 'asc', 'sorted-desc': sortColumn === column && sortDirection === 'desc' }"
              >
                {{ column }}
                <span v-if="sortColumn === column" class="sort-indicator">
                  {{ sortDirection === 'asc' ? '↑' : '↓' }}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredData.length === 0" class="no-results-row">
              <td :colspan="columns.length" class="no-results-message">
                {{ searchTerm ? 'No results match your search' : 'No results to display' }}
              </td>
            </tr>
            <tr v-else v-for="(row, index) in paginatedData" :key="index">
              <td v-for="column in columns" :key="column">
                {{ formatCellValue(row[column]) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="totalPages > 1 && filteredData.length > 0" class="pagination">
        <button
          @click="currentPage = 1"
          :disabled="currentPage === 1"
          class="btn btn-secondary"
        >
          First
        </button>
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="btn btn-secondary"
        >
          Previous
        </button>
        <span class="page-info">
          Page {{ currentPage }} of {{ totalPages }}
        </span>
        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="btn btn-secondary"
        >
          Next
        </button>
        <button
          @click="currentPage = totalPages"
          :disabled="currentPage === totalPages"
          class="btn btn-secondary"
        >
          Last
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue';
import { ExportService } from '../services/exportService.js';
import { debounce } from '../utils/debounce.js';

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  rowCount: {
    type: Number,
    default: null
  },
  executionTime: {
    type: Number,
    default: null
  }
});

const searchTerm = ref('');
const sortColumn = ref(null);
const sortDirection = ref('asc');
const currentPage = ref(1);
const pageSize = 50;
const searchInput = ref('');

// Debounced search for better performance with cleanup capability
const debouncedSearchFn = () => {
  searchTerm.value = searchInput.value;
};
const debouncedSearch = debounce(debouncedSearchFn, 500);

// Store watcher stop functions for cleanup
const stopSearchWatcher = watch(searchInput, debouncedSearch);

const columns = computed(() => {
  if (props.data.length === 0) return [];
  return Object.keys(props.data[0]);
});

// Memoize search term lowercase conversion
const searchTermLower = computed(() => searchTerm.value.toLowerCase());

const filteredData = computed(() => {
  // Early return if no data
  if (props.data.length === 0) return [];

  let result = props.data;

  // Apply search filter first (more efficient than sorting first)
  if (searchTerm.value) {
    const term = searchTermLower.value;
    result = result.filter(row => {
      // Use for...of for better performance than Object.values().some()
      for (const value of Object.values(row)) {
        if (String(value).toLowerCase().includes(term)) {
          return true;
        }
      }
      return false;
    });
  }

  // Apply sorting only if needed and if we have results
  if (sortColumn.value && result.length > 0) {
    // Create a new array only when sorting (avoid mutation)
    result = [...result].sort((a, b) => {
      const aVal = a[sortColumn.value];
      const bVal = b[sortColumn.value];

      // Handle null/undefined
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      // Compare values
      let comparison = 0;
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        comparison = aVal - bVal;
      } else {
        comparison = String(aVal).localeCompare(String(bVal));
      }

      return sortDirection.value === 'asc' ? comparison : -comparison;
    });
  }

  return result;
});

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / pageSize);
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return filteredData.value.slice(start, end);
});

// Watch for data changes and reset state
const stopDataWatcher = watch(() => props.data, () => {
  currentPage.value = 1;
  sortColumn.value = null;
  sortDirection.value = 'asc';
  searchInput.value = '';
  searchTerm.value = '';
}, { immediate: false });

// Cleanup watchers on component unmount
onBeforeUnmount(() => {
  stopSearchWatcher();
  stopDataWatcher();
  // Cancel any pending debounced calls
  if (debouncedSearch.cancel) {
    debouncedSearch.cancel();
  }
});

const sortBy = (column) => {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortColumn.value = column;
    sortDirection.value = 'asc';
  }
  currentPage.value = 1;
};

const formatCellValue = (value) => {
  if (value === null || value === undefined) return 'NULL';
  if (typeof value === 'number') return value.toLocaleString();
  return String(value);
};

const exportCSV = () => {
  ExportService.exportToCSV(filteredData.value, `query-results-${Date.now()}.csv`);
};

const exportJSON = () => {
  ExportService.exportToJSON(filteredData.value, `query-results-${Date.now()}.json`);
};
</script>

<style scoped>
.query-results-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  background: white;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
  flex-wrap: wrap;
  gap: 12px;
}

.results-info {
  display: flex;
  gap: 16px;
}

.info-item {
  font-size: 13px;
  color: #666;
}

.results-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.search-input {
  padding: 6px 10px;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  font-size: 13px;
  width: 200px;
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

.btn:hover:not(:disabled) {
  background: #f0f0f0;
  border-color: #b0b0b0;
}

.btn-secondary {
  background: white;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #666;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.results-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.table-wrapper {
  flex: 1;
  overflow: auto;
}

.results-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.results-table thead {
  position: sticky;
  top: 0;
  background: #f8f9fa;
  z-index: 10;
}

.results-table th {
  padding: 10px 12px;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid #dee2e6;
  color: #495057;
  white-space: nowrap;
}

.results-table th.sortable {
  cursor: pointer;
  user-select: none;
}

.results-table th.sortable:hover {
  background: #e9ecef;
}

.results-table th.sorted-asc,
.results-table th.sorted-desc {
  background: #e7f3ff;
}

.sort-indicator {
  margin-left: 4px;
  font-size: 12px;
}

.results-table td {
  padding: 8px 12px;
  border-bottom: 1px solid #e9ecef;
}

.results-table tbody tr:hover {
  background: #f8f9fa;
}

.no-results-row {
  background: transparent !important;
}

.no-results-message {
  text-align: center;
  padding: 40px 20px !important;
  color: #666;
  font-style: italic;
  background: #f8f9fa;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border-top: 1px solid #e0e0e0;
  background: #f8f9fa;
}

.page-info {
  padding: 0 12px;
  font-size: 13px;
  color: #666;
}

@media (max-width: 768px) {
  .results-header {
    flex-direction: column;
    align-items: stretch;
  }

  .results-actions {
    flex-direction: column;
  }

  .search-input {
    width: 100%;
  }
}
</style>
