import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign:'center',
  },
  profileItem: {
    width: '45%',
    marginBottom: 16,
    padding: 16,
    margin: 8,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: '70%',
    height: '70%',
    borderRadius: 100,
    marginBottom: 10,
  },
  username: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;