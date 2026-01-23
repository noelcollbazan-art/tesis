import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {
    this.createDefaultAdmin();
  }

  // Crear usuario admin por defecto
  async createDefaultAdmin() {
    const adminExists = await this.userRepository.findOne({
      where: { username: 'admin' },
    });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin', 10);
      const admin = this.userRepository.create({
        username: 'admin',
        password: hashedPassword,
        role: 'admin',
      });
      await this.userRepository.save(admin);
      console.log('✅ Usuario admin creado: username=admin, password=admin');
    }
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { username: user.username, sub: user.id, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    };
  }

  async validateToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
