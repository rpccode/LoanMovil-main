import { View, Dimensions } from 'react-native';
import React from 'react';
import { BarChart } from 'react-native-chart-kit';
import { Card, Text } from 'react-native-elements';
import { COLORS } from '../../../Configs';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: COLORS.blue,
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: COLORS.white,
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const graphStyle = {
  marginVertical: 8,
  borderRadius: 16,
  // other styles
};

export default function BarchartLoan() {
  const screenWidth = Dimensions.get('window').width;
  return (
    <Card containerStyle={{ borderRadius: 14 }} >
      <Card.Title>Loan Data</Card.Title>
      <Card.Divider />
      <View>
        <BarChart
          style={graphStyle}
          data={data}
          width={screenWidth - 32} // Adjust for card padding
          height={220}
          yAxisLabel="$"
          yAxisSuffix=""
          chartConfig={chartConfig}
          verticalLabelRotation={30}
        />
      </View>
    </Card>
  );
}
