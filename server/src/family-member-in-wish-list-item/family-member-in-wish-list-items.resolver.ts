import { 
  Resolver, 
  Query, 
  Mutation, 
  Args, 
  Int 
} from '@nestjs/graphql';
import { FamilyMemberInWishListItemsService } from './family-member-in-wish-list-items.service';
import { FamilyMemberInWishListItem } from './entities/family-members-in-wish-list-item.entity';
import { CreateFamilyMemberInWishListItemInput } from './dto/create-family-member-in-wish-list-item.input';

@Resolver(() => FamilyMemberInWishListItem)
export class FamilyMemberInWishListItemsResolver {
  constructor(
    private readonly FamilyMemberInWishListItemService: FamilyMemberInWishListItemsService
  ) {}

  @Mutation(() => FamilyMemberInWishListItem)
  createFamilyMemberInWishListItem(
    @Args('createFamilyMemberInWishListItemInput') 
    createFamilyMemberInWishListItemInput: CreateFamilyMemberInWishListItemInput
  ) {
    return this.FamilyMemberInWishListItemService.create(createFamilyMemberInWishListItemInput);
  }

  @Query(() => [FamilyMemberInWishListItem], { name: 'FamilyMemberInWishListItem' })
  findAll() {
    return this.FamilyMemberInWishListItemService.findAll();
  }

  @Query(() => FamilyMemberInWishListItem, { name: 'FamilyMemberInWishListItem' })
  findOne(
    @Args('id', { type: () => Int }) 
    id: number
  ) {
    return this.FamilyMemberInWishListItemService.findOneById(id);
  }

  // Check if it works?
  @Query(() => [FamilyMemberInWishListItem], { name: 'FamilyMembersInvolvedInWishListItem' })
  findFamilyMembersInvolvedInWishListItem(
    @Args('id', { type: () => Int }) 
    id: number
  ) {
    return this.FamilyMemberInWishListItemService.getInvolvedFamilyMembers(id)
}

//   @Mutation(() => FamilyMemberInWishListItem)
//   updateFamilyMemberInWishListItem(@Args('updateFamilyMemberInWishListItemInput') updateFamilyMemberInWishListItemInput: UpdateFamilyMemberInWishListItemInput) {
//     return this.FamilyMemberInWishListItemService.update(updateFamilyMemberInWishListItemInput.id, updateFamilyMemberInWishListItemInput);
//   }

  @Mutation(() => FamilyMemberInWishListItem)
  removeFamilyMemberInWishListItem(@Args('id', { type: () => Int }) id: number) {
    return this.FamilyMemberInWishListItemService.delete(id);
  }
}
