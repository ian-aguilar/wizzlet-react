export interface IMarketplace {
  id: number;
  name: string;
  coming_soon: boolean;
  isConnected?: boolean;
  profilesDisplayNames?: string[]
  logo: string;
}
