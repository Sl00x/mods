import { Repository } from 'typeorm';

interface ManyToManyOptions<T> {
  dto: any;
  dtoKey: string;
  relationKey: string;
  relatedService: { findOne: (value: string) => Promise<any> };
  mainRepository: Repository<T>;
}

export async function createWithManyToManyRelations<T>({
  dto,
  dtoKey,
  relationKey,
  relatedService,
  mainRepository,
}: ManyToManyOptions<T>): Promise<T> {
  const ids = dto[dtoKey] as string[];
  if (ids) {
    const relatedEntities = await Promise.all(
      ids.map(async (id: string) => {
        return relatedService.findOne(id);
      }),
    );
    delete dto[dtoKey];
    return mainRepository.save({
      ...dto,
      [relationKey]: relatedEntities,
    });
  }
}
