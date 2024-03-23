export interface EntityFixture {
    load: () => void;
    flush: (d: any[]) => Promise<void>;
}