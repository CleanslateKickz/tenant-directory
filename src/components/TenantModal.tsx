import { X, ExternalLink, MapPin, Globe, Building2, TrendingUp, CreditCard, Clock, Ruler, DollarSign, BarChart3, CheckCircle, AlertTriangle, ChevronDown, ChevronUp, Info, Newspaper, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tenant } from '@/pages/Index';
import { TechnicalAnalysisWidget, NewsWidget, SingleTickerWidget, MiniChartWidget } from './TradingViewWidgets';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useNewsData } from '@/hooks/useNewsData';

interface TenantModalProps {
  tenant: Tenant;
  onClose: () => void;
}

export const TenantModal = ({ tenant, onClose }: TenantModalProps) => {
  const [technicalAnalysisExpanded, setTechnicalAnalysisExpanded] = useState(false);
  
  const getStockSymbol = () => {
    const stock = tenant.keyStats.stock;
    if (!stock) return null;
    return stock.replace(/^[A-Z]+:/, '');
  };

  const stockSymbol = getStockSymbol();
  const isPublicCompany = stockSymbol !== null;

  const handleWebsiteClick = () => {
    if (tenant.website) {
      window.open(tenant.website, '_blank', 'noopener,noreferrer');
    }
  };

  const handleTradingViewClick = () => {
    if (tenant.tradingView) {
      window.open(tenant.tradingView, '_blank', 'noopener,noreferrer');
    }
  };

  const handleQSRNewsClick = () => {
    if (tenant.qsrNews) {
      window.open(tenant.qsrNews, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Overlay */}
        <div
          className="fixed inset-0 transition-opacity bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="inline-block w-full max-w-6xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-xl">
          
          {/* Persistent Header / Company Overview */}
          <div className="relative px-8 py-6 bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-lg transition-all duration-200 z-10"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
              {/* Company Info */}
              <div className="lg:col-span-3 flex items-start space-x-5">
                <div className="relative flex-shrink-0">
                  <img
                    src={tenant.logo}
                    alt={`${tenant.name} logo`}
                    className="w-16 h-16 rounded-xl object-cover ring-4 ring-white shadow-lg"
                  />
                  {tenant.keyStats.snp && (
                    <span className="absolute -top-2 -right-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-green-500 text-white shadow-lg">
                      {tenant.keyStats.snp}
                    </span>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl font-bold text-slate-900 mb-2">{tenant.name}</h1>
                  
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {tenant.category}
                    </span>
                    {tenant.keyStats.stock && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                        {tenant.keyStats.stock}
                      </span>
                    )}
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1.5" />
                      {tenant.headquarters}
                    </div>
                    {tenant.keyStats.moodys && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                        Moody's: {tenant.keyStats.moodys}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-slate-600 leading-relaxed text-sm">{tenant.description}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-2">
                <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50 w-full" onClick={handleWebsiteClick}>
                  <Globe className="w-4 h-4 mr-2" />
                  Visit Website
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
                {tenant.tradingView && (
                  <Button variant="outline" size="sm" className="text-purple-600 border-purple-200 hover:bg-purple-50 w-full" onClick={handleTradingViewClick}>
                    <BarChart3 className="w-4 h-4 mr-2" />
                    TradingView Chart
                  </Button>
                )}
                {tenant.qsrNews && (
                  <Button variant="outline" size="sm" className="text-orange-600 border-orange-200 hover:bg-orange-50 w-full" onClick={handleQSRNewsClick}>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    QSR News
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Tabbed Section */}
          <div className="px-8 py-6">
            <Tabs defaultValue="key-data" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="key-data">Key Data</TabsTrigger>
                <TabsTrigger value="real-estate">Real Estate & Investment</TabsTrigger>
                <TabsTrigger value="news-analysis">News & Analysis</TabsTrigger>
              </TabsList>
              
              {/* Tab 1: Key Data */}
              <TabsContent value="key-data" className="mt-6 space-y-6">
                {/* Key Financial & Operational Metrics */}
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 mb-4">Key Financial & Operational Metrics</h2>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                    <div className="bg-slate-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-slate-900 mb-1">{tenant.founded}</div>
                      <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Founded</div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-slate-900 mb-1">{tenant.locations.toLocaleString()}+</div>
                      <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Total Locations</div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-slate-900 mb-1">$124.5B</div>
                      <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Market Cap</div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">+11.6%</div>
                      <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Revenue Growth</div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-slate-900 mb-1">$4.12B</div>
                      <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Net Income</div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">12.2%</div>
                      <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Profit Margin</div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">14.3%</div>
                      <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Operating Margin</div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-slate-900 mb-1">383,000+</div>
                      <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Total Employees</div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-slate-900 mb-1">$1.35M</div>
                      <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Average Store Sales</div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-red-600 mb-1">No</div>
                      <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Report Store Sales</div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-slate-900 mb-1">Corporate</div>
                      <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Corporate or Franchisee</div>
                    </div>
                  </div>
                </div>

                {/* Stock Snapshot - Only show for public companies */}
                {isPublicCompany && (
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900 mb-4">Stock Snapshot</h2>
                    <Card className="border-slate-200 shadow-sm">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium text-slate-800">Current Price & Performance</h3>
                          </div>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                            <div className="order-2 lg:order-1">
                              <SingleTickerWidget symbol={stockSymbol} />
                            </div>
                            <div className="order-1 lg:order-2">
                              <MiniChartWidget symbol={stockSymbol} />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </TabsContent>

              {/* Tab 2: Real Estate & Investment */}
              <TabsContent value="real-estate" className="mt-6 space-y-6">
                <div className="max-w-5xl mx-auto px-4 py-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    {/* Stat cards grid */}
                    <div className="grid grid-cols-2 gap-4 w-full">
                      <StatCard label="Typical Store Size" value={tenant.keyStats.rba || '—'} />
                      <StatCard label="Lowest Cap Rate" value={tenant.keyStats.lowestCap || '—'} />
                      <StatCard label="Lot Size" value={tenant.keyStats.lot || '0.5 - 1.0 Acres'} />
                      <StatCard label="Average Cap Rate" value={tenant.keyStats.averageCap || '—'} />
                    </div>
                    {/* Image on the right */}
                    <div className="w-full h-full flex justify-center items-center">
                      {tenant.Image_URL ? (
                        <img
                          src={tenant.Image_URL}
                          alt="Example Property Image"
                          className="object-cover rounded-xl shadow-md max-w-full max-h-64"
                        />
                      ) : (
                        <div className="bg-slate-100 rounded-xl w-full h-64 flex items-center justify-center text-slate-400">No Image</div>
                      )}
                    </div>
                  </div>
                  {/* Lease Details and Investment Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {/* Lease Details / Structure */}
                    <div className="bg-white border rounded-xl p-4 shadow-sm flex flex-col gap-3 min-h-[112px]">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 font-medium">Lease Structure</span>
                        <span className="font-semibold text-slate-900">NN or NNN</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 font-medium">Average Lease Term</span>
                        <span className="font-semibold text-slate-900">{tenant.keyStats.leaseLength || '10 Years'}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 font-medium">Typical Rent/SF</span>
                        <span className="font-semibold text-slate-900">{tenant.keyStats.priceSF || '$1,104-$1,840'}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 font-medium">Lease Escalations</span>
                        <span className="font-semibold text-slate-900">10% Every 5 Years</span>
                      </div>
                    </div>
                    {/* Investment Metrics */}
                    <div className="grid grid-cols-1 gap-4">
                      <StatCard label="Average Sale Price" value={tenant.keyStats.averageSalePrice || '—'} />
                      <StatCard label="Average NOI" value={tenant.keyStats.averageNOI || '—'} />
                    </div>
                  </div>
                </div>

                {/* Investment Insights */}
                {((tenant.pros && tenant.pros.length > 0) || (tenant.cons && tenant.cons.length > 0)) && (
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900 mb-4">Investment Insights</h2>
                    
                    {/* Tenant Future Outlook Rating - Prominent Display */}
                    <div className="mb-6">
                      <Card className="border-green-200 bg-green-50 shadow-sm">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-green-800 font-medium text-lg">Tenant Future Outlook Rating</span>
                            <span className="font-bold text-green-900 text-xl bg-green-200 px-4 py-2 rounded-lg">VERY SAFE</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {tenant.pros && tenant.pros.length > 0 && (
                        <Card className="border-slate-200 shadow-sm">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center">
                              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                              Investment Highlights
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {tenant.pros.map((pro, index) => (
                                <li key={index} className="text-sm text-slate-600 flex items-start">
                                  <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                  {pro}
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      )}

                      {tenant.cons && tenant.cons.length > 0 && (
                        <Card className="border-slate-200 shadow-sm">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center">
                              <AlertTriangle className="w-5 h-5 text-orange-600 mr-2" />
                              Risk Considerations
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {tenant.cons.map((con, index) => (
                                <li key={index} className="text-sm text-slate-600 flex items-start">
                                  <AlertTriangle className="w-4 h-4 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                                  {con}
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* Tab 3: News & Analysis */}
              <TabsContent value="news-analysis" className="mt-6 space-y-6">
                {/* Google News Button */}
                {tenant.gNews && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-blue-600 border-blue-200 hover:bg-blue-50 mb-2"
                    onClick={() => window.open(tenant.gNews, '_blank', 'noopener,noreferrer')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Google News
                  </Button>
                )}
                {/* Enhanced Markdown Links Section */}
                {(tenant.extra || tenant.about_Us || tenant.news) && (
                  <div className="flex flex-wrap gap-4 mb-4">
                    {tenant.about_Us && (
                      <div className="flex-1 min-w-[200px] max-w-xs bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-col items-center shadow-sm">
                        <Info className="w-6 h-6 text-blue-500 mb-2" />
                        <h4 className="text-sm font-semibold text-blue-900 mb-1">About Us</h4>
                        <div className="prose prose-sm max-w-none text-center"><ReactMarkdown>{tenant.about_Us}</ReactMarkdown></div>
                      </div>
                    )}
                    {tenant.news && (
                      <div className="flex-1 min-w-[200px] max-w-xs bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex flex-col items-center shadow-sm">
                        <Newspaper className="w-6 h-6 text-yellow-500 mb-2" />
                        <h4 className="text-sm font-semibold text-yellow-900 mb-1">News Links</h4>
                        <div className="prose prose-sm max-w-none text-center"><ReactMarkdown>{tenant.news}</ReactMarkdown></div>
                      </div>
                    )}
                    {tenant.extra && (
                      <div className="flex-1 min-w-[200px] max-w-xs bg-green-50 border border-green-200 rounded-xl p-4 flex flex-col items-center shadow-sm">
                        <LinkIcon className="w-6 h-6 text-green-500 mb-2" />
                        <h4 className="text-sm font-semibold text-green-900 mb-1">Extra Links</h4>
                        <div className="prose prose-sm max-w-none text-center"><ReactMarkdown>{tenant.extra}</ReactMarkdown></div>
                      </div>
                    )}
                  </div>
                )}
                {/* NewsData.io News Feed for Private Companies */}
                {!isPublicCompany && (
                  <NewsDataFeed companyName={tenant.name} />
                )}
                {/* News & Updates */}
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 mb-4">News & Updates</h2>
                  <Card className="border-slate-200 shadow-sm">
                    <CardContent className="p-6">
                      {isPublicCompany ? (
                        <div className="bg-slate-50 rounded-lg p-4">
                          <NewsWidget symbol={stockSymbol} />
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                            <h4 className="text-sm font-medium text-slate-900 mb-2">Latest Company Updates</h4>
                            <p className="text-xs text-slate-500">Recent news about expansion plans and new locations.</p>
                          </div>
                          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                            <h4 className="text-sm font-medium text-slate-900 mb-2">Industry Developments</h4>
                            <p className="text-xs text-slate-500">Market trends and competitive analysis updates.</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Technical Analysis - Collapsible */}
                {isPublicCompany && (
                  <div>
                    <Card className="border-slate-200 shadow-sm">
                      <CardHeader 
                        className="pb-3 cursor-pointer hover:bg-slate-50 transition-colors rounded-t-lg"
                        onClick={() => setTechnicalAnalysisExpanded(!technicalAnalysisExpanded)}
                      >
                        <CardTitle className="text-lg flex items-center justify-between">
                          <span className="flex items-center">
                            <BarChart3 className="w-5 h-5 text-blue-600 mr-2" />
                            Technical Analysis
                          </span>
                          {technicalAnalysisExpanded ? (
                            <ChevronUp className="w-5 h-5 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-slate-400" />
                          )}
                        </CardTitle>
                        <CardDescription>
                          Click to {technicalAnalysisExpanded ? 'collapse' : 'expand'} technical analysis data
                        </CardDescription>
                      </CardHeader>
                      {technicalAnalysisExpanded && (
                        <CardContent>
                          <div className="bg-white rounded-lg p-4 border border-slate-100">
                            <TechnicalAnalysisWidget symbol={stockSymbol} />
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  </div>
                )}

                {/* Placeholder for future news widgets for public companies */}
                {isPublicCompany && (
                  <div className="mt-4">
                    {/* TODO: Add Yahoo Finance, Google News, or other widgets here. */}
                    <div className="text-xs text-slate-400">(More news widgets can be added here. Ask your developer to integrate with Yahoo Finance, Google News, or Bing News APIs.)</div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

function NewsDataFeed({ companyName }: { companyName: string }) {
  const { articles, loading, error } = useNewsData(companyName);
  return (
    <div className="mb-6">
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
        <div className="flex items-center mb-3">
          <Newspaper className="w-5 h-5 text-blue-400 mr-2" />
          <span className="font-semibold text-slate-800">Latest News (powered by NewsData.io)</span>
        </div>
        {loading && <div className="text-slate-500 text-sm">Loading news...</div>}
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {!loading && !error && articles.length === 0 && (
          <div className="text-slate-500 text-sm">No news found for this company.</div>
        )}
        <ul className="divide-y divide-slate-200">
          {articles.map((article, idx) => (
            <li key={idx} className="py-3">
              <a href={article.link} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-700 hover:underline text-base flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-blue-400" />
                {article.title}
              </a>
              {article.description && <div className="text-slate-600 text-sm mt-1 line-clamp-2">{article.description}</div>}
              {article.pubDate && <div className="text-xs text-slate-400 mt-1">{new Date(article.pubDate).toLocaleDateString()}</div>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value?: string }) {
  if (!value) return (
    <div className="bg-white border rounded-xl p-4 shadow-sm text-center min-h-[112px] flex flex-col justify-center">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-xl font-semibold text-gray-300">—</p>
    </div>
  );
  let [main, range] = value.split('\n');
  if (!range) {
    // Try to extract a range like "$1,675,000 - $2,650,000" after the first value
    const match = value.match(/^(.*?)(\$[\d,]+\s*-\s*\$[\d,]+.*)$/);
    if (match) {
      main = match[1].trim();
      range = match[2].trim();
    }
  }
  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm text-center min-h-[112px] flex flex-col justify-center">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-semibold text-gray-800">{main}</p>
      {range && <p className="text-sm text-gray-500">Typical Range: {range}</p>}
    </div>
  );
}
