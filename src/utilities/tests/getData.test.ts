import getData from '../getData';

//@ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ id: 'someId' }),
  }),
);
describe('getData', () => {
  it('calls fetch', async () => {
    const { id } = await getData('some resource');
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(id).toMatch('someId');
  });
});
export {};
