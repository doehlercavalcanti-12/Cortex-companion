import toobusy from 'toobusy-js';

afterAll(() => {
  if (toobusy.started) {
    toobusy.shutdown();
  }
});
