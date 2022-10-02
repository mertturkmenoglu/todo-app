import { PaginationQuery } from './PaginationQuery';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Expose, Transform } from 'class-transformer';

export class TodoQuery extends PaginationQuery {
  @ApiPropertyOptional({
    default: null,
    name: 'completed',
  })
  @IsOptional()
  @Transform(({ value }) => (value === 'true' ? true : value === 'false' ? false : null))
  @IsBoolean()
  @Expose({ name: 'completed' })
  private readonly _completed?: boolean | null = null;

  @ApiPropertyOptional({
    default: null,
    name: 'searchTerm',
  })
  @IsOptional()
  @IsString()
  @Expose({ name: 'searchTerm' })
  private readonly _searchTerm?: string | null = null;

  get completed() {
    return this._completed ?? null;
  }

  get searchTerm() {
    return this._searchTerm ?? null;
  }
}
