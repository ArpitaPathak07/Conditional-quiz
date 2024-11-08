import { useState, useCallback } from 'react';
import { ReactFlow, Controls, Background, applyNodeChanges, applyEdgeChanges, } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialEdges = [
  { id: '1-2', source: '1', target: '2' },
  { id: '1-3', source: '1', target: '3' },
  { id: '1-4', source: '1', target: '4' },
  { id: '1-5', source: '1', target: '5' },
  { id: '2-7', source: '2', target: '7' },
  { id: '3-10', source: '3', target: '10' },
  { id: '4-6', source: '4', target: '6' },
  { id: '5-15', source: '5', target: '15' },
  { id: '6-8', source: '6', target: '8' },
  { id: '8-9', source: '8', target: '9' },
  { id: '9-11', source: '9', target: '11' },
  { id: '9-12', source: '9', target: '12' },
  { id: '9-13', source: '9', target: '13' },
  { id: '9-14', source: '9', target: '14' },
];

const initialNodes = [
  {
    id: '1', data: { label: 'Which language library is React?' }, position: { x: 150, y: 0 }, 
    style: {  color: 'black', border: '2px solid black' }, type: 'input', hidden: false, // Initial visibility
  },
  { id: '2', data: { label: 'Java Library' }, position: { x: 0, y: 100 }, hidden: true },
  { id: '3', data: { label: 'Python Library' }, position: { x: 150, y: 100 }, hidden: true },
  { id: '4', data: { label: 'JavaScript Library' }, position: { x: 300, y: 100 }, hidden: true },
  { id: '5', data: { label: 'C Library' }, position: { x: 450, y: 100 }, hidden: true },
  { id: '6', data: { label: 'Correct! ' }, position: { x: 300, y: 200 }, hidden: true },
  { id: '7', data: { label: 'Incorrect, try again!' }, position: { x: 0, y: 200 }, hidden: true },
  { id: '8', data: { label: ' Next Question: ' }, position: { x: 150, y: 300 }, hidden: true },
  { id: '9', data: { label: ' How was the quiz?' }, position: { x: 150, y: 350 }, hidden: true },
  { id: '10', data: { label: 'Incorrect, try again!' }, position: { x: 150, y: 200 }, hidden: true },
  { id: '11', data: { label: 'Bad' }, position: { x: 0, y: 450 }, hidden: true },
  { id: '12', data: { label: 'Average' }, position: { x: 150, y: 450 }, hidden: true },
  { id: '13', data: { label: 'Good' }, position: { x: 300, y: 450 }, hidden: true },
  { id: '14', data: { label: 'Excellent' }, position: { x: 450, y: 450 }, hidden: true },
  { id: '15', data: { label: 'Incorrect, try again!' }, position: { x: 450, y: 200 }, hidden: true },
];

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback((changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const onEdgesChange = useCallback((changes) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  // Node click handler
  const onNodeClick = useCallback((event, node) => {
    setNodes((nds) =>
      nds.map((n) => {
        // If the node is the target of any edge where the clicked node is the source, make it visible
        const isTargetOfClickedNode = edges.some(
          (edge) => edge.source === node.id && edge.target === n.id
        );
        if (isTargetOfClickedNode) {
          return { ...n, hidden: false }; // Make the node visible
        }
        return n;
      })
    );
  }, [edges]);

  return (
    <div style={{ height: '100%' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Welcome to the Conditional Quiz Journey</h2>
      <ReactFlow
        nodes={nodes.filter((node) => !node.hidden)} // Filter nodes to render only visible ones
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick} // Attach the click handler
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;