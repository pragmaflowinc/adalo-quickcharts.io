import React, { Component } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import FormValue from './manifest.json'


const styles = StyleSheet.create({
	wrapper: {
		display: 'flex',
		alignItems: 'center', 
		justifyContent: 'center',
		height: 200,
		
	},
	
	chart: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain',
		
		
	},
})


//What fields to group by?








class Quickcharts extends Component {
	render() {
		const url = () => {
			listItems.value;
		};
		{/*// compose url

		// 	{
		// 	    type: 'bar',
		// 	    data: {
		// 	      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
		// 	      datasets: [{
		// 	        label: 'Users',
		// 	        data: [50, 60, 70, 180]
		// 	      }, {
		// 	        label: 'Revenue',
		// 	        data: [100, 200, 300, 400]
		// 	      }]
		// 	    }
		// 	  }
		*/}

		console.log(FormValue.value);

		return (
			
			<View style={styles.wrapper}>
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






  

export default Quickcharts
