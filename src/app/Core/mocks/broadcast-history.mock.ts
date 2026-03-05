import { BroadcastHistoryEntry } from '../services/broadcast-history.service';

export const getMockPlaylist = (translate: (key: string) => string): BroadcastHistoryEntry[] => {
  const now = Math.floor(Date.now() / 1000);
  return [
    {
      id: 'm1',
      name: translate('MOCKS.TRACK_1'),
      created: now,
    },
    {
      id: 'm2',
      name: translate('MOCKS.TRACK_2'),
      created: now - 300,
    },
    {
      id: 'm3',
      name: translate('MOCKS.TRACK_3'),
      created: now - 600,
    },
    {
      id: 'm4',
      name: translate('MOCKS.TRACK_4'),
      created: now - 900,
    },
    {
      id: 'm5',
      name: translate('MOCKS.TRACK_5'),
      created: now - 1200,
    },
  ];
};
