// LoanDetailsTable.js o LoanDetailsTable.tsx
import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {formatDate} from '../../../helpers';
import {COLORS} from '../../../Configs';
import {IDetallePrestamo} from '../../../Configs/interfaces';

const LoanDetailsTable = ({
  loanDetails,
  TotaloanDetails,
}: {
  loanDetails: IDetallePrestamo[];
  TotaloanDetails?: {
    payDuesAmount: number;
    payTotalAmount: number;
    payTotalInterest: number;
  };
}) => {
  const renderRow = ({item}: {item: IDetallePrestamo}) => (
    <View key={item.num_cuota} style={styles.row}>
      <Text style={styles.cell}>{item.num_cuota}</Text>
      <Text style={styles.cell}>{item.mont_capital}</Text>
      <Text style={styles.cell}>{item.mont_interes}</Text>
      <Text style={styles.cell}>{item.mont_couta}</Text>
      <Text style={styles.cell}>{formatDate(item.fecha_couta.toString())}</Text>
      <Text style={styles.cell}>
        <Text
          style={{
            color: item.estado === 1 ? COLORS.green : COLORS.orange,
          }}>
          {item.estado === 1 ? 'Pagado' : 'Pendiente'}
        </Text>
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerCell}>#</Text>
        <Text style={styles.headerCell}>Capital</Text>
        <Text style={styles.headerCell}>Interés</Text>
        <Text style={styles.headerCell}>Cuota</Text>
        <Text style={styles.headerCell}>Fecha</Text>
        <Text style={styles.headerCell}>Estado</Text>
      </View>

      <FlatList
        data={loanDetails}
        renderItem={renderRow}
        keyExtractor={item => item.num_cuota.toString()}
        contentContainerStyle={{flexGrow: 1}}
      />
      {TotaloanDetails && (
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Total de capital: {TotaloanDetails.payTotalAmount}
          </Text>
          <Text style={styles.footerText}>
            Total de interés: {TotaloanDetails.payTotalInterest}
          </Text>
          <Text style={styles.footerText}>
            Total a Pagar:{' '}
            {TotaloanDetails.payTotalAmount + TotaloanDetails.payTotalInterest}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: COLORS.white,
    color: COLORS.darkBlue,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: COLORS.darkBlue,
    padding: 10,
    marginBottom: 5,
    color: COLORS.white,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.white,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: 10,
    marginBottom: 5,
    color: COLORS.darkBlue,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 10,
    color: COLORS.darkBlue,
  },
  footer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray,
    paddingTop: 10,
    alignItems: 'center',
  },
  footerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.darkBlue,
  },
});

export default LoanDetailsTable;
