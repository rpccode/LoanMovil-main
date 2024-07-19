import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Dashboard = () => {
  const [totalMoneyLoaned, setTotalMoneyLoaned] = useState(10);
  const [activeLoansCount, setActiveLoansCount] = useState(110);
  const [registeredClientsCount, setRegisteredClientsCount] = useState(10);
  const [balanceDueThisMonth, setBalanceDueThisMonth] = useState(10);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard de Préstamos</Text>
      <View style={styles.statistic}>
        <Text style={styles.label}>Total de Dinero Prestado:</Text>
        <Text style={styles.value}>${totalMoneyLoaned}</Text>
      </View>
      <View style={styles.statistic}>
        <Text style={styles.label}>Total de Préstamos Activos:</Text>
        <Text style={styles.value}>{activeLoansCount}</Text>
      </View>
      <View style={styles.statistic}>
        <Text style={styles.label}>Total de Clientes Registrados:</Text>
        <Text style={styles.value}>{registeredClientsCount}</Text>
      </View>
      <View style={styles.statistic}>
        <Text style={styles.label}>Balance a Cobrar Este Mes:</Text>
        <Text style={styles.value}>${balanceDueThisMonth}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statistic: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#888',
  },
  value: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default Dashboard;
