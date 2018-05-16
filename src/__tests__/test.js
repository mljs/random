import randomChoice from '..';

import XSAdd from 'ml-xsadd';

describe('test random-choice', () => {
  it('should return all elements', () => {
    expect(randomChoice(13, { size: 13 }).sort()).toEqual([
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
    expect(function () {
      randomChoice([1, 2], { size: 3 });
    }).toThrow(/too large/);
  });

  it('should select elements without replacement', () => {
    const xsadd = new XSAdd(28);
    expect(
      randomChoice(10, { size: 10, random: xsadd.random })
    ).toMatchSnapshot();
  });

  it('should choose values with replacement', () => {
    const xsadd = new XSAdd(28);
    expect(
      randomChoice(10, { size: 20, random: xsadd.random, replace: true })
    ).toMatchSnapshot();
  });

  it('pass values as an array', () => {
    expect(
      randomChoice([1, 2, 3, 4, 5, 6, 7, 8, 9], {
        size: 9
      }).sort()
    ).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});
