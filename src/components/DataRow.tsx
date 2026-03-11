import React from 'react';
import { motion } from 'framer-motion';

interface ResourceMetricProps {
  id: string;
  name: string;
  cpu: number;
  ram: number;
  storage: number;
  network: number;
  gpu: number;
  efficiency: number;
  total: number;
}

interface DataRowProps {
  item: ResourceMetricProps;
}

const formatCurrency = (val: number) => `$${val.toLocaleString()}`;
const formatPercentage = (val: number) => `${val}%`;

export const DataRow: React.FC<DataRowProps> = ({ item }) => {
  return (
    <motion.div 
      className="grid grid-cols-[160px_1fr_1fr_1fr_1fr_1fr_1fr] min-w-[700px] gap-4 py-4 px-4 rounded-[12px] border border-transparent items-center text-sm transition-colors cursor-pointer"
      whileHover={{ 
        scale: 1.01,
        backgroundColor: "var(--color-background)",
        borderColor: "var(--color-border-color)",
        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)"
      }}
      whileTap={{ scale: 0.99 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="font-bold text-foreground col-span-1 min-w-0" title={item.name}>
        {item.name}
      </div>
      <div className="text-muted text-right font-medium">{formatCurrency(item.cpu)}</div>
      <div className="text-muted text-right font-medium">{formatCurrency(item.ram)}</div>
      <div className="text-muted text-right font-medium">{formatCurrency(item.storage)}</div>
      <div className="text-muted text-right font-medium">{formatCurrency(item.network)}</div>
      <div className="text-accent font-bold text-right">{formatCurrency(item.gpu)}</div>
      <div className={`text-right font-bold pr-4 ${item.efficiency > 15 ? 'text-success' : 'text-muted'}`}>
        {formatPercentage(item.efficiency)}
      </div>
    </motion.div>
  );
};
