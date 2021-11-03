import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FamilyMember } from 'src/family-members/entities/family-member.entity';
import { FamilyMembersService } from 'src/family-members/family-members.service';
import { Repository } from 'typeorm';
import { CreateWishListItemInput } from './dto/create-wish-list-item.input';
import { UpdateWishListItemInput } from './dto/update-wish-list-item.input';
import { WishListItem } from './entities/wish-list-item.entity';

@Injectable()
export class WishListItemsService {
    constructor(@InjectRepository(WishListItem) private wishListItemRepository: Repository<WishListItem>, private familyMemberService: FamilyMembersService) {};
  
    create(createWishListItemInput: CreateWishListItemInput): Promise<WishListItem> {
        const newWishListItem = this.wishListItemRepository.create(createWishListItemInput);
        
        return this.wishListItemRepository.save(newWishListItem);
    }

    findAll(): Promise<WishListItem[]> {
        return this.wishListItemRepository.find();
    }

    findOneById(id: number) {
        return this.wishListItemRepository.findOneOrFail(id);
    }

    async update(id: number, updateWishListItemInput: UpdateWishListItemInput): Promise<WishListItem> {
        return this.wishListItemRepository.save({ id: id, ...updateWishListItemInput })
    }

    async delete(id: number): Promise<WishListItem> {
        const albumItem = await this.findOneById(id);

        return this.wishListItemRepository.remove(albumItem);
    }

    getUploader(uploaderId: number): Promise<FamilyMember> {
        return this.familyMemberService.findOneById(uploaderId);
    }
}
