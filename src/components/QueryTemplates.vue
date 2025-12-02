<template>
  <div class="query-templates-container">
    <div class="templates-header">
      <h3>Query Templates</h3>
    </div>

    <div class="templates-categories">
      <div
        v-for="category in categories"
        :key="category"
        class="category-section"
      >
        <h4 class="category-title">{{ category }}</h4>
        <div class="templates-list">
          <div
            v-for="template in getTemplatesByCategory(category)"
            :key="template.id"
            class="template-item"
            @click="loadTemplate(template.query)"
            @keyup.enter="loadTemplate(template.query)"
            :title="template.description"
            tabindex="0"
            role="button"
            :aria-label="`Load template: ${template.name}`"
          >
            <div class="template-name">{{ template.name }}</div>
            <div class="template-description">{{ template.description }}</div>
            <div class="template-preview">
              <code>{{ truncateQuery(template.query) }}</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { predefinedQueries } from '../data/mockData.js';

const emit = defineEmits(['load-query']);

const categories = computed(() => {
  const cats = [...new Set(predefinedQueries.map(q => q.category))];
  return cats;
});

// Memoize templates by category for better performance
const templatesByCategory = computed(() => {
  const map = new Map();
  categories.value.forEach(category => {
    map.set(category, predefinedQueries.filter(q => q.category === category));
  });
  return map;
});

const getTemplatesByCategory = (category) => {
  return templatesByCategory.value.get(category) || [];
};

const truncateQuery = (query) => {
  const maxLength = 100;
  if (query.length <= maxLength) return query;
  return query.substring(0, maxLength) + '...';
};

const loadTemplate = (query) => {
  emit('load-query', query);
};
</script>

<style scoped>
.query-templates-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.templates-header {
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
  background: #f8f9fa;
}

.templates-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.templates-categories {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
}

.category-section {
  margin-bottom: 24px;
}

.category-title {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #495057;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.templates-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.template-item {
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  background: white;
}

.template-item:hover {
  background: #f8f9fa;
  border-color: #007bff;
  box-shadow: 0 2px 4px rgba(0, 123, 255, 0.1);
}

.template-name {
  font-weight: 600;
  font-size: 13px;
  color: #333;
  margin-bottom: 4px;
}

.template-description {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}

.template-preview {
  margin-top: 8px;
}

.template-preview code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 11px;
  color: #495057;
  background: #f5f5f5;
  padding: 6px 8px;
  border-radius: 3px;
  display: block;
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.4;
}
</style>
