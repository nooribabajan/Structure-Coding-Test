
/*
 IAE Academic Visual Logic — V2.1
 Deterministic geometry and layout engine.

 Input:
 {
   type: 'sequence'|'cycle'|'hierarchy'|'containment'|'network'|'grid',
   width, height, padding,
   nodes: [{id, label, width?, height?, parentId?}],
   edges: [{from, to}]
 }

 This engine does not interpret natural language or invent scientific
 relationships. It calculates geometry from explicitly structured data.
*/

(function (root, factory) {
  const api = factory();

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  }

  if (root) {
    root.IAEVisualLogic = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const DEFAULTS = {
    width: 800,
    height: 520,
    padding: 48,
    nodeWidth: 116,
    nodeHeight: 64
  };

  const TYPES = [
    'sequence',
    'cycle',
    'hierarchy',
    'containment',
    'network',
    'grid'
  ];

  const own = (obj, key) =>
    Object.prototype.hasOwnProperty.call(obj, key);

  const validNumber = value =>
    typeof value === 'number' && Number.isFinite(value);

  const idOf = node => String(node.id);

  const mapOf = nodes =>
    new Map(nodes.map(node => [idOf(node), node]));

  const clamp = (value, min, max) =>
    Math.max(min, Math.min(max, value));


  // --------------------------------------------------
  // 1. CANVAS DIMENSIONS
  // --------------------------------------------------

  function dimensions(scene) {
    const width = own(scene, 'width')
      ? scene.width
      : DEFAULTS.width;

    const height = own(scene, 'height')
      ? scene.height
      : DEFAULTS.height;

    const padding = own(scene, 'padding')
      ? scene.padding
      : DEFAULTS.padding;

    if (
      !validNumber(width) ||
      !validNumber(height) ||
      !validNumber(padding)
    ) {
      return {
        error: 'Canvas dimensions must be finite numbers.'
      };
    }

    if (
      width < 240 ||
      height < 180 ||
      padding < 8 ||
      padding * 2 >= Math.min(width, height)
    ) {
      return {
        error: 'Canvas dimensions or padding leave no usable area.'
      };
    }

    return {
      width,
      height,
      padding,
      innerW: width - 2 * padding,
      innerH: height - 2 * padding
    };
  }


  // --------------------------------------------------
  // 2. NODE DIMENSIONS
  // --------------------------------------------------

  function nodeSize(node) {
    const width = own(node, 'width')
      ? node.width
      : DEFAULTS.nodeWidth;

    const height = own(node, 'height')
      ? node.height
      : DEFAULTS.nodeHeight;

    if (
      !validNumber(width) ||
      !validNumber(height) ||
      width < 24 ||
      height < 24
    ) {
      return {
        error:
          'Node ' + String(node.id) +
          ' has invalid width or height.'
      };
    }

    return { width, height };
  }


  // --------------------------------------------------
  // 3. INPUT VALIDATION
  // --------------------------------------------------

  function validate(scene) {
    const errors = [];
    const warnings = [];

    if (
      !scene ||
      typeof scene !== 'object' ||
      Array.isArray(scene)
    ) {
      return {
        errors: ['Scene must be an object.'],
        warnings
      };
    }

    if (!TYPES.includes(scene.type)) {
      errors.push(
        'Unsupported layout type: ' + String(scene.type)
      );
    }

    if (!Array.isArray(scene.nodes) || !scene.nodes.length) {
      errors.push('nodes must be a non-empty array.');
    }

    const nodes = Array.isArray(scene.nodes)
      ? scene.nodes
      : [];

    const validNodes = nodes.filter(node =>
      node &&
      typeof node === 'object' &&
      !Array.isArray(node)
    );

    const ids = new Set();

    nodes.forEach((node, index) => {
      if (
        !node ||
        typeof node !== 'object' ||
        Array.isArray(node)
      ) {
        errors.push(
          'Node at index ' + index +
          ' must be an object.'
        );
        return;
      }

      if (
        node.id === undefined ||
        node.id === null ||
        String(node.id).trim() === ''
      ) {
        errors.push('Every node needs a non-empty id.');
      } else if (ids.has(String(node.id))) {
        errors.push(
          'Duplicate node id: ' + String(node.id)
        );
      } else {
        ids.add(String(node.id));
      }

      const size = nodeSize(node);

      if (size.error) {
        errors.push(size.error);
      }
    });

    if (
      own(scene, 'edges') &&
      !Array.isArray(scene.edges)
    ) {
      errors.push('edges must be an array.');
    }

    const edges = Array.isArray(scene.edges)
      ? scene.edges
      : [];

    edges.forEach((edge, index) => {
      if (
        !edge ||
        typeof edge !== 'object' ||
        edge.from === undefined ||
        edge.to === undefined
      ) {
        errors.push(
          'Edge at index ' + index +
          ' needs from and to ids.'
        );
        return;
      }

      if (
        !ids.has(String(edge.from)) ||
        !ids.has(String(edge.to))
      ) {
        errors.push(
          'Edge references an unknown node: ' +
          String(edge.from) + ' → ' +
          String(edge.to)
        );
      }

      if (String(edge.from) === String(edge.to)) {
        errors.push(
          'Self-edge is not allowed: ' +
          String(edge.from)
        );
      }
    });

    const canvas = dimensions(scene);

    if (canvas.error) {
      errors.push(canvas.error);
    } else {
      validNodes.forEach(node => {
        const size = nodeSize(node);

        if (
          !size.error &&
          (
            size.width > canvas.innerW ||
            size.height > canvas.innerH
          )
        ) {
          errors.push(
            'Node ' + String(node.id) +
            ' is larger than the usable canvas.'
          );
        }
      });
    }

    if (
      scene.type === 'cycle' &&
      validNodes.length < 2
    ) {
      errors.push('A cycle requires at least two nodes.');
    }

    if (
      scene.type === 'sequence' &&
      validNodes.length === 1
    ) {
      warnings.push(
        'Single-node sequence will be centered.'
      );
    }

    if (
      ['sequence', 'cycle'].includes(scene.type) &&
      validNodes.length > 1 &&
      edges.length === 0
    ) {
      errors.push(
        scene.type + ' layout requires directed edges.'
      );
    }

    if (
      ['hierarchy', 'containment'].includes(scene.type)
    ) {
      const nodeMap = mapOf(validNodes);
      const state = new Map();

      validNodes.forEach(node => {
        if (
          node.parentId !== undefined &&
          node.parentId !== null &&
          !nodeMap.has(String(node.parentId))
        ) {
          errors.push(
            'Unknown parentId ' +
            String(node.parentId) +
            ' for node ' + String(node.id)
          );
        }
      });

      function visit(id) {
        if (state.get(id) === 1) {
          errors.push(
            'Parent relationship contains a cycle at node ' +
            id
          );
          return;
        }

        if (state.get(id) === 2) {
          return;
        }

        state.set(id, 1);

        const node = nodeMap.get(id);

        if (
          node &&
          node.parentId !== undefined &&
          node.parentId !== null &&
          nodeMap.has(String(node.parentId))
        ) {
          visit(String(node.parentId));
        }

        state.set(id, 2);
      }

      validNodes.forEach(node => visit(idOf(node)));
    }

    return {
      errors: [...new Set(errors)],
      warnings
    };
  }


  // --------------------------------------------------
  // 4. NODE OBJECT CONSTRUCTION
  // --------------------------------------------------

  function createNode(
    node,
    x,
    y,
    width,
    height,
    extra = {}
  ) {
    const size = nodeSize(node);

    return {
      ...node,
      x,
      y,
      renderWidth:
        width === undefined ? size.width : width,
      renderHeight:
        height === undefined ? size.height : height,
      ...extra
    };
  }


  // --------------------------------------------------
  // 5. OVERLAP DETECTION
  // --------------------------------------------------

  function detectOverlaps(nodes, allowNested = false) {
    const overlaps = [];
    const nodeMap = mapOf(nodes);

    function isAncestor(ancestorId, childId) {
      let current = nodeMap.get(String(childId));

      while (current && current.parentId != null) {
        const parentId = String(current.parentId);

        if (parentId === String(ancestorId)) {
          return true;
        }

        current = nodeMap.get(parentId);
      }

      return false;
    }

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];

        if (
          allowNested &&
          (
            isAncestor(a.id, b.id) ||
            isAncestor(b.id, a.id)
          )
        ) {
          continue;
        }

        const overlapX =
          Math.abs(a.x - b.x) <
          (a.renderWidth + b.renderWidth) / 2 - 0.01;

        const overlapY =
          Math.abs(a.y - b.y) <
          (a.renderHeight + b.renderHeight) / 2 - 0.01;

        if (overlapX && overlapY) {
          overlaps.push([a.id, b.id]);
        }
      }
    }

    return overlaps;
  }


  // --------------------------------------------------
  // 6. COLLISION CORRECTION
  // --------------------------------------------------

  function resolveCollisions(nodes, canvas) {
    for (let pass = 0; pass < 100; pass++) {
      const pairs = detectOverlaps(nodes);

      if (!pairs.length) {
        break;
      }

      for (const pair of pairs) {
        const a = nodes.find(
          n => String(n.id) === String(pair[0])
        );

        const b = nodes.find(
          n => String(n.id) === String(pair[1])
        );

        if (!a || !b) {
          continue;
        }

        const overlapX =
          (a.renderWidth + b.renderWidth) / 2 -
          Math.abs(a.x - b.x);

        const overlapY =
          (a.renderHeight + b.renderHeight) / 2 -
          Math.abs(a.y - b.y);

        if (overlapX <= 0 || overlapY <= 0) {
          continue;
        }

        if (overlapX < overlapY) {
          const direction = a.x <= b.x ? -1 : 1;
          const shift = overlapX / 2 + 1;

          a.x += direction * shift;
          b.x -= direction * shift;
        } else {
          const direction = a.y <= b.y ? -1 : 1;
          const shift = overlapY / 2 + 1;

          a.y += direction * shift;
          b.y -= direction * shift;
        }

        [a, b].forEach(node => {
          node.x = clamp(
            node.x,
            canvas.padding + node.renderWidth / 2,
            canvas.width -
              canvas.padding -
              node.renderWidth / 2
          );

          node.y = clamp(
            node.y,
            canvas.padding + node.renderHeight / 2,
            canvas.height -
              canvas.padding -
              node.renderHeight / 2
          );
        });
      }
    }

    return nodes;
  }


  // --------------------------------------------------
  // 7. DIRECTED SEQUENCE / CYCLE ORDERING
  // --------------------------------------------------

  function orderedChain(nodes, edges, isCycle) {
    const ids = nodes.map(idOf);

    const adjacency = new Map(
      ids.map(id => [id, []])
    );

    const indegree = new Map(
      ids.map(id => [id, 0])
    );

    edges.forEach(edge => {
      const from = String(edge.from);
      const to = String(edge.to);

      adjacency.get(from).push(to);
      indegree.set(to, indegree.get(to) + 1);
    });

    if (isCycle) {
      if (edges.length !== nodes.length) {
        return {
          error:
            'A single cycle must have exactly one outgoing edge per node.'
        };
      }

      if (
        ids.some(id =>
          adjacency.get(id).length !== 1 ||
          indegree.get(id) !== 1
        )
      ) {
        return {
          error:
            'Cycle edges must form one directed loop.'
        };
      }

      const order = [ids[0]];
      const visited = new Set(order);
      let current = ids[0];

      for (let i = 1; i < nodes.length; i++) {
        current = adjacency.get(current)[0];

        if (visited.has(current)) {
          return {
            error:
              'Cycle closes before visiting every node.'
          };
        }

        visited.add(current);
        order.push(current);
      }

      if (
        adjacency.get(order[order.length - 1])[0] !==
        order[0]
      ) {
        return {
          error:
            'Cycle does not close into one complete loop.'
        };
      }

      return { order };
    }

    if (edges.length !== nodes.length - 1) {
      return {
        error:
          'A linear sequence requires node-count minus one edges.'
      };
    }

    const starts = ids.filter(
      id => indegree.get(id) === 0
    );

    if (
      starts.length !== 1 ||
      ids.some(id =>
        adjacency.get(id).length > 1 ||
        indegree.get(id) > 1
      )
    ) {
      return {
        error:
          'Sequence must be one unbranched directed chain.'
      };
    }

    const order = [];
    const visited = new Set();
    let current = starts[0];

    while (
      current !== undefined &&
      !visited.has(current)
    ) {
      order.push(current);
      visited.add(current);
      current = adjacency.get(current)[0];
    }

    if (order.length !== nodes.length) {
      return {
        error:
          'Sequence edges are disconnected or contain a cycle.'
      };
    }

    return { order };
  }


  // --------------------------------------------------
  // 8. SEQUENCE LAYOUT
  // --------------------------------------------------

  function sequenceLayout(nodes, scene, canvas, edges) {
    if (nodes.length === 1) {
      return {
        nodes: [
          createNode(
            nodes[0],
            canvas.width / 2,
            canvas.height / 2
          )
        ]
      };
    }

    const chain = orderedChain(nodes, edges, false);

    if (chain.error) {
      return { error: chain.error };
    }

    const nodeMap = mapOf(nodes);
    const ordered = chain.order.map(
      id => nodeMap.get(id)
    );

    const gap = 24;

    const totalWidth =
      ordered.reduce(
        (sum, node) => sum + nodeSize(node).width,
        0
      ) +
      gap * (ordered.length - 1);

    if (totalWidth > canvas.innerW) {
      return {
        error:
          'Sequence nodes do not fit horizontally.'
      };
    }

    let x = (canvas.width - totalWidth) / 2;

    const result = ordered.map(node => {
      const size = nodeSize(node);

      const placed = createNode(
        node,
        x + size.width / 2,
        canvas.height / 2
      );

      x += size.width + gap;

      return placed;
    });

    return { nodes: result };
  }


  // --------------------------------------------------
  // 9. CYCLE LAYOUT
  // --------------------------------------------------

  function cycleLayout(nodes, scene, canvas, edges) {
    const chain = orderedChain(nodes, edges, true);

    if (chain.error) {
      return { error: chain.error };
    }

    const nodeMap = mapOf(nodes);
    const ordered = chain.order.map(
      id => nodeMap.get(id)
    );

    const maxWidth = Math.max(
      ...ordered.map(n => nodeSize(n).width)
    );

    const maxHeight = Math.max(
      ...ordered.map(n => nodeSize(n).height)
    );

    const radiusX =
      canvas.innerW / 2 - maxWidth / 2;

    const radiusY =
      canvas.innerH / 2 - maxHeight / 2;

    if (radiusX < 1 || radiusY < 1) {
      return {
        error:
          'Canvas is too small for circular placement.'
      };
    }

    const result = ordered.map((node, index) => {
      const angle =
        -Math.PI / 2 +
        (2 * Math.PI * index) / ordered.length;

      return createNode(
        node,
        canvas.width / 2 +
          radiusX * Math.cos(angle),
        canvas.height / 2 +
          radiusY * Math.sin(angle)
      );
    });

    return { nodes: result };
  }


  // --------------------------------------------------
  // 10. TREE STRUCTURE
  // --------------------------------------------------

  function buildTree(nodes) {
    const nodeMap = mapOf(nodes);

    const children = new Map(
      nodes.map(node => [idOf(node), []])
    );

    nodes.forEach(node => {
      if (node.parentId != null) {
        children
          .get(String(node.parentId))
          .push(node);
      }
    });

    const roots = nodes.filter(
      node =>
        node.parentId === undefined ||
        node.parentId === null
    );

    const levels = [];

    const queue = roots.map(node => ({
      node,
      depth: 0
    }));

    const visited = new Set();

    while (queue.length) {
      const item = queue.shift();
      const id = idOf(item.node);

      if (visited.has(id)) {
        continue;
      }

      visited.add(id);

      if (!levels[item.depth]) {
        levels[item.depth] = [];
      }

      levels[item.depth].push(item.node);

      (children.get(id) || []).forEach(child => {
        queue.push({
          node: child,
          depth: item.depth + 1
        });
      });
    }

    if (visited.size !== nodes.length) {
      return {
        error:
          'Tree contains unreachable nodes.'
      };
    }

    return {
      levels,
      children,
      roots,
      nodeMap
    };
  }


  // --------------------------------------------------
  // 11. HIERARCHY LAYOUT
  // --------------------------------------------------

  function hierarchyLayout(nodes, scene, canvas) {
    const tree = buildTree(nodes);

    if (tree.error) {
      return tree;
    }

    const levels = tree.levels;
    const levelCount = levels.length;

    const maxHeight = Math.max(
      ...nodes.map(n => nodeSize(n).height)
    );

    if (
      maxHeight * levelCount >
      canvas.innerH
    ) {
      return {
        error:
          'Hierarchy levels exceed available vertical space.'
      };
    }

    const result = [];

    levels.forEach((level, levelIndex) => {
      const totalWidth = level.reduce(
        (sum, node) =>
          sum + nodeSize(node).width,
        0
      );

      const gap =
        level.length > 1
          ? (
              canvas.innerW - totalWidth
            ) / (level.length + 1)
          : 0;

      if (gap < 8 && level.length > 1) {
        throw new Error(
          'A hierarchy level is too wide for canvas.'
        );
      }

      let x =
        level.length === 1
          ? (canvas.width - totalWidth) / 2
          : canvas.padding + gap;

      const y =
        canvas.padding +
        (levelIndex + 0.5) *
          canvas.innerH / levelCount;

      level.forEach(node => {
        const size = nodeSize(node);

        result.push(
          createNode(
            node,
            x + size.width / 2,
            y
          )
        );

        x += size.width + gap;
      });
    });

    return { nodes: result };
  }


  // --------------------------------------------------
  // 12. RECURSIVE CONTAINMENT MEASUREMENT
  // --------------------------------------------------

  function containmentLayout(nodes, scene, canvas) {
    const tree = buildTree(nodes);

    if (tree.error) {
      return tree;
    }

    if (tree.roots.length !== 1) {
      return {
        error:
          'Containment requires exactly one outer container.'
      };
    }

    const GAP = 14;
    const PADDING = 18;
    const HEADER = 24;

    const memo = new Map();

    function measure(node) {
      const key = idOf(node);

      if (memo.has(key)) {
        return memo.get(key);
      }

      const children =
        tree.children.get(key) || [];

      const ownSize = nodeSize(node);

      let result;

      if (!children.length) {
        result = {
          width: ownSize.width,
          height: ownSize.height
        };
      } else {
        const childSizes = children.map(measure);

        const contentWidth =
          childSizes.reduce(
            (sum, size) => sum + size.width,
            0
          ) +
          GAP * (children.length - 1);

        const contentHeight = Math.max(
          ...childSizes.map(size => size.height)
        );

        result = {
          width: Math.max(
            ownSize.width,
            contentWidth + 2 * PADDING
          ),

          height: Math.max(
            ownSize.height,
            contentHeight +
              2 * PADDING +
              HEADER
          )
        };
      }

      memo.set(key, result);

      return result;
    }

    const root = tree.roots[0];
    const rootSize = measure(root);

    if (
      rootSize.width > canvas.innerW ||
      rootSize.height > canvas.innerH
    ) {
      return {
        error:
          'Nested containers exceed available canvas dimensions.'
      };
    }

    const result = [];

    function placeTree(
      node,
      centerX,
      centerY,
      width,
      height
    ) {
      const children =
        tree.children.get(idOf(node)) || [];

      result.push(
        createNode(
          node,
          centerX,
          centerY,
          width,
          height,
          {
            isContainer: children.length > 0
          }
        )
      );

      if (!children.length) {
        return;
      }

      const childSizes = children.map(measure);

      const totalWidth =
        childSizes.reduce(
          (sum, size) => sum + size.width,
          0
        ) +
        GAP * (children.length - 1);

      let x = centerX - totalWidth / 2;

      children.forEach((child, index) => {
        const size = childSizes[index];

        const childX =
          x + size.width / 2;

        const childY =
          centerY -
          height / 2 +
          HEADER +
          PADDING +
          size.height / 2;

        placeTree(
          child,
          childX,
          childY,
          size.width,
          size.height
        );

        x += size.width + GAP;
      });
    }

    placeTree(
      root,
      canvas.width / 2,
      canvas.height / 2,
      rootSize.width,
      rootSize.height
    );

    return { nodes: result };
  }


  // --------------------------------------------------
  // 13. GRID LAYOUT
  // --------------------------------------------------

  function gridLayout(nodes, scene, canvas) {
    const columns = Math.ceil(
      Math.sqrt(
        nodes.length *
        canvas.innerW /
        canvas.innerH
      )
    );

    const rows = Math.ceil(
      nodes.length / columns
    );

    const cellWidth =
      canvas.innerW / columns;

    const cellHeight =
      canvas.innerH / rows;

    for (const node of nodes) {
      const size = nodeSize(node);

      if (
        size.width > cellWidth ||
        size.height > cellHeight
      ) {
        return {
          error:
            'Grid cell is smaller than one or more nodes.'
        };
      }
    }

    return {
      nodes: nodes.map((node, index) =>
        createNode(
          node,

          canvas.padding +
            ((index % columns) + 0.5) *
              cellWidth,

          canvas.padding +
            (
              Math.floor(index / columns) + 0.5
            ) *
              cellHeight
        )
      )
    };
  }


  // --------------------------------------------------
  // 14. EDGE-AWARE NETWORK LAYOUT
  // --------------------------------------------------

  function networkLayout(nodes, scene, canvas, edges) {
    const count = nodes.length;

    const indexMap = new Map(
      nodes.map((node, index) => [
        idOf(node),
        index
      ])
    );

    const positions = nodes.map((node, index) => {
      const angle =
        2 * Math.PI * index / count;

      return {
        x:
          canvas.width / 2 +
          Math.cos(angle) *
            canvas.innerW * 0.28,

        y:
          canvas.height / 2 +
          Math.sin(angle) *
            canvas.innerH * 0.28
      };
    });

    const links = edges.map(edge => [
      indexMap.get(String(edge.from)),
      indexMap.get(String(edge.to))
    ]);

    const idealDistance = Math.sqrt(
      canvas.innerW *
      canvas.innerH /
      Math.max(1, count)
    );

    const repulsion =
      idealDistance * idealDistance;

    const iterations = 180;
    const attraction = 0.018;

    for (
      let step = 0;
      step < iterations;
      step++
    ) {
      const forces = positions.map(() => ({
        x: 0,
        y: 0
      }));

      // Node-to-node repulsion
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx =
            positions[i].x -
            positions[j].x;

          const dy =
            positions[i].y -
            positions[j].y;

          const distance = Math.max(
            0.01,
            Math.hypot(dx, dy)
          );

          const force =
            repulsion /
            (distance * distance);

          const fx =
            dx / distance * force;

          const fy =
            dy / distance * force;

          forces[i].x += fx;
          forces[i].y += fy;

          forces[j].x -= fx;
          forces[j].y -= fy;
        }
      }

      // Edge attraction
      links.forEach(([a, b]) => {
        const dx =
          positions[b].x -
          positions[a].x;

        const dy =
          positions[b].y -
          positions[a].y;

        const distance = Math.max(
          0.01,
          Math.hypot(dx, dy)
        );

        const force =
          (
            distance - idealDistance
          ) * attraction;

        const fx =
          dx / distance * force;

        const fy =
          dy / distance * force;

        forces[a].x += fx;
        forces[a].y += fy;

        forces[b].x -= fx;
        forces[b].y -= fy;
      });

      const temperature =
        idealDistance *
          (1 - step / iterations) *
          0.08 +
        0.5;

      positions.forEach((position, index) => {
        const size = nodeSize(nodes[index]);

        const magnitude = Math.max(
          0.01,
          Math.hypot(
            forces[index].x,
            forces[index].y
          )
        );

        const movement = Math.min(
          temperature,
          magnitude
        );

        position.x = clamp(
          position.x +
            forces[index].x /
              magnitude *
              movement,

          canvas.padding + size.width / 2,

          canvas.width -
            canvas.padding -
            size.width / 2
        );

        position.y = clamp(
          position.y +
            forces[index].y /
              magnitude *
              movement,

          canvas.padding + size.height / 2,

          canvas.height -
            canvas.padding -
            size.height / 2
        );
      });
    }

    const result = nodes.map((node, index) =>
      createNode(
        node,
        positions[index].x,
        positions[index].y
      )
    );

    return {
      nodes: resolveCollisions(result, canvas)
    };
  }


  // --------------------------------------------------
  // 15. MAIN BUILD FUNCTION
  // --------------------------------------------------

  function build(scene) {
    const validation = validate(scene);

    if (validation.errors.length) {
      return {
        ok: false,
        layout: scene && scene.type,
        nodes: [],
        edges:
          scene && Array.isArray(scene.edges)
            ? scene.edges
            : [],
        warnings: validation.warnings,
        errors: validation.errors
      };
    }

    const canvas = dimensions(scene);

    const edges = Array.isArray(scene.edges)
      ? scene.edges
      : [];

    let result;

    try {
      switch (scene.type) {
        case 'sequence':
          result = sequenceLayout(
            scene.nodes,
            scene,
            canvas,
            edges
          );
          break;

        case 'cycle':
          result = cycleLayout(
            scene.nodes,
            scene,
            canvas,
            edges
          );
          break;

        case 'hierarchy':
          result = hierarchyLayout(
            scene.nodes,
            scene,
            canvas
          );
          break;

        case 'containment':
          result = containmentLayout(
            scene.nodes,
            scene,
            canvas
          );
          break;

        case 'grid':
          result = gridLayout(
            scene.nodes,
            scene,
            canvas
          );
          break;

        case 'network':
          result = networkLayout(
            scene.nodes,
            scene,
            canvas,
            edges
          );
          break;
      }
    } catch (error) {
      result = {
        error:
          error.message ||
          'Layout calculation failed.'
      };
    }

    if (result.error) {
      return {
        ok: false,
        layout: scene.type,
        nodes: [],
        edges,
        warnings: validation.warnings,
        errors: [result.error]
      };
    }

    const overlaps = detectOverlaps(
      result.nodes,
      scene.type === 'containment'
    );

    const warnings = [
      ...validation.warnings
    ];

    if (overlaps.length) {
      warnings.push(
        'Unresolved overlapping node pairs: ' +
        overlaps
          .map(pair => pair.join('/'))
          .join(', ')
      );
    }

    return {
      ok: overlaps.length === 0,
      layout: scene.type,
      width: canvas.width,
      height: canvas.height,
      nodes: result.nodes,
      edges,
      warnings,
      errors: overlaps.length
        ? [
            'Layout contains overlapping nodes; scene is not collision-free.'
          ]
        : []
    };
  }


  // --------------------------------------------------
  // 16. PUBLIC API
  // --------------------------------------------------

  return {
    version: '2.1.0',
    validate,
    build,
    detectOverlaps
  };
});
