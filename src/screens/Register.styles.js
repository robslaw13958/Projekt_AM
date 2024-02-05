import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    paddingTop:'35%',
    paddingBottom:'50%',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  avatarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    backgroundColor: '#f9fafd',
    marginBottom: 20,
    borderRadius:25,
    justifyContent: 'center',
  },
  
  avatar: {
    width: '25%',
    aspectRatio: 1,
    borderRadius: 25,
    margin: '2%',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  selectedAvatar: {
    borderColor: '#007BFF',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
  input: {
    width: '100%',
    backgroundColor: '#f9fafd',
    height: 60,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 10,
    paddingLeft: 20,
  },
  registerButton: {
    backgroundColor: '#00AF5B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default styles;