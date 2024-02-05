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
  scrollView: {
    flex: 1,
  },
  timelineContainer: {
    flexDirection: 'column',
  },
  timelineItem: {
    height: 20,
    width:'20%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  timelineItemHalf: {
    height: 20,
    width:'20%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  timeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  taskItem: {
    backgroundColor: '#24C742',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    position: 'absolute',
    height:20,
    right:0,
    left:'20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineItemEmpty: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    position: 'absolute',
    height:20,
    right:0,
    left:'20%',
  },
});

export default styles;