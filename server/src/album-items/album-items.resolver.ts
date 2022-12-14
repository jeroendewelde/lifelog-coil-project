import { 
  Resolver, 
  Query, 
  Mutation, 
  Args, 
  Int, 
  Parent, 
  ResolveField 
} from '@nestjs/graphql';
import { AlbumItemsService } from './album-items.service';
import { AlbumItem } from './entities/album-item.entity';
import { CreateAlbumItemInput } from './dto/create-album-item.input';
import { UpdateAlbumItemInput } from './dto/update-album-item.input';
import { FamilyMember } from 'src/family-members/entities/family-member.entity';
import { FamilyMemberInAlbumItem } from 'src/family-member-in-album-items/entities/family-member-in-album-item.entity';

@Resolver((of) => AlbumItem)
export class AlbumItemsResolver {
  constructor(
    private readonly albumItemsService: AlbumItemsService
  ) {}

  @Mutation(() => AlbumItem)
  createAlbumItem(@Args('createAlbumItemInput') createAlbumItemInput: CreateAlbumItemInput) {
    return this.albumItemsService.create(createAlbumItemInput);
  }

  @Query(() => [AlbumItem], { name: 'albumItems' })
  albumItems() {
    return this.albumItemsService.findAll();
  }

  @Query(() => AlbumItem, { name: 'albumItem' })
  albumItemById(@Args('id', { type: () => Int }) id: number) {
    return this.albumItemsService.findOneById(id);
  }

  @Query((returns) => [AlbumItem], { name: "albumItemsByAuthor" })
  albumtemsByAuthor(@Args("authorId", { type: () => Int }) authorId: number) {
    return this.albumItemsService.findAllByAuthor(authorId);
  }

  @Query((returns) => [AlbumItem], { name: "albumItemsByPeopleIfollow" })
  async albumItemsByFamilyMembersIFollow(
    @Args('familyMemberId', { type: () => Int }) 
    familyMemberId: number
  ): Promise<AlbumItem[]> {
    console.log('albumItems.......', await this.albumItemsService.findAllByFamilyMemberIFollow(familyMemberId) );
    return this.albumItemsService.findAllByFamilyMemberIFollow(familyMemberId);
  }

  @ResolveField(returns => FamilyMember)
  uploader(@Parent() albumItem: AlbumItem): Promise<FamilyMember> {
      return this.albumItemsService.getUploader(albumItem.uploaderId);
  }

  @ResolveField((returns) => [FamilyMemberInAlbumItem])
  inAlbumItem( @Parent() albumItem: AlbumItem): Promise<any> {
    return this.albumItemsService.getInvolvedFamilyMembers(albumItem.id);
  }

  @Mutation(() => AlbumItem)
  updateAlbumItem(@Args('id', { type: () => Int }) id: number, @Args('updateAlbumItemInput') updateAlbumItemInput: UpdateAlbumItemInput) {
    return this.albumItemsService.update(id, updateAlbumItemInput);
  }

  @Mutation(() => AlbumItem)
  deleteAlbumItem(@Args('id', { type: () => Int }) id: number) {
    const toBeDeletedAlbumItem = this.albumItemsService.findOneById(id);
    if(toBeDeletedAlbumItem) {
        this.albumItemsService.delete(id);
        return toBeDeletedAlbumItem;
    } else {
        return null;
    }
  }
}
