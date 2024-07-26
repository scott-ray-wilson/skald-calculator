import { useEffect, useState } from "react";
import ReactFlow, { Panel, useReactFlow, useStore } from "reactflow";
import { usePartyLoadout } from "@/stores";
import { useFeatNodesAndEdges } from "@/hooks";
import "reactflow/dist/style.css";
import { FeatNode, ResetFeatsButton } from "@/components/calc";

const FIT_VIEW_OPTIONS = {
  maxZoom: 1,
};

export const FeatTree = () => {
  const { fitView } = useReactFlow();
  const { selectedPartyMember } = usePartyLoadout();
  const { height, width } = useStore(({ height, width }) => ({
    height,
    width,
  }));

  const classId = selectedPartyMember.getClass().id;
  const { nodes, edges } = useFeatNodesAndEdges();

  useEffect(() => {
    setTimeout(() => {
      fitView(FIT_VIEW_OPTIONS);
    }, 1);
  }, [height, width, fitView]);

  const [nodeTypes] = useState(() => ({ featNode: FeatNode }));

  return (
    <div
      className={`flex min-h-[30rem] flex-[2] flex-col rounded border-[3px] border-olive`}
    >
      <ReactFlow
        key={classId}
        className={`flex-1`}
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        nodesFocusable={false}
        edgesFocusable={false}
        edgesUpdatable={false}
        panOnDrag={false}
        fitView
        fitViewOptions={FIT_VIEW_OPTIONS}
        zoomOnPinch={false}
        zoomOnScroll={false}
        zoomOnDoubleClick={false}
        preventScrolling={false}
        draggable={false}
        proOptions={{
          hideAttribution: true,
        }}
      >
        <Panel position={"top-right"} className={`!mr-1.5 !mt-1`}>
          <ResetFeatsButton />
        </Panel>
      </ReactFlow>
      <div
        className={`flex w-full flex-wrap justify-center gap-2 bg-olive px-1 text-center`}
      >
        <span className={"text-lg text-light-gray"}>Ranks to Distribute:</span>
        <span className={"text-lg text-white"}>
          {selectedPartyMember.feats.getUnallocatedRanks()}
        </span>
      </div>
    </div>
  );
};
