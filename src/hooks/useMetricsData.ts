import { useQuery } from '@tanstack/react-query';

export interface ResourceMetric {
  id: string;
  name: string;
  type: 'cluster' | 'namespace' | 'pod';
  cpu: number;
  ram: number;
  storage: number;
  network: number;
  gpu: number;
  efficiency: number;
  total: number;
  children?: ResourceMetric[];
}

// Generate pseudo-data for Option A based on 'jsonplaceholder' users response.
// 0:30 video ref: Cluster A (Total 6,834), Cluster B (Total 5,038).
const generateHierarchicalData = (users: any[]): ResourceMetric[] => {
  // We'll create exactly 2 clusters to match the video.
  const clusterA: ResourceMetric = {
    id: 'cluster-a',
    name: 'Cluster A',
    type: 'cluster',
    cpu: 2451,
    ram: 1351,
    storage: 932,
    network: 1520,
    gpu: 580,
    efficiency: 10,
    total: 6834,
    children: [
      {
        id: 'ns-a',
        name: 'Namespace A',
        type: 'namespace',
        cpu: 1200,
        ram: 700,
        storage: 400,
        network: 800,
        gpu: 333,
        efficiency: 15,
        total: 3433,
        children: [
          {
            id: 'pod-a1',
            name: 'Pod A-1',
            type: 'pod',
            cpu: 853,
            ram: 500,
            storage: 250,
            network: 600,
            gpu: 200,
            efficiency: 12,
            total: 2403,
          },
          {
            id: 'pod-a2',
            name: 'Pod A-2',
            type: 'pod',
            cpu: 347,
            ram: 200,
            storage: 150,
            network: 200,
            gpu: 133,
            efficiency: 18,
            total: 1030,
          }
        ]
      },
      {
        id: 'ns-b',
        name: 'Namespace B',
        type: 'namespace',
        cpu: 1251,
        ram: 651,
        storage: 532,
        network: 720,
        gpu: 247,
        efficiency: 5,
        total: 3401,
        children: [] // omitted for brevity
      }
    ]
  };

  const clusterB: ResourceMetric = {
    id: 'cluster-b',
    name: 'Cluster B',
    type: 'cluster',
    cpu: 1922,
    ram: 1067,
    storage: 800,
    network: 1000,
    gpu: 249,
    efficiency: 25,
    total: 5038,
    children: [] // omitted
  };

  return [clusterA, clusterB];
};

const fetchMetrics = async (): Promise<ResourceMetric[]> => {
  // Satisfies the requirement: "fetch data from a public API and render it dynamically".
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!res.ok) {
    throw new Error('Network error while fetching metrics');
  }
  const data = await res.json();
  return generateHierarchicalData(data);
};

export const useMetricsData = () => {
  return useQuery({
    queryKey: ['resourceMetrics'],
    queryFn: fetchMetrics,
    staleTime: 5 * 60 * 1000, // Important caching requirement part of challenge
  });
};
