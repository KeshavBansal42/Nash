import { error } from "node:console";
import { AddMemberRequestDTO } from "./dtos/add-member.dto.js";
import { CreateGroupRequestDTO } from "./dtos/create-group.dto.js"
import { GroupResponseDTO } from "./dtos/group-response.dto.js"
import { MemberResponseDTO } from "./dtos/member-response.dto.js";
import * as groupsRepo from "./groups.repository.js"

export const createGroup = async (
    creatorID: string,
    input: CreateGroupRequestDTO
): Promise<GroupResponseDTO> => {
    const newGroup = await groupsRepo.createGroup(input.name, input.description, creatorID);

    return {
        id: newGroup.id,
        name: newGroup.name,
        description: newGroup.description,
        created_at: newGroup.created_at,
        created_by: newGroup.created_by
    };
}

export const getGroupById = async (
    input: string
): Promise<GroupResponseDTO> => {
    const requestedGroup = await groupsRepo.getGroupById(input);

    return {
        id: requestedGroup.id,
        name: requestedGroup.name,
        description: requestedGroup.description,
        created_at: requestedGroup.created_at,
        created_by: requestedGroup.created_by,
        members: requestedGroup.members
    };
}

export const addMember = async (
    userID: string,
    groupId: string,
    input: AddMemberRequestDTO
): Promise<MemberResponseDTO> => {
    const isAdmin = await groupsRepo.isAdmin(groupId, userID);
    if (!isAdmin) {
        throw new Error("Only admins can add members");
    }
    const newMember = await groupsRepo.addMember(groupId, input.username);
    return {
        username: newMember.username,
        email: newMember.email,
        role: newMember.role
    };
}