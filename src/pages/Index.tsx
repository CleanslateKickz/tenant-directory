import { useState } from 'react';
import { TenantCard } from '@/components/TenantCard';
import { TenantModal } from '@/components/TenantModal';
import { Search, Grid, List, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGristTenants } from '@/hooks/useGristTenants';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';

export interface Tenant {
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
  Image_URL?: string;
  keyStats: {
    marketCap?: string;
    creditRating?: string;
    leaseLength?: string;
    avgUnitSize?: string;
    stock?: string;
    snp?: string;
    moodys?: string;
    averageSalePrice?: string;
    priceSF?: string;
    averageNOI?: string;
    rba?: string;
    lot?: string;
    escalations?: string;
    keyPrincipal?: string;
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
  about_Us?: string;
  extra?: string;
  news?: string;
  gNews?: string;
}

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: '🏋️ Gyms 🏋️', label: 'Gyms 🏋️' },
  { value: '🚗 Auto 🚗', label: 'Auto 🚗' },
  { value: '📦 Big Box 📦', label: 'Big Box 📦' },
  { value: '🛒 Supermarket 🛒', label: 'Supermarket 🛒' },
  { value: '🍟 Fast Food 🍟', label: 'Fast Food 🍟' },
  { value: '🏥 Medical 🏥', label: 'Medical 🏥' },
  { value: '☕ Coffee ☕', label: 'Coffee ☕' },
  { value: '🏫 School 🏫', label: 'School 🏫' },
  { value: '🍽️ Restaurant 🍽️', label: 'Restaurant 🍽️' },
  { value: '🫧 Car Wash 🫧', label: 'Car Wash 🫧' },
  { value: '💊 Pharmacy 💊', label: 'Pharmacy 💊' },
  { value: '🏦 Bank 🏦', label: 'Bank 🏦' },
  { value: '🐶 Vet 🐶', label: 'Vet 🐶' },
  { value: '🐟 Swim School 🐟', label: 'Swim School 🐟' },
];

const Index = () => {
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [publicOnly, setPublicOnly] = useState(false);

  const { data: tenants, isLoading, error } = useGristTenants();

  const filteredTenants = tenants?.filter(tenant => {
    if (!tenant || !tenant.name || !tenant.industry) return false;
    const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tenant.category === selectedCategory;
    const isPublic = tenant.keyStats.stock && tenant.keyStats.stock.toLowerCase() !== 'private';
    const matchesOwnership = !publicOnly || isPublic;
    return matchesSearch && matchesCategory && matchesOwnership;
  }) || [];

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Tenants</h2>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          {/* Header Section Skeleton */}
          <div className="flex flex-col gap-4">
            <Skeleton className="h-10 w-64" />
            <div className="flex flex-col sm:flex-row gap-4">
              <Skeleton className="h-10 flex-1" />
              <div className="flex gap-2">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
              </div>
            </div>
          </div>

          {/* Category Filter Skeleton */}
          <div className="flex gap-2">
            <Skeleton className="h-10 w-16" />
            <Skeleton className="h-10 w-16" />
            <Skeleton className="h-10 w-16" />
          </div>

          {/* Tenant Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-[300px]" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        {/* Header Section */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Tenant Profiles</h1>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search tenants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="w-full sm:w-64 flex gap-2 items-center">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by Category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORY_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant={publicOnly ? 'default' : 'outline'}
                onClick={() => setPublicOnly((v) => !v)}
                className="whitespace-nowrap"
              >
                {publicOnly ? 'Show All' : 'Public Only'}
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4 mr-2" />
                Grid
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4 mr-2" />
                List
              </Button>
            </div>
          </div>
        </div>

        {/* Tenant Grid/List */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col gap-4'}>
          {filteredTenants?.map((tenant) => (
            <TenantCard
              key={tenant.id}
              tenant={tenant}
              viewMode={viewMode}
              onClick={() => setSelectedTenant(tenant)}
              showOwnershipHighlight={true}
            />
          ))}
        </div>
      </div>

      {/* Tenant Modal */}
      {selectedTenant && (
        <TenantModal
          tenant={selectedTenant}
          onClose={() => setSelectedTenant(null)}
        />
      )}
    </div>
  );
};

export default Index;
