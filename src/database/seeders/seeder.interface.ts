export default interface EntitySeeder {
    init: () => void;
    checkIfTableIsEmpty: () => Promise<boolean>;
    startSeeding: () => void;
    seed: (data: unknown, owner: any) => void;
    deleteAll: () => void;
}