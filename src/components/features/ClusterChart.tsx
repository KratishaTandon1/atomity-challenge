import { motion } from "framer-motion";
import { Cluster } from "@/hooks/useCloudData";
import { tokens } from "@/lib/tokens";
import { Card } from "../ui/Card";

interface Props {
  clusters: Cluster[];
  onSelect: (cluster: Cluster) => void;
}

export function ClusterChart({ clusters, onSelect }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {clusters.slice(0, 4).map((cluster) => (
        <Card
          key={cluster.id}
          layoutId={`card-container-${cluster.id}`}
          onClick={() => onSelect(cluster)}
          whileHover={{ scale: 1.02, borderColor: "var(--color-accent-primary)" }}
          className="p-6 cursor-pointer transition-colors"
          transition={tokens.spring}
        >
          <motion.h3 
            layoutId={`title-${cluster.id}`} 
            className="text-lg font-semibold text-textPrimary"
          >
            Cluster: {cluster.name}
          </motion.h3>
          <motion.div 
            layoutId={`bar-${cluster.id}`}
            className="h-2 w-full bg-accentPrimary mt-4 rounded-full" 
          />
        </Card>
      ))}
    </div>
  );
}