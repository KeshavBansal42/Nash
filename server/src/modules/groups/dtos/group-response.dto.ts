import { Member } from "../groups.model.js";

export interface GroupResponseDTO {
    id: string;
    name: string;
    description: string;
    created_at: Date;
    created_by: string;
    members?: Array<Member>;
}
