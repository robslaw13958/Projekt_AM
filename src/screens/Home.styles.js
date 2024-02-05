import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  avatarContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 50,
    overflow: 'hidden',
    marginLeft: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  taskButtonsContainer: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  completedButton: {
    flex:1,
    marginHorizontal:5,
    backgroundColor: '#00AF5B',
    paddingVertical: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pendingButton: {
    flex:1,
    marginHorizontal:5,
    backgroundColor: '#005BAF',
    paddingVertical: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  canceledButton: {
    flex:1,
    marginHorizontal:5,
    backgroundColor: '#AF002B',
    paddingVertical: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskCategoryButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '900',
  },
  taskCategoryButtonCounterText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 35,
    fontWeight: '900',
  },
  taskCounterText: {
    fontSize: 35,
    textAlign: 'center',
  },
  tasksContainer: {
    flex: 4,
    marginBottom: 20,
  },
  tasksTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalList: {
    height:'75%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    marginTop:10,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default styles;