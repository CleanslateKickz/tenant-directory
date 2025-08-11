import { useQuery } from '@tanstack/react-query';
import { fetchTenants } from '@/lib/gristApi';
import { Tenant } from '@/pages/Index';

// Sample data as fallback
const sampleTenants: Tenant[] = [
  {
    id: '1',
    name: "Wendy's",
    logo: 'https://netleaseadvisor.com/wp-content/uploads/2016/09/t25logo.png',
    industry: 'Food & Beverage',
    category: 'Quick Serve Restaurant',
    headquarters: 'Dublin, Ohio',
    founded: '1969',
    employees: '6,711 locations',
    revenue: '$1.96B',
    locations: 6711,
    description: "As a famous name in fast food, Wendy's/Arby's Group, Inc. is an industry-leading QSR (quick serve restaurant) and developer of all new Wendy's and Arby's locations throughout the United States.",
    website: 'https://www.wendys.com',
    keyStats: {
      stock: 'WEN',
      snp: 'B+',
      moodys: 'B3',
      averageSalePrice: '$2,122,610',
      priceSF: '$590-$965',
      averageNOI: '$120,430',
      rba: '2,200-3,600',
      lot: '0.5 - 1.0 Acres',
      leaseLength: '20 Years',
      escalations: '10% Every 5 Years',
      keyPrincipal: 'Todd A. Penegor',
      lowestCap: '3.95%',
      averageCap: '4.85% - 5.72%'
    },
    pros: [
      'NNN leases with healthy rent increases',
      'Branding and marketing boosts revenues',
      'Availability of higher capitalization'
    ],
    cons: [
      'Lack of sales figures in some cases',
      'Performance reviews required on franchises',
      'Credit non-investor graded'
    ],
    overview: "With an ever-delightful assortment of fast food burgers, fries, chicken sandwiches, salads, and wraps ready made for customers.",
    earnings: "Wendy's reported total revenues of $570.7 million for Q2 2024, marking a 1.6% increase from $561.6 million in the same quarter last year.",
    qsrNews: 'https://www.qsrmagazine.com/chains/wendys/',
    tradingView: 'https://www.tradingview.com/symbols/WEN/',
    recentNews: [
      { 
        title: "Wendy's Launches New 2 For $6 Deal", 
        date: '2023-02-06', 
        source: 'chewboom',
        url: 'https://www.chewboom.com/2023/02/06/wendys-launches-new-2-for-6-deal/'
      }
    ]
  }
];

export const useGristTenants = () => {
  return useQuery<Tenant[], Error>({
    queryKey: ['tenants'],
    queryFn: async () => {
      try {
        return await fetchTenants();
      } catch (error) {
        console.warn('Falling back to sample data due to API error:', error);
        return sampleTenants;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}; 