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
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  avatarContainer: {
    marginLeft: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  timerContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  timerMode: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  timerButton: {
    backgroundColor: '#005BAF',
    padding: 12,
    borderRadius: 8,
  },
  timerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tasksContainer: {
    marginTop: 32,
  },
  tasksHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  taskItem: {
    backgroundColor: '#eee',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
  },
  addTaskContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  taskInput: {
    flex: 5,
    marginRight: 5,
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
  },
  cyclesInput: {
    flex: 1,
    marginRight: 5,
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
  },
  addTaskButton: {
    backgroundColor: '#28A745',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
