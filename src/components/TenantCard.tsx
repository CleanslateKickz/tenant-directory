import { Building2, MapPin, TrendingUp } from 'lucide-react';
import { Tenant } from '@/pages/Index';

interface TenantCardProps {
  tenant: Tenant;
  onClick: () => void;
  viewMode: 'grid' | 'list';
  showOwnershipHighlight?: boolean;
}

export const TenantCard = ({ tenant, onClick, viewMode, showOwnershipHighlight }: TenantCardProps) => {
  // Determine if public (has a stock symbol and not 'Private')
  const isPublic = tenant.keyStats.stock && tenant.keyStats.stock.toLowerCase() !== 'private';

  if (viewMode === 'list') {
    return (
      <div
        onClick={onClick}
        className="bg-white rounded-2xl border border-slate-200 p-8 hover:shadow-lg hover:border-blue-300 transition-all duration-300 cursor-pointer group"
      >
        <div className="flex items-center space-x-8">
          <div className="flex-shrink-0">
            <img
              src={tenant.logo}
              alt={`${tenant.name} logo`}
              className="w-20 h-20 rounded-2xl object-cover group-hover:scale-105 transition-all duration-300"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {tenant.name}
                </h3>
                <p className="text-slate-500 mt-2 font-medium">{tenant.industry}</p>
                <div className="flex items-center space-x-4 mt-4">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                    {tenant.category}
                  </span>
                  {tenant.keyStats.snp && (
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-green-50 text-green-700 border border-green-200">
                      {tenant.keyStats.snp}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right space-y-3">
                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="flex items-center justify-end space-x-2">
                    <Building2 className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-500">Locations</p>
                      <p className="text-xl font-bold text-slate-900">{tenant.locations.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                {tenant.keyStats.stock && (
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="flex items-center justify-end space-x-2">
                      <TrendingUp className="w-5 h-5 text-slate-400" />
                      <div>
                        <p className="text-sm text-slate-500">Stock</p>
                        <p className="text-xl font-bold text-slate-900">{tenant.keyStats.stock}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-6 mt-6 text-slate-600">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="font-medium">{tenant.headquarters}</span>
              </div>
              <div className="text-slate-400">•</div>
              <span className="font-medium">Founded {tenant.founded}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex items-center min-h-[88px] ${showOwnershipHighlight && isPublic ? 'ring-2 ring-green-400' : ''}`}
    >
      {/* Logo on the left */}
      <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 mr-4">
        <img
          src={tenant.logo}
          alt={`${tenant.name} logo`}
          className="w-16 h-16 rounded-xl object-contain group-hover:scale-105 transition-all duration-300"
        />
      </div>
      {/* Name, Category, and Stats on the right */}
      <div className="flex-1 flex flex-col justify-center min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
            {tenant.name}
          </h3>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            {tenant.category}
          </span>
          {tenant.keyStats.snp && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
              {tenant.keyStats.snp}
            </span>
          )}
          {showOwnershipHighlight && (
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ml-2 ${isPublic ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>{isPublic ? 'Public' : 'Private'}</span>
          )}
        </div>
        <div className="flex items-center gap-6 mt-2">
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Building2 className="w-4 h-4 text-slate-400" />
            <span>Locations</span>
            <span className="font-bold text-slate-900 ml-1">{tenant.locations.toLocaleString()}</span>
          </div>
          {tenant.keyStats.stock && (
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <TrendingUp className="w-4 h-4 text-slate-400" />
              <span>Stock</span>
              <span className="font-bold text-slate-900 ml-1">{tenant.keyStats.stock}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
