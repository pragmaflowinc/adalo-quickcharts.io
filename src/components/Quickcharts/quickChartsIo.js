import React, { Component } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'


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
		//opacity: 1,	
		
	},
})



class Quickcharts extends Component {
	render() {
		
		
		if (!this.props.listItems){
			return <View></View>
		}
				
		let c = {type: this.props.chartType, data: {}}
		c.data.labels = [...new Set(this.props.listItems.map(item => (new Date(item.xValues)).toDateString()))]
		const aggregatedData = this.props.listItems.reduce((acc, item) => {
			
			var myDate = (new Date(item.xValues)).toDateString()

			if (!acc[myDate]){
				//acc[myDate] = item.yValues
				acc[myDate] = 1
			}
			else{
				//acc[myDate] += item.yValues
				acc[myDate] += 1
			}

			return acc

			},{}
		)
		
		//console.log(aggregatedData)


		c.data.datasets = [{
			label: this.props.dataSetName,
			data: Object.keys(aggregatedData).map(key => aggregatedData[key])
		}]

		console.log(c)
		
		// if(this.props.onUrl){
		// 	this.props.onUrl(
		// 		this.props.editor 
				
		// 		? `https://quickchart.io/chart?c={type:'bar',data:{labels:['Q1','Q2','Q3','Q4'], datasets:[{label:'Users',data:[50,60,70,180]},{label:'Revenue',data:[100,200,300,400]}]}}`

		// 		: `https://quickchart.io/chart?c=${JSON.stringify(c)}`
		// 	)
		// }

		if(this.props.editor){
			return(
				<View style ={styles.wrapper}>
				<Text>demo chart</Text>
				<Image
				  style={styles.chart}
				  source={{
					uri: `https://quickchart.io/chart?c={type:'bar',data:{labels:['2021-12-06T17:44:12Z','2021-12-06T17:44:20Z'],datasets:[{label:'Daily Orders',data:['2','2']}]}}`,

					
				  }}
				/>
			
			</View>
			)
		}

		return (
			<View style = {styles.wrapper}>
				<Text>prod chart</Text>
				<Image
				  style={styles.chart}
				  source={{
					uri: `https://quickchart.io/chart?c={type:'${c.type}',data:{labels:[${c.data.labels.map(label => `'${label}'`).join(',')}],datasets:[${c.data.datasets.map(dataset => {
						return `{label:'${dataset.label}',data:[${dataset.data.join(",")}]}`
					}).join(',')}]}}`,
				  }}
				/>
			
			</View>
			
		)
	}
}

  

export default Quickcharts
