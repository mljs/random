import Random from '..';

let random: Random;
describe('test random', () => {
  beforeEach(() => {
    random = new Random(28);
  });
  it('should return all elements', () => {
    expect(random.choice(13, { size: 13 }).sort((a, b) => a - b)).toEqual([
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12
    ]);
  });

  it('should throw because size option is too large', () => {
    expect(function() {
      random.choice(2, { size: 3 });
    }).toThrow(/too large/);
  });

  it('should select elements without replacement', () => {
    expect(random.choice(10, { size: 10 })).toMatchSnapshot();
  });

  it('should choose values with replacement', () => {
    expect(random.choice(10, { size: 20, replace: true })).toMatchSnapshot();
  });

  it('pass values as an array', () => {
    expect(
      random
        .choice([1, 2, 3, 4, 5, 6, 7, 8, 9], {
          size: 9
        })
        .sort()
    ).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});
