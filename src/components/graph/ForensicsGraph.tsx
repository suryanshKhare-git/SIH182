'use client';

import React, { useState, useRef, useMemo } from 'react';
import { ForensicsNode, ForensicsEdge, TransactionPath } from '@/types/graph';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Copy,
  Check,
  Bookmark,
  Shield,
  X
} from 'lucide-react';
import { formatCurrency, formatAddress } from '@/utils/formatters';
import { useInvestigation } from '@/context/InvestigationContext';

interface ForensicsGraphProps {
  nodes: ForensicsNode[];
  edges: ForensicsEdge[];
  paths?: TransactionPath[];
  title?: string;
  subtitle?: string;
}

export function ForensicsGraph({
  nodes,
  edges,
  paths = [],
  title = 'Transaction Path Forensics Graph',
  subtitle = 'Multi-hop wallet flow & nearest VASP attribution graph'
}: ForensicsGraphProps) {
  const { toggleBookmark, isBookmarked, addToWatchlist } = useInvestigation();

  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const [selectedNode, setSelectedNode] = useState<ForensicsNode | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<ForensicsEdge | null>(null);
  const [highlightedPathId, setHighlightedPathId] = useState<string>('all');
  const [minValFilter, setMinValFilter] = useState<number>(0);
  const [hopFilter, setHopFilter] = useState<number>(5);
  const [copied, setCopied] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const filteredNodes = useMemo(() => {
    return nodes.filter((n) => n.hopDistance <= hopFilter);
  }, [nodes, hopFilter]);

  const filteredNodeIds = useMemo(() => new Set(filteredNodes.map((n) => n.id)), [filteredNodes]);

  const filteredEdges = useMemo(() => {
    return edges.filter((e) => {
      const bothNodesPresent = filteredNodeIds.has(e.source) && filteredNodeIds.has(e.target);
      const passesValue = e.valueUsd >= minValFilter;
      return bothNodesPresent && passesValue;
    });
  }, [edges, filteredNodeIds, minValFilter]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName === 'svg' || (e.target as HTMLElement).id === 'graph-bg') {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getNodeVisuals = (node: ForensicsNode) => {
    switch (node.role) {
      case 'unknown_wallet':
        return {
          fill: '#312e81',
          stroke: '#6366f1',
          badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
          title: 'TARGET WALLET',
          icon: '🎯'
        };
      case 'vasp':
        return {
          fill: '#064e3b',
          stroke: '#10b981',
          badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
          title: 'VASP / EXCHANGE',
          icon: '🏦'
        };
      case 'suspicious':
      case 'mixer':
        return {
          fill: '#7f1d1d',
          stroke: '#ef4444',
          badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
          title: 'SUSPICIOUS / MIXER',
          icon: '⚠️'
        };
      case 'cluster':
        return {
          fill: '#1e3a8a',
          stroke: '#38bdf8',
          badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
          title: 'CLUSTER POOL',
          icon: '🔗'
        };
      case 'intermediary':
      default:
        return {
          fill: '#1e293b',
          stroke: '#94a3b8',
          badgeBg: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
          title: 'INTERMEDIARY',
          icon: '⇄'
        };
    }
  };

  const isNodeConnected = (nodeId: string) => {
    if (!hoveredNodeId) return true;
    if (nodeId === hoveredNodeId) return true;
    return filteredEdges.some(
      (e) => (e.source === hoveredNodeId && e.target === nodeId) || (e.target === hoveredNodeId && e.source === nodeId)
    );
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs overflow-hidden transition-colors">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-900/50">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 font-mono">
              {title}
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded font-mono font-medium bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {filteredNodes.length} Nodes · {filteredEdges.length} Pathways
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          {paths.length > 0 && (
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] text-slate-400 font-mono uppercase">Path:</span>
              <select
                value={highlightedPathId}
                onChange={(e) => setHighlightedPathId(e.target.value)}
                className="bg-transparent text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="all" className="bg-white dark:bg-slate-900">All Paths</option>
                {paths.map((p) => (
                  <option key={p.id} value={p.id} className="bg-white dark:bg-slate-900">
                    {p.pathName} ({p.targetVasp})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] text-slate-400 font-mono uppercase">Min Val:</span>
            <select
              value={minValFilter}
              onChange={(e) => setMinValFilter(Number(e.target.value))}
              className="bg-transparent text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value={0} className="bg-white dark:bg-slate-900">All Values</option>
              <option value={10000} className="bg-white dark:bg-slate-900">&gt; $10,000</option>
              <option value={50000} className="bg-white dark:bg-slate-900">&gt; $50,000</option>
              <option value={100000} className="bg-white dark:bg-slate-900">&gt; $100,000</option>
            </select>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] text-slate-400 font-mono uppercase mr-1">Hops:</span>
            {[1, 2, 3, 5].map((h) => (
              <button
                key={h}
                onClick={() => setHopFilter(h)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold transition-colors ${
                  hopFilter === h
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {h === 5 ? 'All' : `${h}h`}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setScale((s) => Math.min(s + 0.15, 2.5))}
              className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setScale((s) => Math.max(s - 0.15, 0.5))}
              className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={resetView}
              className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
              title="Reset View"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative flex flex-col xl:flex-row h-[460px] bg-slate-100/60 dark:bg-slate-950 overflow-hidden">
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className="flex-1 h-full cursor-grab active:cursor-grabbing relative overflow-hidden select-none"
        >
          <svg
            id="graph-bg"
            className="w-full h-full"
            style={{ touchAction: 'none' }}
          >
            <defs>
              <pattern id="grid-pattern" width="30" height="30" patternUnits="userSpaceOnUse">
                <path
                  d="M 30 0 L 0 0 0 30"
                  fill="none"
                  stroke="currentColor"
                  className="text-slate-200/50 dark:text-slate-800/40"
                  strokeWidth="0.5"
                />
              </pattern>

              <marker
                id="arrow-default"
                viewBox="0 0 10 10"
                refX="20"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#64748b" />
              </marker>

              <marker
                id="arrow-primary"
                viewBox="0 0 10 10"
                refX="20"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#3b82f6" />
              </marker>

              <marker
                id="arrow-vasp"
                viewBox="0 0 10 10"
                refX="20"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#10b981" />
              </marker>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid-pattern)" />

            <g transform={`translate(${pan.x}, ${pan.y}) scale(${scale})`}>
              {filteredEdges.map((edge) => {
                const sourceNode = filteredNodes.find((n) => n.id === edge.source);
                const targetNode = filteredNodes.find((n) => n.id === edge.target);
                if (!sourceNode || !targetNode) return null;

                const sx = sourceNode.x || 100;
                const sy = sourceNode.y || 100;
                const tx = targetNode.x || 300;
                const ty = targetNode.y || 100;

                const isHovered =
                  hoveredNodeId === edge.source || hoveredNodeId === edge.target;
                const isSelectedEdge = selectedEdge?.id === edge.id;
                const isPathHighlighted =
                  highlightedPathId === 'all' ||
                  edge.isPrimaryPath ||
                  edge.source.includes(highlightedPathId);

                const dx = tx - sx;
                const dy = ty - sy;
                const cx1 = sx + dx * 0.5;
                const cy1 = sy;
                const cx2 = sx + dx * 0.5;
                const cy2 = ty;
                const pathD = `M ${sx} ${sy} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${tx} ${ty}`;

                const midX = (sx + tx) / 2;
                const midY = (sy + ty) / 2;

                const markerId = targetNode.role === 'vasp' ? 'url(#arrow-vasp)' : edge.isPrimaryPath ? 'url(#arrow-primary)' : 'url(#arrow-default)';

                return (
                  <g
                    key={edge.id}
                    onClick={() => setSelectedEdge(edge)}
                    className="cursor-pointer transition-opacity"
                    opacity={!isPathHighlighted ? 0.2 : hoveredNodeId && !isHovered ? 0.3 : 1}
                  >
                    <path
                      d={pathD}
                      fill="none"
                      stroke="transparent"
                      strokeWidth={18}
                    />

                    <path
                      d={pathD}
                      fill="none"
                      stroke={
                        isSelectedEdge
                          ? '#3b82f6'
                          : targetNode.role === 'vasp'
                          ? '#10b981'
                          : edge.isPrimaryPath
                          ? '#60a5fa'
                          : '#94a3b8'
                      }
                      strokeWidth={isSelectedEdge ? 3 : edge.isPrimaryPath ? 2.5 : 1.75}
                      strokeDasharray={targetNode.role === 'vasp' ? '4 3' : 'none'}
                      markerEnd={markerId}
                    />

                    <g transform={`translate(${midX}, ${midY})`}>
                      <rect
                        x="-42"
                        y="-10"
                        width="84"
                        height="20"
                        rx="4"
                        fill="currentColor"
                        className="text-white dark:text-slate-900"
                        stroke="#cbd5e1"
                        strokeWidth="1"
                      />
                      <text
                        x="0"
                        y="3"
                        textAnchor="middle"
                        className="fill-slate-800 dark:fill-slate-200 font-mono text-[9px] font-bold select-none"
                      >
                        {formatCurrency(edge.valueUsd)}
                      </text>
                    </g>
                  </g>
                );
              })}

              {filteredNodes.map((node) => {
                const nx = node.x || 100;
                const ny = node.y || 100;
                const visuals = getNodeVisuals(node);
                const isSelected = selectedNode?.id === node.id;
                const isConnected = isNodeConnected(node.id);

                return (
                  <g
                    key={node.id}
                    transform={`translate(${nx}, ${ny})`}
                    onClick={() => setSelectedNode(node)}
                    onMouseEnter={() => setHoveredNodeId(node.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    className="cursor-pointer"
                    opacity={isConnected ? 1 : 0.25}
                  >
                    {(isSelected || node.isSuspect) && (
                      <circle
                        r={34}
                        fill="none"
                        stroke={node.isSuspect ? '#ef4444' : '#3b82f6'}
                        strokeWidth={2}
                        strokeDasharray="4 2"
                        className="animate-spin"
                        style={{ transformOrigin: '0px 0px', animationDuration: '8s' }}
                      />
                    )}

                    <circle
                      r={24}
                      fill={visuals.fill}
                      stroke={isSelected ? '#ffffff' : visuals.stroke}
                      strokeWidth={isSelected ? 3 : 2}
                      className="transition-all hover:scale-110"
                    />

                    <text
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="text-sm select-none pointer-events-none"
                    >
                      {visuals.icon}
                    </text>

                    <circle
                      cx={18}
                      cy={-18}
                      r={9}
                      fill="#0f172a"
                      stroke="#475569"
                      strokeWidth={1}
                    />
                    <text
                      cx={18}
                      cy={-15}
                      textAnchor="middle"
                      className="fill-slate-200 font-mono text-[9px] font-bold select-none pointer-events-none"
                    >
                      {node.hopDistance}h
                    </text>

                    <text
                      y={38}
                      textAnchor="middle"
                      className="fill-slate-800 dark:fill-slate-100 font-bold text-[11px] select-none pointer-events-none"
                    >
                      {node.label}
                    </text>
                    <text
                      y={50}
                      textAnchor="middle"
                      className="fill-slate-500 dark:fill-slate-400 font-mono text-[9px] select-none pointer-events-none"
                    >
                      {formatAddress(node.address, 5, 4)}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>

          <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-md text-xs z-10 hidden sm:block">
            <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-1.5">
              Entity Legend
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 border border-indigo-400" />
                <span className="text-slate-700 dark:text-slate-300">Subject Wallet (0h)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 border border-emerald-400" />
                <span className="text-slate-700 dark:text-slate-300">VASP / Custodian</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-600 border border-slate-400" />
                <span className="text-slate-700 dark:text-slate-300">Intermediary</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600 border border-rose-400" />
                <span className="text-slate-700 dark:text-slate-300">Mixer / Flagged</span>
              </div>
            </div>
          </div>
        </div>

        {selectedNode && (
          <div className="w-full xl:w-80 bg-white dark:bg-slate-900 border-t xl:border-t-0 xl:border-l border-slate-200 dark:border-slate-800 p-4 overflow-y-auto z-20 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between pb-2 mb-3 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                      Entity Dossier
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                      {selectedNode.hopDistance} Hops Away
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
                    {selectedNode.label}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 mb-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                  <span>ADDRESS ({selectedNode.network})</span>
                  <button
                    onClick={() => handleCopy(selectedNode.address)}
                    className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="font-mono text-xs break-all text-slate-800 dark:text-slate-200 select-all font-semibold">
                  {selectedNode.address}
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                  <span className="text-slate-500 dark:text-slate-400">Classification</span>
                  <span className="font-medium uppercase font-mono text-slate-800 dark:text-slate-200">
                    {selectedNode.role.replace('_', ' ')}
                  </span>
                </div>

                {selectedNode.balanceNative && (
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="text-slate-500 dark:text-slate-400">Current Balance</span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                      {selectedNode.balanceNative} ({formatCurrency(selectedNode.balanceUsd || 0)})
                    </span>
                  </div>
                )}

                {selectedNode.txCount !== undefined && (
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="text-slate-500 dark:text-slate-400">Transactions Recorded</span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                      {selectedNode.txCount} txs
                    </span>
                  </div>
                )}

                {selectedNode.clusterTag && (
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="text-slate-500 dark:text-slate-400">Associated Cluster</span>
                    <span className="font-semibold text-sky-600 dark:text-sky-400">
                      {selectedNode.clusterTag}
                    </span>
                  </div>
                )}

                {selectedNode.confidence !== undefined && (
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="text-slate-500 dark:text-slate-400">Attribution Confidence</span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {selectedNode.confidence}%
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <button
                onClick={() =>
                  toggleBookmark({
                    type: 'wallet',
                    title: selectedNode.label,
                    subtitle: `${selectedNode.address.substring(0, 10)}... | ${selectedNode.network}`,
                    targetId: selectedNode.address
                  })
                }
                className="w-full py-1.5 px-3 rounded text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-200 border border-slate-300/60 dark:border-slate-700 flex items-center justify-center gap-2 transition-colors"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{isBookmarked(selectedNode.address) ? 'Remove Bookmark' : 'Pin to Case Bookmarks'}</span>
              </button>

              <button
                onClick={() =>
                  addToWatchlist({
                    address: selectedNode.address,
                    label: selectedNode.label,
                    network: selectedNode.network,
                    lastActivity: 'Recent',
                    unseenTxs: 0,
                    riskScore: selectedNode.riskScore || 50,
                    recentVasp: selectedNode.vaspName || 'Intermediary',
                    recentHop: selectedNode.hopDistance,
                    changeStatus: 'idle'
                  })
                }
                className="w-full py-1.5 px-3 rounded text-xs font-semibold bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900 flex items-center justify-center gap-2 transition-colors"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Add to Surveillance Watchlist</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
