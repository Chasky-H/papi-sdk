export interface Addon {
    UUID?: string;
    Name?: string;
    Description?: string;
    SystemData?: any;
    Hidden?: boolean;
    Type?: number;
}

export interface InstalledAddon {
    Addon: Addon;
    Version?: string;
    AdditionalData?: string;
    UUID?: string;
    Name?: string;
    Description?: string;
    SystemData?: any;
    Hidden?: boolean;
    Type?: number;
}

export interface AddonVersion {
    UUID?: string;
    Hidden?: boolean;
    CreationDateTime?: Date;
    ModificationDateTime?: Date;
    Version: string;
    Description?: string;
    Available?: boolean;
    Phased?: boolean;
    StartPhasedDateTime?: Date;
    AddonUUID: string;
    PhasedFunction?: string;
}

export interface AddonAPIAsyncResult {
    ExecutionUUID?: string;
    URI?: string;
}

export interface AddonAPISyncResult {
    success?: boolean;
    errorMessage?: string;
}

export interface AddonData {
    Hidden?: boolean;
    CreationDateTime?: string;
    ModificationDateTime?: string;
    Key?: string;
    [key: string]: any;
}

export interface AddonDataScheme {
    Hidden?: boolean;
    CreationDateTime?: string;
    ModificationDateTime?: string;
    Name: string;
    Type?: 'data' | 'meta_data' | 'cpi_meta_data' | 'indexed_data';
    Fields?: {
        [key: string]: {
            Type: 'String' | 'Bool' | 'Integer' | 'MultipleStringValues';
        };
    };
    Validator?: string;
}

type RelationType = 'AddonAPI' | 'NgComponent' | 'Navigation';

export interface Relation extends AddonData {
    Description?: string;
    AddonRelativeURL?: string;
    Type: RelationType;
    AddonUUID: string;
    Name: string;
    RelationName: string;
    SubType?: string;
    ComponentName?: string;
    ModuleName?: string;
    [key: string]: any;
}
