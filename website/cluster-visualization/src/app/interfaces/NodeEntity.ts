export interface NodeEntity {
    name: string;
    myState: string;
    isOnline: boolean;
    
    heartbeatIntervalMillis: number;
    
    electionTimeoutMillis: number;
    lastElectionDate: string;
    votingMembersCount: number;
    lastElectionReason: string;
    
}