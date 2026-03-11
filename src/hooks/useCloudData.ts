import { useQuery } from "@tanstack/react-query";

export interface Metrics {
  cpu: number; ram: number; storage: number; network: number; gpu: number; efficiency: number; total: number;
}

export interface CloudEntity {
  id: number;
  name: string;
  metrics: Metrics;
  heightPercent: number;
}

// Helper to generate fake money data based on an ID so it stays consistent
const generateMetrics = (id: number, multiplier: number): Metrics => {
  const cpu = (id * 400 + 1200) * multiplier;
  const ram = (id * 200 + 800) * multiplier;
  const storage = (id * 50 + 100) * multiplier;
  const network = (id * 80 + 150) * multiplier;
  const gpu = id % 2 === 0 ? (id * 300) * multiplier : 0;
  const total = cpu + ram + storage + network + gpu;
  
  return {
    cpu, ram, storage, network, gpu, total,
    efficiency: Math.min(10 + (id * 5), 95),
  };
};

export function useCloudHierarchy(level: 'cluster' | 'namespace' | 'pod', parentId: number | null) {
  return useQuery<CloudEntity[]>({
    queryKey: ["cloud-data", level, parentId],
    queryFn: async () => {
      // Fetch different endpoints based on depth to satisfy the API requirement
      const endpoint = level === 'cluster' ? 'users' : level === 'namespace' ? `posts?userId=${parentId}` : `comments?postId=${parentId}`;
      const res = await fetch(`https://jsonplaceholder.typicode.com/${endpoint}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const rawData = await res.json();

      // Take only the first 4 items to match the 4 bars in the video
      return rawData.slice(0, 4).map((item: any, index: number) => {
        // Map the names to exactly match the video's style (Cluster A, Namespace B, etc.)
        const letter = String.fromCharCode(65 + index); // A, B, C, D
        const prefix = level === 'cluster' ? 'Cluster' : level === 'namespace' ? 'Namespace' : 'Pod';
        
        // As you drill down, the costs get smaller (multiplier decreases)
        const multiplier = level === 'cluster' ? 1 : level === 'namespace' ? 0.4 : 0.1;

        return {
          id: item.id,
          name: `${prefix} ${letter}`,
          metrics: generateMetrics(item.id, multiplier),
          heightPercent: 40 + (index * 15) % 50, // For the bar chart height
        };
      });
    },
    staleTime: 1000 * 60 * 5,
  });
}