export const COURSE = {
  meta: {
    chapters: 11,
  },
};

export const PILLARS = [
  {
    n: '01',
    label: 'PART 1',
    title: 'Claude와 대화 시작하기',
    body: 'AI가 왜 틀리는지 알아야 제대로 위임할 수 있습니다. LLM의 한계, Context 관리, Plan Mode 한 사이클까지.',
  },
  {
    n: '02',
    label: 'PART 2',
    title: 'Claude를 내 방식으로 확장하기',
    body: '결과가 일정해야 도구입니다. Rules · Skills로 지식을 더하고, MCP · Hooks로 환경에 묶어냅니다.',
  },
  {
    n: '03',
    label: 'PART 3',
    title: 'Claude와 프로젝트 완성하기',
    body: '위임 범위가 커지면 경계가 필요합니다. SDD로 설계하고, Agent Teams로 병렬 작업하고, 직접 완성합니다.',
  },
] as const;
