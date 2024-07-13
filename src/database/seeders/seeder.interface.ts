export default interface EntitySeeder {
    init: () => void;
    checkIfTableIsEmpty: () => Promise<boolean>;
    startSeeding: () => void;
    seed: (data: { email: string, hashed_password: string, username: string }) => void;
    deleteAll: () => void;
}