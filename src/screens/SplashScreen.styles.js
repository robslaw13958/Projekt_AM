import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 200,
    resizeMode: 'contain',
  },
  description: {
    marginTop: 20,
    fontSize: 20,
    textAlign: 'center',
    color: '#555',
  },
  loginButton: {
    paddingVertical: 20,
    width:300,
    borderRadius: 15,
    marginTop: 35,
    backgroundColor: '#00AF5B',
  },
  registerButton: {
    paddingVertical: 10,
    width:120,
    borderRadius: 15,
    marginTop: 15,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  registerButtonText: {
    color: '#00AF5B',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default styles;