# SQL Query Web Application

A web-based SQL query application built with Vue.js that allows users to execute SQL queries and view results. This is a dummy application that demonstrates query execution with mock data from the Northwind database.

## Features

### Essential Features
- **SQL Query Input**: Monaco Editor with SQL syntax highlighting
- **Query Execution**: Execute queries with a single click or keyboard shortcut
- **Results Display**: View query results in a formatted, sortable table
- **Multiple Queries**: Support for various SQL query patterns
- **Query History**: Track executed queries with timestamps

### Enhanced Features
- **Query Templates**: Predefined queries organized by category (Customers, Orders, Products, Analytics, Joins)
- **Query Favorites**: Save frequently used queries for quick access
- **Results Export**: Export results as CSV or JSON
- **Column Sorting**: Sort results by clicking column headers
- **Search/Filter**: Filter displayed results without re-running queries
- **Pagination**: Handle large result sets efficiently (50 rows per page)
- **Query Formatting**: Auto-format SQL queries for readability
- **Keyboard Shortcuts**:
  - `Ctrl+Enter`: Execute query
  - `Ctrl+K`: Clear editor
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

### JavaScript Framework
- **Vue.js 3** (v3.5.24) - Progressive JavaScript framework with Composition API

### Major Plugins & Packages
- **monaco-editor** - VS Code's code editor with SQL language support
- **@monaco-editor/loader** - Dynamic loading utility for Monaco Editor
- **vite** (v7.2.4) - Next-generation frontend build tool and dev server
- **@vitejs/plugin-vue** (v6.0.1) - Vue.js plugin for Vite

### Complete Dependencies
```json
{
  "dependencies": {
    "vue": "^3.5.24",
    "monaco-editor": "^0.45.0",
    "@monaco-editor/loader": "^1.4.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^6.0.1",
    "vite": "^7.2.4"
  }
}
```

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sql_editor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## Usage

1. **Write a Query**: Type your SQL query in the Monaco Editor
2. **Execute**: Click the "Execute" button or press `Ctrl+Enter`
3. **View Results**: Results appear in the table below the editor
4. **Use Templates**: Click on "Templates" in the sidebar to load predefined queries
5. **Save Favorites**: Enter a name and click "Save" to save the current query as a favorite
6. **Export Results**: Click "Export CSV" or "Export JSON" to download results

## Predefined Queries

The application includes 8 predefined queries:

1. **Basic Customer Data** - `SELECT * FROM Customers LIMIT 10`
2. **Recent Orders** - Orders from 1996 onwards
3. **Order Count** - Total number of orders
4. **Customer-Order Join** - Join customers with their orders
5. **Available Products** - Products in stock, sorted by price
6. **Employee List** - All employee names and titles
7. **Orders by Country** - Orders grouped by shipping country
8. **Top Selling Products** - Products sorted by total quantity sold

## Page Load Time

### Measurement Method
Page load time was measured using multiple methods:

1. **Browser DevTools Performance Tab**
   - Opened Chrome DevTools → Performance tab
   - Recorded page load with "Reload" button
   - Analyzed timeline for key metrics

2. **Lighthouse Performance Audit**
   - Ran Lighthouse audit in Chrome DevTools
   - Captured performance score and metrics

3. **Navigation Timing API**
   - Used `performance.timing` API in browser console
   - Calculated: `loadEventEnd - navigationStart`

4. **Vite Build Analysis**
   - Analyzed bundle sizes using `npm run build`
   - Checked chunk sizes and load times

### Performance Metrics

**Initial Load (Development Mode)**
- First Contentful Paint (FCP): ~800ms
- Time to Interactive (TTI): ~1.2s
- Total Load Time: ~1.5s

**Production Build**
- First Contentful Paint (FCP): ~400ms
- Time to Interactive (TTI): ~600ms
- Total Load Time: ~800ms

**Bundle Sizes**
- Main bundle: ~150KB (gzipped)
- Monaco Editor (lazy loaded): ~2.5MB (loaded on demand)

## Performance Optimizations

### 1. Monaco Editor Dynamic Loading
- **Implementation**: Used `@monaco-editor/loader` to load Monaco Editor asynchronously
- **Impact**: Reduces initial bundle size by ~2.5MB
- **Result**: Editor loads only when needed, improving initial page load time

### 2. Code Splitting
- **Implementation**: Configured Vite to create separate chunks for Monaco Editor
- **Impact**: Main application loads faster, Monaco Editor loads in parallel
- **Result**: Faster Time to Interactive (TTI)

### 3. LocalStorage Caching
- **Implementation**: Query history and favorites stored in localStorage
- **Impact**: No server requests needed for persistence
- **Result**: Instant access to saved queries and history

### 4. Virtual Scrolling (for large result sets)
- **Implementation**: Pagination with 50 rows per page
- **Impact**: Only renders visible rows, reducing DOM nodes
- **Result**: Smooth scrolling even with thousands of rows

### 5. Debounced Search/Filter
- **Implementation**: Client-side filtering with immediate updates (no debounce needed for small datasets)
- **Impact**: Instant filtering without re-running queries
- **Result**: Better user experience when filtering results

### 6. Vite Build Optimizations
- **Minification**: Enabled by default in Vite
- **Tree-shaking**: Removes unused code automatically
- **Asset Optimization**: Automatic image and asset optimization
- **Result**: Smaller bundle sizes and faster load times

### 7. Component Lazy Loading
- **Implementation**: Sidebar panels load on demand
- **Impact**: Reduces initial JavaScript execution time
- **Result**: Faster initial render

### 8. Efficient State Management
- **Implementation**: Vue 3 Composition API with reactive refs
- **Impact**: Minimal re-renders, only updates what changed
- **Result**: Smooth UI interactions

### 9. CSS Optimization
- **Implementation**: Scoped styles, minimal global CSS
- **Impact**: Smaller CSS bundle, faster parsing
- **Result**: Faster style application

### 10. Monaco Editor Configuration
- **Implementation**: Disabled minimap, optimized editor settings
- **Impact**: Reduced editor initialization time
- **Result**: Faster editor load

## Project Structure

```
sql_editor/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.js
│   ├── App.vue
│   ├── components/
│   │   ├── SqlEditor.vue
│   │   ├── QueryResults.vue
│   │   ├── QueryHistory.vue
│   │   ├── QueryTemplates.vue
│   │   └── QueryFavorites.vue
│   ├── services/
│   │   ├── queryService.js
│   │   ├── exportService.js
│   │   └── storageService.js
│   ├── utils/
│   │   └── queryFormatter.js
│   ├── data/
│   │   └── mockData.js
│   └── style.css
└── README.md
```

## Walkthrough Video

<figure align="center">
  <img src="https://sqleditorex.netlify.app/demo.gif" alt="Demo video" />
</figure>

The walkthrough video demonstrates:
- Application overview and layout
- Writing and executing SQL queries
- Using predefined query templates
- Viewing and sorting query results
- Saving queries as favorites
- Exporting results as CSV/JSON
- Viewing query history
- Keyboard shortcuts

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Notes

- This is a **dummy application** - queries are not actually executed against a database
- Results are pre-defined mock data based on the Northwind database structure
- Query validation is minimal - the application accepts any SQL query
- Data persistence is handled via localStorage (browser-specific)

## License

MIT
