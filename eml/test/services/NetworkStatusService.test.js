import { NetworkStatusService } from '../../services/NetworkStatusService';
import io from 'socket.io-client';

jest.mock('socket.io-client', () => {
    const emitEvent = jest.fn();
    const mockSocket = {
        on: jest.fn((event, callback) => {
            emitEvent[event] = callback;
        }),
        emit: emitEvent,
        // Add other necessary mocks here
    };
    return jest.fn(() => mockSocket);
});

describe('NetworkStatusService', () => {
    let service;
    let mockSocket;

    beforeEach(() => {
        // Reset the instance for each test to ensure isolation
        NetworkStatusService.instance = null;
        service = NetworkStatusService.getInstance();
        mockSocket = io();
    });

    it('should always return the same instance', () => {
        const anotherInstance = NetworkStatusService.getInstance();
        expect(service).toBe(anotherInstance);
    });

    it('should add and notify observers correctly', () => {
        const mockObserver = {update: jest.fn()};
        service.addObserver(mockObserver);
        service.updateNetworkStatus(true);
        expect(mockObserver.update).toHaveBeenCalledWith(true);
    });

    it('should update status to online when WebSocket connects', () => {
        mockSocket.emit['connect']();
        expect(service.isOnline).toBeTruthy();
    });

    it('should update status to offline when WebSocket disconnects', () => {
        mockSocket.emit['disconnect']();
        expect(service.isOnline).toBeFalsy();
    });

    it('should notify observers on network status change', () => {
        const mockObserver = { update: jest.fn() };
        service.addObserver(mockObserver);

        mockSocket.emit['connect']();
        expect(mockObserver.update).toHaveBeenCalledWith(true);

        mockSocket.emit['disconnect']();
        expect(mockObserver.update).toHaveBeenCalledWith(false);
    });

    it('should not notify observers if status is updated to the same value', () => {
        const mockObserver = { update: jest.fn() };
        service.addObserver(mockObserver);

        // Simulate initial connection
        mockSocket.emit['connect']();
        expect(mockObserver.update).toHaveBeenCalledWith(true);

        // Reset the mock function for the observer
        mockObserver.update.mockReset();

        // Simulate another connection event with the same status
        mockSocket.emit['connect']();
        expect(mockObserver.update).not.toHaveBeenCalled();
    });
});
