import { sleep } from './common';

describe('sleep function', () => {
  it('delays the execution', async () => {
    const start = Date.now();
    await sleep(1000);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(1000);
  });

  it('works with default parameter', async () => {
    const start = Date.now();
    await sleep();
    const end = Date.now();
    expect(end - start).toBeLessThan(100);
  });
});
