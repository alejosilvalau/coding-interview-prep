// O(j + d) time | O(j + d) space
// j = number of jobs
// d = number of dependencies

type Dependency = [number, number];

class JobNode {
  job: number;
  prereqs: JobNode[];
  visited: boolean;
  visiting: boolean;

  constructor(job: number) {
    this.job = job;
    this.prereqs = [];
    this.visited = false;
    this.visiting = false;
  }
}

class JobGraph {
  nodes: JobNode[];
  graph: { [key: number]: JobNode };

  constructor(jobs: number[]) {
    this.nodes = [];
    this.graph = {};
    for (const job of jobs) {
      this.addNode(job);
    }
  }

  addPrereq(job: number, prereq: number) {
    const jobNode = this.getNode(job);
    const prereqNode = this.getNode(prereq);
    jobNode.prereqs.push(prereqNode);
  }

  addNode(job: number) {
    this.graph[job] = new JobNode(job);
    this.nodes.push(this.graph[job]);
  }

  getNode(job: number) {
    if (!(job in this.graph)) this.addNode(job);
    return this.graph[job];
  }
}

export function topologicalSort(jobs: number[], deps: Dependency[]) {
  const jobGraph = createJobGraph(jobs, deps);
  return getOrderedJobs(jobGraph);
}

function createJobGraph(jobs: number[], deps: Dependency[]) {
  const graph = new JobGraph(jobs);
  for (const [prereq, job] of deps) {
    graph.addPrereq(job, prereq);
  }
  return graph;
}

function getOrderedJobs(graph: JobGraph) {
  const orderedJobs: number[] = [];
  const { nodes } = graph;
  while (nodes.length) {
    const node = nodes.pop()!;
    const containsCycle = depthFirstTraverse(node, orderedJobs);
    if (containsCycle) return [];
  }
  return orderedJobs;
}

function depthFirstTraverse(node: JobNode, orderedJobs: number[]) {
  if (node.visited) return false;
  if (node.visiting) return false;
  node.visiting = true;
  for (const prereqNode of node.prereqs) {
    const containsCycle = depthFirstTraverse(prereqNode, orderedJobs);
    if (containsCycle) return true;
  }
  node.visited = true;
  node.visiting = false;
  orderedJobs.push(node.job);
  return false;
}
