import { Maybe, Just, Nothing } from '../src/maybe';

describe('Maybe', () => {
  describe('Nothing', () => {
    describe('map', () => {
      test('it disregards the mapper and returns a Nothing', () => {
        expect(Nothing<number>().map((x: number) => x + 2)).toEqual(Nothing());
      });
    });

    describe('flatMap', () => {
      describe('with a mapper that returns Nothing', () => {
        test('it disregards the mapper and returns a Nothing', () => {
          expect(Nothing<number>().flatMap((_: number) => Nothing())).toEqual(
            Nothing()
          );
        });
      });

      describe('with a mapper that returns Just', () => {
        test('it disregards the mapper and returns a Nothing', () => {
          expect(Nothing<number>().flatMap((_: number) => Just(2))).toEqual(
            Nothing()
          );
        });
      });
    });

    describe('getOrThen', () => {
      test('it returns the value', () => {
        expect(Nothing().getOrThen(() => 0)).toEqual(0);
      });
    });

    describe('getOrElse', () => {
      test('it returns the fallback value', () => {
        expect(Nothing().getOrElse(0)).toEqual(0);
      });
    });
  });

  describe('Just', () => {
    describe('map', () => {
      test('it runs the mapper and re-wraps in a Just', () => {
        expect(Just(3).map((x: number) => x + 2)).toEqual(Just(5));
      });
    });

    describe('flatMap', () => {
      describe('with a mapper that returns Nothing', () => {
        test('it returns a Nothing', () => {
          expect(Just(3).flatMap((_: number) => Nothing())).toEqual(Nothing());
        });
      });

      describe('with a mapper that returns Just', () => {
        test('it returns the Just from the mapper', () => {
          expect(Just(3).flatMap((_: number) => Just(16))).toEqual(Just(16));
        });
      });
    });

    describe('getOrThen', () => {
      test('it returns the value', () => {
        expect(Just(3).getOrThen(() => 0)).toEqual(3);
      });
    });

    describe('getOrElse', () => {
      test('it returns the value', () => {
        expect(Just(3).getOrElse(0)).toEqual(3);
      });
    });
  });

  describe('fromNullable', () => {
    describe('when passed a null or undefined value', () => {
      test('it returns a Nothing', () => {
        expect(Maybe.fromNullable(undefined)).toEqual(Nothing());
        expect(Maybe.fromNullable(null)).toEqual(Nothing());
      });
    });

    describe('when passed a valid value', () => {
      test('it returns a Just', () => {
        expect(Maybe.fromNullable("Test")).toEqual(Just("Test"));
        expect(Maybe.fromNullable(123)).toEqual(Just(123));
      });
    });
  });
});
