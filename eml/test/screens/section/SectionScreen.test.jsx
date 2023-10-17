import  React  from "react";
import renderer from "react-test-renderer";
import SectionScreen from "../../../screens/section/SectionScreen";
import SectionCard from "../../../components/section/SectionCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

let navigated = false;
let mockNavigation = {
    goBack: jest.fn(),
    navigate: jest.fn(),
  };

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
        mockNavigation,
        navigate: jest.fn (() => {navigated = true}),
        }),
}));



let sectionScreen;

beforeEach(() => {
    navigated = false;
    AsyncStorage.clear();
});

afterAll(() => {
    jest.resetModules();
    jest.restoreAllMocks();
});

describe('SectionScreen', () => {
    const route = {
        params: {
            courseId: 1,
        }
    };
    const sections = [
        {
            id: 1,
            title: "Section 1",
            description: "Description for section 1",
            total: 10,
        },
        {
            id: 2,
            title: "Section 2",
            description: "Description for section 2",
            total: 10,
        },
    ];
    test('Renders section screen with sections loaded', async () => { 
        const StorageService = require("../../../services/StorageService");
        jest.spyOn(StorageService, "getSectionList").mockResolvedValue(sections);
        await renderer.act(async () => {
          return sectionScreen = renderer.create(<SectionScreen route={route}/>);
        })
        expect(sectionScreen.root.findAllByType(SectionCard)).toHaveLength(2);
        expect(sectionScreen.toJSON()).toMatchSnapshot();
    });


    describe('unsubAlert', () => {
        test('should call unsub function when "Sim" is pressed', () => {
            const unsubAlert = () => {
                Alert.alert("Cancelar subscrição", "Tem certeza?", [
                  {
                    text: "Não",
                    onPress: () => console.log("No Pressed"),
                    style: "cancel",
                  },
                  { text: "Sim", onPress: unsub },
                ]);
              };
          const unsub = jest.fn();
          const alert = jest.spyOn(Alert, 'alert');
          alert.mockImplementation((_, __, buttons) => buttons[1].onPress());
          unsubAlert();
          expect(alert).toHaveBeenCalled();
          expect(unsub).toHaveBeenCalled();
          alert.mockRestore();
        });
      
        test('should not call unsub function when "Não" is pressed', () => {
          const unsubAlert = () => {
                Alert.alert("Cancelar subscrição", "Tem certeza?", [
                  {
                    text: "Não",
                    onPress: () => console.log("No Pressed"),
                    style: "cancel",
                  },
                  { text: "Sim", onPress: unsub },
                ]);
              };
          const unsub = jest.fn();  
          const alert = jest.spyOn(Alert, 'alert');
          alert.mockImplementation((_, __, buttons) => buttons[0].onPress());
          unsubAlert();
          expect(alert).toHaveBeenCalled();
          expect(unsub).not.toHaveBeenCalled();
          alert.mockRestore();
        });
      });
});

