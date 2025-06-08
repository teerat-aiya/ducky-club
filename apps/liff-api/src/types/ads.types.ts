export type DialyRevenueSpend = {
  spend: number;
  date_start: string;
  date_stop: string;
  action_values: { action_type: string; value: number }[];
};

export type AdInsight = {
  spend: number;
  impressions: number;
  clicks: number;
  cpc: number;
  cpm: number;
  cpp: number;
  ctr: number;
  reach: number;
  conversions: number;
  conversion_values: number;
  purchase_roas: { action_type: string; value: number }[];
  actions: { action_type: string; value: number }[];
  action_values: { action_type: string; value: number }[];
};
