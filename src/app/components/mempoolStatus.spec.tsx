import { MempoolStatus } from "./mempoolStatus";
describe('mempool status', () => {
    it('renders false as pending', () => 
        expect(MempoolStatus.from(false).toDisplayString()).toContain('PENDING')
    );

    it('renders true as completed', () => 
        expect(MempoolStatus.from(true).toDisplayString()).toContain('COMPLETED')
    );

})