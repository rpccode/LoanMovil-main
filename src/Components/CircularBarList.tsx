import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { COLORS } from '../Configs';
import { ThemeStyles } from '../Configs/constants/theme';

const data = [
  { label: 'Cantidad de Préstamos', value: 10 },
  { label: 'Monto Prestado', value: 50000 },
  // Agrega más datos según sea necesario
];

const CircularBar = ({ value }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = (1 - value) * circumference;
  const percentage = Math.round(value * 100);
  return (
    <Svg height={radius * 2} width={radius * 2}>
      <Circle
        cx={radius}
        cy={radius}
        r={radius - 5}
        fill='transparent'
        stroke={COLORS.primary} // Ajuste del color al definido en la paleta
        strokeWidth={10}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={strokeDashoffset}
      />
      <Text style={styles.percentageText}>{`${percentage}%`}</Text>
    </Svg>
  );
};

const CircularBarList = () => {
  const renderItem = ({ item }) => (
    <View style={{ ...styles.itemContainer, ...ThemeStyles.shadow }}>
      <CircularBar value={item.value / 100} />
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{item.label}</Text>
        <Text style={styles.value}>{item.value}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.label}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    padding: 4,
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: COLORS.base, // Ajuste del color al definido en la paleta
    borderRadius: 8,
  },
  labelContainer: {
    marginLeft: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary, // Ajuste del color al definido en la paleta
  },
  value: {
    fontSize: 14,
    color: COLORS.secondary, // Ajuste del color al definido en la paleta
  },
  percentageText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: 30 }],
    fontSize: 18,
    color: COLORS.primary, // Ajuste del color al definido en la paleta
  },
});

export default CircularBarList;
