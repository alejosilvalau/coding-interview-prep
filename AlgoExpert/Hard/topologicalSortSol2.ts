// O(j + d) time | O(j + d) space
// j = number of jobs
// d = number of dependencies

type Dependency = [number, number];

class JobNode {
  job: number;
  deps: JobNode[];
  numberOfPrereqs: number;

  constructor(job: number) {
    this.job = job;
    this.deps = [];
    this.numberOfPrereqs = 0;
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

  addDep(job: number, dep: number) {
    const jobNode = this.getNode(job);
    const depNode = this.getNode(dep);
    jobNode.deps.push(depNode);
    depNode.numberOfPrereqs++;
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
  for (const [job, dep] of deps) {
    graph.addDep(job, dep);
  }
  return graph;
}

function getOrderedJobs(graph: JobGraph) {
  const orderedJobs: number[] = [];
  const nodesWithNoPrereqs = graph.nodes.filter(node => !node.numberOfPrereqs);
  while (nodesWithNoPrereqs.length) {
    const node = nodesWithNoPrereqs.pop()!;
    orderedJobs.push(node.job);
    removeDeps(node, nodesWithNoPrereqs);
  }
  const graphHasEdges = graph.nodes.some(node => node.numberOfPrereqs);
  return graphHasEdges ? [] : orderedJobs;
}

function removeDeps(node: JobNode, nodesWithNoPrereqs: JobNode[]) {
  while (node.deps.length) {
    const dep = node.deps.pop()!;
    dep.numberOfPrereqs--;
    if (!dep.numberOfPrereqs) nodesWithNoPrereqs.push(dep);
  }
}
