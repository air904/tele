const sampleAccounts = [
  {
    id: 'acc_a',
    name: '+886 900-111-222',
    videos: [
      {
        group: '創業交流社',
        fileName: 'pitch-demo.mp4',
        sizeMB: 186,
        createdAt: '2026-04-24T20:14:00Z',
        thumb: 'https://picsum.photos/seed/pitch/640/360'
      },
      {
        group: 'AI 技術討論',
        fileName: 'agent-workflow.mov',
        sizeMB: 412,
        createdAt: '2026-04-21T13:08:00Z',
        thumb: 'https://picsum.photos/seed/agent/640/360'
      },
      {
        group: '攝影玩家',
        fileName: 'street-night.mp4',
        sizeMB: 89,
        createdAt: '2026-04-18T10:45:00Z',
        thumb: 'https://picsum.photos/seed/photo/640/360'
      }
    ]
  },
  {
    id: 'acc_b',
    name: '+886 900-333-444',
    videos: [
      {
        group: '語言交換小組',
        fileName: 'daily-speaking.mp4',
        sizeMB: 65,
        createdAt: '2026-04-24T18:30:00Z',
        thumb: 'https://picsum.photos/seed/lang/640/360'
      },
      {
        group: '旅行分享',
        fileName: 'tokyo-2026.mp4',
        sizeMB: 523,
        createdAt: '2026-04-22T05:45:00Z',
        thumb: 'https://picsum.photos/seed/travel/640/360'
      }
    ]
  }
];

const state = {
  accountId: sampleAccounts[0].id,
  query: '',
  minSize: 0,
  maxSize: 1000
};

const accountSelect = document.querySelector('#accountSelect');
const searchInput = document.querySelector('#searchInput');
const minSizeInput = document.querySelector('#minSizeInput');
const maxSizeInput = document.querySelector('#maxSizeInput');
const countText = document.querySelector('#countText');
const videoList = document.querySelector('#videoList');
const cardTpl = document.querySelector('#videoCardTemplate');

function initControls() {
  sampleAccounts.forEach((account) => {
    const option = document.createElement('option');
    option.value = account.id;
    option.textContent = account.name;
    accountSelect.append(option);
  });

  accountSelect.value = state.accountId;

  accountSelect.addEventListener('change', (e) => {
    state.accountId = e.target.value;
    render();
  });

  searchInput.addEventListener('input', (e) => {
    state.query = e.target.value.toLowerCase().trim();
    render();
  });

  minSizeInput.addEventListener('input', (e) => {
    state.minSize = Number(e.target.value || 0);
    render();
  });

  maxSizeInput.addEventListener('input', (e) => {
    state.maxSize = Number(e.target.value || Infinity);
    render();
  });
}

function getFilteredVideos() {
  const account = sampleAccounts.find((a) => a.id === state.accountId);
  if (!account) return [];

  return [...account.videos]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .filter((video) => {
      const inSizeRange = video.sizeMB >= state.minSize && video.sizeMB <= state.maxSize;
      const text = `${video.group} ${video.fileName}`.toLowerCase();
      const matched = !state.query || text.includes(state.query);
      return inSizeRange && matched;
    });
}

function render() {
  const videos = getFilteredVideos();
  countText.textContent = `共 ${videos.length} 部`;
  videoList.replaceChildren();

  videos.forEach((video) => {
    const node = cardTpl.content.cloneNode(true);
    node.querySelector('.thumb').src = video.thumb;
    node.querySelector('.name').textContent = video.fileName;
    node.querySelector('.group').textContent = `群組：${video.group}`;
    node.querySelector('.info').textContent = `大小：${video.sizeMB} MB`;
    node.querySelector('.date').textContent = `上傳：${new Date(video.createdAt).toLocaleString()}`;
    videoList.append(node);
  });
}

initControls();
render();
