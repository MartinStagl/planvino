export interface Vineyard {
  id: string;
  name: string;
  size: number;
  grapeVarieties: string[];
  location: {
    lat: number;
    lon: number;
    address: string;
  };
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  farmName: string;
  region: string;
  vineyards: Vineyard[];
  salesChannels: string[];
  friends: string[];
  enabledModules: {
    vineyard: boolean;
    cellar: boolean;
    marketing: boolean;
  };
  notificationPreferences: {
    email: boolean;
    whatsapp: boolean;
    push: boolean;
  };
  privacySettings: {
    taskVisibility: 'public' | 'friends' | 'private';
    inventoryVisibility: 'public' | 'friends' | 'private';
  };
} 