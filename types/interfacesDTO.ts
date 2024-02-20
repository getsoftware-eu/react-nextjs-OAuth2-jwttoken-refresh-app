interface AssetDTO {
    entityId: number;
    name: string;
    ownerId: number | null;
    editorId: number | null;
    vertreterId: number | null;
    saStatus: string | null;
    sbStatus: string | null;
    beschreibung: string;
    // canEdit: boolean;
}

 interface UserDTO {
     entityId: string;
     name: string;
     username: string;
 }
 
 export type {AssetDTO, UserDTO}
