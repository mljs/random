import * as XSAdd from 'ml-xsadd';
import Random from '..';

let random: Random;
describe('random.choice', () => {
  beforeEach(() => {
    random = new Random(28);
  });
  it('should return all elements', () => {
    random = new Random();
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
    expect(() => {
      random.choice(2, { size: 3 });
    }).toThrow(/too large/);
  });

  it('should select elements without replacement', () => {
    const xsadd = new XSAdd(28);
    random = new Random(xsadd.random);
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

describe('random.random', () => {
  it('should generate random numbers', () => {
    random = new Random(14);
    const r = [];
    for (let i = 0; i < 10; i++) {
      r.push(random.random());
    }
    expect(r).toMatchSnapshot();
  });
});
