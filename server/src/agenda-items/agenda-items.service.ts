import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FamilyMember } from 'src/family-members/entities/family-member.entity';
import { FamilyMembersService } from 'src/family-members/family-members.service';
import { Repository } from 'typeorm';
import { CreateAgendaItemInput } from './dto/create-agenda-item.input';
import { UpdateAgendaItemInput } from './dto/update-agenda-item.input';
import { AgendaItem } from './entities/agenda-item.entity';

@Injectable()
export class AgendaItemsService {
    constructor(@InjectRepository(AgendaItem) private agendaItemRepository: Repository<AgendaItem>, private familyMemberService: FamilyMembersService) {};

    create(createAgendaItemInput: CreateAgendaItemInput): Promise<AgendaItem> {
        const newAgendaItem = this.agendaItemRepository.create(createAgendaItemInput);
        
        return this.agendaItemRepository.save(newAgendaItem);
    }

    findAll(): Promise<AgendaItem[]> {
        return this.agendaItemRepository.find();
    }

    findOneById(id: number): Promise<AgendaItem> {
        return this.agendaItemRepository.findOneOrFail(id);
    }

    // getInvitedFamilyMembers(id: number) {
    //     return this.agendaItemRepository
    //     .createQueryBuilder('familyMember')
    //     .leftJoinAndSelect('employee.invitedAgendaItems', 'invitedAgendaItems')
    //     .leftJoinAndSelect()
    // }
    
    async update(id: number, updateAgendaItemInput: UpdateAgendaItemInput): Promise<AgendaItem> {
        return this.agendaItemRepository.save({id: id, ...updateAgendaItemInput});
    }

    async delete(id: number): Promise<AgendaItem> {
        const note = await this.findOneById(id);

        return this.agendaItemRepository.remove(note);
    }

    getAuthor(authorId: number) : Promise<FamilyMember> {
        return this.familyMemberService.findOneById(authorId);
    }

    // getInvitedFamilyMembers(): Promise<FamilyMember[]> {

    // }

}
