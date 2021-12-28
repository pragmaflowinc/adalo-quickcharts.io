import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'



const styles = StyleSheet.create({
	wrapper: {
		display: 'flex',
		alignItems: 'center', 
		justifyContent: 'center',
	},
	
	chart: {
		flex: 1,
		resizeMode: 'contain',
		width: null,
	},
})

handleLayout = ({ nativeEvent }) => {
	const { width } = (nativeEvent && nativeEvent.layout) || {};
	const { width: prevWidth } = this.state;
  
	if (width !== prevWidth) {
	  this.setState({ width });
	}
  };


class Quickcharts extends Component {
	render() {
		const { color, text } = this.props				

		return (
			
			<View style={styles.wrapper} onLayout={this.handleLayout}>
				<Image
				  style={styles.chart}
				  source={{
					uri: 'https://quickchart.io/chart?c={type:\'bar\',data:{labels:[\'Q1\',\'Q2\',\'Q3\',\'Q4\'], datasets:[{label:\'Users\',data:[50,60,70,180]},{label:\'Revenue\',data:[100,200,300,400]}]}}',
				  }}
				/>
			</View>
			
		)
	}
}






//what are the records to use?
    //use adalo list filters

//which fields fox x & y?

    


//What fields to group by?
    //add this as an option, or add checkbox for "group X values when identical"


//compose url

// {
//     type: 'bar',
//     data: {
//       labels: ['Q1', 'Q2', 'Q3', 'Q4'],
//       datasets: [{
//         label: 'Users',
//         data: [50, 60, 70, 180]
//       }, {
//         label: 'Revenue',
//         data: [100, 200, 300, 400]
//       }]
//     }
//   }


//show image using url

   

  

export default Quickcharts
