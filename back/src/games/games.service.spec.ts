import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { GamesService } from './games.service';
import { Game } from './entities/game.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockRepository = (): MockRepository => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  remove: jest.fn(),
});

describe('GamesService', () => {
  let service: GamesService;
  let repo: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GamesService,
        { provide: getRepositoryToken(Game), useValue: mockRepository() },
      ],
    }).compile();

    service = module.get<GamesService>(GamesService);
    repo = module.get(getRepositoryToken(Game));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a game', async () => {
    const dto: CreateGameDto = { title: 'A', description: 'B', featured: false } as any;
    const created = { id: 1, ...dto, createdAt: new Date() } as Game;

    repo.create!.mockReturnValue(created);
    repo.save!.mockResolvedValue(created);

    const result = await service.create(dto);
    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalledWith(created);
    expect(result).toEqual(created);
  });

  it('should return all games', async () => {
    const games = [{ id: 1 } as Game];
    repo.find!.mockResolvedValue(games);

    const result = await service.findAll();
    expect(repo.find).toHaveBeenCalledWith({ order: { createdAt: 'DESC' } });
    expect(result).toEqual(games);
  });

  it('should return one game by id', async () => {
    const game = { id: 1 } as Game;
    repo.findOne!.mockResolvedValue(game);

    const result = await service.findOne(1);
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(game);
  });

  it('should throw NotFoundException when game not found', async () => {
    repo.findOne!.mockResolvedValue(null);
    await expect(service.findOne(999)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('should update a game', async () => {
    const existing = { id: 1, title: 'Old' } as Game;
    const dto: UpdateGameDto = { title: 'New' } as any;
    const updated = { ...existing, ...dto } as Game;

    repo.findOne!.mockResolvedValue(existing);
    repo.save!.mockResolvedValue(updated);

    const result = await service.update(1, dto);
    expect(repo.save).toHaveBeenCalledWith(updated);
    expect(result).toEqual(updated);
  });

  it('should remove a game', async () => {
    const existing = { id: 1 } as Game;
    repo.findOne!.mockResolvedValue(existing);
    repo.remove!.mockResolvedValue(existing);

    await expect(service.remove(1)).resolves.toBeUndefined();
    expect(repo.remove).toHaveBeenCalledWith(existing);
  });

  it('should find featured games', async () => {
    const featured = [{ id: 2, featured: true } as Game];
    repo.find!.mockResolvedValue(featured);

    const result = await service.findFeatured();
    expect(repo.find).toHaveBeenCalledWith({
      where: { featured: true },
      order: { createdAt: 'DESC' },
    });
    expect(result).toEqual(featured);
  });
});

