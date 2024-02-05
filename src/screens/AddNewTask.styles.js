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
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  taskCategoryButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  taskCategoryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  tasksContainer: {
    flex: 1,
    marginBottom: 20,
  },
  tasksTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  locationText: {
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 5,
  },
  addButtonLabel: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  boardsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  boardItem: {
    backgroundColor: '#eee',
    padding: 16,
    margin: 8,
    borderRadius: 8,
    width: '45%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedBoard: {
    borderWidth:2,
    padding:14,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  boardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'white',
  },
});

export default styles;