import {Neuron} from './index';

Neuron.addWatcher({
  merge(mergeState, key) {},
  before(state, key) {},
  after(state, key) {},
});

const S = Neuron({
  state: {
    nice: 'a',
  },
})({
  getName(s, a: {id: string}, yet) {
    yet({
      state: {
        nice: '',
      },
    });
  },
  async good(s, a: {string: string; feawf: string}, yet) {
    yet({
      state: {
        nice: '',
      },
    });
    S.getName({
      id: '',
    });
    const time = await new Promise(() => {});
    yet({
      state: {
        nice: '',
      },
    });
  },
});

S.getName({
  id: '',
});
