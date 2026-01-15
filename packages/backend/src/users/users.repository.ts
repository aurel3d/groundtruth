import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  /**
   * Find a user by their email address
   * @param email - The email address to search for
   * @returns The user if found, null otherwise
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }

  /**
   * Find a user by their unique ID
   * @param id - The user ID to search for
   * @returns The user if found, null otherwise
   */
  async findById(id: string): Promise<User | null> {
    return this.repository.findOne({ where: { id } });
  }

  /**
   * Find a user by ID including their password hash
   * NOTE: Use only when password verification is required (e.g., login, password change)
   * @param id - The user ID to search for
   * @returns The user with password hash if found, null otherwise
   */
  async findByIdWithPassword(id: string): Promise<User | null> {
    return this.repository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .addSelect('user.passwordHash')
      .getOne();
  }

  /**
   * Find a user by email including their password hash
   * NOTE: Use only when password verification is required (e.g., login, password change)
   * @param email - The email address to search for
   * @returns The user with password hash if found, null otherwise
   */
  async findByEmailWithPassword(email: string): Promise<User | null> {
    return this.repository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect('user.passwordHash')
      .getOne();
  }

  /**
   * Create a new user in the database
   * @param userData - Partial user data for creating the new user
   * @returns The newly created user
   */
  async create(userData: Partial<User>): Promise<User> {
    const user = this.repository.create(userData);
    return this.repository.save(user);
  }

  /**
   * Update an existing user's data
   * @param id - The ID of the user to update
   * @param userData - Partial user data containing fields to update
   * @returns The updated user if found, null otherwise
   */
  async update(id: string, userData: Partial<User>): Promise<User | null> {
    await this.repository.update(id, userData);
    return this.findById(id);
  }

  /**
   * Delete a user from the database
   * @param id - The ID of the user to delete
   */
  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
