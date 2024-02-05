import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  goBackButton: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  goBackButtonText: {
    fontSize: 24,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 16,
  },
  settingsList: {
    marginTop: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  settingTextContainer: {
    flex: 1,
  },
  settingText: {
    fontSize: 16,
  },
  deleteProfileButton: {
    marginTop: 16,
    backgroundColor: '#AF002B',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteProfileText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default styles;