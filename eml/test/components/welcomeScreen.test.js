import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useWelcomeScreenLogic } from "../../App"; // Update the import path as needed

// Mock AsyncStorage functions
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe("App", () => {
  it("should set initialRoute to WelcomeStack when hasShownWelcome is false", async () => {
    AsyncStorage.getItem.mockResolvedValueOnce("false");

    function TestComponent() {
      const { initialRoute, isLoading } = useWelcomeScreenLogic();

      // Use waitFor to wait for the asynchronous operations to complete
      waitFor(() => {
        // Your assertions here
        expect(initialRoute).toBe("WelcomeStack");
        expect(isLoading).toBe(false);
      });

      return null;
    }

    render(<TestComponent />);
  });

  it("should set initialRoute to LoginStack when hasShownWelcome is true", async () => {
    AsyncStorage.getItem.mockResolvedValueOnce("true");

    function TestComponent() {
      const { initialRoute, isLoading } = useWelcomeScreenLogic();

      // Use waitFor to wait for the asynchronous operations to complete
      waitFor(() => {
        // Your assertions here
        expect(initialRoute).toBe("LoginStack");
        expect(isLoading).toBe(false);
      });

      return null;
    }

    render(<TestComponent />);
  });

  it("should handle errors when AsyncStorage operations fail", async () => {
    AsyncStorage.getItem.mockRejectedValueOnce(new Error("AsyncStorage error"));

    function TestComponent() {
      const { initialRoute, isLoading } = useWelcomeScreenLogic();

      // Use waitFor to wait for the asynchronous operations to complete
      waitFor(() => {
        // Your assertions here for error handling
        expect(initialRoute).toBe("");
        expect(isLoading).toBe(true);
      });

      return null;
    }

    render(<TestComponent />);
  });
});
