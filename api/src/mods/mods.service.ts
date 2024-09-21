import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MinioClientService } from 'src/minio/minio.service';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateModDto } from './dto/create-mod.dto';
import { UpdateModDto } from './dto/update-mod.dto';
import { ModPreview } from './entities/mod-preview.entity';
import { ModVersion, ModVersionStatus } from './entities/mod-version.entity';
import { Mod } from './entities/mod.entity';

@Injectable()
export class ModsService {
  constructor(
    @InjectRepository(Mod)
    private readonly repository: Repository<Mod>,
    @InjectRepository(ModVersion)
    private readonly modVersionRepository: Repository<ModVersion>,
    @InjectRepository(ModPreview)
    private readonly modPreviewRepository: Repository<ModPreview>,
    private readonly minioService: MinioClientService,
  ) {}

  async create(
    previews: Express.Multer.File[],
    file: Express.Multer.File,
    createDto: CreateModDto,
  ) {
    const createdMod = await this.repository.save({
      ...createDto,
      slug: createDto.name.replaceAll(' ', '-').toLowerCase(),
    });
    const uploadedVersionFileName = await this.uploadVersion(file);
    const version = createDto.version;
    delete createDto.version;
    const modVersion = await this.modVersionRepository.save({
      mod: createdMod,
      file: uploadedVersionFileName,
      version,
      status: ModVersionStatus.WAITING,
    });
    const previewsUpload = await this.uploadPreviews(previews);
    Promise.all(
      previewsUpload.map(async (data) => {
        await this.modPreviewRepository.save({
          modVersion,
          file: data.name,
        });
      }),
    );
    return { ...createdMod, modVersion: modVersion };
  }

  async uploadVersion(file: Express.Multer.File) {
    const { name } = await this.minioService.upload(
      file,
      process.env.MINIO_USER_BUCKET_VERSIONNING,
    );
    return name;
  }

  async uploadPreviews(files: Express.Multer.File[]) {
    const uploaded = await this.minioService.uploadMultiple(
      files,
      process.env.MINIO_USER_BUCKET_PREVIEW,
    );
    return uploaded;
  }

  findAll(options?: FindManyOptions<Mod>) {
    if (!options) return this.repository.find();
    return this.repository.find(options);
  }

  findOne(options: string | FindManyOptions<Mod>) {
    if (typeof options === 'string') {
      return this.repository.findOne({ where: { id: options } });
    } else {
      return this.repository.findOne(options);
    }
  }

  update(id: string, updateDto: UpdateModDto) {
    return this.repository.update(id, updateDto);
  }

  remove(id: string) {
    return this.repository.softDelete(id);
  }

  async getPreviewsFromVersion(id: string) {
    const version = await this.modVersionRepository.findOne({
      where: { id },
      relations: { previews: true },
    });
    const previews = await Promise.all(
      version.previews.map(
        async (preview) =>
          await this.minioService.getPublicUrl('previews', preview.file),
      ),
    );
    return previews;
  }
}
