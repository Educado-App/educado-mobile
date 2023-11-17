import NetInfo from "@react-native-community/netinfo";
import { NetworkStatusService } from '../../services/NetworkStatusService';

jest.mock('@react-native-community/netinfo');

let netInfoCallback;

describe('NetworkStatusService', () => {
    NetInfo.addEventListener.mockImplementation(callback => {
        netInfoCallback = callback;
        return jest.fn();
    });

    beforeEach(() => {
        jest.resetModules();
    });

    test('should implement singleton pattern', () => {
        const instance1 = NetworkStatusService.getInstance();
        const instance2 = NetworkStatusService.getInstance();
        expect(instance1).toBe(instance2);
    });

    test('should add and remove observers', () => {
        const service = NetworkStatusService.getInstance();
        const observer = { update: jest.fn() };

        // Add observer and simulate a network change
        service.addObserver(observer);
        netInfoCallback({ isConnected: true }); // Assuming netInfoCallback is your mock function
        expect(observer.update).toHaveBeenCalledWith(true); // Check if observer is notified

        // Remove observer and simulate another network change
        service.removeObserver(observer);
        observer.update.mockClear(); // Clear previous calls to update
        netInfoCallback({ isConnected: false });
        expect(observer.update).not.toHaveBeenCalled(); // Observer should not be notified this time
    });

    test('should get correct isOnline status', () => {
        const service = NetworkStatusService.getInstance();
        expect(service.isOnline).toEqual(expect.any(Boolean));
    });

    test('should update and notify observers on network change', async () => {
        const service = NetworkStatusService.getInstance();
        const observer = { update: jest.fn() };
        service.addObserver(observer);

        // Simulate network change to true
        netInfoCallback({ isConnected: true });
        await new Promise(setImmediate); // Wait for the event loop to process the change
        expect(observer.update).toHaveBeenCalledWith(true);

        // Simulate network change to false
        netInfoCallback({ isConnected: false });
        await new Promise(setImmediate); // Wait again
        expect(observer.update).toHaveBeenCalledWith(false);
    });
});