import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection:'row',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign:'center',
    marginBottom: 10,
    marginTop: 10,
  },
  dayStats: {
    marginBottom: 20,
    flexDirection: 'column',
    flex:1,
  },
  barContainer: {
    flexDirection: 'column',
    height:'60%',
    marginTop: 50,
  },
  bar: {
    marginRight: 2,
    alignItems:'center',
    justifyContent: 'center',
  },
  canceledBar: {
    backgroundColor: '#AF002B',
    borderTopRightRadius:10,
    borderTopLeftRadius:10,
    marginTop:-10,
    paddingBottom:10,
  },
  completedBar: {
    marginTop:-10,
    backgroundColor: '#00AF5B',
    borderTopRightRadius:10,
    borderTopLeftRadius:10,
    marginTop:-10,
    paddingBottom:10,
  },
  barText: {
    color:'white',
    fontWeight:'bold',
    fontSize:30,
    alignSelf:'center',
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf:'center',
    marginTop: 10,
    marginBottom:10,
  },
  legendItem: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  legendText: {
    fontSize: 16,
  },
});

export default styles;