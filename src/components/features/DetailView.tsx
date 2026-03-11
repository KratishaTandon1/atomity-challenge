import { motion } from "framer-motion";
import { Cluster, useNamespaces } from "@/hooks/useCloudData";
import { tokens } from "@/lib/tokens";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";

interface Props {
  cluster: Cluster;
  onBack: () => void;
}

export function DetailView({ cluster, onBack }: Props) {
  const { data: namespaces, isLoading } = useNamespaces(cluster.id);

  return (
    <Card 
      layoutId={`card-container-${cluster.id}`} 
      className="p-6 md:p-10 w-full"
      transition={tokens.springSlow}
    >
      <div className="flex justify-between items-center mb-8 border-b border-borderSubtle pb-4">
        <motion.h3 
          layoutId={`title-${cluster.id}`} 
          className="text-2xl font-bold text-textPrimary"
        >
          Cluster: {cluster.name}
        </motion.h3>
        <button 
          onClick={onBack}
          className="text-sm text-textMuted hover:text-textPrimary transition-colors"
        >
          ← Back to Overview
        </button>
      </div>

      <motion.div layoutId={`bar-${cluster.id}`} className="h-1 w-full bg-accentPrimary hidden" />

      {isLoading ? (
        <div className="text-textMuted animate-pulse">Loading namespaces...</div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {namespaces?.slice(0, 5).map((ns) => (
            <div key={ns.id} className="p-4 bg-bgPrimary rounded-lg flex justify-between items-center border border-borderSubtle">
              <span className="text-sm text-textPrimary truncate pr-4">{ns.title}</span>
              <Badge>Active</Badge>
            </div>
          ))}
        </motion.div>
      )}
    </Card>
  );
}