'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { InvestigationCase, Network, WatchlistWallet } from '@/types/investigation';
import { BlockchainIntelligenceService, WalletAnalysisResult } from '@/services/blockchainIntelligenceService';
import { MOCK_CASES } from '@/data/mockCases';

export interface BookmarkItem {
  id: string;
  type: 'wallet' | 'path' | 'vasp' | 'evidence';
  title: string;
  subtitle: string;
  targetId: string;
  timestamp: string;
}

interface WhatIfFilters {
  maxHops: number;
  minValueUsd: number;
  startDate: string;
  endDate: string;
}

interface InvestigationContextType {
  currentCase: InvestigationCase;
  allCases: InvestigationCase[];
  selectedNetwork: Network;
  setSelectedNetwork: (net: Network) => void;
  analysisResult: WalletAnalysisResult | null;
  isAnalyzing: boolean;
  analysisStepIndex: number;
  analysisStepMessage: string;
  whatIfFilters: WhatIfFilters;
  setWhatIfFilters: React.Dispatch<React.SetStateAction<WhatIfFilters>>;
  bookmarks: BookmarkItem[];
  toggleBookmark: (item: Omit<BookmarkItem, 'id' | 'timestamp'>) => void;
  isBookmarked: (targetId: string) => boolean;
  watchlist: WatchlistWallet[];
  addToWatchlist: (wallet: Omit<WatchlistWallet, 'id' | 'addedAt'>) => void;
  removeFromWatchlist: (id: string) => void;
  loadCase: (caseId: string) => Promise<void>;
  runAnalysis: (walletAddress: string, network?: Network) => Promise<void>;
}

const InvestigationContext = createContext<InvestigationContextType | undefined>(undefined);

export function InvestigationProvider({ children }: { children: React.ReactNode }) {
  const [allCases, setAllCases] = useState<InvestigationCase[]>(MOCK_CASES);
  const [currentCase, setCurrentCase] = useState<InvestigationCase>(MOCK_CASES[0]);
  const [selectedNetwork, setSelectedNetwork] = useState<Network>('Ethereum');
  const [analysisResult, setAnalysisResult] = useState<WalletAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStepIndex, setAnalysisStepIndex] = useState(0);
  const [analysisStepMessage, setAnalysisStepMessage] = useState('');

  const [whatIfFilters, setWhatIfFilters] = useState<WhatIfFilters>({
    maxHops: 3,
    minValueUsd: 0,
    startDate: '',
    endDate: ''
  });

  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([
    {
      id: 'bm-1',
      type: 'vasp',
      title: 'Binance Global Hot Wallet 6',
      subtitle: 'Attribution Confidence: 89% (2 Hops)',
      targetId: 'conn-001-binance',
      timestamp: '2026-09-26 14:10'
    },
    {
      id: 'bm-2',
      type: 'wallet',
      title: '0x7a25...488d (Extortion Suspect)',
      subtitle: 'Balance: 54.21 ETH | High Velocity Outflow',
      targetId: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d',
      timestamp: '2026-09-26 15:30'
    }
  ]);

  const [watchlist, setWatchlist] = useState<WatchlistWallet[]>([]);

  useEffect(() => {
    async function init() {
      const res = await BlockchainIntelligenceService.analyzeWallet(MOCK_CASES[0].targetWallet, MOCK_CASES[0].network);
      setAnalysisResult(res);
      const wl = await BlockchainIntelligenceService.getWatchlist();
      setWatchlist(wl);
    }
    init();
  }, []);

  const loadCase = async (caseId: string) => {
    const found = allCases.find((c) => c.id === caseId) || allCases[0];
    setCurrentCase(found);
    setSelectedNetwork(found.network);
    setIsAnalyzing(true);
    setAnalysisStepIndex(0);
    setAnalysisStepMessage('Loading dossier from secure storage...');

    setTimeout(async () => {
      const res = await BlockchainIntelligenceService.analyzeWallet(found.targetWallet, found.network);
      setAnalysisResult(res);
      setIsAnalyzing(false);
    }, 400);
  };

  const runAnalysis = async (walletAddress: string, network?: Network) => {
    const net = network || selectedNetwork;
    setIsAnalyzing(true);
    setAnalysisStepIndex(1);
    setAnalysisStepMessage('Step 1/5: Querying multi-chain indexers and mempool records...');

    setTimeout(() => {
      setAnalysisStepIndex(2);
      setAnalysisStepMessage('Step 2/5: Extracting transaction topology and resolving UTXO/account graphs...');
    }, 400);

    setTimeout(() => {
      setAnalysisStepIndex(3);
      setAnalysisStepMessage('Step 3/5: Identifying intermediary peeling chains and mixer proxies...');
    }, 800);

    setTimeout(() => {
      setAnalysisStepIndex(4);
      setAnalysisStepMessage('Step 4/5: Cross-referencing Global VASP Identity Registry & FATF clusters...');
    }, 1200);

    setTimeout(async () => {
      setAnalysisStepIndex(5);
      setAnalysisStepMessage('Step 5/5: Synthesizing analytical confidence and chain-of-custody evidence...');
      const res = await BlockchainIntelligenceService.analyzeWallet(walletAddress, net);
      setAnalysisResult(res);
      setCurrentCase(res.caseData);
      setIsAnalyzing(false);
    }, 1600);
  };

  const toggleBookmark = (item: Omit<BookmarkItem, 'id' | 'timestamp'>) => {
    setBookmarks((prev) => {
      const exists = prev.find((b) => b.targetId === item.targetId);
      if (exists) {
        return prev.filter((b) => b.targetId !== item.targetId);
      } else {
        return [
          {
            ...item,
            id: 'bm-' + Date.now(),
            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
          },
          ...prev
        ];
      }
    });
  };

  const isBookmarked = (targetId: string) => {
    return bookmarks.some((b) => b.targetId === targetId);
  };

  const addToWatchlist = (wallet: Omit<WatchlistWallet, 'id' | 'addedAt'>) => {
    const newItem: WatchlistWallet = {
      ...wallet,
      id: 'watch-' + Date.now(),
      addedAt: new Date().toISOString()
    };
    setWatchlist((prev) => [newItem, ...prev]);
  };

  const removeFromWatchlist = (id: string) => {
    setWatchlist((prev) => prev.filter((w) => w.id !== id));
  };

  return (
    <InvestigationContext.Provider
      value={{
        currentCase,
        allCases,
        selectedNetwork,
        setSelectedNetwork,
        analysisResult,
        isAnalyzing,
        analysisStepIndex,
        analysisStepMessage,
        whatIfFilters,
        setWhatIfFilters,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        loadCase,
        runAnalysis
      }}
    >
      {children}
    </InvestigationContext.Provider>
  );
}

export function useInvestigation() {
  const context = useContext(InvestigationContext);
  if (!context) {
    throw new Error('useInvestigation must be used within an InvestigationProvider');
  }
  return context;
}
