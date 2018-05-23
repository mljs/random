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

  it('should produce choice given probabilities', () => {
    const samples = 10000;
    const r = random.choice(2, {
      size: samples,
      replace: true,
      probabilities: [0.3, 0.7]
    });
    const count = r.reduce(
      (prev, current) => (current === 0 ? prev + 1 : prev),
      0
    );
    expect(count / samples).toBeCloseTo(0.3, 2);
  });

  it('should throw if probabilities option has the wrong size', () => {
    expect(() => {
      random.choice(3, { replace: true, probabilities: [0.5, 0.5] });
    }).toThrow(
      'the length of probabilities option should be equal to the number of choices'
    );
  });

  it('should throw if probabilities option does not sum to 1', () => {
    expect(() => {
      random.choice(3, { replace: true, probabilities: [0.1, 0.5, 0.4001] });
    }).toThrow('probabilities should sum to 1');
  });

  it('choice with probabilities and no replacement not implemented', () => {
    expect(() => {
      random.choice(3, { replace: false, probabilities: [0.1, 0.5, 0.4] });
    }).toThrow(/not implemented/);
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
