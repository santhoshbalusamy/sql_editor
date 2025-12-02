<template>
  <div class="query-favorites-container">
    <div class="favorites-header">
      <h3>Favorites</h3>
      <div class="save-section">
        <p class="save-hint">Save the current query as a favorite:</p>
        <div class="header-actions">
          <input
            v-model="favoriteName"
            type="text"
            placeholder="Enter favorite name..."
            class="name-input"
            @keyup.enter="saveFavorite"
            :disabled="!currentQuery.trim()"
            aria-label="Favorite name"
            aria-describedby="favorite-help"
          />
          <button
            @click="saveFavorite"
            class="btn btn-primary"
            :disabled="!currentQuery.trim() || !favoriteName.trim()"
            title="Save current query as favorite"
          >
            Save
          </button>
        </div>
        <p v-if="!currentQuery.trim()" class="help-text" id="favorite-help">
          Write a query in the editor above to save it as a favorite
        </p>
      </div>
    </div>

    <div v-if="favorites.length === 0" class="empty-state">
      <p>No favorites yet.<br/>Write a query and save it above to get started.</p>
    </div>

    <div v-else class="favorites-list">
      <div
        v-for="favorite in favorites"
        :key="favorite.id"
        class="favorite-item"
      >
        <div
          class="favorite-content"
          @click="loadFavorite(favorite.query)"
          @keyup.enter="loadFavorite(favorite.query)"
          tabindex="0"
          role="button"
          :aria-label="`Load favorite: ${favorite.name}`"
        >
          <div class="favorite-name">{{ favorite.name }}</div>
          <div class="favorite-preview">
            <code>{{ truncateQuery(favorite.query) }}</code>
          </div>
        </div>
        <div class="favorite-actions">
          <button
            @click.stop="editFavoriteName(favorite)"
            class="btn-icon"
            title="Edit name"
          >
            ✏️
          </button>
          <button
            @click.stop="deleteFavorite(favorite.id)"
            class="btn-icon"
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="editingFavorite" class="modal-overlay" @click="cancelEdit">
      <div class="modal-content" @click.stop>
        <h4>Edit Favorite Name</h4>
        <input
          v-model="editingName"
          type="text"
          class="name-input"
          @keyup.enter="saveEdit"
          ref="editInput"
        />
        <div class="modal-actions">
          <button @click="saveEdit" class="btn btn-primary">Save</button>
          <button @click="cancelEdit" class="btn btn-secondary">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue';
import { StorageService } from '../services/storageService.js';

const props = defineProps({
  favorites: {
    type: Array,
    default: () => []
  },
  currentQuery: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['load-query', 'favorites-updated']);

const favoriteName = ref('');
const editingFavorite = ref(null);
const editingName = ref('');
const editInput = ref(null);

const truncateQuery = (query) => {
  const maxLength = 80;
  if (query.length <= maxLength) return query;
  return query.substring(0, maxLength) + '...';
};

const saveFavorite = () => {
  if (!props.currentQuery.trim() || !favoriteName.value.trim()) {
    return;
  }

  StorageService.saveFavorite(props.currentQuery, favoriteName.value.trim());
  favoriteName.value = '';
  emit('favorites-updated');
};

const loadFavorite = (query) => {
  emit('load-query', query);
};

const editFavoriteName = async (favorite) => {
  editingFavorite.value = favorite;
  editingName.value = favorite.name;
  await nextTick();
  if (editInput.value) {
    editInput.value.focus();
    editInput.value.select();
  }
};

const saveEdit = () => {
  if (editingFavorite.value && editingName.value.trim()) {
    StorageService.updateFavoriteName(editingFavorite.value.id, editingName.value.trim());
    editingFavorite.value = null;
    editingName.value = '';
    emit('favorites-updated');
  }
};

const cancelEdit = () => {
  editingFavorite.value = null;
  editingName.value = '';
};

const deleteFavorite = (id) => {
  if (confirm('Are you sure you want to delete this favorite?')) {
    StorageService.deleteFavorite(id);
    emit('favorites-updated');
  }
};
</script>

<style scoped>
.query-favorites-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.favorites-header {
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
  background: #f8f9fa;
}

.favorites-header h3 {
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.save-section {
  margin-top: 8px;
}

.save-hint {
  margin: 0 0 8px 0;
  font-size: 12px;
  color: #666;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.help-text {
  margin: 8px 0 0 0;
  font-size: 11px;
  color: #999;
  font-style: italic;
}

.name-input {
  flex: 1;
  padding: 6px 10px;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  font-size: 13px;
}

.name-input:focus {
  outline: none;
  border-color: #007bff;
}

.name-input:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
  opacity: 0.6;
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

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #666;
  font-size: 14px;
  text-align: center;
}

.favorites-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

.favorite-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 12px;
  margin-bottom: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  transition: all 0.2s;
  background: white;
}

.favorite-item:hover {
  background: #f8f9fa;
  border-color: #007bff;
}

.favorite-content {
  flex: 1;
  cursor: pointer;
}

.favorite-name {
  font-weight: 600;
  font-size: 13px;
  color: #333;
  margin-bottom: 6px;
}

.favorite-preview {
  margin-top: 4px;
}

.favorite-preview code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 11px;
  color: #495057;
  background: #f5f5f5;
  padding: 4px 6px;
  border-radius: 3px;
  display: block;
  white-space: pre-wrap;
  word-break: break-word;
}

.favorite-actions {
  display: flex;
  gap: 4px;
  margin-left: 8px;
}

.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 4px;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.btn-icon:hover {
  opacity: 1;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 24px;
  border-radius: 8px;
  min-width: 300px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.modal-content h4 {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
}

.modal-content .name-input {
  width: 100%;
  margin-bottom: 16px;
}

.modal-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.btn-secondary {
  background: white;
}

.btn-secondary:hover {
  background: #f0f0f0;
}
</style>
