# Tenant Vista Display - Commercial Real Estate Tenant Intelligence Platform

## Project Overview

Tenant Vista Display is a sophisticated web application designed for commercial real estate professionals to analyze and evaluate potential tenants. The platform provides comprehensive tenant profiles with financial metrics, real estate investment data, stock analysis, and market intelligence in an intuitive, professional interface.

## Architecture & Technology Stack

### Frontend Framework
- **React 18.3.1** with TypeScript for type-safe component development
- **Vite** as the build tool and development server
- **React Router DOM 6.26.2** for client-side routing

### UI/UX Libraries
- **shadcn/ui** component library for consistent, accessible UI components
- **Tailwind CSS** for utility-first styling and responsive design
- **Radix UI** primitives for headless, accessible component foundations
- **Lucide React** for consistent iconography
- **class-variance-authority** for component variant management

### State Management & Data Fetching
- **TanStack React Query 5.56.2** for server state management and caching
- React's built-in useState/useEffect for local component state

### External Integrations
- **TradingView Widgets** for real-time stock data and technical analysis
- Embedded iframe widgets for financial charts and news feeds

## Project Structure

```
src/
├── components/
│   ├── ui/                    # shadcn/ui base components
│   ├── TenantCard.tsx         # Tenant grid/list item component
│   ├── TenantModal.tsx        # Detailed tenant profile modal (446 lines)
│   └── TradingViewWidgets.tsx # TradingView integration components
├── pages/
│   ├── Index.tsx              # Main application page (360 lines)
│   └── NotFound.tsx           # 404 error page
├── hooks/
│   └── use-toast.ts           # Toast notification hook
├── lib/
│   └── utils.ts               # Utility functions (cn, etc.)
└── main.tsx                   # Application entry point
```

## Core Components Deep Dive

### 1. Index.tsx (Main Application)
**Purpose**: Primary application interface with tenant grid/list view and filtering capabilities

**Key Features**:
- Tenant search and filtering by category
- Grid/list view toggle
- Responsive layout with sticky header
- Modal state management for tenant details

**Data Structure**: Contains hardcoded sample tenant data (Wendy's, Taco Bell, Starbucks) with comprehensive tenant profiles including:
- Basic company information
- Financial metrics and stock data
- Real estate investment statistics
- News and market analysis
- Investment pros/cons analysis

**State Management**:
```typescript
const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
const [searchTerm, setSearchTerm] = useState('');
const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
const [selectedCategory, setSelectedCategory] = useState('all');
```

### 2. TenantModal.tsx (Detailed Tenant Profile)
**Purpose**: Comprehensive tenant analysis interface with tabbed navigation

**Architecture**:
- **Persistent Header**: Company logo, basic info, action buttons
- **Tab 1 - Key Data**: Financial metrics grid + stock snapshot
- **Tab 2 - Real Estate & Investment**: Property data, investment metrics, risk analysis
- **Tab 3 - News & Analysis**: Market news and technical analysis

**Key Subsections**:
- **Key Financial & Operational Metrics**: 3x4 grid with 11 data points
- **Stock Snapshot**: Real-time price data and charts (for public companies)
- **Real Estate Profile**: Store specifications and lease terms
- **Key Investment Metrics**: Cap rates, NOI, sale prices
- **Investment Insights**: Risk/benefit analysis with visual indicators
- **Technical Analysis**: Collapsible TradingView integration

### 3. TradingViewWidgets.tsx
**Purpose**: Encapsulates TradingView widget integrations

**Components**:
- `TechnicalAnalysisWidget`: Stock technical analysis charts
- `NewsWidget`: Real-time financial news feed
- `SingleTickerWidget`: Current stock price display
- `MiniChartWidget`: Compact price chart

**Integration Pattern**:
```typescript
useEffect(() => {
  // Dynamic script injection for TradingView widgets
  const script = document.createElement('script');
  script.src = 'https://s3.tradingview.com/external-embedding/...';
  script.innerHTML = JSON.stringify(widgetConfig);
}, [symbol]);
```

## Data Model

### Tenant Interface
```typescript
interface Tenant {
  id: string;
  name: string;
  logo: string;
  industry: string;
  category: string;
  headquarters: string;
  founded: string;
  employees: string;
  revenue: string;
  locations: number;
  description: string;
  website: string;
  keyStats: {
    // Financial data
    marketCap?: string;
    creditRating?: string;
    stock?: string;
    snp?: string;
    moodys?: string;
    
    // Real estate metrics
    averageSalePrice?: string;
    priceSF?: string;
    averageNOI?: string;
    rba?: string;
    lot?: string;
    leaseLength?: string;
    escalations?: string;
    lowestCap?: string;
    averageCap?: string;
  };
  recentNews: Array<{
    title: string;
    date: string;
    source: string;
    url?: string;
  }>;
  pros?: string[];
  cons?: string[];
  overview?: string;
  earnings?: string;
  qsrNews?: string;
  tradingView?: string;
}
```

## Key Features & User Workflows

### 1. Tenant Discovery
- Grid/list view toggle for different browsing preferences
- Real-time search across tenant names and industries
- Category filtering for focused analysis
- Responsive design for various screen sizes

### 2. Tenant Analysis
- Comprehensive financial metrics in organized grid layout
- Real-time stock data integration for public companies
- Investment risk/benefit analysis with visual indicators
- Real estate investment calculations and metrics

### 3. Market Intelligence
- Integration with external news sources
- TradingView technical analysis tools
- Historical performance data
- Industry-specific insights (QSR focus)

## External Dependencies & Services

### Core Dependencies
```json
{
  "@tanstack/react-query": "^5.56.2",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.26.2",
  "lucide-react": "^0.462.0"
}
```

### UI/Styling Dependencies
```json
{
  "@radix-ui/react-*": "Various versions",
  "tailwindcss-animate": "^1.0.7",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.5.2"
}
```

### Development Dependencies
- Vite for build tooling
- TypeScript for type safety
- ESLint for code quality

## Current Limitations & Technical Debt

### Data Layer
- **Static Data**: Currently uses hardcoded tenant data in Index.tsx
- **No Persistence**: No database integration or data persistence
- **Limited Dataset**: Only 3 sample tenants

### Architecture Concerns
- **Large Components**: TenantModal.tsx (446 lines) and Index.tsx (360 lines) need refactoring
- **Tight Coupling**: Business logic mixed with presentation components
- **No Error Boundaries**: Missing error handling for external API failures

### Missing Production Features
- **Authentication**: No user management or access control
- **API Integration**: No backend service integration
- **Data Validation**: Limited input validation and error handling
- **Performance Optimization**: No code splitting or lazy loading

## Integration Roadmap for AI Development

### Phase 1: Data Integration
**Priority**: Integrate Grist API for dynamic tenant data
- Replace hardcoded data with Grist API calls
- Implement data transformation layer for Grist → Tenant interface mapping
- Add loading states and error handling for API calls
- Implement data caching strategy with React Query

### Phase 2: Component Refactoring
**Priority**: Break down large components into smaller, focused modules
- Extract TenantModal tabs into separate components
- Create dedicated hooks for tenant data management
- Implement proper error boundaries
- Add unit tests for critical components

### Phase 3: Production Readiness
**Priority**: Add authentication and deployment infrastructure
- Implement user authentication (consider Supabase integration)
- Add environment configuration management
- Implement proper logging and monitoring
- Add data validation schemas (consider Zod)

### Phase 4: Performance & UX Enhancements
**Priority**: Optimize for production use
- Implement virtual scrolling for large tenant lists
- Add advanced filtering and sorting capabilities
- Implement real-time data updates
- Add export functionality for tenant reports

## Development Workflow

### Local Development
```bash
npm install
npm run dev  # Starts Vite dev server on port 8080
```

### Build Process
```bash
npm run build    # Production build
npm run preview  # Preview production build
```

### Key Configuration Files
- `vite.config.ts`: Build configuration with path aliases
- `tailwind.config.ts`: Styling configuration
- `tsconfig.json`: TypeScript configuration
- `components.json`: shadcn/ui configuration

## API Integration Considerations

### Grist Integration Strategy
When integrating with Grist API, consider:

1. **Data Mapping**: Create transformation functions to map Grist records to Tenant interface
2. **Caching**: Use React Query for intelligent data caching and background updates
3. **Error Handling**: Implement fallback UI states for API failures
4. **Real-time Updates**: Consider WebSocket or polling strategies for live data updates
5. **Performance**: Implement pagination and filtering at the API level

### Recommended Grist Integration Pattern
```typescript
// hooks/useGristTenants.ts
const useGristTenants = () => {
  return useQuery({
    queryKey: ['tenants'],
    queryFn: async () => {
      const response = await fetch('/api/grist/tenants');
      const gristData = await response.json();
      return transformGristToTenants(gristData);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
```

## Grist Integration

The application integrates with Grist for tenant data management. The integration uses the Grist REST API to fetch and display tenant information.

### Configuration

Create a `.env` file in the root directory with the following variables:

```env
VITE_GRIST_API_URL=http://localhost:8484/o/docs/api/docs/gmN3C6cAZwcESVQ18g6WG4
VITE_GRIST_API_KEY=your_api_key_here
```

### Data Structure

The Grist integration expects the following fields in your Grist document:

- Basic Information:
  - name (string)
  - logo (string - URL)
  - industry (string)
  - category (string)
  - headquarters (string)
  - founded (string)
  - employees (string)
  - revenue (string)
  - locations (number)
  - description (string)
  - website (string)

- Financial Metrics:
  - marketCap (string)
  - creditRating (string)
  - stock (string)
  - snp (string)
  - moodys (string)

- Real Estate Metrics:
  - averageSalePrice (string)
  - priceSF (string)
  - averageNOI (string)
  - rba (string)
  - lot (string)
  - leaseLength (string)
  - escalations (string)
  - keyPrincipal (string)
  - lowestCap (string)
  - averageCap (string)

- Additional Information:
  - pros (string - newline-separated list)
  - cons (string - newline-separated list)
  - overview (string)
  - earnings (string)
  - qsrNews (string - URL)
  - tradingView (string - URL)
  - recentNews (string - JSON array of news items)

### Development

1. Start the Grist server locally:
```bash
grist start
```

2. Create a new document in Grist and copy the document ID and API key.

3. Update the `.env` file with your Grist document ID and API key.

4. Start the development server:
```bash
npm run dev
```

The application will now fetch tenant data from your Grist document instead of using hardcoded sample data.

This README provides the technical foundation for an AI agent to understand the current architecture and continue development with proper context of the existing codebase, patterns, and integration opportunities.
