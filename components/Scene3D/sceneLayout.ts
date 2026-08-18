export interface SceneObject {
  id: string;
  type: "server" | "gpu" | "node";
  organicPosition: [number, number, number];
  gridPosition: [number, number, number];
}

export interface Connection {
  from: string;
  to: string;
  type: "server-server" | "server-gpu" | "server-node";
}

const servers: SceneObject[] = [
  { id: "s1", type: "server", organicPosition: [1.5, 0.3, -0.5], gridPosition: [-2.8, 0, -1] },
  { id: "s2", type: "server", organicPosition: [-1.0, -0.2, 0.9], gridPosition: [-2.8, 0, 1] },
  { id: "s3", type: "server", organicPosition: [0.4, 0.5, 1.4], gridPosition: [0, 0, -1] },
  { id: "s4", type: "server", organicPosition: [-1.8, 0.1, -1.2], gridPosition: [0, 0, 1] },
  { id: "s5", type: "server", organicPosition: [2.2, -0.4, 0.6], gridPosition: [2.8, 0, -1] },
  { id: "s6", type: "server", organicPosition: [-0.4, 0.6, -1.8], gridPosition: [2.8, 0, 1] },
];

const gpus: SceneObject[] = [
  { id: "g1", type: "gpu", organicPosition: [2.5, -0.9, -1.4], gridPosition: [-3.8, -1.0, -1.8] },
  { id: "g2", type: "gpu", organicPosition: [1.8, -1.1, 0.0], gridPosition: [-3.8, -1.0, -0.6] },
  { id: "g3", type: "gpu", organicPosition: [-2.2, -0.9, 1.8], gridPosition: [-3.8, -1.0, 0.6] },
  { id: "g4", type: "gpu", organicPosition: [-2.6, -0.7, 0.0], gridPosition: [-3.8, -1.0, 1.8] },
  { id: "g5", type: "gpu", organicPosition: [1.0, -1.2, 2.4], gridPosition: [-1.2, -1.0, -1.8] },
  { id: "g6", type: "gpu", organicPosition: [-0.6, -1.3, 2.2], gridPosition: [-1.2, -1.0, 1.8] },
  { id: "g7", type: "gpu", organicPosition: [3.0, -0.6, 1.4], gridPosition: [1.6, -1.0, -1.8] },
  { id: "g8", type: "gpu", organicPosition: [0.0, -0.9, -2.4], gridPosition: [1.6, -1.0, 1.8] },
  { id: "g9", type: "gpu", organicPosition: [-1.5, -1.1, -2.2], gridPosition: [4.2, -1.0, -1.8] },
  { id: "g10", type: "gpu", organicPosition: [1.2, -1.0, -2.2], gridPosition: [4.2, -1.0, 1.8] },
];

const nodes: SceneObject[] = [
  { id: "n1", type: "node", organicPosition: [3.8, 0.8, -0.6], gridPosition: [-4.5, 1.2, -2.5] },
  { id: "n2", type: "node", organicPosition: [-3.5, 0.5, 1.2], gridPosition: [-4.5, 1.2, 2.5] },
  { id: "n3", type: "node", organicPosition: [0.6, 1.3, 3.0], gridPosition: [-1.2, 1.2, 3.0] },
  { id: "n4", type: "node", organicPosition: [-3.0, 0.9, -2.4], gridPosition: [2.5, 1.2, -3.0] },
  { id: "n5", type: "node", organicPosition: [3.5, 0.6, 2.0], gridPosition: [2.5, 1.2, 3.0] },
  { id: "n6", type: "node", organicPosition: [-1.2, 1.0, -3.2], gridPosition: [5.5, 1.2, -2.5] },
  { id: "n7", type: "node", organicPosition: [4.2, 0.3, 1.0], gridPosition: [5.5, 1.2, 2.5] },
  { id: "n8", type: "node", organicPosition: [-4.0, 0.7, -0.6], gridPosition: [-1.2, 1.2, -3.0] },
];

export const sceneObjects: SceneObject[] = [...servers, ...gpus, ...nodes];

export const connections: Connection[] = [
  // Server to server
  { from: "s1", to: "s2", type: "server-server" },
  { from: "s1", to: "s3", type: "server-server" },
  { from: "s2", to: "s4", type: "server-server" },
  { from: "s3", to: "s5", type: "server-server" },
  { from: "s4", to: "s6", type: "server-server" },
  { from: "s5", to: "s6", type: "server-server" },
  { from: "s3", to: "s4", type: "server-server" },
  // Server to GPU
  { from: "s1", to: "g1", type: "server-gpu" },
  { from: "s1", to: "g2", type: "server-gpu" },
  { from: "s2", to: "g3", type: "server-gpu" },
  { from: "s2", to: "g4", type: "server-gpu" },
  { from: "s3", to: "g5", type: "server-gpu" },
  { from: "s4", to: "g6", type: "server-gpu" },
  { from: "s5", to: "g7", type: "server-gpu" },
  { from: "s6", to: "g8", type: "server-gpu" },
  { from: "s6", to: "g9", type: "server-gpu" },
  { from: "s5", to: "g10", type: "server-gpu" },
  // Server to node
  { from: "s1", to: "n1", type: "server-node" },
  { from: "s2", to: "n2", type: "server-node" },
  { from: "s3", to: "n3", type: "server-node" },
  { from: "s4", to: "n4", type: "server-node" },
  { from: "s5", to: "n5", type: "server-node" },
  { from: "s6", to: "n6", type: "server-node" },
  { from: "s1", to: "n7", type: "server-node" },
  { from: "s4", to: "n8", type: "server-node" },
];

export function getPosition(
  obj: SceneObject,
  morphProgress: number
): [number, number, number] {
  return [
    obj.organicPosition[0] +
      (obj.gridPosition[0] - obj.organicPosition[0]) * morphProgress,
    obj.organicPosition[1] +
      (obj.gridPosition[1] - obj.organicPosition[1]) * morphProgress,
    obj.organicPosition[2] +
      (obj.gridPosition[2] - obj.organicPosition[2]) * morphProgress,
  ];
}
