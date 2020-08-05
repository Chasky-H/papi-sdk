export interface ATDSettings {
    Icon: string;
    ShowOrderDetails: boolean;
    SearchAll: boolean;
    ShareOrder: boolean;
    MainAction: {
        ID: string;
        Name: string;
    };
    OrderView: {
        ID: string;
        Name: string;
    };
    InventoryLimitation: {
        ID: string;
        Name: string;
    };
    CaseQuantityLimitation: {
        ID: string;
        Name: string;
    };
    Type: {
        ID: string;
        Name: string;
    };
    EPayment: any;
    OriginAccountsData: {
        IDs: string[];
        Label: string;
        AllTypes: boolean;
        UserAccount: boolean;
    };
    DestinationAccountsData: {
        IDs: string[];
        Label: string;
        AllTypes: boolean;
        UserAccount: boolean;
    };
    TransactionItemsScopeFilterID: string;
    TransactionLinesFilter: {
        AdvancedFormula: boolean;
        formula: string;
        participatingAPINames: string[];
    };
}
