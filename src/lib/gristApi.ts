import { Tenant } from '@/pages/Index';

const GRIST_API_URL = import.meta.env.VITE_GRIST_API_URL || 'https://docs.getgrist.com/api/docs/8VJ8y5ig393qLhax6oUjRN';
const GRIST_API_KEY = import.meta.env.VITE_GRIST_API_KEY || '1ad7e6e5369fbff5d6addbe79a19d3b65455a96e';
const TABLE_NAME = 'Datablist';

export interface GristRecord {
  id: number;
  fields: {
    Tenant: string;
    Description: string;
    Pros: string;
    Cons: string;
    Overview: string;
    QSR_News: string;
    AverageSalePrice: string;
    PriceSF: string;
    Average_NOI: string;
    RBA: string;
    Lot: string;
    LeaseTerm: string;
    Escalations: string;
    LowestCap: string;
    AvgCapRate_2023: string;
    AvgCapRate_2024: string;
    Average_Cap: string;
    Tenant_Future_Outlook_Rating: string;
    Report_Store_Sales_Yes_no_: string;
    Average_Store_Sales: string;
    Typical_Lease_Structure: string;
    Corporate_Or_Franchisee_: string;
    Stock: string;
    SnP: string;
    Moodys: string;
    Founded: number;
    Market_Cap: string;
    Revenue: string;
    Headquarters: string;
    Locations: string;
    KeyPrincipal: string;
    Earnings: string;
    PressRelease: string;
    SEC: string;
    TradingView: string;
    Website: string;
    ExamplePropertyImage: string;
    A: boolean;
    State_Directory: string;
    LocationsURL: string;
    Locations2: string;
    CoStar: number;
    Extra: string;
    Logo_URL: string;
    Logo_Style: string;
    About_Us: string;
    News: string;
    PNG: string;
    G_News: string;
    Category: string;
  };
}

export interface GristResponse {
  records: GristRecord[];
}

const transformGristToTenant = (record: GristRecord): Tenant => {
  const { fields } = record;
  
  // Parse pros and cons from string to array
  const pros = fields.Pros ? fields.Pros.split('\n').filter(Boolean) : [];
  const cons = fields.Cons ? fields.Cons.split('\n').filter(Boolean) : [];
  
  // Parse recent news from string to array of objects
  let recentNews: Array<{ title: string; date: string; source: string; url?: string }> = [];
  if (fields.News) {
    const trimmed = fields.News.trim();
    // Only try to parse as JSON if it looks like a JSON array/object, not just any string starting with [
    if ((trimmed.startsWith('[{') && trimmed.endsWith('}]')) || (trimmed.startsWith('{') && trimmed.endsWith('}'))) {
      try {
        recentNews = JSON.parse(trimmed);
      } catch (error) {
        console.error('Error parsing news as JSON:', error, fields.News);
        recentNews = [{ title: fields.News, date: '', source: '' }];
      }
    } else {
      // Not JSON, treat as plain text or markdown
      recentNews = [{ title: fields.News, date: '', source: '' }];
    }
  }

  return {
    id: record.id.toString(),
    name: fields.Tenant,
    logo: fields.Logo_URL,
    industry: fields.Category,
    category: fields.Category,
    headquarters: fields.Headquarters,
    founded: fields.Founded?.toString() || '',
    employees: fields.Locations2,
    revenue: fields.Revenue,
    locations: parseInt(fields.Locations2) || 0,
    description: fields.Description,
    website: fields.Website,
    Image_URL: fields.ExamplePropertyImage,
    keyStats: {
      marketCap: fields.Market_Cap,
      creditRating: fields.Tenant_Future_Outlook_Rating,
      leaseLength: fields.LeaseTerm,
      avgUnitSize: fields.RBA,
      stock: fields.Stock,
      snp: fields.SnP,
      moodys: fields.Moodys,
      averageSalePrice: fields.AverageSalePrice,
      priceSF: fields.PriceSF,
      averageNOI: fields.Average_NOI,
      rba: fields.RBA,
      lot: fields.Lot,
      escalations: fields.Escalations,
      keyPrincipal: fields.KeyPrincipal,
      lowestCap: fields.LowestCap,
      averageCap: fields.Average_Cap,
    },
    pros,
    cons,
    overview: fields.Overview,
    earnings: fields.Earnings,
    qsrNews: fields.QSR_News,
    tradingView: fields.TradingView,
    recentNews,
    about_Us: fields.About_Us,
    extra: fields.Extra,
    news: fields.News,
    gNews: fields.G_News,
  };
};

export const fetchTenants = async (): Promise<Tenant[]> => {
  try {
    const url = `${GRIST_API_URL}/tables/${TABLE_NAME}/records`;
    console.log('Fetching tenants from:', url);
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${GRIST_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Grist API Error:', {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        error: errorText
      });
      throw new Error(`Grist API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data: GristResponse = await response.json();
    console.log('Received data from Grist:', data);
    
    if (!data.records || !Array.isArray(data.records)) {
      console.error('Invalid data format received:', data);
      throw new Error('Invalid data format received from Grist API');
    }

    return data.records.map(transformGristToTenant);
  } catch (error) {
    console.error('Error fetching tenants:', error);
    throw error;
  }
}; 