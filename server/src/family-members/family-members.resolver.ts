//import { Query } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CreateFamilyMemberInput } from './dto/create-family-member.input';
import { UpdateFamilyMemberInput } from './dto/update-family-member.input';
import { FamilyMember } from './entities/family-member.entity';
import { FamilyMembersService } from './family-members.service';

@Resolver(of => FamilyMember)
export class FamilyMembersResolver {
    constructor(private familyMemberService: FamilyMembersService) {}

    @Query(returns => [FamilyMember])
    familyMembers(): Promise<FamilyMember[]> {
        return this.familyMemberService.findAll();
    }
    
    @Query(returns => FamilyMember)
    familyMemberById(@Args('id', { type: () => Int }) id: number) : Promise<FamilyMember> {
        return this.familyMemberService.findOneById(id)
    }

    @Mutation(returns => FamilyMember)
    createFamilyMember(@Args('createFamilyMemberInput') createFamilyMemberInput: CreateFamilyMemberInput) : Promise<FamilyMember> {
        return this.familyMemberService.create(createFamilyMemberInput);
    }

    @Mutation(returns => FamilyMember)
    updateFamilyMember(@Args('id', { type: () => Int }) id: number, @Args('updateFamilyMemberInput') updateFamilyMemberInput: UpdateFamilyMemberInput) : Promise<FamilyMember> {
        return this.familyMemberService.update(id, updateFamilyMemberInput);
    }

    //?? Add checks if note is not in database, can't return entity if not in db??
    @Mutation(returns => FamilyMember)
    deleteFamilyMemberById(@Args('id', { type: () => Int }) id: number): Promise<FamilyMember>  {
        const toBeDeletedFamilyMember = this.familyMemberService.findOneById(id);
        if(toBeDeletedFamilyMember) {
            this.familyMemberService.delete(id);
            return toBeDeletedFamilyMember;
        } else {
            return null;
        }
    
    }






    
    // @Query(returns => Familymember)
    // getFamilymember(): Familymember {
    //     return {
    //         id: 1,
    //         name: 'Jos'
    //     };
    // }


    // @Mutation(returns => FamilyMember)
    // createFamilyMember(
    //     @Args('createFamilyMemberInput') createFamilyMemberInput: CreateFamilyMemberInput,
    // ) {
    //     return this.familyMemberService.createFamilyMember(createFamilyMemberInput);
    // }
}
