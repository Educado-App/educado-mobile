import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    alignItems: 'center',
    backgroundColor: '#E4F2F5',
  },
  formButton: {
    backgroundColor: 'hsl(0, 0%, 92%)',
    height: 55,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'hsl(0, 0%, 92%)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 12, // Add 12px spacing between buttons
  },
  text: {
    fontSize: 30,
    color: '#383838',
    textAlign: 'center',
  },
  tinyLogo: {
    flex: 1,
    alignItems: 'center',
    width: 50,
    height: 50,
    color: '#5ECCE9',
  },
});
