import { apiClient } from './apiClient';
import type {NewAsset} from "../utils/components/dashboard/AssetModal.tsx";

export const getAccounts = async () => {
    try {
        const response = await apiClient.get('/api/accounts');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch accounts:', error);
        return [];
    }
};

export const getPortfolioSummary = async (accountId: number) => {
    try {
        const response = await apiClient.get(`/api/dashboard/account/${accountId}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch summary for account ${accountId}:`, error);
        return null;
    }
};

export type Account = {
  id?: number;
  name: string;
  description: string;
  currency: 'USD' | 'EUR' | 'UAH';
};

export const createAccount = async (accountData: Account) => {
    try {
        const response = await apiClient.post('/api/accounts', accountData);
        return { success: true, data: response.data };
    } catch (error) {
        console.error('Failed to create account:', error);
        return { success: false, error };
    }
};

export const getAssets = async () => {
    try {
        const response = await apiClient.get('/api/assets');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch assets:', error);
        return [];
    }
};

export type Asset = {
  id: number;
  name: string;
  ticker: string;
  description: string;
  sector: string;
  currentPrice: number;
};

export const createAsset = async (assetData: NewAsset) => {
    try {
        const response = await apiClient.post('/api/assets', assetData);
        return { success: true, data: response.data }
    } catch (error) {
        console.error("Failed to create asset:", error);
        return { success: false, error };
    }
}

export type Transaction = {
  accountId: number;
  asset: number;
  type: "buy" | "sell"
  quantity: number;
  pricePerUnit: number;
  transactionDate: string;
};

export const createTransaction = async (transactionData: Transaction) => {
    try {
        const response = await apiClient.post('/api/transactions', transactionData);
        return { success: true, data: response.data };
    } catch (error) {
    console.error('Failed to create transaction:', error);
    return { success: false, error };
}
};

export type AssetPosition = {
  assetId: number;
  name: string;
  ticker: string;
  totalQuantity: number;
  averageBuyPrice: number;
  currentMarketPrice: number;
  totalMarketValue: number;
  profitOrLoss: number;
  profitOrLossPercentage: number;
};

export type PortfolioSummaryProps = {
  totalValue: number;
  totalProfitOrLoss: number;
  totalProfitOrLossPercentage: number;
  assetPositions: AssetPosition[];
  assetsBySector: Record<string, number>;
};

type TransactionType = 'BUY' | 'SELL';

export type TransactionFormData = {
  accountId: number;
  assetId: number;
  type: TransactionType;
  quantity: number;
  pricePerUnit: number;
  transactionDate: string;
  commission: number;
};

