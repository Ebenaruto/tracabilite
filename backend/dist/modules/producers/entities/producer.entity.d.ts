export declare enum ProducerType {
    INDIVIDUAL = "individual",
    COOPERATIVE = "cooperative",
    GROUP = "group"
}
export declare enum ProducerStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    SUSPENDED = "suspended"
}
export declare class Producer {
    id: string;
    referenceCode: string;
    fullName: string;
    type: ProducerType;
    registryNumber: string;
    phone: string;
    email: string;
    address: {
        street?: string;
        city?: string;
        region?: string;
        country?: string;
        postalCode?: string;
    };
    certifications: Array<{
        type: string;
        number: string;
        issuer: string;
        issueDate: Date;
        expiryDate: Date;
        documentUrl?: string;
    }>;
    status: ProducerStatus;
    contractStartDate: Date;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
