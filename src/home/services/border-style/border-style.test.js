import { buildStyle } from './border-style';

describe('Border Style Service', () => {
  it('should build proper styles for no border', () => {
    const borders = [];
    expect(buildStyle(borders)).toEqual({});
  });

  it('should build proper styles for single border', () => {
    const borders = [
      { width: 8, color: '#DC424E' }
    ];
    expect(buildStyle(borders)).toEqual({
      border: '8px solid #DC424E'
    });
  });

  it('should build proper styles for two borders', () => {
    const borders = [
      { width: 0, color: '#DC424E' },
      { width: 5, color: '#F2855A' }
    ];
    expect(buildStyle(borders)).toEqual({
      margin: '5px',
      border: '0 solid #DC424E',
      outline: '5px solid #F2855A'
    });
  });

  it('should build proper styles for multi borders', () => {
    const borders = [
      { width: 5, color: '#DC424E' },
      { width: 10, color: '#F2855A' },
      { width: 15, color: '#FDBF59' }
    ];
    expect(buildStyle(borders)).toEqual({
      margin: '30px',
      boxShadow: '0 0 0 5px #DC424E,0 0 0 15px #F2855A,0 0 0 30px #FDBF59'
    });
  });
});
