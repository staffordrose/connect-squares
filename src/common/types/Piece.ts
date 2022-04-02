export type PieceType = 'f' | 'x' | 'y' | 'r' | 'xy' | 'xr' | 'yr' | 'xyr';

export interface Piece {
  type: PieceType;
  connectors: number[];
  rotate: number;
}
