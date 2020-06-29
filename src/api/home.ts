export const getListApi = () => {
  // 0 未完成 1 已完成
  return Promise.resolve([{
    title: '任务1',
    context: '任务1的详细内容。。。',
    id: 0,
    status: 0,
  }, {
    title: '任务2',
    context: '任务2的详细内容。。。',
    id: 1,
    status: 1,
  },
  {
    title: '任务3',
    context: '任务3的详细内容。。。',
    id: 3,
    status: 0,
  },
  {
    title: '任务4',
    context: '任务4的详细内容。。。',
    id: 4,
    status: 0,
  },
  {
    title: '任务5',
    context: '任务5的详细内容。。。',
    id: 5,
    status: 1,
  },
  {
    title: '任务6',
    context: '任务6的详细内容。。。',
    id: 6,
    status: 1,
  },
  ])
}