import { usePartyLoadout } from "@/stores";
import { useMemo } from "react";
import { FEAT_MAP, FeatType } from "@/resources";
import { Edge, MarkerType, Node } from "reactflow";

// TODO: generate feat trees on extract

export const useFeatNodesAndEdges = () => {
  const { selectedPartyMember } = usePartyLoadout();

  const archetypeClass = selectedPartyMember.getArchetypeClass();
  const characterClass = selectedPartyMember.getClass();

  const { nodes, edges } = useMemo(() => {
    const rootFeats: FeatType[] = [];
    const featMap: Map<string, FeatType[]> = new Map();

    [...archetypeClass.featsList, ...characterClass.featsList].forEach(
      (featId) => {
        const feat = FEAT_MAP.get(featId);

        if (!feat) throw new Error(`Missing Feat: ${featId}`);

        if (feat.prereqFeat === "") {
          rootFeats.push(feat);
        } else {
          const currentFeats = featMap.get(feat.prereqFeat) ?? [];
          featMap.set(feat.prereqFeat, [...currentFeats, feat]);
        }
      },
    );

    const edges: Edge[] = [];
    const nodes: Node[] = [];

    let xOffset = 0;
    const NODE_X_GAP = 64;
    const NODE_Y_GAP = 95;

    const processFeat = (feat: FeatType, xOffset: number, yOffset: number) => {
      const descendantFeats = featMap.get(feat.id) ?? [];

      nodes.push({
        type: "featNode",
        id: feat.id,
        position: {
          x: xOffset * NODE_X_GAP,
          y: yOffset * NODE_Y_GAP,
        },
        data: {},
      });

      if (feat.prereqFeat) {
        edges.push({
          id: `${feat.prereqFeat}_${feat.id}`,
          type: "smoothstep",
          source: feat.prereqFeat,
          target: feat.id,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 9,
            height: 9,
          },
          style: {
            strokeWidth: 2.8,
            stroke: "#B2B2B2",
            boxShadow: "1px 1px 0px black",
          },
        });
      }

      descendantFeats.forEach((feat, index) => {
        processFeat(feat, xOffset + index, yOffset + 1);
      });

      return descendantFeats.length!;
    };

    rootFeats.forEach((rootFeat, index) => {
      xOffset += processFeat(
        rootFeat,
        xOffset + (rootFeat.id === "FEA_RogueThief1" ? 1 : 0) + index * 0.2,
        0,
      );
    });

    return { nodes, edges: edges.reverse() };
  }, [characterClass, archetypeClass]);

  return { nodes, edges };
};
