import { WhackAMoleMessagePipe } from './whack-a-mole-message.pipe';

describe('AlertMessagePipe', () => {
  it('create an instance', () => {
    const pipe = new WhackAMoleMessagePipe();
    expect(pipe).toBeTruthy();
  });
});
